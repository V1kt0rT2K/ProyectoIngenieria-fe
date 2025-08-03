import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "../../utils/debounce";
import InventoryTable from "../../components/InventoryTable";
import Spinner from "../../components/Spinner";
import SwineBatchService from "../../utils/service/SwineBatchService";
import SupplyBatchService from "../../utils/service/SupplyBatchService";
import ProductBatchService from "../../utils/service/ProductBatchService";
import SupplyOptionButton from "../../components/SupplyOptionButton";
import vacunaIcon from "../../assets/images/vacuna.png";
import concentradoIcon from "../../assets/images/concentrado.png";
import granjeroicon from "../../assets/images/granjero.png";
import Pagination from "react-js-pagination";
import BackButton from "../../components/BackButton";

const Categories = {
    PRODUCTS: "Productos",
    LOT: "Lotes",
    SUPPLIES: "Insumos",
    TOOLS: "Herramientas"
};

const categories = Object.values(Categories);

const InventoryPage = () => {
    
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState(null);
    const [addNew, setAddNew] = useState(null);
    const [toDetails, setToDetails] = useState(null);
    const [inventory, setInventory] = useState([]);
    const [columnsTable, setColumnsTable] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [sort, setSort] = useState("0");
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(3);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms de debounce
    
    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value) {
            
            setPage(1); // Resetear a la primera página al buscar
        }
    };
    const fetchSwineBatch = async () => {
        
        try {
            const response = await SwineBatchService.getSwineBatch(page, size, sort);
            if (!response.hasError && response.data) {
                return {
                    data: response.data.data.map(item => ({
                        id: item.idSwineBatch,
                        CantidadRestante: item.stockQuantity,
                        fechadeNacimiento: new Date(item.birthDate).toLocaleDateString(),   
                        Cantidad: item.quantity,
                        fecha: new Date(item.generationDate).toLocaleDateString(),
                        etapa: item.Stage.stageName || "Desconocida"
                    })),
                    totalItems: response.data.totalItems
                };
            }
            return { data: [], totalItems: 0 };
        } catch (error) {
            console.error("Error al cargar lotes de cerdos", error);
            return { data: [], totalItems: 0 };
        }
    };

    const fetchSupplyBatch = async (search = "") => {
        try {
            const response = search 
                ? await SupplyBatchService.searchSupplyBatch(search, page, size, sort)
                : await SupplyBatchService.getSupplyBatch(page, size, sort);
                
            if (!response.hasError && response.data) {
                return {
                    data: response.data.data.map(item => ({
                        id: item.idSupplyBatch,
                        insumo: item.Supply.nameSupply,
                        tipo: item.Supply.SupplyType.nameSupplyType,
                        cantidad: item.stockQuantity,
                        fecha: new Date(item.expirationDate).toLocaleDateString(),
                    })),
                    totalItems: response.data.totalItems
                };
            }
            return { data: [], totalItems: 0 };
        } catch (error) {
            console.error("Error al cargar lotes de insumos", error);
            return { data: [], totalItems: 0 };
        }
    };

    const fetchSupplyBatchByType = async (type,search = "") => {
        try {
            const response = search ?SupplyBatchService.searchSupplyBatchByType(type, search, page, size, sort)
            : await SupplyBatchService.getSupplyBatchByType(type, page, size, sort);
            if (!response.hasError && response.data) {
                return {
                    data: response.data.data.map(item => ({
                        id: item.idSupplyBatch,
                        insumo: item.Supply.nameSupply,
                        tipo: item.Supply.SupplyType.nameSupplyType,
                        cantidad: item.stockQuantity,
                        fecha: new Date(item.expirationDate).toLocaleDateString(),
                    })),
                    totalItems: response.data.totalItems
                };
            }
            return { data: [], totalItems: 0 };
        } catch (error) {
            console.error("Error al cargar lotes de insumos por tipo", error);
            return { data: [], totalItems: 0 };
        }
    };

    const fetchProductBatch = async (search = "") => {
    try {
        const response = search
            ? await ProductBatchService.searchProductBatch(search, page, size, sort)
            : await ProductBatchService.getAllProductBatch(page, size, sort);
        
        if (response.hasError) {
            console.error("Error del servidor:", response.meta.message);
            return { data: [], totalItems: 0 };
        }

        if (!response.data || !response.data.data) {
            return { data: [], totalItems: 0 };
        }

        return {
            data: response.data.data.map(item => ({
                idproductBatch: item.idProductBatch,
                nombreProducto: item.Product.productName,
                CantidadRestante: item.stockQuantity,
                fechaExpiracion: new Date(item.expirationDate).toLocaleDateString(),
                precioProducto: item.Product.price,
                PuntodeReorden: item.Product.orderPoint,
            })),
            totalItems: response.data.totalItems
        };
    } catch (error) {
        console.error("Error en fetchProductBatch:", error);
        return { data: [], totalItems: 0 };
    }
};


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let result = { data: [], totalItems: 0 };

            switch (category) {
                case Categories.PRODUCTS:
                setSize(4)
                    setColumnsTable([
                        {label:"No. Lote",field:"idproductBatch"},
                        {label:"Producto",field:"nombreProducto"},
                        {label:"Fecha de Expiracion",field:"fechaExpiracion"},
                        {label:"Cantidad", field:"CantidadRestante"},
                        {label:"Precio por libra", field:"precioProducto"},
                        {label:"Punto de Reorden", field:"PuntodeReorden"}
                    ]);
                    setAddNew("new_product_batch");
                    setToDetails("meat_type_information");
                    result = await fetchProductBatch(debouncedSearchTerm);
                    break;

                case Categories.LOT:
                    setSize(3)
                    setColumnsTable([
                        { label: "No. de lote", field: "id" },
                        { label: "Cantidad Inicial", field: "Cantidad" },
                        { label: "Cerdos Actual", field: "CantidadRestante" },
                        { label: "Fecha de Nacimiento", field: "fechadeNacimiento"},
                        { label: "Fecha de Ingreso", field: "fecha"},
                        { label: "Etapa", field: "etapa" },
                    ]);
                    setAddNew("new_lot");
                    setToDetails("lot");

                    result = await fetchSwineBatch();
                    
                    break;

                case Categories.SUPPLIES:
                    setAddNew("new_supply");
                    setToDetails('new_supply_information');
                    if (subCategory === "todos") {
                        setColumnsTable([
                            { label: "ID Lote", field: "id" },
                            { label: "Insumo", field: "insumo" },
                            { label: "Tipo de Insumo", field: "tipo" },
                            { label: "Cantidad", field: "cantidad" },
                            { label: "Fecha de Vencimiento", field: "fecha" },
                        ]);
                        result = await fetchSupplyBatch(debouncedSearchTerm);
                        console.log("result", result);
                    } else if (subCategory === "concentrado") {
                        setColumnsTable([ 
                            { label: "ID Lote", field: "id" },
                            { label: "Insumo", field: "insumo" },
                            { label: "Tipo de Insumo", field: "tipo" },
                            { label: "Cantidad", field: "cantidad" },
                            { label: "Fecha de Vencimiento", field: "fecha" },
                        ]);
                        result = await fetchSupplyBatchByType(3);
                    } else if (subCategory === "desparasitantes") {
                        setColumnsTable([ 
                            { label: "ID Lote", field: "id" },
                            { label: "Insumo", field: "insumo" },
                            { label: "Tipo de Insumo", field: "tipo" },
                            { label: "Cantidad", field: "cantidad" },
                            { label: "Fecha de Vencimiento", field: "fecha" },
                        ]);
                        result = await fetchSupplyBatchByType(1);
                    } else if (subCategory === "vitaminas") {
                        setColumnsTable([
                            { label: "ID Lote", field: "id" },
                            { label: "Insumo", field: "insumo" },
                            { label: "Tipo de Insumo", field: "tipo" },
                            { label: "Cantidad", field: "cantidad" },
                            { label: "Fecha de Vencimiento", field: "fecha" },
                        ]);
                        result = await fetchSupplyBatchByType(2);
                    }
                    break;
                
                case Categories.TOOLS:
                    setAddNew("new_tool");
                    setToDetails(null);
                    break;
            }

            setInventory(result.data);
            setTotalItems(result.totalItems);
            setLoading(false);
            
        };

        fetchData();
    }, [category, subCategory, page, size, sort,debouncedSearchTerm]);

    return (
        <>
            <div style={{ height: "80vh" }} className="flex flex-col pt-8">
                <div className="flex flex-col items-start mb-6">
                    <div className="flex w-full space-x-24 h-8 justify-between">
                        <select
                            className="py-1 px-3 bg-orange-200 rounded text-leading text-orange-700 border border-orange-700 hover:cursor-pointer"
                            onChange={(e) => {
                                setCategory(e.target.value);
                                setSubCategory("");
                                setPage(1);
                                setSearchTerm(""); // Limpiar filtro al cambiar categoría
                            }}
                            value={category}
                        >
                            <option value="">Escoja una categoria</option>
                            {categories.map((cat, idx) => (
                                <option key={idx} value={cat}>{cat}</option>
                            ))}
                        </select>

                        {category && !loading && (
                            <>
                            {(category === Categories.PRODUCTS || (category === Categories.SUPPLIES && subCategory)) && (
                <div className="relative">
                    <input 
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="focus:outline-none flex-grow border border-orange-700 rounded py-1 px-3 text-md" 
                        type="text" 
                        placeholder="Filtrar..." 
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            ×
                        </button>
                    )}
                </div>
            )}
                                {category === Categories.PRODUCTS && (
                                    <Link 
                                        to="/inventory/product_catalog" 
                                        className="bg-orange-700 mx-2 px-4 py-1 flex items-center justify-center text-lg text-white font-semibold rounded hover:bg-green-800 transition"
                                    >
                                        Ver Catálogo de producto
                                    </Link>
                                )}
                                <Link 
                                    to={`/inventory/${addNew}`} 
                                    className="bg-orange-800 mx-2 px-4 py-1 flex items-center justify-center text-lg text-white font-semibold rounded hover:cursor-pointer"
                                >
                                    + Agregar
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="flex flex-row gap-3">
                        <select 
                            className="bg-orange-700 mt-3 rounded px-2 py-1 text-white font-semibold" 
                            onChange={e => setSort(e.target.value)} 
                            value={sort}
                        >
                            <option value="0">Descendente</option>
                            <option value="1">Ascendente</option>
                        </select>
                    </div>
                </div>
                {category === Categories.SUPPLIES && subCategory && (
                    <div className="flex flex-col w-full items-start mb-4 ">
                    <button
                        onClick={() => {
                        setSubCategory(null);
                        setPage(1);
                        setSearchTerm(""); 
                    }}
                    className="bg-orange-700 text-white font-semibold py-1 px-4 rounded hover:bg-orange-800 transition"
                    >
                    ← Regresar a Insumos
                    </button>
                    </div>
                        )}
                <div style={{ width: "75vw" }} className={`rounded mt-2 mb-6 flex overflow-y-scroll ${!category || loading ? "" : "border border-orange-700 bg-orange-200"}`}>
                    {!category ? (
                        <div style={{ height: "55vh" }} className="w-full flex justify-center items-center font-extrabold text-3xl text-orange-700">
                            Escoja una categoria para obtener registros
                        </div>
                    ) : loading ? (
                        <Spinner loading={loading} />
                    ) : (
                        <>
                            {category === Categories.SUPPLIES && !subCategory && (
                                <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto mt-4">
                                    
                                    <SupplyOptionButton
                                        icon={granjeroicon}
                                        label="Todos los Insumos"
                                        onClick={() => {
                                            setSubCategory("todos");
                                            setPage(1);
                                            setSize(3);
                                        }}
                                    />
                                    <SupplyOptionButton
                                        icon={concentradoIcon}
                                        label="Lotes de Concentrado"
                                        onClick={() => { 
                                            setSubCategory("concentrado");
                                            setPage(1);
                                        }}
                                    />
                                    <SupplyOptionButton
                                        icon={vacunaIcon}
                                        label="Lotes de Desparasitantes"
                                        onClick={() => { 
                                            setSubCategory("desparasitantes");
                                            setPage(1);
                                        }}
                                    />
                                    <SupplyOptionButton
                                        icon={vacunaIcon}
                                        label="Lotes de Vitaminas"
                                        onClick={() => {
                                            setSubCategory("vitaminas");
                                            setPage(1);
                                        }}
                                    />
                                </div>
                            )}

                            

        {category === Categories.SUPPLIES && subCategory && inventory.length > 0 && (
                    <InventoryTable
                        columns={columnsTable}
                        data={ inventory}
                        to={toDetails}
                    />
                )}

                {category === Categories.PRODUCTS && inventory.length > 0 && (
                    <InventoryTable
                        columns={columnsTable}
                        data={ inventory}
                        to={toDetails}
                    />
                )}

                            {category !== Categories.SUPPLIES && category !== Categories.PRODUCTS && inventory.length > 0 && (
                                    <BackButton />,
                                    <InventoryTable
                                        columns={columnsTable}
                                        data={inventory}
                                        to={toDetails}
                                    />
                                
                            )}

                            {category!==Categories.SUPPLIES&&inventory.length === 0 && (
                                <div className="w-full flex justify-center items-center font-extrabold text-3xl text-orange-700">
                                    No hay registros disponibles
                                </div>
                            )}
                        </>
                    )}
                </div>
                
                {!loading && totalItems > 0 && (
                    <div className="flex justify-center space-x-4">
                        <Pagination
                            activePage={page}
                            itemsCountPerPage={size}
                            totalItemsCount={totalItems}
                            pageRangeDisplayed={5}
                            onChange={(pageNumber) => setPage(pageNumber)}
                            innerClass="flex list-none rounded-md overflow-hidden shadow-sm"
                            itemClass="flex items-center justify-center"
                            linkClass="px-3 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                            activeClass="bg-green-500"
                            activeLinkClass="px-3 py-2 border border-blue-500 bg-blue-500 text-white hover:bg-blue-600"
                            disabledClass="opacity-50 cursor-not-allowed"
                            prevPageText="<<"
                            nextPageText=">>"
                            firstPageText="Primera"
                            lastPageText="Última"
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default InventoryPage;