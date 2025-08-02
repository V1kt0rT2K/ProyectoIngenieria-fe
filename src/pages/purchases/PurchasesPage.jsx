import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import PurchaseOptions from "../../components/PurchaseOptions";
import PurchaseService from "../../utils/service/PurchaseService";
import toast, { Toaster } from 'react-hot-toast';
import dayjs from "dayjs";
import Pagination from "react-js-pagination";

const PurchasesPage = () => {
    const [loading, setLoading] = useState(true);
    const [purchaseOrders, setPurchaseOrders] = useState([]);

    const [status, setStatus] = useState("0");
    const[statusList, setStatusList] = useState([]);

    const [totalItems, setTotalItems] = useState(0);
    const [sort, setSort] = useState("0");
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(15);


    useEffect(() => {
        PurchaseService.getStatusForPurcharses().then(response => {
            if (!response.hasError) {
                setStatusList(response.data);
            }
        });

        PurchaseService.getPurcharsesByStatus(status,page,size,sort).then(response =>{
            if(!response.hasError){
                setPurchaseOrders(response.data.data);
                setTotalItems(response.data.totalItems);
            }
        }).finally(() =>{
            setLoading(false);
        });

        
    }, []);

    useEffect(() => {
        setLoading(true);
        PurchaseService.getPurcharsesByStatus(status,page, size, sort).then(response => {
            if (!response.hasError) {
                setPurchaseOrders(response.data.data);
                setTotalItems(response.data.totalItems);

            }else{
                toast.error(response.meta.message);
                setPurchaseOrders([]);
            }
            setLoading(false);
        });
    }, [status,page, size, sort]);

    return (
        <>
            <div><Toaster 
              toastOptions={{
                className: '',
                duration: 1500,
                removeDelay: 1000
                }}/>
            </div>
            <div style={{ height: "80vh" }} className="flex flex-col pt-8">
                <div className="flex flex-col items-start">
                    <div className="flex w-full space-x-24">
                        <select 
                        className="focus:outline-none flex-grow bg-orange-200 border border-orange-700 rounded py-1 px-3 text-md"
                        onChange={e=>{setStatus(e.target.value)}} 
                        >
                            <option key="0" value="0">
                                Mostrar todas
                            </option>
                            {
                                statusList.map((s, idx) =>
                                    <option
                                        key={s.idStatus}
                                        value={s.idStatus}
                                    >
                                        {s.statusName}
                                    </option>
                                )
                            }
                        </select>
                        <Link to="new_purchase_order" className="bg-orange-800 mx-2 px-4 py-1 flex items-center justify-center text-lg text-white font-semibold rounded hover:cursor-pointer">+ Agregar</Link>
                    </div>
                <div className="flex flex-row gap-3">
                    <select className="bg-orange-700 mt-3 rounded px-2 py-1 text-white font-semibold" onChange={e => { setSort(e.target.value) }} value={sort}>
                        <option value="0">Descendente</option>
                        <option value="1">Ascendente</option>
                    </select>
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
                                                            <PurchaseOptions idSupplyPurcharse={order.idSupplyPurcharse} idStatus={order.idStatus} />
                                                        </td>
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
                    )
                }
            </div>
        </>
    );
};

export default PurchasesPage;