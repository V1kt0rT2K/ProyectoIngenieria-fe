import { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import ArrayUtils from "../../utils/ArrayUtils";

const cuts = [
    {
        idSwineCutType: 1,
        swineCutTypeName: "Cabeza",
        description: "Incluye orejas, morro, cachetes y cabeza completa para caldos o barbacoa",
        unitPrice: 35.00
    },
    {
        idSwineCutType: 2,
        swineCutTypeName: "Lomo",
        description: "Corte magro y tierno, ideal para chuletas, filetes o asar entero",
        unitPrice: 85.00
    },
    {
        idSwineCutType: 3,
        swineCutTypeName: "Costilla",
        description: "Incluye las costillas (chuletas) con hueso, para parrilla o ahumados",
        unitPrice: 75.00
    },
    {
        idSwineCutType: 4,
        swineCutTypeName: "Pierna",
        description: "También llamada jamón, usado para asar, curar o hacer jamones serranos",
        unitPrice: 65.00
    },
    {
        idSwineCutType: 5,
        swineCutTypeName: "Paleta",
        description: "Parte delantera similar al jamón pero con más grasa intramuscular",
        unitPrice: 55.00
    },
    {
        idSwineCutType: 6,
        swineCutTypeName: "Panceta",
        description: "También llamado tocino o bacon (curado), parte ventral del cerdo",
        unitPrice: 60.00
    },
    {
        idSwineCutType: 7,
        swineCutTypeName: "Chuletón",
        description: "Corte premium del lomo alto con hueso",
        unitPrice: 95.00
    },
    {
        idSwineCutType: 8,
        swineCutTypeName: "Solomillo",
        description: "Corte más tierno y valioso, pequeño y magro",
        unitPrice: 100.00
    },
    {
        idSwineCutType: 9,
        swineCutTypeName: "Espaldilla",
        description: "Corte económico de la parte superior delantera",
        unitPrice: 45.00
    },
    {
        idSwineCutType: 10,
        swineCutTypeName: "Rabo",
        description: "Usado principalmente para guisos y caldos",
        unitPrice: 40.00
    },
    {
        idSwineCutType: 11,
        swineCutTypeName: "Chicharrón",
        description: "Piel de cerdo frita o asada",
        unitPrice: 50.00
    }
];

const setCheckProductType = (products, idx, cutType, swineCuts) => {
    const cut = swineCuts.find(c => c.idSwineCutType === cutType);
    products[idx] = { ...products[idx], ...cut, quantity: 1, total: cut.unitPrice };
    return products;
};

const setCheckProductTotal = (products, idx, quantity) => {
    const product = products[idx];
    products[idx] = { ...product, quantity: quantity, total: quantity * product.unitPrice };
    return products;
};

const NewSalePage = () => {
    const [swineCuts, setSwineCuts] = useState([]);
    const [checkProducts, setCheckProducts] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setSwineCuts(cuts);
        setTotal(ArrayUtils.sum(checkProducts.map(product => product.idSwineCutType ? product.total : 0)));
    }, [checkProducts]);

    return (
        <>
            <div style={{ height: "80vh", width: "75vw" }} className="flex flex-col pt-8">
                <BackButton />
                <p className="mb-2 text-lg text-orange-800 font-semibold underline">Crear factura</p>
                <div className="rounded overflow-y-auto p-0">
                    <div className="bg-orange-200 border border-orange-300 px-4 py-6 flex space-x-5 justify-between">
                        <div className="flex flex-col flex-grow space-y-4">
                            <div className="flex flex-col bg-orange-100 text-md text-orange-800 px-4 py-2 space-y-2 rounded">
                                <p>Numero de identidad del cliente</p>
                                <input className="bg-orange-200 px-3 py-1 rounded font-bold focus:outline-none" />
                            </div>
                        </div>
                        <div className="bg-orange-100 flex flex-col flex-grow space-y-2 py-2 justify-center rounded pl-2">
                            <p className="ml-4 mb-1 text-lg text-orange-800 font-semibold underline"></p>
                            <div className="flex justify-between items-center text-md text-orange-800 font-bold px-4">
                                <p>Fecha de creacion</p>
                                <input className="bg-orange-200 rounded px-3 py-2" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 bg-orange-200 border border-orange-300 p-6">
                        <p className="text-xl font-semibold text-orange-800 underline">Productos</p>
                        <table className="flex-grow w-full table-auto justify-self-center mt-4">
                            <thead>
                                <tr>
                                    <th className="border border-orange-900 bg-orange-700 text-white w-48 px-2">Producto</th>
                                    <th className="border border-orange-900 bg-orange-700 text-white w-64 px-2">Nota (opcional)</th>
                                    <th className="border border-orange-900 bg-orange-700 text-white w-32 px-2">Costo (Por libra)</th>
                                    <th className="border border-orange-900 bg-orange-700 text-white w-24 px-2">Cantidad</th>
                                    <th className="border border-orange-900 bg-orange-700 text-white w-32 px-2">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    checkProducts
                                        .map((product, idx) =>
                                            <tr key={idx}>
                                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                    <select className="bg-orange-300 px-2 py-1 rounded font-semibold text-orange-700">
                                                        <option
                                                            key={0}
                                                            onClick={() => setCheckProducts(setCheckProductType(checkProducts, idx, undefined).concat())}
                                                        >
                                                            Producto
                                                        </option>
                                                        {
                                                            cuts
                                                                .map(cut =>
                                                                    <option
                                                                        className=""
                                                                        key={cut.idSwineCutType}
                                                                        onClick={() => setCheckProducts(setCheckProductType(checkProducts, idx, cut.idSwineCutType, swineCuts).concat())}
                                                                    >
                                                                        {cut.swineCutTypeName}
                                                                    </option>)
                                                        }
                                                    </select>
                                                </td>
                                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{product.idSwineCutType ? product.description : ""}</td>
                                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{product.idSwineCutType ? product.unitPrice : ""}</td>
                                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                    {
                                                        product.idSwineCutType
                                                            ? <input
                                                                className="bg-orange-300 py-1 px-2 rounded w-16 text-orange-700 font-extrabold focus:outline-none"
                                                                defaultValue={product.quantity}
                                                                type="number"
                                                                min="1"
                                                                onChange={(e) => setCheckProducts(setCheckProductTotal(checkProducts, idx, parseInt(e.target.value)).concat())}
                                                            />
                                                            : ""
                                                    }
                                                </td>
                                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{product.idSwineCutType ? product.total : ""}</td>
                                            </tr>
                                        )
                                }
                            </tbody>
                        </table>
                        <div className="flex justify-center">
                            <button onClick={() => setCheckProducts(checkProducts.concat({}))} className="bg-orange-700 rounded px-3 py-1 font-semibold text-white mt-2">+ Añadir producto</button>
                        </div>

                        <div className="mt-4 font-semibold text-orange-800 inline-block flex flex-col space-y-3 bg-orange-300 p-6 rounded">
                            <p className="flex justify-between"><span>Subtotal</span><span className="font-extrabold">L. {total}</span></p>
                            <p className="flex justify-between"><span>ISV</span><span className="font-extrabold">L. {(total * 0.15).toFixed(2)}</span></p>
                            <hr />
                            <p className="flex justify-between"><span>Total</span><span className="font-extrabold">L. {(total * 1.15).toFixed(2)}</span></p>
                        </div>

                        <div className="mt-2 flex justify-center">
                            <button className="bg-green-600 rounded px-3 py-1 font-semibold text-white mt-2">Guardar</button>
                        </div>
                    </div>


                </div>
            </div>
        </>
    );
};

export default NewSalePage;