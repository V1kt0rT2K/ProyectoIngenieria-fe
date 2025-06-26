import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import UserOptions from "../components/UserOptions";

const usersList = [
    {
        id: 21,
        fullName: "Sofía Margarita Ramos García",
        idNumber: "123123123123",
        role: "Jefa de control de calidad",
        date: "11/04/2023",
        email: "sofia.ramos@empresa.com",
        username: "sramos"
    },
    {
        id: 22,
        fullName: "Francisco Javier Núñez Herrera",
        idNumber: "456456456456",
        role: "Encargado de planta",
        date: "06/08/2022",
        email: "francisco.nunez@gmail.com",
        username: "fnunez"
    },
    {
        id: 23,
        fullName: "Andrea Beatriz Molina Flores",
        idNumber: "789789789789",
        role: "Asistente técnica",
        date: "23/01/2023",
        email: "andrea.molina@correo.com",
        username: "amolina"
    },
    {
        id: 24,
        fullName: "Fernando Luis Palacios Castro",
        idNumber: "147147147147",
        role: "Coordinador de distribución",
        date: "14/10/2023",
        email: "fernando.palacios@empresa.com",
        username: "fpalacios"
    },
    {
        id: 25,
        fullName: "Paola Milena Ortiz López",
        idNumber: "258258258258",
        role: "Supervisora de personal",
        date: "19/03/2024",
        email: "paola.ortiz@gmail.com",
        username: "portiz"
    },
    {
        id: 26,
        fullName: "Héctor David Rivas Molina",
        idNumber: "369369369369",
        role: "Técnico en climatización",
        date: "28/07/2022",
        email: "hector.rivas@correo.com",
        username: "hrivas"
    },
    {
        id: 27,
        fullName: "Juliana Patricia Mejía Herrera",
        idNumber: "741741741741",
        role: "Auxiliar de documentación",
        date: "02/12/2023",
        email: "juliana.mejia@empresa.com",
        username: "jmejia"
    },
    {
        id: 28,
        fullName: "Mauricio Alejandro Rosales Díaz",
        idNumber: "852852852852",
        role: "Responsable de seguridad industrial",
        date: "30/05/2024",
        email: "mauricio.rosales@gmail.com",
        username: "mrosales"
    },
    {
        id: 29,
        fullName: "Diana Carolina Peña Aguirre",
        idNumber: "963963963963",
        role: "Especialista en nutrición animal",
        date: "12/02/2023",
        email: "diana.pena@empresa.com",
        username: "dpena"
    },
    {
        id: 30,
        fullName: "Álvaro Enrique Castillo Torres",
        idNumber: "159159159159",
        role: "Encargado de bodega",
        date: "07/09/2023",
        email: "alvaro.castillo@correo.com",
        username: "acastillo"
    }
]

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
                    <Link to="solicitudes" className="text-white rounded-md bg-orange-700 px-3 py-1 text-md font-semibold mb-4 hover:cursor-pointer">Solicitudes de crear usuario (0)</Link>
                    <div className="flex w-full">
                        <input ref={ inputRef } onInput={() => setInput( inputRef.current.value )} className="focus:outline-none flex-grow border border-orange-700 rounded py-1 px-3 text-md" type="text" placeholder="Filtrar usuarios" />
                        <button onClick={ clearInput } className="bg-red-600 mx-2 px-3 py-1 flex items-center justify-center text-xl text-white font-extrabold rounded hover:cursor-pointer">X</button>
                    </div>
                </div>
                <p className="mt-6 text-lg text-orange-800 font-semibold underline">Usuarios activos</p>
                <div style={{ width: "75vw" }} className={`rounded mt-2 mb-6 flex overflow-y-scroll ${loading ? "" : "border border-orange-700" }`}>
                    {
                        loading
                            ? <Spinner loading={ loading } />
                            : (
                                <>
                                    <table className="flex-grow w-full table-fixed justify-self-center">
                                        <thead>
                                            <tr>
                                                <th className="border border-orange-900 w-72 py-2 px-5 bg-orange-700 text-white text-md">Nombre completo</th>
                                                <th className="border border-orange-900 w-56 px-5 bg-orange-700 text-white text-md">Rol asignado</th>
                                                <th className="border border-orange-900 w-44 px-5 bg-orange-700 text-white text-md">Fecha de creacion</th>
                                                <th className="border border-orange-900 w-36 px-5 bg-orange-700 text-white"></th>
                                                <th className="border border-orange-900 w-40 px-5 bg-orange-700 text-white"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                users
                                                .filter(user => input === "" ? true : (new RegExp(`.*${input}.*`, "i")).test(user.fullName))
                                                .map((user, idx) =>
                                                    <tr key={ idx }>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{ user.fullName }</td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{ user.role }</td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{ user.date }</td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5">
                                                            <button className="text-white rounded-md bg-orange-800 px-3 py-1 text-md hover:cursor-pointer font-semibold">Actividad</button>
                                                        </td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5">
                                                            <UserOptions user={ user } />
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