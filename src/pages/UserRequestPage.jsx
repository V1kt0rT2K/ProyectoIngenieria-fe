import { Link, useLocation } from "react-router-dom";
import DropDown from "../components/UserOptions";

const UsersRequestsPage = () => {
    const location = useLocation();
    const { id, fullName, role, date, email, idNumber } = location.state;

    return (
        <>
            <div style={{ height: "80vh", width: "75vw" }} className="flex flex-col pt-8">
                <Link to="../" className="flex justify-center items-center mb-4 bg-orange-700 w-max px-3 py-1 rounded text-md text-white font-semibold">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                    </svg>
                    <span className="ml-2">Atras</span>
                </Link>
                <p className="mb-2 text-lg text-orange-800 font-semibold underline">Informacion de la solicitud</p>
                <div className="rounded overflow-y-auto border border-red-900">
                    <div className="pb-4 px-2 pr-6 ml-2 flex flex-col mt-2 justify-center">
                        <label className="text-md text-orange-900">Nombre completo</label>
                        <input readOnly value={ fullName } className="focus:outline-none flex-grow rounded py-1 px-3 text-md" />

                        <label className="mt-2 text-md text-orange-900">Numero de identidad</label>
                        <input readOnly value={ idNumber } className="focus:outline-none flex-grow rounded py-1 px-3 text-md" />

                        <label className="mt-2 text-md text-orange-900">Rol de usuario</label>
                        <input readOnly value={ role } className="focus:outline-none flex-grow rounded py-1 px-3 text-md" />

                        <label className="mt-2 text-md text-orange-900">Fecha de creacion de solicitud</label>
                        <input readOnly value={ date } className="focus:outline-none flex-grow rounded py-1 px-3 text-md" />

                        <label className="mt-2 text-md text-orange-900">Email</label>
                        <input readOnly value={ email } className="focus:outline-none flex-grow rounded py-1 px-3 text-md" />

                        <label className="mt-2 text-md text-orange-900">Rol de usuario</label>
                        <input readOnly value={ role } className="focus:outline-none flex-grow rounded py-1 px-3 text-md" />

                        <label className="mt-2 text-md text-orange-900">Fecha de creacion de solicitud</label>
                        <input readOnly value={ date } className="focus:outline-none flex-grow rounded py-1 px-3 text-md" />

                        <label className="mt-2 text-md text-orange-900">Email</label>
                        <input readOnly value={ email } className="focus:outline-none flex-grow rounded py-1 px-3 text-md" />
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