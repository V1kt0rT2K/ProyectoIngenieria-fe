import { useState, useRef, useEffect } from "react";
import Spinner from "./Spinner";

const notificaciones = [
    { msg: "Orden OC-001 ha sido completada." },
    { msg: "Nuevo proveedor agregado: Proveedor G." },
    { msg: "Error al procesar el lote 102." },
    { msg: "Stock de carne tipo 'R' está por debajo del mínimo." },
    { msg: "Compra OC-015 ha sido cancelada." },
    { msg: "Se ha recibido un nuevo pedido de carne tipo 'P'." },
    { msg: "Proveedor B ha actualizado sus precios." },
    { msg: "Inventario actualizado correctamente." },
    { msg: "Lote 103 fue marcado como listo para salida." },
    { msg: "Se ha programado una inspección para el lote 112." },
    { msg: "OC-008 fue aprobada por el supervisor." },
    { msg: "El cerdo número 2 del lote 121 ha sido dado de baja." },
    { msg: "Nuevo ingreso de carne registrado." },
    { msg: "Notificación de mantenimiento pendiente para sistema." },
    { msg: "Actualización disponible para el módulo de compras." },
    { msg: "Se detectó una posible duplicación de lote." },
    { msg: "Proveedor D ha sido desactivado temporalmente." },
    { msg: "El sistema se reiniciará a las 2:00 AM." },
    { msg: "Orden OC-020 pendiente de aprobación." },
    { msg: "Se ha generado el reporte mensual de compras." }
];


const NotificationsButton = () => {
    const [expand, setExpand] = useState(false);
    const menuRef = useRef(null);
    const [loading, setLoading] = useState(true);

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const menu = menuRef.current;
        menu && menu.addEventListener("mouseleave", () => setExpand(false));

        setNotifications(notificaciones);

        setTimeout(() => setLoading(false), 2000);
    }, [expand]);

    return (
        <>
            <div className="relative inline-block text-left">
                <div className="hover:cursor-pointer" onClick={() => setExpand(expand => !expand)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                    </svg>
                </div>
                {
                    expand
                    && (
                        <>
                            <div ref={menuRef} className="border-1 border-solid border-orange-700 absolute right-0 z-10 mt-2 w-64 origin-top-right rounded bg-orange-800 shadow-lg ring-1 ring-black/5 focus:outline-hidden" aria-orientation="vertical" aria-labelledby="menu-button">
                                <div className="px-4 py-2 text-white" role="none">
                                    <p className="font-semibold">Notificaciones</p>
                                    {
                                        loading
                                            ? <Spinner loading={loading} size={50} />
                                            : (
                                                <div style={{ maxHeight: "35vh" }} className="space-y-2 overflow-y-scroll text-orange-100">
                                                    {
                                                        notifications.map(item =>
                                                            <>
                                                                <hr className="mr-4" />
                                                                <div className="flex justify-between items-center">
                                                                    <p className="text-sm">{item.msg}</p>
                                                                    <p className="mx-4 font-extrabold hover:cursor-pointer">x</p>
                                                                </div>
                                                            </>
                                                        )
                                                    }
                                                </div>
                                            )
                                    }
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    );
};

export default NotificationsButton;