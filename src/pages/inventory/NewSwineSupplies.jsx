import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import SwineBatchService from "../../utils/service/SwineBatchService";
import SwineSuppliesService from "../../utils/service/SwineSuppliesService";
import SupplyService from "../../utils/service/SupplyService";
import SupplyBatchService from "../../utils/service/SupplyBatchService";
import toast, { Toaster } from "react-hot-toast";

const NewSwineSupplies = () => {
    const { idLote } = useParams();
    //const navigate = useNavigate();

    const [loteData, setLoteData] = useState(null);
    const [supplies, setSupplies] = useState([]);
    const [newSupplies, setNewSupplies] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const loteResponse = await SwineBatchService.getSwineBatchById(idLote);
                if (!loteResponse.hasError) {
                    setLoteData(loteResponse.data);
                }

                const suppliesResponse = await SupplyService.getAll();
                if (!suppliesResponse.hasError) {
                    setSupplies(suppliesResponse.data);
                }
            } catch (error) {
                console.error("Error cargando datos:", error);
            }
        };
        fetchData();
    }, [idLote]);

    const handleAddSupply = () => {
        setNewSupplies([...newSupplies, { supplyId: "", quantity: 0, expirationDate: "" }]);
    };

    const handleChange = (index, field, value) => {
        const updated = [...newSupplies];
        updated[index][field] = value;
        setNewSupplies(updated);
    };
const removeSupply = (idx) => {
    const updated = [...newSupplies];
    updated.splice(idx, 1);
    setNewSupplies(updated);
};

const executeSave = async () => {
    try {
        const currentUser = JSON.parse(localStorage.getItem("session"));
        if (!currentUser?.idUser) {
            throw new Error("Usuario no autenticado");
        }

        

        const payload = {
            idSwineBatch: parseInt(idLote),
            idUser: currentUser.idUser,
            detail: newSupplies.map(s => ({
                idSupply: parseInt(s.supplyId),
                quantity: parseFloat(s.quantity),
                generationDate: new Date(s.generationDate ).toISOString().split('T')[0]
            }))
        };

        console.log("Payload corregido:", JSON.stringify(payload, null, 2));
        
        const response = await SwineSuppliesService.createSwineSupplies(payload);
        
        if (response.hasError) {
        toast.error( response.meta.message);
        } else {
            toast.success("Insumos suministrados correctamente.");
            setNewSupplies([]);
        }
    } catch (error) {
        console.error("Error en executeSave:", error);
        const errorMessage = error.message || "Error inesperado en la aplicación";
        toast.error(errorMessage);
    }
};


    const handleSave = () => {
        if (newSupplies.length === 0) {
            toast.error("Debe agregar al menos un insumo.");
            return;
        }

        const invalid = newSupplies.find(s => !s.supplyId || !s.quantity || !s.generationDate);
        if (invalid) {
            toast.error("Debe completar todos los campos antes de guardar.");
            return;
        }

        setShowConfirmModal(true);
    };

    return (
        <div style={{ height: "80vh", width: "75vw" }} className="flex flex-col pt-8">
            <BackButton />
            <div>
                <Toaster 
                    toastOptions={{
                        className: "",
                        duration: 1500,
                        removeDelay: 1000,
                    }}
                />
            </div>

            <p className="mb-2 text-lg text-orange-800 font-semibold underline">
                Suministrar Insumos al Lote #{idLote}
            </p>

            <div className="rounded overflow-y-auto p-0">
                <div className="bg-orange-200 border border-orange-300 px-4 py-6 flex space-x-5 justify-between">
                    {loteData && (
                        <div className="flex flex-col flex-grow space-y-3">
                            <div className="flex flex-col bg-orange-100 text-md text-orange-800 px-4 py-2 space-y-2 rounded">
                                <p><b>Cantidad Inicial:</b> {loteData.quantity}</p>
                                <p><b>Stock:</b> {loteData.stockQuantity}</p>
                                <p><b>Fecha Nacimiento:</b> {new Date(loteData.birthDate).toISOString().split('T')[0]}</p>
                                <p><b>Fecha Ingreso:</b> {new Date(loteData.generationDate).toISOString().split('T')[0]}</p>
                                <p><b>Etapa:</b> {loteData.Stage?.stageName || "Desconocido"}</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-6 bg-orange-200 border border-orange-300 p-6">
                    <p className="text-xl font-semibold text-orange-800 underline">Agregar Insumos</p>
                    <table className="flex-grow w-full table-auto justify-self-center mt-4">
                        <thead>
                            <tr>
                                <th className="border border-orange-900 bg-orange-700 text-white w-48 px-2">Insumo</th>
                                <th className="border border-orange-900 bg-orange-700 text-white w-32 px-2">Cantidad</th>
                                <th className="border border-orange-900 bg-orange-700 text-white w-48 px-2">Fecha Consumo</th>
                                <th className="border border-orange-900 bg-orange-700 text-white w-48 px-2">Accion</th>
                            </tr>
                        </thead>
                        <tbody>
    {newSupplies.map((row, idx) => (
        <tr key={idx}>
            <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                <select
                    className="bg-orange-300 px-2 py-1 rounded font-semibold text-orange-700"
                    value={row.supplyId}
                    onChange={(e) => handleChange(idx, "supplyId", e.target.value)}
                >
                    <option value="">Seleccionar insumo</option>
                    {supplies.map((supply) => (
                        <option key={supply.idSupply} value={supply.idSupply}>
                            {supply.nameSupply}
                        </option>
                    ))}
                </select>
            </td>
            <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                <input
                    type="number"
                    min="1"
                    className="bg-orange-300 py-1 px-2 rounded w-16 text-orange-700 font-extrabold focus:outline-none"
                    value={row.quantity}
                    onChange={(e) => handleChange(idx, "quantity", e.target.value)}
                />
            </td>
            <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                <input
                    type="date"
                    className="bg-orange-300 py-1 px-2 rounded w-40 text-orange-700 font-extrabold focus:outline-none"
                    value={row.generationDate}
                    onChange={(e) => handleChange(idx, "generationDate", e.target.value)}
                />
            </td>
            <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                <button
                    onClick={() => removeSupply(idx)}
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
                            onClick={handleAddSupply}
                            className="bg-orange-700 rounded px-3 py-1 font-semibold text-white mt-2"
                        >
                            + Añadir insumo
                        </button>
                    </div>

                    <div className="mt-4 flex justify-center">
                        <button
                            className="px-3 py-1 bg-green-600 rounded text-md text-white font-semibold"
                            onClick={handleSave}
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </div>

            {showConfirmModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white w-96 rounded-xl shadow-lg p-6">
                        <h2 className="text-lg font-bold text-orange-800 mb-4">Confirmación</h2>
                        <p className="text-sm text-gray-700 mb-6">
                            ¿Está seguro que desea suministrar estos insumos al lote?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                            >
                                No
                            </button>
                            <button
                                onClick={() => {
                                    executeSave();
                                    setShowConfirmModal(false);
                                }}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Sí
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewSwineSupplies;
