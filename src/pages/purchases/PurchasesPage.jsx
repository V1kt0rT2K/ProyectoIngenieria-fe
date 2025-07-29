import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import PurchaseOptions from "../../components/PurchaseOptions";
import PurchaseService from "../../utils/service/PurchaseService";

const State = {
    PAID: "Pagado",
    PENDING: "Pendiente",
    CANCELED: "Cancelado",
};

const filters = Object.values(State);

const PurchasesPage = () => {
    const [loading, setLoading] = useState(false);
    const [purchaseOrders, setPurchaseOrders] = useState([]);

    const [filterBy, setFilterBy] = useState(null);

    const [sort, setSort] = useState("0");
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(15);

    useEffect(() => {
        setLoading(true);
        PurchaseService.getAll(page, size, sort).then(response => {
            if (!response.hasError) {
                setPurchaseOrders(response.data.data);
                console.log(purchaseOrders);
            }

            setLoading(false);
        });
    }, [page, size, sort]);

    return (
        <>
            <div style={{ height: "80vh" }} className="flex flex-col pt-8">
                <div className="flex flex-col items-start">
                    <div className="flex w-full space-x-24">
                        <select onChange={(e) => setFilterBy(e.target.value)} className="focus:outline-none flex-grow bg-orange-200 border border-orange-700 rounded py-1 px-3 text-md">
                            <option>
                                {filterBy ? "Mostrar todas" : "Filtrar compras"}
                            </option>
                            {
                                filters.map((filter, idx) =>
                                    <option
                                        key={idx}
                                    >
                                        {filter}
                                    </option>
                                )
                            }
                        </select>
                        <Link to="new_purchase_order" className="bg-orange-800 mx-2 px-4 py-1 flex items-center justify-center text-lg text-white font-semibold rounded hover:cursor-pointer">+ Agregar</Link>
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
                                            <th className="border border-orange-900 px-5 bg-orange-700 text-white text-md">F. de order</th>
                                            <th className="border border-orange-900 px-5 bg-orange-700 text-white"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            purchaseOrders
                                                .map((order, idx) =>
                                                    <tr key={idx}>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            <p className="">
                                                                {order.Status.statusName}
                                                            </p>
                                                        </td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            {order.idSupplyPurcharse}
                                                        </td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            {order.Provider.providerName}
                                                        </td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            L. {(order.subTotal * order.ISV).toLocaleString()}
                                                        </td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            {new Date(order.generationDate).toLocaleDateString()}
                                                        </td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5">
                                                            <PurchaseOptions id={order.idSupplyPurcharse} />
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