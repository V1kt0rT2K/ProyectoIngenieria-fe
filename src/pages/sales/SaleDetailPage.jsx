import { useEffect, useRef, useState } from "react";
import BackButton from "../../components/BackButton";
import {useLocation, useNavigate} from 'react-router-dom';
import SellerService from "../../utils/service/SellerService";
import { generateInvoicePdf } from "../../utils/generateCheckUtils";
import toast, { Toaster } from 'react-hot-toast';

const SaleDetailPage = () => {
    const [checkProducts, setCheckProducts] = useState([]);
    const [saleData, setSaleData] = useState({});
    const location = useLocation()


    useEffect(() => {
        console.log(location.state.idSalesCheck);
        SellerService.getSalesCheckById(location.state.idSalesCheck).then(response => {
            if (!response.hasError) {
                setCheckProducts(response.data.Products);
                setSaleData(response.data);
            }

        });

    }, []);

    const generateSalesCheck = () =>{
        generateInvoicePdf(saleData);
    };

    return (
        <>
            <div><Toaster 
              toastOptions={{
                className: '',
                duration: 1500,
                removeDelay: 1000
                }}/>
            </div>
            <div style={{ height: "80vh", width: "75vw" }} className="flex flex-col pt-8">
                <BackButton />
                <p className="mb-2 text-lg text-orange-800 font-semibold underline">Crear factura</p>
                <div className="rounded overflow-y-auto p-0">
                    <div className="bg-orange-200 border border-orange-300 px-4 py-6 flex space-x-5 justify-between">
                        <div className="flex flex-col flex-grow space-y-4">
                            {/* <p className="text-orange-700 underline font-semibold">RTN: {Configuration.RTN_NUMBER}</p> */}
                            <div className="flex flex-col bg-orange-100 text-md text-orange-800 px-4 py-2 space-y-2 rounded">
                                <p>Numero de identidad del cliente</p>
                                <input value={saleData.Client?.identification} disabled name="identification"  className="bg-orange-200 px-3 py-1 rounded font-bold focus:outline-none" />
                            </div>
                        </div>
                        <div className="flex-grow space-y-4 justify-center rounded pl-2">
                            {/* <p className="text-orange-700 underline font-semibold">CAI: {666}</p> */}
                            <div className="bg-orange-100 py-2 flex flex-col ">
                                <div className="flex justify-between items-center text-md text-orange-800 font-bold px-4">
                                    <p>Fecha de creación</p>
                                    {saleData && saleData.generationDate && (
                                        <input 
                                            disabled 
                                            className="bg-orange-200 rounded px-3 py-2" 
                                            type="text" 
                                            value={new Date(saleData.generationDate).toLocaleDateString()} 
                                        />
                                    )}
                                </div>
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
                                    {/* <th className="border border-orange-900 bg-orange-700 text-white w-32 px-2">Total</th>
                                    <th className="border border-orange-900 bg-orange-700 text-white w-32 px-2">Acción</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    checkProducts
                                        .map((product, idx) =>
                                            <tr key={product.idProduct}>
                                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                    
                                                    {product.productName}
                                                </td>
                                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{product.idProduct ? product.productDescription : ""}</td>
                                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{product.idProduct ? product.price : ""}</td>
                                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                    {
                                                        product.idProduct ? product.SalesChecksDetail.quantity : ""
                                                    }
                                                </td>
                                            </tr>
                                        )
                                }
                            </tbody>
                        </table>
                        {saleData.subTotal && (
                            <div className="mt-4 font-semibold text-orange-800 inline-block flex flex-col space-y-3 bg-orange-300 p-6 rounded">
                                <p className="flex justify-between"><span>Subtotal</span><span className="font-extrabold">L. {saleData.subTotal}</span></p>
                                <p className="flex justify-between"><span>ISV</span><span className="font-extrabold">L. {(saleData.ISV).toFixed(2)}</span></p>
                                <hr />
                                <p className="flex justify-between"><span>Total</span><span className="font-extrabold">L. {(saleData.subTotal + saleData.ISV).toFixed(2)}</span></p>
                            </div>
                        )}
                        <div className="mt-2 flex justify-center">
                            <button 
                                className="bg-green-600 rounded px-3 py-1 font-semibold text-white mt-2"
                                onClick={()=>{generateSalesCheck()}}
                            >
                                    Generar Factura
                            </button>
                        </div>
                    </div>


                </div>
            </div>
        </>
    );
};

export default SaleDetailPage;