import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InventoryTable from "../../components/InventoryTable";
import SellerService from "../../utils/service/SellerService";
import Pagination from "react-js-pagination";
import { useDebounce } from "../../utils/debounce";

const ProductCatalogPage = () => {
    const [productBatches, setProductBatches] = useState([]);
    const [loading, setLoading] = useState(false);
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
    useEffect(() => {
        const fetchProducts = async (search="") => {
            setLoading(true);
            try {
                const response = search
                ?await SellerService.searchProducts(search, page, size, sort)
                :await SellerService.getAllProducts(page, size, sort);
                if (!response.hasError) {
                    setProductBatches(response.data.data || []);
                    setTotalItems(response.data.totalItems || 0);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts(debouncedSearchTerm);
    }, [page, size, sort,debouncedSearchTerm]);

    const columns = [
        { label: "No.", field: "idProduct" },
        { label: "Producto", field: "productName" },
        { label: "Descripción", field: "productDescription" },
        { label: "Precio por libra", field: "price" }
    ];

    return (
         <div style={{ height: "80vh" }} className="flex flex-col pt-8">
            <div className="flex flex-col w-[75vw] h-full overflow-hidden border ">
                <h1 className="text-3xl font-semibold text-orange-800 mb-4">
                    Catálogo de Productos
                </h1>

                <div className="mb-4 flex justify-between items-center">
                    <div className="space-x-2">
                        <Link 
                            to="/inventory" 
                            className="bg-orange-800 mx-2 px-4 py-1 flex items-center justify-center text-lg text-white font-semibold rounded hover:cursor-pointer hover:bg-orange-700 transition"
                        >
                            Regresar
                        </Link>
                    </div>
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
                    <div className="space-x-2">
                        <Link 
                            to="/inventory/new_product" 
                            className="bg-orange-800 mx-2 px-4 py-1 flex items-center justify-center text-lg text-white font-semibold rounded hover:cursor-pointer hover:bg-orange-700 transition"
                        >
                            + Agregar
                        </Link>
                    </div>
                </div>

                <div className="flex flex-row gap-3 mb-2">
                    <select 
                        className="bg-orange-700 rounded px-2 py-1 text-white font-semibold" 
                        onChange={e => setSort(e.target.value)} 
                        value={sort}
                    >
                        <option value="0">Descendente</option>
                        <option value="1">Ascendente</option>
                    </select>
                </div>
                <div className="rounded border border-orange-700 bg-orange-200 overflow-hidden flex flex-col" style={{ maxHeight: "50vh" }}>
                    {loading ? (
                    <div className="flex justify-center items-center flex-1">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-700"></div>
                </div>
                    ) : productBatches.length > 0 ? (
                        
                            <InventoryTable
                                columns={columns}
                                data={productBatches}
                                to="/productos"
                            />
                        
                            ) : (
                            <div className="flex-1 flex justify-center items-center text-orange-700 font-semibold">
                                No hay productos disponibles
                            </div>
                            )}
</div>


                {totalItems > size && (
                    <div className="mt-4 flex justify-center ">
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
        </div>
    );
};

export default ProductCatalogPage;