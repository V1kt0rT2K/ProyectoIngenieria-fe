import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

const usersList = [
    {
        name: "dba",
        role: "Encargado de ventas",
        date: "05/05/2025"
    },
    {
        name: "ecco",
        role: "Administrador",
        date: "04/03/2023"
    },
    {
        name: "saya",
        role: "Encargado de ventas",
        date: "05/05/2025"
    },
    {
        name: "xiaomi",
        role: "Administrador",
        date: "04/03/2023"
    },
    {
        name: "pikaur",
        role: "Encargado de ventas",
        date: "05/05/2025"
    },
    {
        name: "vi",
        role: "Administrador",
        date: "04/03/2023"
    },
    {
        name: "oracle",
        role: "Encargado de ventas",
        date: "05/05/2025"
    },
    {
        name: "rem",
        role: "Administrador",
        date: "04/03/2023"
    },
    {
        name: "afdsfdsfdskjfdskljfkldsjfkjsdkjlfkldjsfkjldskjlfdskjlfkjldsfkjldsjkflkjsdfdasjdjasdjksa",
        role: "Encargado de ventas",
        date: "05/05/2025"
    },
    {
        name: "emilio koyama",
        role: "Administrador",
        date: "04/03/2023"
    },
    {
        name: "AAAEEEIIOOUU",
        role: "Encargado de ventas",
        date: "05/05/2025"
    },
];

const UsersPage = () => {
    const [input, setInput] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const inputRef = useRef(null);

    const clearInput = () => {
        setInput("");
        inputRef.current.value = "";
    }

    useEffect(() => {
        setTimeout(() => {
            setUsers(usersList);
            setLoading(false);
        }, 100);
    }, []);

    return (
        <>
            <div style={{ height: "80vh" }} className="flex flex-col pt-8">
                <div className="flex flex-col items-start">
                    <Link to="solicitudes" className="text-white rounded-md bg-orange-700 px-3 py-1 text-md font-semibold mb-6 hover:cursor-pointer">Solicitudes de crear usuario (12)</Link>
                    <div className="flex w-full">
                        <input ref={ inputRef } onInput={() => setInput( inputRef.current.value )} className="flex-grow border-2 border-solid border-orange-700 rounded py-1 px-3 text-md" type="text" placeholder="Filtrar usuarios" />
                        <a onClick={ clearInput } className="bg-red-500 mx-2 px-3 py-1 flex items-center justify-center text-xl text-white font-extrabold rounded hover:cursor-pointer">X</a>
                    </div>
                </div>
                <div style={{ width: "75vw" }} className="my-6 overflow-y-scroll">
                    {
                        loading
                        ? <Spinner loading={ loading } />
                        : (
                            <>
                                <table className="border-1 border-solid border-orange-700 w-full table-fixed justify-self-center">
                                    <thead>
                                        <tr>
                                            <th className="w-65 py-2 px-5 border-solid border-1 border-orange-900 bg-orange-700 text-white text-md">Nombre de usuario</th>
                                            <th className="w-55 px-5 border-solid border-1 border-orange-900 bg-orange-700 text-white text-md">Rol asignado</th>
                                            <th className="w-50 px-5 border-solid border-1 border-orange-900 bg-orange-700 text-white text-md">Fecha de creacion</th>
                                            <th className="w-35 px-5 border-solid border-1 border-orange-900 bg-orange-700 text-white"></th>
                                            <th className="w-35 px-5 border-solid border-1 border-orange-900 bg-orange-700 text-white"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users
                                            .filter(user => input === "" ? true : (new RegExp(`.*${input}.*`)).test(user.name))
                                            .map(user =>
                                                <tr>
                                                    <td className="border-solid border-1 border-orange-900 bg-orange-200 py-4 px-5 text-md font-semibold">{ user.name.length > 20 ? user.name.substring(0, 20) + "..." : user.name }</td>
                                                    <td className="border-solid border-1 border-orange-900 bg-orange-200 py-4 px-5 text-md font-semibold">{ user.role }</td>
                                                    <td className="border-solid border-1 border-orange-900 bg-orange-200 py-4 px-5 text-md font-semibold">{ user.date }</td>
                                                    <td className="border-solid border-1 border-orange-900 bg-orange-200 py-4 px-5 justify-center"><button className="text-white rounded-md bg-orange-800 px-3 py-1 text-md font-semibold hover:cursor-pointer">Actividad</button></td>
                                                    <td className="border-solid border-1 border-orange-900 bg-orange-200 py-4 px-5 justify-center">
                                                        <select className="text-white rounded-md bg-orange-800 px-3 py-1 text-md font-semibold hover:cursor-pointer">
                                                            <option className="">Opciones</option>
                                                            <option>Detalles</option>
                                                            <option>Editar</option>
                                                            <option>Eliminar</option>
                                                        </select>
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