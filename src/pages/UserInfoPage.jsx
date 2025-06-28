import { useLocation } from "react-router-dom";
import { useRef, useState } from "react";
import BackButton from "../components/BackButton";

const UserInfoPage = () => {
    const fieldsRef = useRef(null);

    const location = useLocation();
    const [values, setValues] = useState(location.state);
    
    const [editMode, setEditMode] = useState(false);

    const handle = () => {
        setEditMode(!editMode);

        fieldsRef.current.querySelectorAll("input").forEach(input => {
            input.disabled = editMode;
        });
    }

    return (
        <>
            <div style={{ height: "80vh", width: "75vw" }} className="flex flex-col pt-8">
                <BackButton />
                {
                    !editMode
                        ? <p className="mb-2 text-lg text-orange-800 font-semibold underline">Informacion de usuario</p>
                        : <p className="mb-2 text-lg text-orange-800 font-semibold underline">Editar la informacion del usuario</p>
                }
                
                <div className="bg-orange-200 rounded overflow-y-auto">
                    <div ref={ fieldsRef } className="pb-4 px-2 pr-6 ml-2 flex flex-col justify-center mt-2">
                        <label className="text-md text-orange-900">Nombre completo</label>
                        <input
                            value={ values.fullName }
                            onChange={e => setValues({ ...values, ...{ fullName: e.target.value }})}
                            disabled
                            className="focus:outline-none flex-grow rounded py-1 px-3 text-md"
                        />

                        <label className="mt-2 text-md text-orange-900">Nombre de usuario</label>
                        <input
                            value={ values.username }
                            onChange={e => setValues({ ...values, ...{ username: e.target.value }})}
                            disabled
                            className="focus:outline-none flex-grow rounded py-1 px-3 text-md"
                        />

                        <label className="mt-2 text-md text-orange-900">Numero de identidad</label>
                        <input
                            value={ values.idNumber }
                            onChange={e => setValues({ ...values, ...{ idNumber: e.target.value }})}
                            disabled
                            className="focus:outline-none flex-grow rounded py-1 px-3 text-md"
                        />

                        <label className="mt-2 text-md text-orange-900">Rol asignado</label>
                        <input
                            value={ values.role }
                            onChange={e => setValues({ ...values, ...{ role: e.target.value }})}
                            disabled
                            className="focus:outline-none flex-grow rounded py-1 px-3 text-md"
                        />

                        <label className="mt-2 text-md text-orange-900">Fecha de creacion de usuario</label>
                        <input
                            value={ values.date }
                            onChange={e => setValues({ ...values, ...{ date: e.target.value }})}
                            disabled
                            className="focus:outline-none flex-grow rounded py-1 px-3 text-md"
                            type="text"
                        />

                        <label className="mt-2 text-md text-orange-900">Email</label>
                        <input
                            value={ values.email }
                            onChange={e => setValues({ ...values, ...{ email: e.target.value }})}
                            disabled
                            className="focus:outline-none flex-grow rounded py-1 px-3 text-md"
                            type="email"
                        />
                    </div>
                </div>
                <div className="flex justify-center space-x-2 mt-3 mb-1">
                    {
                        editMode 
                            ? (
                                <>
                                    <button
                                        onClick={ handle }
                                        className="hover:cursor-pointer rounded-md text-md text-white font-semibold px-3 py-1 bg-green-700"
                                    >
                                        Guardar
                                    </button>
                                    <button
                                        onClick={ handle }
                                        className="hover:cursor-pointer rounded-md text-md text-white font-semibold px-3 py-1 bg-red-700"
                                    >
                                        Cancelar
                                    </button>
                                </>
                            )
                            : (
                            <>
                                <button
                                    onClick={ handle }
                                    className="hover:cursor-pointer rounded-md text-md text-white font-semibold px-3 py-1 bg-yellow-600"
                                >
                                    Editar
                                </button>
                                <button className="hover:cursor-pointer rounded-md text-md text-white font-semibold px-3 py-1 bg-red-700">
                                    Eliminar
                                </button>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default UserInfoPage;