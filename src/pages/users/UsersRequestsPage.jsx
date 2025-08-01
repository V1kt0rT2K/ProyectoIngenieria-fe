import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import BackButton from "../../components/BackButton";
import AdminService from "../../utils/service/AdminService";
import toast, { Toaster } from 'react-hot-toast';
import Pagination from "react-js-pagination";

const UsersRequestsTable = ({requests}) => {
    
    return (<>
                <table className="flex-grow table-auto justify-self-center">
                    <thead>
                        <tr>
                            <th className="w-96 py-2 px-5 border border-orange-900 bg-orange-700 text-white text-md">Nombre completo</th>
                            <th className="w-70 px-5 border border-orange-900 bg-orange-700 text-white text-md">Rol</th>
                            <th className="w-70 px-5 border border-orange-900 bg-orange-700 text-white text-md">Fecha de Solicitud</th>
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
                                        <td className="border border-orange-900 bg-orange-200 py-4 px-3 text-md">{request.UserRole.roleName}</td>
                                        <td className="border border-orange-900 bg-orange-200 py-4 px-3 text-md">{new Date(request.generationDate).toLocaleDateString()}</td>
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

    
    const [totalRows, setTotalRows] = useState(0);
    const [status, setStatus] = useState([]);
    const [statusSelected, setStatusSelected] = useState("");
    const [sort, setSort] = useState("0");
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(4);

    useEffect(() => {
        AdminService.getStatusByIdType(1).then(response =>{
            console.log("response",response);
            if(!response.hasError){
                setStatus(response.data);
                setStatusSelected(response.data[0].idStatus);
            }
        });      

        AdminService.getUserRequestsByIdStatus(statusSelected,page,size,sort).then(response =>{
            if(!response.hasError){
                setRequests(response.data);
                setTotalRows(response.data.totalItems);
            }
            setLoading(false);
        });

        console.log("effect pordefecto");

    }, []);

    useEffect(() => {
        AdminService.getUserRequestsByIdStatus(statusSelected,page,size,sort).then(response =>{
            if(!response.hasError){
                setRequests(response.data.data);
                setTotalRows(response.data.totalItems);
            }
            else{
                toast.error(response.meta.message);
                setRequests([]);
            }
            setLoading(false);
        });
    }, [statusSelected,page,size,sort]);

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
                <p className="mb-2 text-lg text-orange-800 font-semibold underline">Solicitudes pendientes</p>
                <div className="flex flex-row gap-3">
                    <select 
                        onChange={e=>{setStatusSelected(e.target.value)}} 
                        value={statusSelected}
                        className="bg-orange-700 mt-3 rounded px-2 py-1 text-white font-semibold"
                    >
                        <option value="0"> Todos</option>
                        {status.map((s,idx)=>(
                            <option key={s.idStatus} value={s.idStatus}>{s.statusName}</option>
                        ))}
                    </select>
                    <select className="bg-orange-700 mt-3 rounded px-2 py-1 text-white font-semibold" onChange={e => { setSort(e.target.value) }} value={sort}>
                        <option value="0">Descendente</option>
                        <option value="1">Ascendente</option>
                    </select>
                </div>
                <div className={`rounded flex ${loading ? "" : "border border-solid border-orange-700"} overflow-y-scroll mb-6 my-3`}>
                    {
                        loading
                            ? <Spinner loading={loading} />
                            : (
                                <UsersRequestsTable requests={requests} />
                            )
                    }
                </div>
                {
                    !loading
                    && (
                        <div className="flex justify-center space-x-4">
                            <Pagination
                            activePage={page}
                            itemsCountPerPage={size}
                            totalItemsCount={totalRows}
                            pageRangeDisplayed={5}
                            onChange={(pageNumber)=>{setPage(pageNumber)}}
                            innerClass="flex list-none rounded-md overflow-hidden shadow-sm"
                            itemClass="flex items-center justify-center"
                            linkClass="px-3 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                            activeLinkClass="px-3 py-2 border border-blue-500 bg-blue-500 text-white hover:bg-blue-600"
                            disabledClass="opacity-50 cursor-not-allowed"
                            prevPageText="<<"
                            nextPageText=">>"
                            firstPageText="Primera"
                            lastPageText="Última"
                            />
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default UsersRequestsPage;
