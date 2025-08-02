import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import Pagination from "react-js-pagination";
import OrderWholesalerService from "../../utils/service/OrderWholesalerService";
import dayjs from "dayjs";
import OrderOptions from "../../components/OrderOptions";

const OrdersWholesalerPage = () => {
    const [loading, setLoading] = useState(true);

    const [orders, setOrders] = useState([]);
    const [totalRows, setTotalRows] = useState(0);

    const [sort, setSort] = useState("0");
    const [size, setSize] = useState(4);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setLoading(true);

        OrderWholesalerService.getAllOrders(page, size, sort).then(response => {
            if (!response.hasError) {
                setOrders(response.data.data);
                setTotalRows(response.data.totalItems)
            }
        });

        setLoading(false);
    }, [sort, size, page]);

    return (
        <>
            <div style={{ height: "80vh" }} className="flex flex-col pt-8">
                <div className="flex flex-col items-start">
                    <div>
                        <select className="bg-orange-700 mt-3 rounded px-2 py-1 text-white font-semibold" onChange={e => { setSort(e.target.value) }} value={sort}>
                            <option value="0">Descendente</option>
                            <option value="1">Ascendente</option>
                        </select>
                    </div>
                </div>
                <p className="mt-6 text-lg text-orange-800 font-semibold underline">Pedidos</p>
                <div style={{ width: "75vw" }} className={`rounded mt-2 mb-6 flex overflow-y-scroll ${loading ? "" : "border border-orange-700 bg-orange-200"}`}>
                    {
                        loading
                            ? <Spinner loading={loading} />
                            : (
                                <table className="flex-grow w-full table-auto justify-self-center">
                                    <thead>
                                        <tr>
                                            <th className="border border-orange-900 bg-orange-700 text-white w-48 px-2">No. de pedido</th>
                                            <th className="border border-orange-900 bg-orange-700 text-white w-48 px-2">Cliente</th>
                                            <th className="border border-orange-900 bg-orange-700 text-white w-48 px-2">Estado</th>
                                            <th className="border border-orange-900 bg-orange-700 text-white w-32 px-2">Monto</th>
                                            <th className="border border-orange-900 bg-orange-700 text-white w-32 px-2">Fecha de creacion</th>
                                            <th className="border border-orange-900 bg-orange-700 text-white w-32 px-2">Fecha de entrega</th>
                                            <th className="border border-orange-900 bg-orange-700 text-white w-32 px-2"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orders
                                                .map((order, idx) =>
                                                    <tr key={idx}>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{order.idOrderWholesaler}</td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{order.idClient}</td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{order.Status.statusName}</td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{(order.subTotal + order.ISV).toLocaleString()}</td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{dayjs(order.generationDate).format('YYYY-MM-DD HH:mm:ss')}</td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{dayjs(order.deliveryDate).format('YYYY-MM-DD')}</td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md"><OrderOptions id={order.idOrderWholesaler} /></td>
                                                    </tr>
                                                )
                                        }
                                    </tbody>
                                </table>
                            )
                    }
                </div>
                {
                    !loading
                    && (
                        <div className="flex justify-center space-x-4">
                            <Pagination
                                activePage={page}
                                itemsCountPerPage={size}
                                totalItemsCount={totalRows}
                                pageRangeDisplayed={5}
                                onChange={(pageNumber)=>{setPage(pageNumber)}}
                                innerClass="flex list-none rounded-md overflow-hidden shadow-sm"
                                itemClass="flex items-center justify-center"
                                linkClass="px-3 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                                activeLinkClass="px-3 py-2 border border-blue-500 bg-blue-500 text-white hover:bg-blue-600"
                                disabledClass="opacity-50 cursor-not-allowed"
                                prevPageText="<<"
                                nextPageText=">>"
                                firstPageText="Primera"
                                lastPageText="Última"
                            />
                        </div>
                    )
                }
            </div>        
        </>
    );
};

export default OrdersWholesalerPage;