import { useState } from "react";
import BackButton from "../../components/BackButton";
import SwineBatchService from "../../utils/service/SwineBatchService";
import toast, { Toaster } from 'react-hot-toast';
const NewLotPage = () => {
    const [lots, setLots] = useState([]);

    const handleAddLot = () => {
        setLots([...lots, { quantity: 0, birthDate: "" }]);
    };

    const handleLotChange = (index, field, value) => {
        const newLots = [...lots];
        newLots[index][field] = value;
        setLots(newLots);
    };

    const removeLot = (idx) => {
        const updatedLots = [...lots];
        updatedLots.splice(idx, 1);
        setLots(updatedLots);
    };

    const handleSave = () => {
        console.log("Lote guardado:", lots);
        if (lots.length === 0) {
            toast.error("Debe agregar al menos un lote.");
        } else {
            lots.forEach(element => {
                SwineBatchService.createSwineBatch(element);
            });
            toast.success("Lotes guardados correctamente.");
            setLots([]);
        }
    };

    return (
        <>
            <div style={{ height: "80vh", width: "75vw" }} className="flex flex-col pt-8">
                <BackButton />
                <div>
                                <Toaster toastOptions={{ duration: 1500, removeDelay: 1000 }} />
                            </div>
                <p className="mb-2 text-lg text-orange-800 font-semibold underline">Nuevo lote</p>

                <div className="mt-6 bg-orange-200 border border-orange-300 p-6">
                    <p className="text-xl font-semibold text-orange-800 underline">Lotes</p>
                    <table className="flex-grow w-full table-auto justify-self-center mt-4">
                        <thead>
                            <tr>
                                <th className="border border-orange-900 bg-orange-700 text-white w-48 px-2">Cantidad de Cerdos</th>
                                <th className="border border-orange-900 bg-orange-700 text-white w-64 px-2">Fecha de Nacimiento</th>
                                <th className="border border-orange-900 bg-orange-700 text-white w-32 px-2">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lots.map((lot, idx) => (
                                <tr key={idx}>
                                    <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                        <input
                                            className="bg-orange-300 py-1 px-2 rounded w-32 text-orange-700 font-extrabold focus:outline-none"
                                            type="number"
                                            min="1"
                                            value={lot.quantity}
                                            onChange={(e) => handleLotChange(idx, "quantity", parseInt(e.target.value))}
                                        />
                                    </td>
                                    <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                        <input
                                            className="bg-orange-300 py-1 px-2 rounded w-full text-orange-700 font-semibold focus:outline-none"
                                            type="date"
                                            value={lot.birthDate}
                                            onChange={(e) => handleLotChange(idx, "birthDate", e.target.value)}
                                        />
                                    </td>
                                    <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                        <button
                                            onClick={() => removeLot(idx)}
                                            className="flex justify-center block px-4 py-2 font-semibold text-md text-white bg-orange-800 hover:cursor-pointer rounded hover:bg-orange-900"
                                        >
                                            Borrar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-center">
                        <button
                            onClick={handleAddLot}
                            className="bg-orange-700 rounded px-3 py-1 font-semibold text-white mt-2"
                        >
                            + Añadir lote
                        </button>
                    </div>

                    <div className="mt-2 flex justify-center">
                        <button
                            className="bg-green-600 rounded px-3 py-1 font-semibold text-white mt-2"
                            onClick={handleSave}
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewLotPage;
