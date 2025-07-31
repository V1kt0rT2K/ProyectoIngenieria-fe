import { useState, useRef, useEffect } from "react";
import Spinner from "./Spinner";
import NotificationService from "../utils/service/NotificationService";

const NotificationsButton = () => {
    const [expand, setExpand] = useState(false);
    const menuRef = useRef(null);
    const [loading, setLoading] = useState(true);

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        NotificationService.getNotificationsForUser().then(response => {
            if(!response.hasError){
                setNotifications(response.data);
            }
        });
        setLoading(false);
    }, [expand]);

    const checkNotification = (idNotification,idx) =>{
        NotificationService.checkNotification({idNotification:idNotification}).then(response =>{
            if(!response.hasError){
                const currentNotifications = [...notifications];

                currentNotifications.splice(idx,1);

                setNotifications(currentNotifications);
            }
        });
    };

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
                                                        notifications.map((item,idx) =>
                                                            <>
                                                                <hr className="mr-4" />
                                                                <div className="flex justify-between items-center">
                                                                    <p className="text-sm">{item.message}</p>
                                                                    <p onClick={()=>{checkNotification(item.idNotification,idx)}} className="mx-4 font-extrabold hover:cursor-pointer">x</p>
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