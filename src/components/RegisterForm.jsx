const RegisterForm = () => {
    return (
        <>
            <div>
                <div className="flex flex-col items-center mb-2">
                    <h1 className="text-2xl font-semibold">Registrarse</h1>
                    <p className="text-orange-900 text-md">Formulario de registro</p>
                </div>
                <div className="flex flex-col justify-center">
                    <label className="mb-2 text-lg font-semibold">Nombre</label>
                    <input required className="mb-6 px-2 py-1 border-solid border-1 border-gray-400 rounded-md" placeholder="Nombre" type="text" />

                    <label className="mb-2 text-lg font-semibold">Apellido</label>
                    <input required className="mb-6 px-2 py-1 border-solid border-1 border-gray-400 rounded-md" placeholder="Apellido" type="text" />

                    <label className="mb-2 text-lg font-semibold">Email</label>
                    <input required className="mb-6 px-2 py-1 border-solid border-1 border-gray-400 rounded-md" placeholder="Email" type="email" />

                    <label className="mb-2 text-lg font-semibold">Contraseña</label>
                    <input required className="mb-6 px-2 py-1 border-1 border-gray-400 rounded-md" placeholder="Contraseña" type="password" />
                </div>
                <div className="flex justify-center">
                    <button className="hover:cursor-pointer bg-orange-800 text-lg font-extrabold text-white py-1 px-3 rounded-lg">Registrarse</button>
                </div>
            </div>
        </>
    );
}

export default RegisterForm;