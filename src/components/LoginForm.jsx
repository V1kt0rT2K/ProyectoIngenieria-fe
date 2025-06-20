import { useNavigate } from "react-router-dom";
import { useRef, useState } from 'react';

const LoginForm = () => {
    const navigate = useNavigate();
    const [badInput, setBadInput] = useState(false);
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
        navigate("/hello");
    }

    return (
        <>
            <form ref={ formRef } onSubmit={ login }>
                <div className="flex flex-col items-center mb-2">
                    <h1 className="text-2xl font-semibold">Inicio de sesion</h1>
                    <p className="text-orange-900 text-md">Inicia sesion con tus credenciales</p>
                </div>
                <div className="flex flex-col justify-center">
                    <label className="mb-2 text-lg font-semibold">Email</label>
                    <input name="email" className="mb-6 px-2 py-1 border-solid border-1 border-gray-400 rounded-md" placeholder="Email" />
                    <label className="mb-2 text-lg font-semibold">Contraseña</label>
                    <input name="pass" className="mb-6 px-2 py-1 border-1 border-gray-400 rounded-md" placeholder="Contraseña" type="password" />
                </div>
                <div className="flex flex-col items-center">
                    { !badInput ? "" : <div className="mb-4 bg-red-500 rounded-md px-4 py-1 font-bold text-white">Por favor, rellenar todos los campos</div>}                    
                    <input className="hover:cursor-pointer bg-orange-800 text-lg font-extrabold text-white py-1 px-3 rounded-lg" value="Inciar sesion" type="submit" />
                </div>
            </form>
        </>
    );
}

export default LoginForm;