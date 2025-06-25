import { useNavigate } from "react-router-dom";
import { useRef, useState } from 'react';
import Spinner from "./Spinner";

const LoginForm = () => {
    const navigate = useNavigate();
    const [badInput, setBadInput] = useState(false);
    const [validating, setValidating] = useState(false);
    const formRef = useRef(null);

    const login = (e) => {
        e.preventDefault();

        const formData = new FormData(formRef.current);

        for (let [key, val] of formData.entries()) {
            if (!val) {
                setBadInput(true);
                return;
            }
        }
        setValidating(true);

        setTimeout(() => {
            navigate("/inicio")
            setValidating(false);
        }, 1000);
    }

    return (
        <>
            <form ref={formRef} onSubmit={login}>
                <div className="flex flex-col items-center mb-2">
                    <h1 className="text-2xl font-semibold">Inicio de sesion</h1>
                    <p className="text-orange-900 text-md">Inicia sesion con tus credenciales</p>
                </div>
                <div className="bg-gray-200 px-4 pt-4 my-4 rounded-lg flex flex-col justify-center">
                    <label className="mb-2 text-lg font-semibold">Nombre de usuario</label>
                    <input name="email" className="focus:outline-none  bg-gray-200 mb-6 px-2 py-1 border-solid border-1 border-gray-400 rounded-md" placeholder="Nombre de usuario" type="text" />

                    <label className="mb-2 text-lg font-semibold">Contraseña</label>
                    <input name="pass" className="focus:outline-none  bg-gray-200 mb-6 px-2 py-1 border-1 border-gray-400 rounded-md" placeholder="Contraseña" type="password" />
                </div>
                <div className="flex flex-col items-center">
                    { !badInput ? "" : <div className="mb-4 bg-red-500 rounded-md px-4 py-1 font-bold text-white">Por favor, rellenar todos los campos</div> }
                    { !validating ? "" : (
                            <>
                                <div className="flex items-center justify-center mb-2">
                                    <Spinner loading={ true } size={ 15 } margin={ 2 } />
                                    <span className="ml-2 text-leading text-orange-900">Validando usuario...</span>
                                </div>
                            </>
                        )
                    }
                    <input className="hover:cursor-pointer bg-orange-800 text-lg font-semibold text-white py-1 px-3 rounded-lg shadow-lg" value="Iniciar sesion" type="submit" />
                </div>
            </form>
        </>
    );
}

export default LoginForm;
