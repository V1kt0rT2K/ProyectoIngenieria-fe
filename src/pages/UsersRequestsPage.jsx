import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import Configuration from "../Configuration";

const UsersRequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getRequests = async () => {
            try {
                const res = await fetch(`${Configuration.API_BASE_URL}/requests/get/all`);
                const data = await res.json();
                setRequests(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        getRequests();
    }, [])

    return (
        <>
            <div style={{ height: "80vh", width: "75vw" }} className="flex flex-col pt-8">
                <BackButton />
                <p className="mb-2 text-lg text-orange-800 font-semibold underline">Solicitudes de crear usuarios</p>
                <div className={`rounded flex ${loading ? "" : "border border-solid border-orange-700" } overflow-y-scroll mb-6`}>
                    {
                        loading
                            ? <Spinner loading={ loading } />
                            : (
                                <>
                                    <table className="flex-grow table-fixed justify-self-center">
                                        <thead>
                                            <tr>
                                                <th className="w-96 py-2 px-5 border border-orange-900 bg-orange-700 text-white text-md">Nombre completo</th>
                                                <th className="w-80 px-5 border border-orange-900 bg-orange-700 text-white text-md">Rol</th>
                                                <th className="w-44 px-5 border border-orange-900 bg-orange-700 text-white"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                requests
                                                .map((user, idx) =>
                                                    <tr key={ idx }>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{ user.fullName }</td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{ user.role }</td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5">
                                                            <Link
                                                                to="user_request"
                                                                state={{
                                                                    id: user.id,
                                                                    fullName: user.fullName,
                                                                    idNumber: user.idNumber,
                                                                    role: user.role,
                                                                    date: user.date,
                                                                    email: user.email
                                                                }}
                                                                className="text-white rounded-md bg-orange-800 px-3 py-1 text-md font-semibold hover:cursor-pointer"
                                                            >
                                                                Ver solicitud
                                                            </Link>
                                                        </td>
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