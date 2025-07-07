import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BackButton from "../../components/BackButton";

const LotInfoPage = () => {
    const location = useLocation();
    const { id } = location.state;

    useEffect(() => {

    }, []);

    return (
        <>
            <div style={{ height: "80vh", width: "75vw" }} className="flex flex-col pt-8">
                <BackButton />
                <div className="bg-orange-200 rounded overflow-y-auto p-4 border border-orange-700">
                    <div className="flex space-x-5 justify-between">
                        <div className="bg-orange-100 flex flex-col flex-grow space-y-2 py-2 justify-center rounded-lg pl-2">
                            <p className="ml-4 mb-1 text-lg text-orange-800 font-semibold underline">Lote No. {id}</p>
                            <div className="flex justify-between items-center text-md text-orange-800 font-bold px-4">
                                <p>Fecha de ingreso</p>
                                <input className="bg-orange-200 rounded-md px-3 py-4" type="date" />
                            </div>
                            <div className="flex justify-between items-center text-md text-orange-800 font-bold px-4">
                                <p>Fecha estimada de salida</p>
                                <input className="bg-orange-200 rounded-md px-3 py-4" type="date" />
                            </div>
                        </div>
                        <div className="flex flex-col flex-grow space-y-4">
                            <div className="flex flex-col bg-orange-100 text-md text-orange-800 font-bold px-4 py-2 space-y-2 rounded-lg">
                                <p>Estado</p>
                                <select className="bg-orange-200 px-3 py-2 rounded-lg hover:cursor-pointer">
                                    <option key={0}>Seleccionar estado del lote</option>
                                </select>
                            </div>
                            <div className="flex flex-col bg-orange-100 text-md text-orange-800 px-4 py-2 space-y-2 rounded-lg">
                                <p className="font-bold">Observaciones</p>
                                <textarea style={{ resize: "none", height: "4em" }} className="h-12 rounded-lg bg-orange-200 px-3 py-1"></textarea>
                            </div>
                        </div>
                    </div>
                    <p className="mt-12 text-xl font-semibold text-orange-800 underline">Información animal</p>
                    <table className="flex-grow w-full table-fixed justify-self-center mt-4">
                        <thead>
                            <tr>
                                <th className="border border-orange-900 px-5 bg-orange-700 text-white">No. cerdo</th>
                                <th className="border border-orange-900 px-5 bg-orange-700 text-white">Nacimiento</th>
                                <th className="border border-orange-900 px-5 bg-orange-700 text-white">Peso actual</th>
                                <th className="border border-orange-900 px-5 bg-orange-700 text-white">Obs. salubre</th>
                                <th className="border border-orange-900 px-5 bg-orange-700 text-white">Tiempo de engorde</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">S</td>
                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">S</td>
                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">S</td>
                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">S</td>
                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">S</td>
                            </tr>
                            <tr>
                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">S</td>
                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">S</td>
                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">S</td>
                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">S</td>
                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">S</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="flex justify-center">
                        <button className="bg-orange-700 rounded-lg px-3 py-1 font-semibold text-white mt-2">Añadir animal</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default LotInfoPage;