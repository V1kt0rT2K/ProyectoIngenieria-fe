import { useRef, useState } from 'react';

const RegisterForm = () => {
    const [badInput, setBadInput] = useState(false);
    const [sentRequest, setSentRequest] = useState(false);
    const formRef = useRef(null);

    const register = (e) => {
        e.preventDefault();

        const formData = new FormData(formRef.current);

        for (let [key, val] of formData.entries()) {
            if (!val) {
                setSentRequest(false);
                setBadInput(true);
                return;
            }
        }

        setBadInput(false);
        setSentRequest(true);

        formRef.current.querySelectorAll("input").forEach(input => input.value = "");

        setTimeout(() => setSentRequest(false), 5000);
    }

    return (
        <>
            <form ref={formRef} onSubmit={register} >
                <div className="flex flex-col items-center mb-2">
                    <h1 className="text-2xl font-semibold">Registrarse</h1>
                    <p className="text-orange-900 text-md">Formulario de registro</p>
                </div>
                <div className="bg-gray-200 rounded-lg flex flex-col justify-center h-80 my-6 overflow-y-scroll pt-70 px-4">
                    <label className="mb-2 text-lg font-semibold">Nombre</label>
                    <input className="mb-6 px-2 py-1 border-solid border-1 border-gray-400 rounded-md" placeholder="Nombre" name="name" type="text" />

                    <label className="mb-2 text-lg font-semibold">Apellido</label>
                    <input className="mb-6 px-2 py-1 border-solid border-1 border-gray-400 rounded-md" placeholder="Apellido" name="last_name" type="text" />

                    <label className="mb-2 text-lg font-semibold">Email</label>
                    <input className="mb-6 px-2 py-1 border-solid border-1 border-gray-400 rounded-md" placeholder="Email" name="email" type="email" />

                    <label className="mb-2 text-lg font-semibold">Contraseña</label>
                    <input className="mb-6 px-2 py-1 border-1 border-gray-400 rounded-md" placeholder="Contraseña" name="pass" type="password" />

                    <label className="mb-2 text-lg font-semibold">Rol de usuario</label>
                    <select className="mb-6 px-2 py-1 border-1 border-gray-400 rounded-md" name="role">
                        <option value="0">Seleccionar un rol</option>
                        <option value="1">AAA</option>
                        <option value="1">SSS</option>
                    </select>

                    <label className="mb-2 text-lg font-semibold">Email</label>
                    <input className="mb-6 px-2 py-1 border-solid border-1 border-gray-400 rounded-md" placeholder="Email" name="email" type="email" />
                </div>
                <div className="flex flex-col items-center">
                    {!badInput ? "" : <div className="mb-4 bg-red-500 rounded-md px-4 py-1 font-bold text-white">Por favor, rellenar todos los campos</div>}
                    {!sentRequest ? "" : <div className="mb-4 bg-green-600 rounded-md px-4 py-1 font-bold text-white">Se ha enviado la solicitud de registro</div>}
                    <input className="hover:cursor-pointer bg-orange-800 text-lg font-extrabold text-white py-1 px-3 rounded-lg shadow-lg" value="Registrarse" type="submit" />
                </div>
            </form>
        </>
    );
}

export default RegisterForm;
