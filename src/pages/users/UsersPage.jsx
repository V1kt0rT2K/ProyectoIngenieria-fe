import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import UserOptions from "../../components/UserOptions";
import UserService from "../../utils/service/UserService";

const UsersPage = () => {
    const [input, setInput] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const inputRef = useRef(null);

    const clearInput = () => {
        setInput("");
        inputRef.current.value = "";
    }

    useEffect(() => {
        const getUsers = async () => {
            // try {
            //     const res = await fetch(`${Configuration.API_BASE_URL}/user/get/all`);
            //     const data = await res.json();
            //     setUsers(data);
            // } catch (err) {
            //     console.log(err);
            // } finally {
            //     setLoading(false);
            // }
            UserService.getAllUsers(1,15,0).then(response =>{
                if(!response.hasError){
                    setUsers(response.data);
                }
                setLoading(false);
            })
        }
        getUsers();
    }, []);

    return (
        <>
            <div style={{ height: "80vh" }} className="flex flex-col pt-8">
                <div className="flex flex-col items-start">
                    <Link to="requests" className="text-white rounded bg-orange-700 px-3 py-1 text-md font-semibold mb-4 hover:cursor-pointer">Solicitudes de crear usuario</Link>
                    <div className="flex w-full">
                        <input ref={inputRef} onInput={() => setInput(inputRef.current.value)} className="focus:outline-none flex-grow border border-orange-700 rounded py-1 px-3 text-md" type="text" placeholder="Filtrar usuarios" />
                        <button onClick={clearInput} className="bg-red-600 mx-2 px-3 py-1 flex items-center justify-center text-xl text-white font-extrabold rounded hover:cursor-pointer">X</button>
                    </div>
                </div>
                <p className="mt-6 text-lg text-orange-800 font-semibold underline">Usuarios activos</p>
                <div style={{ width: "75vw" }} className={`rounded mt-2 mb-6 flex overflow-y-scroll ${loading ? "" : "border border-orange-700 bg-orange-200"}`}>
                    {
                        loading
                            ? <Spinner loading={loading} />
                            : (
                                <>
                                    <table className="flex-grow w-full table-auto justify-self-center">
                                        <thead>
                                            <tr>
                                                <th className="border border-orange-900 w-72 py-2 px-5 bg-orange-700 text-white text-md">Nombre completo</th>
                                                <th className="border border-orange-900 w-60 px-5 bg-orange-700 text-white text-md">Rol asignado</th>
                                                {/* <th className="border border-orange-900 w-36 px-5 bg-orange-700 text-white text-md">Fecha de creacion</th> */}
                                                <th className="border border-orange-900 w-32 px-5 bg-orange-700 text-white"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                users
                                                    .filter(user => !input ? true : (new RegExp(`.*${input}.*`, "i")).test(user.fullName))
                                                    .map((user, idx) =>
                                                        <tr key={idx}>
                                                            <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                                {`${user.Person.firstName} ${user.Person.secondName} 
                                                                ${user.Person.lastName} ${user.Person.secondLastName}`}
                                                            </td>
                                                            <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                                {user.UserRole.roleName}
                                                            </td>
                                                            {/* <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                                {user.date.match(/\d+-\d+-\d+/g)}
                                                            </td> */}

                                                            <td className="border border-orange-900 bg-orange-200 py-4 px-5">
                                                                <UserOptions user={user} />
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
    );
}

export default UsersPage;
