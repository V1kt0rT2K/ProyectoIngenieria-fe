import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import UserOptions from "../components/UserOptions";

const usersList = [
    {
        id: 11,
        fullName: "Ricardo Antonio Salgado Núñez",
        idNumber: "555444333222",
        role: "Técnico de bioseguridad",
        date: "03/02/2023",
        email: "ricardo.salgado@empresa.com",
        username: "rsalgado"
    },
    {
        id: 12,
        fullName: "Valeria Nohemí Hernández Osorio",
        idNumber: "101010101010",
        role: "Operadora de granja",
        date: "08/06/2024",
        email: "valeria.hdz@gmail.com",
        username: "vhernandez"
    },
    {
        id: 13,
        fullName: "Javier Esteban Cruz Mejía",
        idNumber: "222333444555",
        role: "Supervisor de producción",
        date: "22/12/2022",
        email: "javier.cruz@hotmail.com",
        username: "jcruz"
    },
    {
        id: 14,
        fullName: "Camila Alejandra Díaz Romero",
        idNumber: "333444555666",
        role: "Auxiliar de laboratorio",
        date: "15/09/2023",
        email: "camila.diaz@laboratorio.com",
        username: "cdiaz"
    },
    {
        id: 15,
        fullName: "Manuel Ignacio Torres Herrera",
        idNumber: "111333555777",
        role: "Encargado de incubadora",
        date: "12/05/2022",
        email: "manuel.torres@empresa.com",
        username: "mtorres"
    },
    {
        id: 16,
        fullName: "Isabel Cristina Morales Paz",
        idNumber: "789456123789",
        role: "Especialista en sanidad animal",
        date: "26/07/2023",
        email: "isabel.morales@gmail.com",
        username: "imorales"
    },
    {
        id: 17,
        fullName: "Marco Tulio Aguilar Rivera",
        idNumber: "654321987654",
        role: "Supervisor de transporte",
        date: "09/03/2024",
        email: "marco.aguilar@correo.com",
        username: "maguilar"
    },
    {
        id: 18,
        fullName: "Karen Julissa Pérez Lara",
        idNumber: "852369741258",
        role: "Encargada de recursos humanos",
        date: "04/11/2022",
        email: "karen.perez@empresa.com",
        username: "kperez"
    },
    {
        id: 19,
        fullName: "Oscar Armando Rivera Cálix",
        idNumber: "951357456123",
        role: "Técnico electromecánico",
        date: "18/01/2023",
        email: "oscar.rivera@gmail.com",
        username: "orivera"
    },
    {
        id: 20,
        fullName: "Daniela Paola Castillo Reyes",
        idNumber: "741963852741",
        role: "Asistente de gestión ambiental",
        date: "29/06/2024",
        email: "daniela.castillo@empresa.com",
        username: "dcastillo"
    }
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
                        <input ref={ inputRef } onInput={() => setInput( inputRef.current.value )} className="focus:outline-none flex-grow border-1 border-solid border-orange-700 rounded py-1 px-3 text-md" type="text" placeholder="Filtrar usuarios" />
                        <button onClick={ clearInput } className="bg-red-600 mx-2 px-3 py-1 flex items-center justify-center text-xl text-white font-extrabold rounded hover:cursor-pointer">X</button>
                    </div>
                </div>
                <p className="mt-6 text-lg text-orange-800 font-semibold underline">Usuarios activos</p>
                <div style={{ width: "75vw" }} className={`mt-2 mb-6 flex overflow-y-scroll ${loading ? "" : "border-1 border-solid border-orange-700" }`}>
                    {
                        loading
                            ? <Spinner loading={ loading } />
                            : (
                                <>
                                    <table className="flex-grow w-full table-fixed justify-self-center">
                                        <thead>
                                            <tr>
                                                <th className="w-55 py-2 px-5 border-solid border-1 border-orange-900 bg-orange-700 text-white text-md">Nombre de usuario</th>
                                                <th className="w-55 px-5 border-solid border-1 border-orange-900 bg-orange-700 text-white text-md">Rol asignado</th>
                                                <th className="w-45 px-5 border-solid border-1 border-orange-900 bg-orange-700 text-white text-md">Fecha de creacion</th>
                                                <th className="w-35 px-5 border-solid border-1 border-orange-900 bg-orange-700 text-white"></th>
                                                <th className="w-40 px-5 border-solid border-1 border-orange-900 bg-orange-700 text-white"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                users
                                                .filter(user => input === "" ? true : (new RegExp(`.*${input}.*`, "i")).test(user.fullName))
                                                .map((user, idx) =>
                                                    <tr key={ idx }>
                                                        <td className="border-solid border-1 border-orange-900 bg-orange-200 py-4 px-5 text-md">{ user.fullName }</td>
                                                        <td className="border-solid border-1 border-orange-900 bg-orange-200 py-4 px-5 text-md">{ user.role }</td>
                                                        <td className="border-solid border-1 border-orange-900 bg-orange-200 py-4 px-5 text-md">{ user.date }</td>
                                                        <td className="border-solid border-1 border-orange-900 bg-orange-200 py-4 px-5">
                                                            <button className="text-white rounded-md bg-orange-800 px-3 py-1 text-md hover:cursor-pointer font-semibold">Actividad</button>
                                                        </td>
                                                        <td className="border-solid border-1 border-orange-900 bg-orange-200 py-4 px-5">
                                                            <UserOptions />
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