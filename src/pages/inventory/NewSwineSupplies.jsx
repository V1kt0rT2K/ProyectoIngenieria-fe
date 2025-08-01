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
const decrementarLotes = async (idSupply, quantityNeeded) => {
    try {
        // Traer todos los lotes del insumo ordenados por expiración
        const response = await SupplyBatchService.getSuppbyBatchbyMenorExpirationDate();
        if (response.hasError) {
            toast.error("No se pudieron obtener los lotes de insumos.");
            return false;
        }
        const lotes = response.data.filter(lote => lote.idSupply === idSupply);
        let cantidadRestante = quantityNeeded;
        console.log(lotes)
        for (let lote of lotes) {
            console.log(`Procesando lote con ID: ${lote.idSupplyBatch}, Stock: ${lote.stockQuantity}`);
            if (cantidadRestante <= 0) break;

            const disponible = parseFloat(lote.stockQuantity);
            const aDescontar = Math.min(disponible, cantidadRestante);

            // Llamar al backend para actualizar stock
            const result = await SupplyBatchService.updateStckSupplyBatch(lote.idSupplyBatch, aDescontar);

            if (result.hasError) {
                toast.error(`Error al descontar del lote con id ${lote.idSupplyBatch}`);
                return false;
            }

            cantidadRestante -= aDescontar;
        }

        if (cantidadRestante > 0) {
            toast.error(`Stock insuficiente para el insumo con ID ${idSupply}.`);
            return false;
        }

        return true;

    } catch (error) {
        console.error("Error en decrementarLotes:", error);
        toast.error("Error al intentar decrementar lotes.");
        return false;
    }
};

    const executeSave = async () => {
    
        try {
            const session = localStorage.getItem("session"); 
            if (!session) {
                toast.error("Debe iniciar sesión para realizar esta acción.");
            return;}
                const User=JSON.parse(session);

    for (let supply of newSupplies) {
        const idSupply = parseInt(supply.supplyId);
        const quantity = parseInt(supply.quantity);
        const decrementado = await decrementarLotes(idSupply, quantity);
        if (!decrementado) {
            toast.error(`No se pudo suministrar el insumo con ID ${idSupply}`);
            return;
    }

        const payload = newSupplies.map(supply => ({
            idSwineBatch: parseInt(idLote),
            idSupply: parseInt(supply.supplyId),
            quantity: parseInt(supply.quantity),
            generationDate: new Date(supply.generationDate + "T00:00:00"), // adaptamos generationDate como generación
            idUser: User.idUser
        }));

            console.log("Payload to save:", payload);
            payload.forEach(SwineSupplies => {
                const response = SwineSuppliesService.createSwineSupplies(SwineSupplies);
            if (!response.hasError) {
                toast.success("Insumos suministrados correctamente.");
                setNewSupplies([]);
                return;
            } else {
                toast.error("Error al guardar insumos.");
            }
            
            });
            }
            
        } catch (error) {
            console.error("Error al guardar insumos:", error);
            toast.error("No se pudo guardar. Intente nuevamente.");
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
                                <p><b>Fecha Nacimiento:</b> {new Date(loteData.birthDate).toLocaleDateString()}</p>
                                <p><b>Fecha Ingreso:</b> {new Date(loteData.generationDate).toLocaleDateString()}</p>
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
