import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import BackButton from "../../components/BackButton";
import AdminService from "../../utils/service/AdminService";


const UsersRequestsTable = ({requests}) => {
    
    return (<>
                <table className="flex-grow table-auto justify-self-center">
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
                                .map((request, idx) =>
                                    <tr key={idx}>
                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                            {request.User.Person.fullName}
                                        </td>
                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{request.UserRole.roleName}</td>
                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5">
                                            <Link
                                                to="user_request"
                                                state={{
                                                    idUserRequest: request.idUserRequest
                                                }}
                                                className="text-white rounded bg-orange-800 px-3 py-1 text-md font-semibold hover:cursor-pointer"
                                            >
                                                Ver solicitud
                                            </Link>
                                        </td>
                                    </tr>
                                )
                        }
                    </tbody>
                </table>
                                </>);
}

const UsersRequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const [status, setStatus] = useState([]);
    const [statusSelected, setStatusSelected] = useState("");
    const [sort, setSort] = useState("0");
    const [page, setPage] = useState("1");
    const [size, setSize] = useState("15");

    useEffect(() => {
        AdminService.getStatus().then(response =>{
            console.log("response",response);
            if(!response.hasError){
                setStatus(response.data);
                setStatusSelected(response.data[0].idStatus);
            }
        });      

        AdminService.getUserRequestsByIdStatus(statusSelected,page,size,sort).then(response =>{
            if(!response.hasError){
                setRequests(response.data);
            }
            setLoading(false);
        });

        console.log("effect pordefecto");

    }, []);

    useEffect(() => {
        AdminService.getUserRequestsByIdStatus(statusSelected,page,size,sort).then(response =>{
            if(!response.hasError){
                setRequests(response.data);
            }
            else{
                setRequests([]);
            }
            setLoading(false);
        });
    }, [statusSelected,page,size,sort]);

    return (
        <>
            <div style={{ height: "80vh", width: "75vw" }} className="flex flex-col pt-8">
                <BackButton />
                <p className="mb-2 text-lg text-orange-800 font-semibold underline">Solicitudes pendientes</p>
                <select 
                    onChange={e=>{setStatusSelected(e.target.value)}} 
                    value={statusSelected}
                    className="inline"
                >
                    {status.map((s,idx)=>(
                        <option key={s.idStatus} value={s.idStatus}>{s.statusName}</option>
                    ))}
                </select>
                <div className={`rounded flex ${loading ? "" : "border border-solid border-orange-700"} overflow-y-scroll mb-6`}>
                    {
                        loading
                            ? <Spinner loading={loading} />
                            : (
                                <UsersRequestsTable requests={requests} />
                            )
                    }
                </div>
            </div>
        </>
    )
}

export default UsersRequestsPage;
