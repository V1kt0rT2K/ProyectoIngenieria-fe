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
            { showModal ? <Modal children={ showModal } onClose={ () => setShowModal(null) } /> : ""  }

            <div className={`bg-gray-200 h-screen ${ showModal ? "blur-xs" : ""}`}>
                <div className="pt-6 pb-12 mb-12 bg-gradient-to-b from-orange-900 to-gray-200">
                    <img src={ logo } className="ml-16 w-25" />
                </div>
                <div className="flex">
                    <div className="mx-24">
                        <p className="text-5xl font-extrabold mb-12 text-orange-900">Sea bienvenido al sistema</p>
                        <p className="text-xl font-bold text-black">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut ullam, fugit veniam iusto sunt labore asperiores ducimus itaque unde veritatis? Veniam ducimus architecto sit cum voluptatem aspernatur eos harum similique?</p>                        
                        <button onClick={() => setShowModal(<LoginForm />)} className="transition duration-600 ease-in-out hover:bg-orange-900 hover:cursor-pointer mr-6 text-xl my-12 bg-orange-800 rounded-md py-2 px-3 font-extrabold text-white shadow-lg">Iniciar sesion</button>
                        <button onClick={() => setShowModal(<RegisterForm />)} className="transition duration-600 ease-in-out hover:bg-orange-900 hover:cursor-pointer text-xl my-12 bg-orange-800 rounded-md py-2 px-3 font-extrabold text-white shadow-lg">Registrarse</button>
                    </div>
                    <img src={ image } className="ml-24 mr-0 w-100" />
                </div>
            </div>
        </>
    );
}

export default IndexPage;
