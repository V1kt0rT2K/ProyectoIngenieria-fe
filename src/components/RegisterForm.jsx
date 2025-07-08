import { useEffect, useRef, useState } from 'react';
import PublicService from "../utils/service/PublicService";
import AuthService from "../utils/service/AuthService";

const RegisterForm = () => {
    const [errorMsg, setErrorMsg] = useState({ state: false, msg: null });
    const [sentRequest, setSentRequest] = useState(false);
    const [sendingRequest, setSendingRequest] = useState(false);

    const [loading, setLoading] = useState(true);
    const [userRoles, setUserRoles] = useState([]);

    const formRef = useRef(null);
    const roleRef = useRef(null);

    useEffect(() => {
        
        PublicService.getUserRoles().then(response =>{
            if(!response.hasError){
                setUserRoles(response.data);
            }
            setLoading(false);
        });
        
    }, []);

    const register = async (e) => {
        e.preventDefault();

        const formData = new FormData(formRef.current);

        let obj = {};

        for (let [key, val] of formData.entries()) {
            if (!val) {
                setSentRequest(false);
                setErrorMsg({ state: true, msg: "Por favor, rellenar todos los campos." });
                return;
            }
            obj[key] = val;
        };

        setErrorMsg({ state: false, msg: null });
        setSendingRequest(true);

        const payload = {
            ...obj,
            idRole : roleRef.current.value
        };

        AuthService.registerUser(payload).then(response=>{
            console.log(response);
            if(!response.hasError){
                formRef.current.querySelectorAll("input").forEach(input => input.value = "");
                roleRef.current.value = 0;
                setTimeout(() => setSentRequest(false), 5000);
            }else{
                setErrorMsg({state:true, msg:response.meta.message});
            }

            setSendingRequest(false);
            setSentRequest(true);
        });
    }

    return (
        <>
            <form ref={formRef} onSubmit={register} >
                <div className="flex flex-col items-center mb-2">
                    <h1 className="text-2xl font-semibold">Registrarse</h1>
                    <p className="text-orange-900 text-md">Formulario de registro</p>
                </div>
                <div className="overflow-y-auto bg-gray-200 rounded h-80">
                    <div className="flex flex-col justify-center my-4 px-4">
                        <label className="mb-2 text-lg font-semibold">Primer nombre</label>
                        <input className="focus:outline-none mb-6 px-2 py-1 border-solid border border-gray-400 rounded" placeholder="Primer nombre" name="firstName" type="text" />
                        <label className="mb-2 text-lg font-semibold">Segundo nombre</label>
                        <input className="focus:outline-none mb-6 px-2 py-1 border-solid border border-gray-400 rounded" placeholder="Segundo nombre" name="secondName" type="text" />
                        <label className="mb-2 text-lg font-semibold">Primer apellido</label>
                        <input className="focus:outline-none  mb-6 px-2 py-1 border-solid border border-gray-400 rounded" placeholder="Primer apellido" name="lastName" type="text" />
                        <label className="mb-2 text-lg font-semibold">Segundo apellido</label>
                        <input className="focus:outline-none  mb-6 px-2 py-1 border-solid border border-gray-400 rounded" placeholder="Segundo apellido" name="secondLastName" type="text" />

                        <label className="mb-2 text-lg font-semibold">Numero de identidad</label>
                        <input className="focus:outline-none  mb-6 px-2 py-1 border-solid border border-gray-400 rounded" placeholder="Numero de identidad" name="identityNumber" type="text" />

                        <label className="mb-2 text-lg font-semibold">Nombre de usuario</label>
                        <input className="focus:outline-none  mb-6 px-2 py-1 border-solid border border-gray-400 rounded" placeholder="Nombre de usuario" name="username" type="text" />

                        <label className="mb-2 text-lg font-semibold">Email</label>
                        <input className="focus:outline-none  mb-6 px-2 py-1 border-solid border border-gray-400 rounded" placeholder="Email" name="email" type="email" />

                        <label className="mb-2 text-lg font-semibold">Contraseña</label>
                        <input className="focus:outline-none  mb-6 px-2 py-1 border border-gray-400 rounded" placeholder="Contraseña" name="password" type="password" />

                        <label className="mb-2 text-lg font-semibold">Cargo</label>
                        <input className="focus:outline-none  mb-6 px-2 py-1 border border-gray-400 rounded" placeholder="Cargo" name="job" type="text" />

                        <label className="mb-2 text-lg font-semibold">Rol de usuario</label>
                        <select ref={roleRef} className="border border-gray-400 focus:outline-none bg-white mb-6 px-2 py-1 rounded" name="role">
                            <option key="0" value={0}>Seleccionar un rol</option>
                            {
                                !loading
                                && userRoles.map((role, idx) => <option key={idx} value={role.idRole}>{role.roleName}</option>)
                            }
                        </select>
                    </div>
                </div>
                <div className="flex flex-col items-center mt-4">
                    {errorMsg.state && <div className="mb-4 bg-red-500 rounded px-4 py-1 font-semibold text-white">{errorMsg.msg}</div>}
                    {sendingRequest && <div className="mb-4 bg-yellow-700 rounded px-4 py-1 font-bold text-white">Procesando informacion...</div>}
                    {sentRequest && <div className="mb-4 bg-green-600 rounded px-4 py-1 font-bold text-white">Se ha enviado la solicitud de registro</div>}
                    <input className="hover:cursor-pointer bg-orange-800 text-lg font-semibold text-white py-1 px-3 rounded shadow-lg" value="Registrarse" type="submit" />
                </div>
            </form>
        </>
    );
}

export default RegisterForm;
