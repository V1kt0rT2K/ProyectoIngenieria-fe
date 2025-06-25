import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

const requestsList = [
    {
        name:"a",
        role: "e"
    },
    {
        name:"o",
        role:"i"
    }
];

const UsersRequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setRequests(requestsList);
            setLoading(false);
        }, 100);
    }, [])

    return (
        <>
            <div style={{ height: "80vh", width: "75vw" }} className="flex flex-col pt-8">
                <Link to="../" className="flex justify-center items-center mb-6 bg-orange-700 w-max px-3 py-1 rounded text-md text-white font-semibold">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                    </svg>
                    <span className="ml-2">Atras</span>
                </Link>
                <p className="text-lg text-orange-800 font-semibold underline">Solicitudes de crear usuarios</p>
                <div className="ml-6 overflow-y-scroll mt-2">
                    {
                        loading
                            ? <Spinner loading={ loading } />
                            : (
                                <>
                                    <table className="border-1 border-solid border-orange-700 table-fixed justify-self-center">
                                        <thead>
                                            <tr>
                                                <th className="w-180 py-2 px-5 border-solid border-1 border-orange-900 bg-orange-700 text-white text-md">Nombre completo</th>
                                                <th className="w-100 px-5 border-solid border-1 border-orange-900 bg-orange-700 text-white text-md">Rol</th>
                                                <th className="w-50 px-5 border-solid border-1 border-orange-900 bg-orange-700 text-white"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                requests
                                                .map(user =>
                                                    <tr>
                                                        <td className="border-solid border-1 border-orange-900 bg-orange-200 py-4 px-5 text-md font-semibold">{ user.name.length > 20 ? user.name.substring(0, 20) + "..." : user.name }</td>
                                                        <td className="border-solid border-1 border-orange-900 bg-orange-200 py-4 px-5 text-md font-semibold">{ user.role }</td>
                                                        <td className="border-solid border-1 border-orange-900 bg-orange-200 py-4 px-5 justify-center"><button className="text-white rounded-md bg-orange-800 px-3 py-1 text-md font-semibold hover:cursor-pointer">Ver solicitud</button></td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </>
                            )
                    }
                </div>
            </div>
        </>
    )
}

export default UsersRequestsPage;