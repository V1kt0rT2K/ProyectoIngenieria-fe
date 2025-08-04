import toast, { Toaster } from "react-hot-toast";
import BackButton from "../../components/BackButton";
import { useEffect, useRef, useState } from "react";
import Validator from "../../utils/Validator";
import { useNavigate } from "react-router-dom";
import AdminService from "../../utils/service/AdminService";

const NewReportPage = () => {
    const formRef = useRef(null);
    const navigate = useNavigate();
    //const [reportTypes, setReportTypes] = useState([]);

    const isLoading = useRef(false);
    const isCorrect = useRef(true);

    // useEffect(() => {
    //     AdminService.getReportTypes().then(response => {
    //         if (!response.hasError) {
    //             setReportTypes(response.data);
    //         }
    //     });
    // }, []);

    const saveReport = () => {
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

        obj["idReportType"] = parseInt(form.querySelector("select").value);

        if (obj["idReportType"] === 0)
            isCorrect.current = false;

        if (!isCorrect.current) {
            toast.error("Informacion no valida");
            return;
        }

        isLoading.current = true;

        AdminService.saveReport(obj).then((response) => {
            if (!response.hasError) {
                toast.success("Reporte creado con éxito");
                form.querySelectorAll("input").forEach(input => input.value = "");
                form.querySelector("select").value = "0";
                toast.success("RFeporte creado con éxito.");
                navigate(-1);
            } else {
                toast.error(response.meta.message);
            }
        });

        isLoading.current = false;
    };

    const reportTypes = (
        [{
            idReportType: 1,
            reportTypeName: "Ventas"
        },
        {
            idReportType: 2,
            reportTypeName: "Compras"
        }]
    );

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
                {/* <div className="flex justify-between">
                    <p className="mb-2 text-lg text-orange-800 font-semibold underline">Crear Reporte</p>
                    { !isValid && <p className="mb-2 text-lg font-semibold bg-red-600 text-white rounded px-2 py-1">Informacion no valida</p> }
                </div> */}
                <div className="rounded overflow-y-auto p-0">
                    <div className="bg-orange-200 border border-orange-300 px-4 py-6 flex space-x-5 justify-between">
                        <div ref={formRef} className="flex flex-col flex-grow space-y-4">
                            {/* <p className="text-orange-700 underline font-semibold">RTN: {Configuration.RTN_NUMBER}</p> */}
                            {/* <div className="flex flex-col bg-orange-100 text-md text-orange-800 px-4 py-2 space-y-2 rounded">
                                <p>No. Reporte</p>
                                <input
                                    name="idReport"
                                    className="bg-orange-200 px-3 py-1 rounded font-bold focus:outline-none"
                                />
                            </div> */}
                            <div className="flex flex-col bg-orange-100 text-md text-orange-800 px-4 py-2 space-y-2 rounded">
                                <p>Nombre del Reporte</p>
                                <input

                                    name="reportName"
                                    className="bg-orange-200 px-3 py-1 rounded font-bold focus:outline-none"
                                />
                            </div>
                            <div className="flex flex-col bg-orange-100 text-md text-orange-800 px-4 py-2 space-y-2 rounded">
                                <p>Tipo de Reporte</p>
                                {
                                    reportTypes && (
                                        <select className="bg-orange-200 px-3 py-1 rounded font-bold focus:outline-none">
                                            <option value="0">Seleccionar tipo de reporte</option>
                                            {
                                                reportTypes.map((type, idx) =>
                                                    <option key={type.idReportType}
                                                        value={type.idReportType}
                                                    >
                                                        {type.reportTypeName}
                                                    </option>
                                                )
                                            }
                                        </select>
                                    )
                                }
                            </div>
                            <div className="flex justify-between rounded">
                                <div className="flex-grow space-y-4 justify-center rounded">
                                    <div className="bg-orange-100 py-2 flex flex-col ">
                                        <div className="flex justify-between items-center text-md text-orange-800 font-bold px-4">
                                            <p>Fecha Inicial</p>
                                            <input className="bg-orange-200 rounded px-3 py-2" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-grow space-y-4 justify-center rounded pl-2">
                                    <div className="bg-orange-100 py-2 flex flex-col ">
                                        <div className="flex justify-between items-center text-md text-orange-800 font-bold px-4">
                                            <p>Fecha Final</p>
                                            <input className="bg-orange-200 rounded px-3 py-2" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="mt-6 bg-orange-200 border border-orange-300 p-6">
                        <div className="mt-2 flex justify-center">
                            <button
                                className="bg-green-600 rounded px-3 py-1 font-semibold text-white mt-2"
                                onClick={() => saveReport()}
                            >
                                Generar Reporte
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewReportPage;