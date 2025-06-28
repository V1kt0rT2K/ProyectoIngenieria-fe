import { useEffect, useRef, useState } from 'react';
import Configuration from "../Configuration";

const RegisterForm = () => {
    const [errorMsg, setErrorMsg] = useState({ state: false, msg: null });
    const [sentRequest, setSentRequest] = useState(false);
    const [sendingRequest, setSendingRequest] = useState(false);

    const [loading, setLoading] = useState(true);
    const [userRoles, setUserRoles] = useState([]);

    const formRef = useRef(null);
    const roleRef = useRef(null);

    useEffect(() => {
        const getUserRoles = async () => {
            try {
                const res = await fetch(`${Configuration.API_BASE_URL}/roles/get/all`);
                const data = await res.json();
                setUserRoles(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        getUserRoles();
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

        obj["idRole"] = roleRef.current.value;
        obj["job"] = "ADMIN";

        setErrorMsg({ state: false, msg: null });
        setSendingRequest(true);

        const res = await fetch(`${Configuration.API_BASE_URL}/user/register`, {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        });

        setSendingRequest(false);

        if (!res.ok) {
            setErrorMsg({ state: true, msg: await res.text() });
            return;
        }

        setSentRequest(true);

        formRef.current.querySelectorAll("input").forEach(input => input.value = "");
        roleRef.current.value = 0;
        setTimeout(() => setSentRequest(false), 5000);
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
                        <div className="flex">
                            <div>
                                <label className="mb-2 text-lg font-semibold">Primer nombre</label>
                                <input className="focus:outline-none mb-6 px-2 py-1 border-solid border-1 border-gray-400 rounded-md" placeholder="Primer nombre" name="firstName" type="text" />
                            </div>
                            <div>
                                <label className="mb-2 text-lg font-semibold">Segundo nombre</label>
                                <input className="focus:outline-none mb-6 px-2 py-1 border-solid border-1 border-gray-400 rounded-md" placeholder="Segundo nombre" name="secondName" type="text" />
                            </div>
                        </div>
                        <div className="flex">
                            <div>
                                <label className="mb-2 text-lg font-semibold">Primer apellido</label>
                                <input className="focus:outline-none  mb-6 px-2 py-1 border-solid border-1 border-gray-400 rounded-md" placeholder="Primer apellido" name="lastName" type="text" />
                            </div>
                            <div>
                                <label className="mb-2 text-lg font-semibold">Segundo apellido</label>
                                <input className="focus:outline-none  mb-6 px-2 py-1 border-solid border-1 border-gray-400 rounded-md" placeholder="Segundo apellido" name="secondLastName" type="text" />
                            </div>
                        </div>

                        <label className="mb-2 text-lg font-semibold">Numero de identidad</label>
                        <input className="focus:outline-none  mb-6 px-2 py-1 border-solid border-1 border-gray-400 rounded-md" placeholder="Numero de identidad" name="identityNumber" type="text" />

                        <label className="mb-2 text-lg font-semibold">Nombre de usuario</label>
                        <input className="focus:outline-none  mb-6 px-2 py-1 border-solid border-1 border-gray-400 rounded-md" placeholder="Nombre de usuario" name="username" type="text" />

                        <label className="mb-2 text-lg font-semibold">Email</label>
                        <input className="focus:outline-none  mb-6 px-2 py-1 border-solid border-1 border-gray-400 rounded-md" placeholder="Email" name="email" type="email" />

                        <label className="mb-2 text-lg font-semibold">Contraseña</label>
                        <input className="focus:outline-none  mb-6 px-2 py-1 border-1 border-gray-400 rounded-md" placeholder="Contraseña" name="password" type="password" />

                        <label className="mb-2 text-lg font-semibold">Rol de usuario</label>
                        <select ref={ roleRef } className="focus:outline-none bg-white mb-6 px-2 py-1 rounded-md" name="role">
                            <option key="0" value={ 0 }>Seleccionar un rol</option>
                            {
                                !loading
                                && userRoles.map((role, idx) => <option key={ idx } value={ role.idRole }>{ role.roleName }</option> )
                            }
                        </select>
                    </div>
                </div>
                <div className="flex flex-col items-center mt-4">
                    { errorMsg.state && <div className="mb-4 bg-red-500 rounded-md px-4 py-1 font-semibold text-white">{ errorMsg.msg }</div> }
                    { sendingRequest && <div className="mb-4 bg-yellow-700 rounded-md px-4 py-1 font-bold text-white">Procesando informacion...</div> }
                    { sentRequest && <div className="mb-4 bg-green-600 rounded-md px-4 py-1 font-bold text-white">Se ha enviado la solicitud de registro</div> }
                    <input className="hover:cursor-pointer bg-orange-800 text-lg font-semibold text-white py-1 px-3 rounded-lg shadow-lg" value="Registrarse" type="submit" />
                </div>
            </form>
        </>
    );
}

export default RegisterForm;
