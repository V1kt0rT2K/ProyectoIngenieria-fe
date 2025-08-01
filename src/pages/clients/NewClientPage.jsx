import toast, { Toaster } from "react-hot-toast";
import BackButton from "../../components/BackButton";
import { useEffect, useRef, useState } from "react";
import Validator from "../../utils/Validator";
import ClientService from "../../utils/service/ClientService";
import { useNavigate } from "react-router-dom";
import SellerService from "../../utils/service/SellerService";

const NewClientPage = () => {
    const formRef = useRef(null);
    const navigate = useNavigate();
    const [clientTypes,setClientTypes] = useState([]);

    const isLoading = useRef(false);
    const isCorrect = useRef(true);

    useEffect(() =>{
        SellerService.getClientTypes().then(response => {
            if(!response.hasError){
                setClientTypes(response.data);
            }
        });
    },[]);
    
    const saveClient = () => {
        if (isLoading.current)
            return;

        isCorrect.current = true;

        let obj = {};

        const form = formRef.current;

        form.querySelectorAll('input').forEach(element => {
            const value = element.value;
            const name = element.name;

            if (
                (!value && element.name === "identification")
                || (value
                    && (name === "identification" && !Validator.isIdentityNumber(value)
                        || name === "contact" && !Validator.isContact(value)
                    )
                )
            ) {
                isCorrect.current = false;
            }

            obj[name] = value === "" ? null : value;
        });

        obj["idClientType"] = parseInt(form.querySelector("select").value);

        if (obj["idClientType"] === 0)
            isCorrect.current = false;

        if (!isCorrect.current) {
            toast.error("Informacion no valida");
            return;
        }

        isLoading.current = true;

        ClientService.saveClient(obj).then((response) => {
            if (!response.hasError) {
                toast.success("Cliente creado con éxito");
                form.querySelectorAll("input").forEach(input => input.value = "");
                form.querySelector("select").value = "0";
                toast.success("Cliente creado con éxito.");
                navigate(-1);
            } else {
                toast.error(response.meta.message);
            }
        });        

        isLoading.current = false;
    };

    return (
        <>
            <div><Toaster
                toastOptions={{
                    className: '',
                    duration: 1500,
                    removeDelay: 1000
                }} />
            </div>
            <div style={{ height: "80vh", width: "75vw" }} className="flex flex-col pt-8">
                <BackButton />
                <div className="flex justify-between">
                    <p className="mb-2 text-lg text-orange-800 font-semibold underline">Crear cliente</p>
                    {/* { !isValid && <p className="mb-2 text-lg font-semibold bg-red-600 text-white rounded px-2 py-1">Informacion no valida</p> } */}
                </div>
                <div className="rounded overflow-y-auto p-0">
                    <div className="bg-orange-200 border border-orange-300 px-4 py-6 flex space-x-5 justify-between">
                        <div ref={formRef} className="flex flex-col flex-grow space-y-4">
                            {/* <p className="text-orange-700 underline font-semibold">RTN: {Configuration.RTN_NUMBER}</p> */}
                            <div className="flex flex-col bg-orange-100 text-md text-orange-800 px-4 py-2 space-y-2 rounded">
                                <p>Identidad</p>
                                <input
                                    name="identification"
                                    className="bg-orange-200 px-3 py-1 rounded font-bold focus:outline-none"
                                />
                            </div>
                            <div className="flex flex-col bg-orange-100 text-md text-orange-800 px-4 py-2 space-y-2 rounded">
                                <p>Nombre</p>
                                <input
                                    
                                    name="fullName"
                                    className="bg-orange-200 px-3 py-1 rounded font-bold focus:outline-none"
                                />
                            </div>
                            <div className="flex flex-col bg-orange-100 text-md text-orange-800 px-4 py-2 space-y-2 rounded">
                                <p>Contacto</p>
                                <input
                                    placeholder="Correo: abcd@gmail.com o Numero de Telefono"
                                    name="contact"
                                    className="bg-orange-200 px-3 py-1 rounded font-bold focus:outline-none"
                                />
                            </div>
                            <div className="flex flex-col bg-orange-100 text-md text-orange-800 px-4 py-2 space-y-2 rounded">
                                <p>Direccion</p>
                                <input
                                    name="address"
                                    className="bg-orange-200 px-3 py-1 rounded font-bold focus:outline-none"
                                />
                            </div>
                            <div className="flex flex-col bg-orange-100 text-md text-orange-800 px-4 py-2 space-y-2 rounded">
                                <p>Tipo de cliente</p>
                                {
                                    clientTypes && (
                                        <select  className="bg-orange-200 px-3 py-1 rounded font-bold focus:outline-none">
                                            <option value="0">Seleccionar tipo de cliente</option>
                                            {
                                                clientTypes.map((type,idx) =>
                                                    <option key={type.idClientType}
                                                            value={type.idClientType}
                                                    >
                                                        {type.clientTypeName}
                                                    </option>
                                                )
                                            }
                                        </select>
                                    )
                                }
                            </div>
                        </div>

                    </div>
                        <div className="mt-6 bg-orange-200 border border-orange-300 p-6">
                            <div className="mt-2 flex justify-center">
                                <button
                                    className="bg-green-600 rounded px-3 py-1 font-semibold text-white mt-2"
                                    onClick={() => saveClient()}
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                </div>
            </div>
        </>
    );    
};

export default NewClientPage;