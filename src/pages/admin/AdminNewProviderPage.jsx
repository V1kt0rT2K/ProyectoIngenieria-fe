import { useEffect, useRef, useState } from "react";
import BackButton from "../../components/BackButton";
import Validator from "../../utils/Validator";
import ProviderService from "../../utils/service/ProviderService";
import toast, { Toaster } from 'react-hot-toast';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const AdminNewProviderPage = () => {

    const navigate = useNavigate();
    const formRef = useRef(null);

    const location = useLocation();

    const [providerData, setProviderData] = useState({
        name: "",
        rtn: "",
        contact: "",
        address: ""
    });

    useEffect(() => {
        console.log(location.state?.id);
        console.log(location.pathname == '/admin/providers/edit_provider');
        ProviderService.getProviderById(location.state?.id).then(response => {
            if (!response.hasError) {
                const { providerName, RTN, providerContact, location } = response.data;
                setProviderData({
                    name: providerName,
                    rtn: RTN,
                    contact: providerContact,
                    address: location
                });
            } else {
                //toast.error("No se pudo cargar el proveedor.");
            }
        });
    }, []);

    const isLoading = useRef(false);
    const isCorrect = useRef(true);

    const saveProvider = () => {
        if (isLoading.current)
            return;

        isCorrect.current = true;

        let obj = {};

        formRef.current.querySelectorAll('input').forEach(element => {
            if (
                !element.value
                || element.name === "rtn" && !Validator.isRTN(element.value)
                || element.name === "contact" && !Validator.isEmail(element.value)
            ) {
                isCorrect.current = false;
            }

            obj[element.name] = element.value;
        });

        if (!isCorrect.current) {
            toast.error("Informacion no valida");
            return;
        }

        isLoading.current = true;


        if (location.state?.id) {
            // Modo editar
            const payload = {
                idProvider : location.state?.id,
                values : obj
            }
            ProviderService.updateProvider(payload).then((response) => {
                if (!response.hasError) {
                    toast.success("Proveedor actualizado con éxito");
                } else {
                    toast.error(response.meta.message);
                }
            });
        } else {
            // Modo crear
            console.log("Pasado la validacion.");
            ProviderService.saveProvider(obj).then((response) => {
                if (!response.hasError) {
                    console.log("Proveedor guardado exitosamente", response);
                    toast.success("Proveedor creado con éxito");
                    navigate("/providers");
                } else {
                    toast.error(response.meta.message);
                }
            });
        }

        isLoading.current = false;
    }

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
                    <p className="mb-2 text-lg text-orange-800 font-semibold underline">Crear Proveedor</p>
                    {/* { !isValid && <p className="mb-2 text-lg font-semibold bg-red-600 text-white rounded px-2 py-1">Informacion no valida</p> } */}
                </div>
                <div className="rounded overflow-y-auto p-0">
                    <div className="bg-orange-200 border border-orange-300 px-4 py-6 flex space-x-5 justify-between">
                        <div ref={formRef} className="flex flex-col flex-grow space-y-4">
                            {/* <p className="text-orange-700 underline font-semibold">RTN: {Configuration.RTN_NUMBER}</p> */}
                            <div className="flex flex-col bg-orange-100 text-md text-orange-800 px-4 py-2 space-y-2 rounded">
                                <p>Nombre del proveedor</p>
                                <input
                                    name="name"
                                    className="bg-orange-200 px-3 py-1 rounded font-bold focus:outline-none"
                                    value={providerData.name}
                                    onChange={(e) => setProviderData({ ...providerData, name: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col bg-orange-100 text-md text-orange-800 px-4 py-2 space-y-2 rounded">
                                <p>RTN</p>
                                <input
                                    name="rtn"
                                    className="bg-orange-200 px-3 py-1 rounded font-bold focus:outline-none"
                                    value={providerData.rtn}
                                    onChange={(e) => setProviderData({ ...providerData, rtn: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col bg-orange-100 text-md text-orange-800 px-4 py-2 space-y-2 rounded">
                                <p>Email</p>
                                <input
                                    name="contact"
                                    className="bg-orange-200 px-3 py-1 rounded font-bold focus:outline-none"
                                    value={providerData.contact}
                                    onChange={(e) => setProviderData({ ...providerData, contact: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col bg-orange-100 text-md text-orange-800 px-4 py-2 space-y-2 rounded">
                                <p>Direccion</p>
                                <input
                                    name="address"
                                    className="bg-orange-200 px-3 py-1 rounded font-bold focus:outline-none"
                                    value={providerData.address}
                                    onChange={(e) => setProviderData({ ...providerData, address: e.target.value})}
                                />
                            </div>
                        </div>

                    </div>
                    {
                        (location.pathname == '/admin/providers/edit_provider' || location.pathname == '/admin/providers/new_provider') && 
                        (
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
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default AdminNewProviderPage;