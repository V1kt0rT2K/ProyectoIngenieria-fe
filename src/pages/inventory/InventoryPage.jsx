import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import InventoryTable from "../../components/InventoryTable";
import Spinner from "../../components/Spinner";
import SwineBatchService from "../../utils/service/SwineBatchService";
import StageService from "../../utils/service/StageService";
import FeedBatchService from "../../utils/service/FeedBatchService";
import SupplyOptionButton from "../../components/SupplyOptionButton";
import vacunaIcon from "../../assets/images/vacuna.png";
import concentradoIcon from "../../assets/images/concentrado.png";
const Categories = {
    MEATS: "Carnes",
    LOT: "Lotes",
    SUPPLIES: "Insumos",
    TOOLS: "Herramientas"
};



const categories = Object.values(Categories);
let registroCerdos = [];

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




console.log(registroCerdos);

const InventoryPage = () => {
    const inputRef = useRef(null);
    const [input, setInput] = useState(null);

    const [loading, setLoading] = useState(false);

    const [category, setCategory] = useState("");
   // const [subCategory, setSubCategory] = useState(null);

    const [addNew, setAddNew] = useState(null);
    const [toDetails, setToDetails] = useState(null);

    const [inventory, setInventory] = useState([]);
    const [columnsTable, setColumnsTable] = useState([]);

useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        let inv = [];

        switch (category) {
            case Categories.MEATS:
                setColumnsTable([{label:"Tipo",field:"tipo"},
                        {label:"cantidad en Libras",field:"cantidadLibras"},
                        {label:"Fecha de ingreso",field:"fechaIngreso"},
                        {label:"Precio por Libra", field:"precioPorLibra"}]);
                setAddNew("new_meat_type");
                setToDetails("meat_type_information");
                inv = inventarioCarnes;
                break;

            case Categories.LOT:
                setColumnsTable(
                            [
                                { label: "No. de lote", field: "id" },
                                { label: "Cerdos restantes", field: "cantidad" },
                                { label: "Peso estimado", field: "peso" },
                                { label: "Fecha de Ingreso", field: "fecha" },
                                { label: "Etapa", field: "etapa" },
                                ]
                );
                setAddNew("new_lot");
                setToDetails("new_lot_information");  
                



                inv = await fetchLotesSwine();

                break;

            case Categories.SUPPLIES:
                setAddNew(null);
                setToDetails(null);
                break;

            case Categories.TOOLS:
                setAddNew("new_tool");
                setToDetails(null);
                break;
        }

        setInventory(inv);
        setTimeout(() => setLoading(false), 1000);
    };

    fetchData();
}, [category]);


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
                                    {category != Categories.LOT && <input ref={inputRef} onInput={() => setInput(inputRef.current.value)} className="focus:outline-none flex-grow border border-orange-700 rounded py-1 px-3 text-md" type="text" placeholder="Filtrar" />}
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
                                        category === Categories.SUPPLIES ? (
                                            <div className="w-full flex flex-col justify-center items-center space-y-6 p-4">
                                                <SupplyOptionButton
                                                    icon={concentradoIcon}
                                                    label="Lotes de Concentrado"
                                                            onClick={() => {
                                                            //setSubCategory("Concentrado");
                                                            //fetchLotesConcentrado();
                                                            }}
                                                />
                                                <SupplyOptionButton
                                                    icon={vacunaIcon}
                                                    label="Lotes de Vacunas"
                                                    onClick={() => console.log("Ir a Lotes de Vacunas")}
                                                />
                                            </div>
                                        ) : (
                                            <InventoryTable
                                                columns={columnsTable}
                                                data={inventory.filter(item =>
                                                    !input ? true : (new RegExp(`.*${input}.*`, "i")).test(item.tipo)
                                                )}
                                                to={toDetails}
                                            />
    )
))
                    }
                </div>
            </div>
        </>
    );
};
const fetchLotesSwine = async () => {
    try {
        const response = await SwineBatchService.getswinebatch().then;

        if (!response.hasError && response.data) {
            const mappedData = await Promise.all(
                response.data.map(async (item) => {
                    const stage = await StageService.getStagebyid(item.idStage);
                    console.log(stage);
                    return {
                        id: item.idSwineBatch,
                        cantidad: item.swineQuantityRemaining,
                        peso: item.estimatedWeight,
                        fecha: new Date(item.generationDate).toLocaleDateString(),
                        etapa: stage?.data.stageName || "Desconocida"
                    };
                })
            );

            return mappedData;
        }
    } catch (error) {
        console.error("Error al cargar lotes de cerdos", error);
        return [];
    }
};/*
const fetchLotesConcentrado = async () => { 
    try{

        const response = await FeedBatchService.getAllFeedBacth();

        if (!response.hasError && response.data) {
            return response.data.map(item => ({
                id: item.idFeedBatch,
                tipo: item.idFeed,
                cantidad: item.quantity,
                fecha: new Date(item.generationDate).toLocaleDateString(),
                
            }));
        }

    }catch (error) {
        console.error("Error al cargar lotes de concentrado", error);
        return [];}

}*/


export default InventoryPage;
