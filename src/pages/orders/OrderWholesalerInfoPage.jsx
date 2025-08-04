import BackButton from "../../components/BackButton";
import OrderWholeSalerService from "../../utils/service/OrderWholesalerService";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const OrderWholesalerInfoPage = () => {
    const location = useLocation();
    const { id } = location.state ?? false;

    if (!id) return <></>;

    const [data, setData] = useState(null);
    const [status, setStatus] = useState([]);

    useEffect(() => {
        OrderWholeSalerService.getById(id).then(response => {
            if (!response.hasError) {
                let { Client: _, ...order } = response.data.order;
                setData({
                    order: order,
                    client: { ...response.data.order.Client },
                    details: response.data.details
                });

                console.log({
                    order: order,
                    client: { ...response.data.order.Client },
                    details: response.data.details
                });
            }
        });
    }, []);

    return (
        <>
            <div style={{ height: "80vh", width: "75vw" }} className="flex flex-col pt-8">
                <BackButton />
                <div className="bg-orange-200 rounded overflow-y-auto p-4 border border-orange-700">
                    <div className="flex space-x-5 justify-between">
                        <div className="pl-4 text-orange-800 font-semibold bg-orange-100 flex flex-col flex-grow space-y-2 py-2 justify-center rounded-lg pl-2">
                            <p className="text-lg underline font-extrabold">Pedido No. {id}</p>
                            <div>
                                <p className="text-lg underline">Cliente</p>
                                <div className="flex flex-col px-3">
                                    <p>ID</p>
                                    <input disabled defaultValue={ data && data.client.idClient } className="mb-2 bg-orange-200 rounded-md px-3 py-2"/>
                                    <p>Numero de identidad</p>
                                    <input disabled defaultValue={ data && data.client.identification } className="mb-2 bg-orange-200 rounded-md px-3 py-2"/>
                                    <p>Nombre</p>
                                    <input disabled defaultValue={ data && data.client.fullName } className="bg-orange-200 rounded-md px-3 py-2"/>
                                    <p>Direccion</p>
                                    <input disabled defaultValue={ data && data.client.address } className="bg-orange-200 rounded-md px-3 py-2"/>
                                    <p>Contacto</p>
                                    <input disabled defaultValue={ data && data.client.contact } className="bg-orange-200 rounded-md px-3 py-2"/>
                                </div>
                            </div>
                        </div>
                        <div className="bg-orange-100 flex flex-col flex-grow space-y-4">
                            <div className="py-2 flex justify-between items-center text-md text-orange-800 font-bold px-4">
                                <p>Fecha de ingreso</p>
                                <input disabled className="bg-orange-200 rounded-md px-3 py-4" type="date" defaultValue={ data && data.order.generationDate.split("T")[0] } />
                            </div>         
                            <div className="bg-orange-100 py-2 flex justify-between items-center text-md text-orange-800 font-bold px-4">
                                <p>Fecha estimada de entrega</p>
                                <input disabled className="bg-orange-200 rounded-md px-3 py-4" type="date" defaultValue={ data && data.order.deliveryDate && data.order.deliveryDate.split("T")[0] } />
                            </div>                                             
                            <div className="pb-4 flex flex-col bg-orange-100 text-md text-orange-800 font-bold px-4 py-2 space-y-2 rounded-lg">
                                <p>Estado</p>
                                <input disabled className="bg-orange-200 rounded-md px-3 py-2" type="text" defaultValue={ data && data.order.Status.statusName } />
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
                                data
                                && data
                                    .details
                                    .map(detail =>
                                        <tr>
                                            <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{ detail.Product.productName }</td>
                                            <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">L. { ( detail.Product.price ).toLocaleString() }</td>
                                            <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{ detail.quantity }</td>
                                            <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">L. { (detail.Product.price * detail.quantity).toLocaleString() }</td>
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

export default OrderWholesalerInfoPage;