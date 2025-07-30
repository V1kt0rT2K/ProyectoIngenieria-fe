import { useEffect, useRef, useState } from "react";
import BackButton from "../../components/BackButton";
import Validator from "../../utils/Validator";
import ProviderService from "../../utils/service/ProviderService";

const NewProviderPage = () => {

    const formRef = useRef(null);
    const isLoading = useRef(false);
    const [isValid, setIsValid] = useState(true);

    const saveProvider = () =>{
        if(isLoading.current)
            return;

        setIsValid(true);

        let obj = {};

        formRef.current.querySelectorAll('input').forEach(element => {
            if (
                !element.value
                || element.name === "rtn" && !Validator.isRTN(element.value)
                || element.name === "contact" && !Validator.isEmail(element.value)
            )
                setIsValid(false);

            obj[element.name] = element.value;
        });

        if (!isValid) {
            console.log("Informacion no valida", obj);
            return;
        }

        isLoading.current = true;

        ProviderService.saveProvider(obj).then(response => {
             if(!response.hasError) {
                console.log("Proveedor guardado exitosamente", response);
                return;
             }

            //isLoading.current = false;
        });

        isLoading.current = false;
    }

    return (
        <>
            <div style={{ height: "80vh", width: "75vw" }} className="flex flex-col pt-8">
                <BackButton />
                <div className="flex justify-between">
                    <p className="mb-2 text-lg text-orange-800 font-semibold underline">Crear Proveedor</p>
                    { !isValid && <p className="mb-2 text-lg font-semibold bg-red-600 text-white rounded px-2 py-1">Informacion no valida</p> }
                </div>
                <div className="rounded overflow-y-auto p-0">
                    <div className="bg-orange-200 border border-orange-300 px-4 py-6 flex space-x-5 justify-between">
                        <div ref={formRef} className="flex flex-col flex-grow space-y-4">
                            {/* <p className="text-orange-700 underline font-semibold">RTN: {Configuration.RTN_NUMBER}</p> */}
                            <div className="flex flex-col bg-orange-100 text-md text-orange-800 px-4 py-2 space-y-2 rounded">
                                <p>Nombre del proveedor</p>
                                <input name="name" className="bg-orange-200 px-3 py-1 rounded font-bold focus:outline-none" />
                            </div>
                            <div className="flex flex-col bg-orange-100 text-md text-orange-800 px-4 py-2 space-y-2 rounded">
                                <p>RTN</p>
                                <input name="rtn" className="bg-orange-200 px-3 py-1 rounded font-bold focus:outline-none" />
                            </div>
                            <div className="flex flex-col bg-orange-100 text-md text-orange-800 px-4 py-2 space-y-2 rounded">
                                <p>Email</p>
                                <input name="contact" className="bg-orange-200 px-3 py-1 rounded font-bold focus:outline-none" />
                            </div>
                            <div className="flex flex-col bg-orange-100 text-md text-orange-800 px-4 py-2 space-y-2 rounded">
                                <p>Direccion</p>
                                <input name="address" className="bg-orange-200 px-3 py-1 rounded font-bold focus:outline-none" />
                            </div>
                        </div>
                        
                    </div>
                    <div className="mt-6 bg-orange-200 border border-orange-300 p-6">
                        
                        <div className="mt-2 flex justify-center">
                            <button 
                                className="bg-green-600 rounded px-3 py-1 font-semibold text-white mt-2"
                                onClick={() => saveProvider()}
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

export default NewProviderPage;