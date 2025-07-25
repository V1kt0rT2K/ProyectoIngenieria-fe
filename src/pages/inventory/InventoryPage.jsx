import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import InventoryTable from "../../components/InventoryTable";
import Spinner from "../../components/Spinner";
import SwineBatchService from "../../utils/service/SwineBatchService";
import SupplyBatchService from "../../utils/service/SupplyBatchService";
import SupplyOptionButton from "../../components/SupplyOptionButton";
import vacunaIcon from "../../assets/images/vacuna.png";
import concentradoIcon from "../../assets/images/concentrado.png";
import granjeroicon from "../../assets/images/granjero.png";
const Categories = {
    MEATS: "Carnes",
    LOT: "Lotes",
    SUPPLIES: "Insumos",
    TOOLS: "Herramientas"
};



const categories = Object.values(Categories);
let registroCerdos = [];
/*
const inventarioCarnes = [
    {
        id: 1,
        tipo: "R",
        cantidadLibras: 50,
        fechaIngreso: "2025-07-01",
        precioPorLibra: 5.25
    },
    {
        id: 2,
        tipo: "C",
        cantidadLibras: 30,
        fechaIngreso: "2025-07-03",
        precioPorLibra: 4.75
    },
    {
        id: 3,
        tipo: "P",
        cantidadLibras: 60,
        fechaIngreso: "2025-07-05",
        precioPorLibra: 3.80
    },
    {
        id: 4,
        tipo: "L",
        cantidadLibras: 20,
        fechaIngreso: "2025-06-28",
        precioPorLibra: 6.40
    }
];
*/



console.log(registroCerdos);

const InventoryPage = () => {
    const inputRef = useRef(null);
    //const [input, setInput] = useState(null);

    const [loading, setLoading] = useState(false);

    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");

    const [addNew, setAddNew] = useState(null);
    const [toDetails, setToDetails] = useState(null);

    const [inventory, setInventory] = useState([]);
    const [columnsTable, setColumnsTable] = useState([]);

useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        //let inv = [];

        switch (category) {
            case Categories.MEATS:
                setColumnsTable([{label:"Tipo",field:"tipo"},
                        {label:"cantidad en Libras",field:"cantidad"},
                        {label:"Fecha de ingreso",field:"fechaIngreso"},
                        {label:"Precio por Libra", field:"precioPorLibra"}]);
                setAddNew("new_meat_type");
                setToDetails("meat_type_information");
                //inv = inventarioCarnes;
                break;

            case Categories.LOT:
                { setColumnsTable(
                            [
                                { label: "No. de lote", field: "id" },
                                { label: "Cantidad de Cerdos", field: "Cantidad" },
                                { label: "Cerdos No Procesados", field: "CantidadRestante" },
                                { label: "Fecha de Ingreso", field: "fecha"},
                                { label: "Etapa", field: "etapa" },
                                ]
                );
                setAddNew("new_lot");
                setToDetails("new_lot_information");  
                

                const swineBatchData = await fetchSwineBatch();
                setInventory(swineBatchData);
            
                

                break; }
                
            case Categories.SUPPLIES:
                        setAddNew("new_supply");
                        setToDetails('new_supply_information');
                if( subCategory=="todos"){

                    setColumnsTable([
                            { label: "ID Lote", field: "id" },
                            { label: "Insumo", field: "insumo" },
                            { label: "Tipo de Insumo", field: "tipo" },
                            { label: "Cantidad", field: "cantidad" },
                            { label: "Fecha de Vencimiento", field: "fecha" },
                        ]);
                        const supplyBatchData = await fetchSupplyBatch();
                        console.log(supplyBatchData);
                        
                        setInventory(supplyBatchData); 

                }
                if(subCategory=="concentrado"){
                    setColumnsTable([ 
                            { label: "ID Lote", field: "id" },
                            { label: "Insumo", field: "insumo" },
                            { label: "Tipo de Insumo", field: "tipo" },
                            { label: "Cantidad", field: "cantidad" },
                            { label: "Fecha de Vencimiento", field: "fecha" },
                    ]);
                    const supplyBatchTypeData = await fetchSupplyBatchByType(3); 
                    setInventory(supplyBatchTypeData);
                }
                if(subCategory=="desparasitantes"){
                    setColumnsTable([ 
                            { label: "ID Lote", field: "id" },
                            { label: "Insumo", field: "insumo" },
                            { label: "Tipo de Insumo", field: "tipo" },
                            { label: "Cantidad", field: "cantidad" },
                            { label: "Fecha de Vencimiento", field: "fecha" },
                    ]);
                    const supplyBatchTypeData = await fetchSupplyBatchByType(1); 
                    setInventory(supplyBatchTypeData);
                }
                if(subCategory=="vitaminas"){
                    setColumnsTable([{ label: "ID Lote", field: "id" },
                            { label: "Insumo", field: "insumo" },
                            { label: "Tipo de Insumo", field: "tipo" },
                            { label: "Cantidad", field: "cantidad" },
                            { label: "Fecha de Vencimiento", field: "fecha" },
                    ]);
                    const supplyBatchTypeData = await fetchSupplyBatchByType(2);
                    setInventory(supplyBatchTypeData);}
                    
                break;
            
            case Categories.TOOLS:
                setAddNew("new_tool");
                setToDetails(null);
                break;
        }

        //setInventory(inv);
        setTimeout(() => setLoading(false), 1000);
    };

    fetchData();
}, [category,subCategory]);


    return (
        <>
            <div style={{ height: "80vh" }} className="flex flex-col pt-8">
                <div className="flex flex-col items-start mb-6">
                    <div className="flex w-full space-x-24 h-8 justify-between">
                        <select
                            className="py-1 px-3 bg-orange-200 rounded text-leading text-orange-700 border border-orange-700 hover:cursor-pointer"
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                            >
                            <option value="">Escoja una categoria</option>
                            {
                                categories.map((cat, idx) =>
                                    <option key={idx} value={cat}>
                                        {cat}
                                        
                                    </option>
                                )
                            }
                        </select>

                        {
                            category
                            && !loading
                            && (
                                <>
                                    {category != Categories.LOT && <input ref={inputRef}  className="focus:outline-none flex-grow border border-orange-700 rounded py-1 px-3 text-md" type="text" placeholder="Filtrar" />}
                                    <Link to={`/inventory/${addNew}`} className="bg-orange-800 mx-2 px-4 py-1 flex items-center justify-center text-lg text-white font-semibold rounded hover:cursor-pointer">+ Agregar</Link>
                                </>
                            )
                        }
                    </div>
                </div>
                <div style={{ width: "75vw" }} className={`rounded mt-2 mb-6 flex overflow-y-scroll ${!category || loading ? "" : "border border-orange-700 bg-orange-200"}`}>
                    {
                        !category
                            ? <div style={{ height: "55vh" }} className="w-full flex justify-center items-center font-extrabold text-3xl text-orange-700">Escoja una categoria para obtener registros</div>
                            :  (loading ? (
                            <Spinner loading={loading} />
                                    ) : (
                                    <>
                            
                                    {category === Categories.SUPPLIES && !subCategory && (
                                        <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto mt-4">
                                            <SupplyOptionButton
                                                icon={granjeroicon}
                                                label="Todos los Insumos"
                                                onClick={() => {
                                                console.log("Ir a todos los Insumos");
                                                setSubCategory("todos");
                                                                            }}
                                            />
                                            <SupplyOptionButton
                                                icon={concentradoIcon}
                                                label="Lotes de Concentrado"
                                                onClick={() => { 
                                                    console.log("Concentrado")
                                                    setSubCategory("concentrado")}}
                                            />
                                            <SupplyOptionButton
                                                icon={vacunaIcon}
                                                label="Lotes de Desparasitantes"
                                                onClick={() =>{ 
                                                    console.log("Desparasitantes")
                                                    setSubCategory("desparasitantes")}}
                                            />
                                            <SupplyOptionButton
                                                icon={vacunaIcon}
                                                label="Lotes de Vitaminas"
                                                onClick={() => {
                                                    console.log("Vitaminas")
                                                    setSubCategory("vitaminas")
                                                }}
                                            />
            </div>
        )}

        
        {category === Categories.SUPPLIES && subCategory && inventory.length > 0 && (
            <div className="mt-6 px-6">
                <button
                    onClick={() => {
                        setSubCategory(null);
                        setInventory([]);
                    }}
                    className="mb-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-xl shadow"
                >
                    ← Regresar
                </button>
                <InventoryTable
                    columns={columnsTable}
                    data={inventory}
                    to={toDetails}
                />
            </div>
        )}

        
        {category !== Categories.SUPPLIES && inventory.length > 0 && (
            <div className="mt-6 px-6">
                <InventoryTable
                    columns={columnsTable}
                    data={inventory}
                    to={toDetails}
                />
            </div>
        )}
    </>
)
)
                    }
                </div>
            </div>
        </>
    );
};

const fetchSwineBatch = async () => {
    try {
        const response = await SwineBatchService.getSwineBatch();
        
        if (!response.hasError && response.data) {
            return response.data.map(item => ({
                id: item.idSwineBatch,
                CantidadRestante: item.stockQuantity,   
                Cantidad: item.quantity,
                fecha: new Date(item.generationDate).toLocaleDateString(),
                etapa: item.Stage.stageName || "Desconocida"
            }));
        }
    } catch (error) {
        console.error("Error al cargar lotes de cerdos", error);
        return []; 
    }
};
const fetchSupplyBatch = async () => {
    try {
        const response = await SupplyBatchService.getSupplyBatch();
        
        if (!response.hasError && response.data) {
            return response.data.map(item => ({
                id: item.idSupplyBatch,
                insumo: item.Supply.nameSupply,
                tipo:item.Supply.SupplyType.nameSupplyType,
                cantidad: item.quantity,
                fecha: new Date(item.expirationDate).toLocaleDateString(),
            }));
        }
    } catch (error) {
        console.error("Error al cargar lotes de insumos", error);
        return []; 
    }
};
const fetchSupplyBatchByType = async (type) => {
    try {
        const response = await SupplyBatchService.getSupplyBatchByType(type);
        
        if (!response.hasError && response.data) {
            return response.data.map(item => ({
                id: item.idSupplyBatch,
                insumo: item.Supply.nameSupply,
                tipo:item.Supply.SupplyType.nameSupplyType,
                cantidad: item.quantity,
                fecha: new Date(item.expirationDate).toLocaleDateString(),
            }));
        }
    } catch (error) {
        console.error("Error al cargar lotes de insumos por tipo", error);
        return []; 
    } };




export default InventoryPage;
