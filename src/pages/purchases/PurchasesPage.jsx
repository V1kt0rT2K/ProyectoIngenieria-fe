import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import PurchaseOptions from "../../components/PurchaseOptions";

const State = {
    PAID: "Pagado",
    PENDING: "Pendiente",
    CANCELED: "Cancelado"
};

const filters = Object.values(State);

const datosPrueba = [
    { id: 1, estado: State.PENDING, noCompra: "001", proveedor: "Proveedor A", montoEstimado: 1500.00, fechaOrden: "2025-07-01" },
    { id: 2, estado: State.PENDING, noCompra: "002", proveedor: "Proveedor B", montoEstimado: 2750.50, fechaOrden: "2025-07-02" },
    { id: 3, estado: State.PAID, noCompra: "003", proveedor: "Proveedor C", montoEstimado: 980.75, fechaOrden: "2025-07-03" },
    { id: 4, estado: State.CANCELED, noCompra: "004", proveedor: "Proveedor D", montoEstimado: 1200.00, fechaOrden: "2025-07-04" },
    { id: 5, estado: State.PENDING, noCompra: "005", proveedor: "Proveedor E", montoEstimado: 1800.00, fechaOrden: "2025-07-05" },
    { id: 6, estado: State.PENDING, noCompra: "006", proveedor: "Proveedor A", montoEstimado: 2100.00, fechaOrden: "2025-07-06" },
    { id: 7, estado: State.PAID, noCompra: "007", proveedor: "Proveedor F", montoEstimado: 1375.00, fechaOrden: "2025-07-07" },
    { id: 8, estado: State.PENDING, noCompra: "008", proveedor: "Proveedor B", montoEstimado: 3000.00, fechaOrden: "2025-07-08" },
    { id: 9, estado: State.CANCELED, noCompra: "009", proveedor: "Proveedor C", montoEstimado: 1100.00, fechaOrden: "2025-07-09" },
    { id: 10, estado: State.PENDING, noCompra: "010", proveedor: "Proveedor D", montoEstimado: 950.00, fechaOrden: "2025-07-10" },
    { id: 11, estado: State.PENDING, noCompra: "011", proveedor: "Proveedor E", montoEstimado: 2000.00, fechaOrden: "2025-07-11" },
    { id: 12, estado: State.PAID, noCompra: "012", proveedor: "Proveedor F", montoEstimado: 1675.00, fechaOrden: "2025-07-12" },
    { id: 13, estado: State.PENDING, noCompra: "013", proveedor: "Proveedor A", montoEstimado: 2400.00, fechaOrden: "2025-07-13" },
    { id: 14, estado: State.PENDING, noCompra: "014", proveedor: "Proveedor B", montoEstimado: 1230.00, fechaOrden: "2025-07-14" },
    { id: 15, estado: State.PAID, noCompra: "015", proveedor: "Proveedor C", montoEstimado: 1575.00, fechaOrden: "2025-07-15" },
    { id: 16, estado: State.CANCELED, noCompra: "016", proveedor: "Proveedor D", montoEstimado: 800.00, fechaOrden: "2025-07-16" },
    { id: 17, estado: State.PENDING, noCompra: "017", proveedor: "Proveedor E", montoEstimado: 2650.00, fechaOrden: "2025-07-17" },
    { id: 18, estado: State.PENDING, noCompra: "018", proveedor: "Proveedor F", montoEstimado: 1440.00, fechaOrden: "2025-07-18" },
    { id: 19, estado: State.PAID, noCompra: "019", proveedor: "Proveedor A", montoEstimado: 1999.99, fechaOrden: "2025-07-19" },
    { id: 20, estado: State.PENDING, noCompra: "020", proveedor: "Proveedor B", montoEstimado: 850.00, fechaOrden: "2025-07-20" }
];


const PurchasesPage = () => {
    const [loading, setLoading] = useState(true);
    const [ordenesCompra, setOrdenesCompra] = useState([]);

    const [filterBy, setFilterBy] = useState(null);

    useEffect(() => {
        setOrdenesCompra(datosPrueba);
        setTimeout(() => setLoading(false), 1000);
    }, [filterBy]);

    return (
        <>
            <div style={{ height: "80vh" }} className="flex flex-col pt-8">
                <div className="flex flex-col items-start">
                    <div className="flex w-full space-x-24">
                        <select className="focus:outline-none flex-grow bg-orange-200 border border-orange-700 rounded py-1 px-3 text-md">
                            <option onClick={() => setFilterBy(null)}>
                                {filterBy ? "Mostrar todas" : "Filtrar compras"}
                            </option>
                            {
                                filters.map((filter, idx) =>
                                    <option
                                        key={idx}
                                        onClick={() => setFilterBy(filter)}
                                    >
                                        {filter}
                                    </option>
                                )
                            }
                        </select>
                        <Link to="" className="bg-orange-800 mx-2 px-4 py-1 flex items-center justify-center text-lg text-white font-semibold rounded hover:cursor-pointer">+ Agregar</Link>
                    </div>
                </div>
                <p className="mt-6 text-lg text-orange-800 font-semibold underline">Historial de compras</p>
                <div style={{ width: "75vw" }} className={`rounded mt-2 mb-6 flex overflow-y-scroll ${loading ? "" : "border border-orange-700 bg-orange-200"}`}>
                    {
                        loading
                            ? <Spinner loading={loading} />
                            : (
                                <table className="flex-grow w-full table-auto justify-self-center">
                                    <thead>
                                        <tr>
                                            <th className="border border-orange-900 py-2 px-5 bg-orange-700 text-white text-md">Estado</th>
                                            <th className="border border-orange-900 px-5 bg-orange-700 text-white text-md">No. de compra</th>
                                            <th className="border border-orange-900 px-5 bg-orange-700 text-white text-md">Proveedor</th>
                                            <th className="border border-orange-900 px-5 bg-orange-700 text-white text-md">Monto estimado</th>
                                            <th className="border border-orange-900 px-5 bg-orange-700 text-white text-md">F. de orden</th>
                                            <th className="border border-orange-900 px-5 bg-orange-700 text-white"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            ordenesCompra
                                                .filter(orden => !filterBy ? true : orden.estado === filterBy)
                                                .map((orden, idx) =>
                                                    <tr key={idx}>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            <p className={`${orden.estado === State.PAID ? "bg-green-600" : orden.estado === State.PENDING ? "bg-yellow-600" : "bg-red-500"} inline px-3 py-1 rounded text-white font-semibold`}>
                                                                {orden.estado}
                                                            </p>
                                                        </td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            {orden.noCompra}
                                                        </td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            {orden.proveedor}
                                                        </td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            {orden.montoEstimado}
                                                        </td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            {orden.fechaOrden}
                                                        </td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5">
                                                            <PurchaseOptions id={orden.id} />
                                                        </td>
                                                    </tr>
                                                )
                                        }
                                    </tbody>
                                </table>
                            )
                    }
                </div>
            </div>
        </>
    );
};

export default PurchasesPage;