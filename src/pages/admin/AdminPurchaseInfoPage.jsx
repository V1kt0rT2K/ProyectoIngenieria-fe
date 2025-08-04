import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import BackButton from "../../components/BackButton";
import PurchaseService from "../../utils/service/PurchaseService";
import toast, { Toaster } from 'react-hot-toast';

const AdminPurchaseInfoPage = () => {
    const location = useLocation();
    const { id } = location.state ?? false;
    const isLoading = useRef(true);
    const navigate = useNavigate();

    const [purchase, setPurchase] = useState({});

    if (!id) return <></>;

    const handleRequest = (idStatus) => {

        isLoading.current = true;
        const payload = {
            idSupplyPurcharse : purchase.idSupplyPurcharse,
            idStatus : idStatus
        }

        PurchaseService.approveOrRejectSupplyPurcharse(payload).then(response => {
            if(!response.hasError){
                toast.success("Orden gestionada exitósamente.");
                purchase.idStatus = idStatus;
                navigate(-1);
            }else{
                toast.error(response.meta.message);
            }
            isLoading.current = false;
        });
        
    }

    useEffect(() => {        
        PurchaseService.getById(id).then(response => {
            if (!response.hasError) {
                setPurchase(response.data);
                console.log(response.data);
            }

            isLoading.current = false;
        });
    }, []);

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
                {
                    !isLoading.current && (
                        <div className="bg-orange-200 rounded overflow-y-auto p-4 border border-orange-700">
                            <div className="flex space-x-5 justify-between">
                                <div className="flex flex-col flex-grow space-y-4">
                                    <div className="flex flex-col bg-orange-100 text-md text-orange-800 px-4 py-2 space-y-2 rounded">
                                        <p>Proveedor</p>
                                        <input className="bg-orange-200 px-3 py-2 rounded font-bold" defaultValue={ purchase && purchase.Provider.providerName } disabled />
                                        <p>Estado de la compra:</p>
                                        <p className="bg-orange-200 px-3 py-2 rounded font-bold">{purchase && purchase.Status.statusName}</p> 
                                        {
                                            purchase &&
                                            purchase.idFormerSupplyPurcharse && (
                                                <>
                                                    <p>Numero de Compra Anterior</p>
                                                    <p className="bg-orange-200 px-3 py-2 rounded font-bold">{purchase && purchase.idFormerSupplyPurcharse}</p> 
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="bg-orange-100 flex flex-col flex-grow space-y-2 py-2 justify-center rounded pl-2">
                                    <p className="ml-4 mb-1 text-lg text-orange-800 font-semibold underline">Orden de compra No. {id}</p>
                                    <div className="flex justify-between items-center text-md text-orange-800 font-bold px-4">
                                        <p>Fecha de creacion</p>
                                        <input className="bg-orange-200 rounded px-3 py-4" type="date" defaultValue={ purchase && new Date(purchase.generationDate).toISOString().split('T')[0]}  disabled/>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-8 text-xl font-semibold text-orange-800 underline">Productos</p>
                            <table className="flex-grow w-full table-auto justify-self-center mt-4">
                                <thead>
                                    <tr>
                                        <th className="border border-orange-900 px-5 bg-orange-700 text-white">Producto</th>
                                        <th className="border border-orange-900 px-5 bg-orange-700 text-white">Costo unitario</th>
                                        <th className="border border-orange-900 px-5 bg-orange-700 text-white">Cantidad</th>
                                        <th className="border border-orange-900 px-5 bg-orange-700 text-white">Total estimado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        purchase
                                        && purchase
                                            .Supplies
                                            .map(supply =>
                                                <tr>
                                                    <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{ supply.nameSupply }</td>
                                                    <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">L. { (supply.price).toLocaleString() }</td>
                                                    <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{ supply.SupplyPurcharseDetail.quantity }</td>
                                                    <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">L. { (supply.price * supply.SupplyPurcharseDetail.quantity).toLocaleString() }</td>
                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            <div className="mt-4 font-semibold text-orange-800 inline-block flex flex-col space-y-3 bg-orange-300 p-6 rounded">
                                <p className="flex justify-between"><span>Subtotal</span><span className="font-extrabold">L. {purchase && purchase.subTotal}</span></p>
                                <p className="flex justify-between"><span>ISV</span><span className="font-extrabold">L. {purchase && (purchase.ISV).toFixed(2)}</span></p>
                                <hr />
                                <p className="flex justify-between"><span>Total</span><span className="font-extrabold">L. {purchase && (purchase.subTotal * 1.15).toFixed(2)}</span></p>
                            </div>
                            <div className="flex justify-center space-x-2 mt-3 mb-1" >
                                {
                                    purchase.idStatus == 2 ?
                                    (
                                        <>
                                            <button onClick={() => handleRequest(1)} className="hover:cursor-pointer rounded text-md text-white font-semibold px-3 py-1 bg-green-700">Aceptar</button>
                                            <button onClick={() => handleRequest(3)} className="hover:cursor-pointer rounded text-md text-white font-semibold px-3 py-1 bg-red-700">Rechazar</button>
                                        </>
                                    ) : ("")
                                }
                            </div>
                        </div>
                    )
                    
                }
            </div>
        </>
    );
};

export default AdminPurchaseInfoPage;