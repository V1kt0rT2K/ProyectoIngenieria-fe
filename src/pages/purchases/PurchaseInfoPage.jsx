import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import PurchaseService from "../../utils/service/PurchaseService";

const PurchaseInfoPage = () => {
    const location = useLocation();
    const { id } = location.state ?? false;

    const [purchase, setPurchase] = useState(null);

    if (!id) return <></>;

    useEffect(() => {        
        PurchaseService.getById(id).then(response => {
            if (!response.hasError) {
                setPurchase(response.data);
                console.log(response.data);
            }
        });
    }, []);

    return (
        <>
            <div style={{ height: "80vh", width: "75vw" }} className="flex flex-col pt-8">
                <BackButton />
                <div className="bg-orange-200 rounded overflow-y-auto p-4 border border-orange-700">
                    <div className="flex space-x-5 justify-between">
                        <div className="flex flex-col flex-grow space-y-4">
                            <div className="flex flex-col bg-orange-100 text-md text-orange-800 px-4 py-2 space-y-2 rounded">
                                <p>Proveedor</p>
                                <input className="bg-orange-200 px-3 py-2 rounded font-bold" defaultValue={ purchase && purchase.Provider.providerName } disabled />
                                <p>Estado de la compra:</p>
                                <p className="bg-orange-200 px-3 py-2 rounded font-bold">{purchase && purchase.Status.statusName}</p> 
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
                </div>
            </div>
        </>
    );
};

export default PurchaseInfoPage;