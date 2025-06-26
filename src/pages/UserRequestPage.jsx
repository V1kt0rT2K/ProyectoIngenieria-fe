import { Link, useLocation } from "react-router-dom";
import BackButton from "../components/BackButton";

const UsersRequestsPage = () => {
    const location = useLocation();
    const { id, fullName, role, date, email, idNumber } = location.state;

    return (
        <>
            <div style={{ height: "80vh", width: "75vw" }} className="flex flex-col pt-8">
                <BackButton />
                <p className="mb-2 text-lg text-orange-800 font-semibold underline">Informacion de la solicitud</p>
                <div className="bg-orange-200 rounded overflow-y-auto">
                    <div className="pb-4 px-2 pr-6 ml-2 flex flex-col justify-center mt-2">
                        <label className="text-md text-orange-900">Nombre completo</label>
                        <input disabled value={ fullName } className="focus:outline-none flex-grow rounded py-1 px-3 text-md" />

                        <label className="mt-2 text-md text-orange-900">Numero de identidad</label>
                        <input disabled value={ idNumber } className="focus:outline-none flex-grow rounded py-1 px-3 text-md" />

                        <label className="mt-2 text-md text-orange-900">Rol de usuario</label>
                        <input disabled value={ role } className="focus:outline-none flex-grow rounded py-1 px-3 text-md" />

                        <label className="mt-2 text-md text-orange-900">Fecha de creacion de solicitud</label>
                        <input disabled value={ date } className="focus:outline-none flex-grow rounded py-1 px-3 text-md" />

                        <label className="mt-2 text-md text-orange-900">Email</label>
                        <input disabled value={ email } className="focus:outline-none flex-grow rounded py-1 px-3 text-md" />

                        <label className="mt-2 text-md text-orange-900">Rol de usuario</label>
                        <input disabled value={ role } className="focus:outline-none flex-grow rounded py-1 px-3 text-md" />

                        <label className="mt-2 text-md text-orange-900">Fecha de creacion de solicitud</label>
                        <input disabled value={ date } className="focus:outline-none flex-grow rounded py-1 px-3 text-md" />

                        <label className="mt-2 text-md text-orange-900">Email</label>
                        <input disabled value={ email } className="focus:outline-none flex-grow rounded py-1 px-3 text-md" />
                    </div>
                </div>
                <div className="flex justify-center space-x-2 mt-3 mb-1">
                    <button className="hover:cursor-pointer rounded-md text-md text-white font-semibold px-3 py-1 bg-green-700">Aceptar</button>
                    <button className="hover:cursor-pointer rounded-md text-md text-white font-semibold px-3 py-1 bg-red-700">Rechazar</button>
                </div>
            </div>
        </>
    );
}

export default UsersRequestsPage;