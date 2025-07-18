import { useState } from "react";
import logo from "../assets/images/logo.png";
import image from "../assets/images/image.png";
import Modal from "../components/Modal";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const IndexPage = () => {
    const [showModal, setShowModal] = useState(null);

    return (
        <>
            {showModal && <Modal children={showModal} onClose={() => setShowModal(null)} />}

            <div className={`bg-gray-200 h-screen ${showModal && "blur-sm"}`}>
                <div className="pt-6 pb-12 mb-12 bg-gradient-to-b from-orange-900 to-gray-200">
                    <img src={logo} className="ml-16 w-28" />
                </div>
                <div className="flex">
                    <div className="mx-24">
                        <p className="text-5xl font-bold mb-12 text-orange-900">Sea bienvenido al sistema</p>
                        <p className="text-xl font-semibold text-black">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut ullam, fugit veniam iusto sunt labore asperiores ducimus itaque unde veritatis? Veniam ducimus architecto sit cum voluptatem aspernatur eos harum similique?</p>
                        <button onClick={() => setShowModal(<LoginForm />)} className="transition duration-600 ease-in-out hover:bg-orange-800 hover:cursor-pointer mr-6 text-xl my-12 bg-orange-700 rounded-md py-2 px-3 font-semibold text-white shadow-lg">Iniciar sesion</button>
                        <button onClick={() => setShowModal(<RegisterForm />)} className="transition duration-600 ease-in-out hover:bg-orange-800 hover:cursor-pointer text-xl my-12 bg-orange-700 rounded-md py-2 px-3 font-semibold text-white shadow-lg">Registrarse</button>
                    </div>
                    <img style={{ maxWidth: "30vw" }} src={image} className="block ml-24 mr-0 w-auto h-auto" />
                </div>
            </div>
        </>
    );
}

export default IndexPage;
