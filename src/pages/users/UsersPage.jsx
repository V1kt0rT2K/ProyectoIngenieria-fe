import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import Spinner from "../../components/Spinner";
import UserOptions from "../../components/UserOptions";
import AdminService from "../../utils/service/AdminService";
import toast, { Toaster } from 'react-hot-toast';
import Pagination from "react-js-pagination";

const UsersTable = ({ users }) => {

    return (
        <>
            <table className="flex-grow w-full table-fixed justify-self-center">
                <thead>
                    <tr>
                        <th className="border border-orange-900 w-65 py-2 px-5 bg-orange-700 text-white text-md">Nombre completo</th>
                        <th className="border border-orange-900 w-40 px-5 bg-orange-700 text-white text-md">Rol asignado</th>
                        <th className="border border-orange-900 w-45 px-5 bg-orange-700 text-white text-md">Correo</th> 
                        <th className="border border-orange-900 w-40 px-5 bg-orange-700 text-white"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, idx) =>
                            <tr key={idx}>
                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                    {user.Person.fullName}
                                </td>
                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                    {user.UserRole.roleName}
                                </td>
                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                    {user.email}
                                </td>

                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 ">
                                    <UserOptions user={user} />
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>

    );
}

const UsersPage = () => {
    const [searchBox, setSearchBox] = useState("");
    const [sort, setSort] = useState("0");
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(4);

    const [totalRows, setTotalRows] = useState(0);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    //const [currentData, setCurrentData] = useState([]);
    const currentData = useRef([]); 


    const clearInput = () => {
        setInput("");
        inputRef.current.value = "";
    }


    useEffect(() => {
        const timeOut = setTimeout(() => {
            if (searchBox === "") {
                setUsers(currentData.current);
            } else {
                AdminService.searchUsers(searchBox).then(response => {
                    if (!response.hasError) {
                        setUsers(response.data);
                    } else {
                        setUsers([]);
                    }
                });
            }
        }, 500);

        return () => clearTimeout(timeOut);
    }, [searchBox]);

    useEffect(() => {
        setLoading(true);
        AdminService.getAllUsers(page, size, sort).then(response => {
            setUsers([]);
            if (!response.hasError) {
                setUsers(response.data.data);
                setTotalRows(response.data.totalItems);
                //setCurrentData(response.data.data);
                currentData.current = response.data.data;
            }else{
                toast(response.meta.message);
            }
            setLoading(false);
        });

    }, [page, size, sort]);

    return (
        <>
            <div><Toaster/></div>
            <div style={{ height: "80vh" }} className="flex flex-col pt-8">
                <div className="flex flex-col items-start">
                    <Link to="requests" className="text-white rounded bg-orange-700 px-3 py-1 text-md font-semibold mb-4 hover:cursor-pointer">Solicitudes de Creación de Usuario</Link>
                    <div className="flex w-full">
                        <input value={searchBox} onInput={(e) => setSearchBox(e.target.value)} className="focus:outline-none flex-grow border border-orange-700 rounded py-1 px-3 text-md" type="text" placeholder="Filtrar usuarios" />
                        <button onClick={clearInput} className="bg-red-600 mx-2 px-3 py-1 flex items-center justify-center text-xl text-white font-extrabold rounded hover:cursor-pointer">X</button>
                    </div>
                    <div>
                        <select className="bg-orange-700 mt-3 rounded px-2 py-1 text-white font-semibold" onChange={e => { setSort(e.target.value) }} value={sort}>
                            <option value="0">Descendente</option>
                            <option value="1">Ascendente</option>
                        </select>
                    </div>
                </div>
                <p className="mt-6 text-lg text-orange-800 font-semibold underline">Usuarios Registrados</p>
                <div style={{ width: "75vw" }} className={`rounded mt-2 mb-6 flex overflow-y-scroll ${loading ? "" : "border border-orange-700 bg-orange-200"}`}>
                    {
                        loading
                            ? <Spinner loading={loading} />
                            : (
                                <UsersTable users={users} />
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
    );
}



export default UsersPage;
