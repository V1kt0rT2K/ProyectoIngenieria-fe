import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

const requestsList = [
    {
        id: 2,
        fullName: "Maria Fernanda López Rivera",
        idNumber: "444455556666",
        role: "Supervisora de calidad",
        date: "21/03/2023",
        email: "mfernanda.lopez@gmail.com"
    },
    {
        id: 3,
        fullName: "Carlos Alberto Mejía Pineda",
        idNumber: "777788889999",
        role: "Encargado de mantenimiento",
        date: "02/07/2022",
        email: "carlos.mejia@hotmail.com"
    },
    {
        id: 4,
        fullName: "Ana Patricia Gómez Reyes",
        idNumber: "123456789012",
        role: "Veterinaria de campo",
        date: "30/11/2023",
        email: "apatricia.gomez@empresa.com"
    },
    {
        id: 5,
        fullName: "José Manuel Rodríguez Díaz",
        idNumber: "098765432112",
        role: "Operador de granja",
        date: "14/05/2023",
        email: "jmanuel.rd@gmail.com"
    },
    {
        id: 6,
        fullName: "Laura Vanessa Torres Cruz",
        idNumber: "321654987123",
        role: "Analista de producción",
        date: "05/08/2022",
        email: "laura.vtorres@yahoo.com"
    },
    {
        id: 7,
        fullName: "Diego Andrés Martínez López",
        idNumber: "147258369741",
        role: "Supervisor de turno",
        date: "19/09/2023",
        email: "diego.martinez@empresa.com"
    },
    {
        id: 8,
        fullName: "Carolina Beatriz Ramos Soto",
        idNumber: "369258147369",
        role: "Asistente administrativa",
        date: "10/10/2022",
        email: "carolina.rs@gmail.com"
    },
    {
        id: 9,
        fullName: "Luis Enrique Chávez Molina",
        idNumber: "963852741258",
        role: "Encargado de inventario",
        date: "17/01/2024",
        email: "luis.enrique.chavez@correo.com"
    },
    {
        id: 10,
        fullName: "Daniela Sofía Navarro Peña",
        idNumber: "741852963147",
        role: "Coordinadora de logística",
        date: "25/04/2023",
        email: "daniela.navarro@gmail.com"
    }
]

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
                <div className={`flex ${loading ? "" : "border-1 border-solid border-orange-700" } overflow-y-scroll mt-2 mb-6`}>
                    {
                        loading
                            ? <Spinner loading={ loading } />
                            : (
                                <>
                                    <table className="flex-grow table-fixed justify-self-center">
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
                                                .map((user, idx) =>
                                                    <tr key={ idx }>
                                                        <td className="border-solid border-1 border-orange-900 bg-orange-200 py-4 px-5 text-md">{ user.fullName }</td>
                                                        <td className="border-solid border-1 border-orange-900 bg-orange-200 py-4 px-5 text-md">{ user.role }</td>
                                                        <td className="border-solid border-1 border-orange-900 bg-orange-200 py-4 px-5">
                                                            <Link
                                                                to="solicitud"
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