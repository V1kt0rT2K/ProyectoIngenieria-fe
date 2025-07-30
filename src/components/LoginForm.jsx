import { useNavigate } from "react-router-dom";
import { useRef, useState } from 'react';
import Spinner from "./Spinner";
import { useAuth } from "../provider/AuthProvider";
import AuthService from "../utils/service/AuthService";
import { SHA256 } from 'crypto-js';

const LoginForm = () => {
    const { setSession } = useAuth();

    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState({ state: false, msg: null });
    const [validating, setValidating] = useState(false);
    const formRef = useRef(null);

    const login = async (e) => {
        e.preventDefault();

        const formData = new FormData(formRef.current);

        let obj = {};

        for (let [key, val] of formData.entries()) {
            if (!val) {
                setErrorMsg({ state: true, msg: "Por favor, rellenar todos los campos" });
                return;
            }
            obj[key] = val;
        }

        const password = SHA256(obj.password).toString();
        console.log(password);
        obj.password = password;
        console.log(obj);

        setErrorMsg({ state: false, msg: null });
        setValidating(true);

        AuthService.loginUser(obj).then((response) => {
            setValidating(false);
            console.log("repsonse consumido",response);
            if (!response.hasError) {
                setSession(JSON.stringify({
                    idUser: response.data.idUser,
                    idRole: response.data.idRole,
                    emailUser: response.data.email,
                    token: "test"
                }));

                console.log(response.headers);

                //return;
                

                localStorage.setItem("jwt", response.headers.authorization);

                console.log(localStorage.getItem("jwt"))

                navigate("/home", { replace: true });
                return;
            } else {
                setErrorMsg({ state: true, msg: response.meta.message });
                return;
            }
        });
        console.log("Alo");
    }

    return (
        <>
            <form ref={formRef} onSubmit={login}>
                <div className="flex flex-col items-center mb-2">
                    <h1 className="text-2xl font-semibold">Inicio de sesion</h1>
                    <p className="text-orange-900 text-md">Inicia sesion con tus credenciales</p>
                </div>
                <div className="bg-gray-200 px-4 pt-4 my-4 rounded flex flex-col justify-center">
                    <label className="mb-2 text-lg font-semibold">Email</label>

                    <input name="email" className="focus:outline-none mb-6 px-2 py-1 border-solid border border-gray-400 rounded" placeholder="Email" type="email" />

                    <label className="mb-2 text-lg font-semibold">Contraseña</label>
                    <input name="password" className="focus:outline-none mb-6 px-2 py-1 border border-gray-400 rounded" placeholder="Contraseña" type="password" />

                </div>
                <div className="flex flex-col items-center">
                    {errorMsg.state && <div className="mb-4 bg-red-500 rounded px-4 py-1 font-bold text-white">{errorMsg.msg}</div>}
                    {
                        validating
                        && (
                            <>
                                <div className="flex items-center justify-center mb-2">
                                    <Spinner loading={true} size={15} margin={2} />
                                    <span className="ml-2 text-leading text-orange-900">Validando usuario...</span>
                                </div>
                            </>
                        )
                    }
                    <input className="hover:cursor-pointer bg-orange-800 text-lg font-semibold text-white py-1 px-3 rounded shadow-lg" value="Iniciar sesion" type="submit" />
                </div>
            </form>
        </>
    );
}

export default LoginForm;
