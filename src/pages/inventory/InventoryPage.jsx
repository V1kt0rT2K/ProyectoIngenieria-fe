import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import InventoryTable from "../../components/InventoryTable";
import Spinner from "../../components/Spinner";

const Categories = {
    MEATS: "Carnes",
    LOT: "Lotes",
    SUPPLIES: "Insumos",
    TOOLS: "Herramientas"
};

const categories = Object.values(Categories);

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

const registroCerdos = [
    {
        id: 1,
        noLote: 101,
        noCerdo: "1",
        nacimiento: "2025-01-15",
        desarrollo: "2025-03-01",
        salida: "2025-06-20"
    },
    {
        id: 2,
        noLote: 111,
        noCerdo: "2",
        nacimiento: "2025-01-18",
        desarrollo: "2025-03-05",
        salida: "2025-06-22"
    },
    {
        id: 3,
        noLote: 102,
        noCerdo: "3",
        nacimiento: "2025-02-01",
        desarrollo: "2025-03-20",
        salida: "2025-07-01"
    },
    {
        id: 4,
        noLote: 103,
        noCerdo: "4",
        nacimiento: "2025-02-15",
        desarrollo: "2025-04-01",
        salida: "2025-07-15"
    },
    {
        id: 5,
        noLote: 112,
        noCerdo: "1",
        nacimiento: "2025-01-15",
        desarrollo: "2025-03-01",
        salida: "2025-06-20"
    },
    {
        id: 6,
        noLote: 121,
        noCerdo: "2",
        nacimiento: "2025-01-18",
        desarrollo: "2025-03-05",
        salida: "2025-06-22"
    },
    {
        id: 7,
        noLote: 132,
        noCerdo: "3",
        nacimiento: "2025-02-01",
        desarrollo: "2025-03-20",
        salida: "2025-07-01"
    },
    {
        id: 8,
        noLote: 143,
        noCerdo: "4",
        nacimiento: "2025-02-15",
        desarrollo: "2025-04-01",
        salida: "2025-07-15"
    }
];

const InventoryPage = () => {
    const inputRef = useRef(null);
    const [input, setInput] = useState(null);

    const [loading, setLoading] = useState(false);

    const [category, setCategory] = useState("");
    const [addNew, setAddNew] = useState(null);
    const [toDetails, setToDetails] = useState(null);

    const [inventory, setInventory] = useState([]);
    const [columnsTable, setColumnsTable] = useState([]);

    useEffect(() => {
        setLoading(true);
        let inv = [];

        switch (category) {
            case Categories.MEATS:
                setColumnsTable(["Tipo de carne", "Cantidad (en libras)", "Fecha de ingreso", "Precio por libra"]);
                setAddNew("new_meat_type");
                setToDetails("meat_type_information");
                inv = inventarioCarnes;
                break;
            case Categories.LOT:
                setColumnsTable(["No. de lote", "No. de cerdo", "Nacimiento", "Desarrollo", "Salida"]);
                setAddNew("new_lot");
                setToDetails("lot_information");
                inv = registroCerdos;
                break;
            case Categories.SUPPLIES:
                setCategory(null);
                setAddNew("new_supply");
                setToDetails(null);
                break;
            case Categories.TOOLS:
                setCategory(null);
                setAddNew("new_tool");
                setToDetails(null);
                break;
        };

        setInventory(inv);

        setTimeout(() => setLoading(false), 1000);
    }, [category]);

    return (
        <>
            <div style={{ height: "80vh" }} className="flex flex-col pt-8">
                <div className="flex flex-col items-start mb-6">
                    <div className="flex w-full space-x-24 h-8 justify-between">
                        <select className="py-1 px-3 bg-orange-200 rounded-md text-leading text-orange-700 border border-orange-700 hover:cursor-pointer">
                            <option key={0} onClick={() => { setCategory(null); setAddNew(null); }}>Escoja una categoria</option>
                            {
                                categories.map((cat, idx) =>
                                    <option
                                        key={idx}
                                        onClick={() => setCategory(cat)}
                                    >
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
                            : (loading
                                ? <Spinner loading={loading} />
                                : <InventoryTable
                                    columns={columnsTable}
                                    data={inventory.filter(item => !input ? true : (new RegExp(`.*${input}.*`, "i")).test(item.tipo))}
                                    to={toDetails}
                                />
                            )
                    }
                </div>
            </div>
        </>
    );
};

export default InventoryPage;