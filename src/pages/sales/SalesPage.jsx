import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import SaleOptions from "../../components/SaleOptions";
import SellerService from "../../utils/service/SellerService";
import toast, { Toaster } from 'react-hot-toast';

const SalesPage = () => {
    const [loading, setLoading] = useState(true);

    const [clientTypes, setClientTypes] = useState([]);
    const [typeSelected, setTypeSelected] = useState("");
    const [size, setSize] = useState("5");
    const [page, setPage] = useState("1");
    const [sort, setSort] = useState("0");
    const [totalRows, setTotalRows] = useState(0);

    const [sales, setSales] = useState([]);

    useEffect(() => {

        SellerService.getClientTypes().then( response => {
            console.log("response ", response);
            if(!response.hasError){
                setClientTypes(response.data);
                setTypeSelected(response.data[0].idClientType);
            }
        });

        console.log("FDSAJÑFASDJKL");

        SellerService.getAllSalesChecksForUserByClientType(typeSelected,page,size,sort).then(response => {
            console.log("response  clientType", response);
            if(!response.hasError){
                setSales(response.data.data);
                setTotalRows(response.data.totalItems);
            }else{
                toast.error(response.meta.message);
            }
        });

        setLoading(false);
        
    },[]);

    useEffect(() => {
        if(!typeSelected) return;

        setLoading(true);
        SellerService.getAllSalesChecksForUserByClientType(typeSelected,page,size,sort).then( response => {
            console.log(response);
            if(!response.hasError){
                setSales(response.data.data);
                setTotalRows(response.data.totalItems);
            }else{
                toast.error(response.meta.message);
                //setSales([]);
            }
        });

        setLoading(false);
    }, [typeSelected,page,size,sort]);

    // useEffect(() => {
    //     setLoading(true);

    //     setSales(ventas.slice(size * (page - 1), page * size));
    //     setTimeout(() => setLoading(false), 1000);
    // }, [page, size, sort]);

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
                        onChange={e=>{setTypeSelected(e.target.value)}} 
                        >
                            <option key="0" value="0">
                                Mostrar todas
                            </option>
                            {
                                clientTypes.map((type, idx) =>
                                    <option
                                        key={idx}
                                        value={type.idClientType}
                                    >
                                        {type.clientTypeName}
                                    </option>
                                )
                            }
                        </select>
                        <Link to="new_sale" className="bg-orange-800 mx-2 px-4 py-1 flex items-center justify-center text-lg text-white font-semibold rounded hover:cursor-pointer">+ Nueva venta</Link>
                    </div>
                </div>
                <p className="mt-6 text-lg text-orange-800 font-semibold underline">Historial de ventas</p>
                <div style={{ width: "75vw" }} className={`rounded mt-2 mb-6 flex overflow-y-scroll ${loading ? "" : "border border-orange-700 bg-orange-200"}`}>
                    {
                        loading
                            ? <Spinner loading={loading} />
                            : (
                                <table className="flex-grow w-full table-auto justify-self-center">
                                    <thead>
                                        <tr>
                                            <th className="border border-orange-900 py-2 px-5 bg-orange-700 text-white text-md">No. de factura</th>
                                            <th className="border border-orange-900 px-5 bg-orange-700 text-white text-md">Id. Cliente</th>
                                            <th className="border border-orange-900 px-5 bg-orange-700 text-white text-md">Monto</th>
                                            <th className="border border-orange-900 px-5 bg-orange-700 text-white text-md">Fecha</th>
                                            {/* <th className="border border-orange-900 px-5 bg-orange-700 text-white text-md">Estado</th> */}
                                            <th className="border border-orange-900 px-5 bg-orange-700 text-white"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            sales
                                                .map((sale, idx) =>
                                                    <tr key={idx}>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            {sale.idSalesCheck}
                                                        </td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            {sale.Client?.identification}
                                                        </td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            {(sale.subTotal + sale.ISV).toLocaleString('en-US', {
                                                            style: 'currency',
                                                            currency: 'USD'
                                                        })}
                                                        </td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            {new Date(sale.generationDate).toLocaleDateString()}
                                                        </td>
                                                        {/* <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            {sale.Status?.statusName}
                                                        </td> */}
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5">
                                                            <SaleOptions idSale={sale.idSalesCheck} />
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
                            {
                                [...Array(Math.floor(totalRows / size)).keys()].map(n =>
                                    <button
                                        className={`text-orange-800 ${page == n + 1 ? "font-extrabold bg-orange-400 rounded px-1" : ""}`}
                                        onClick={() => { setPage(n + 1); }}
                                    >
                                        {n + 1}
                                    </button>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default SalesPage;