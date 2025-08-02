import { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import SellerService from "../../utils/service/SellerService";
import SwineBatchService from "../../utils/service/SwineBatchService";
import ProductBatchService from "../../utils/service/ProductBatchService";
import toast, { Toaster } from 'react-hot-toast';

const NewProductBatch = () => {
    const [swineBatches, setSwineBatches] = useState([]);
    const [products, setProducts] = useState([]);
    const [entries, setEntries] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState("");
    const [selectquantitySwine, setSelectQuantitySwine] = useState(0);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [swineBatchData, setSwineBatchData] = useState(null);

    useEffect(() => {
        SellerService.getAllProducts().then(response => {
            if (!response.hasError) {
                setProducts(response.data);
            }
        });

        SwineBatchService.getSwineBatchByIdStage(5).then(response => {
            if (!response.hasError) {
                setSwineBatches(response.data);
            }
        });

        if (selectedBatch) {
            SwineBatchService.getSwineBatchById(selectedBatch).then(response => {
                if (!response.hasError) {
                    setSwineBatchData(response.data);
                } else {
                    setSwineBatchData(null);
                    toast.error("Error al obtener el lote seleccionado.");
                }
            });
        } else {
            setSwineBatchData(null);
        }
    }, [selectedBatch]);

    const handleAddEntry = () => {
        if (!selectedBatch) {
            toast.error("Debe seleccionar un lote de cerdos antes de añadir productos.");
            return;
        }

        const newEntry = {
            idSwineBatch: selectedBatch,
            idProduct: "",
            entryQuantity: "",
            expirationDate: ""
        };
        setEntries([...entries, newEntry]);
    };

    const handleChangeEntry = (idx, field, value) => {
        const updated = [...entries];
        updated[idx] = { ...updated[idx], [field]: value };
        setEntries(updated);
    };

    const removeEntry = (idx) => {
        const updated = [...entries];
        updated.splice(idx, 1);
        setEntries(updated);
    };

    const executeSave = () => {
        const payload = entries.map(entry => ({
            idProduct: parseInt(entry.idProduct),
            idSwineBatch: parseInt(entry.idSwineBatch),
            entryQuantity: parseInt(entry.entryQuantity),
            expirationDate: new Date(entry.expirationDate + "T00:00:00").toISOString(),
        }));

        SwineBatchService.updateStockQuantitySwineBatch(parseInt(selectedBatch), selectquantitySwine);
        payload.forEach(ProductBatch => ProductBatchService.createProductBatch(ProductBatch));
        toast.success("Lote de producto guardado correctamente.");
        setEntries([]);
    };

    const handleSave = () => {
        if (entries.length === 0) {
            toast.error("Debe agregar al menos un producto al lote.");
            return;
        }

        if (selectquantitySwine === 0) {
            toast.error("Debe ingresar una cantidad de cerdos procesados.");
            return;
        }

        const invalidEntry = entries.find(entry =>
            !entry.idProduct || !entry.entryQuantity || !entry.expirationDate
        );

        if (invalidEntry) {
            toast.error("Debe completar todos los campos de cada producto antes de guardar.");
            return;
        }

        if (!swineBatchData) {
            toast.error("No se ha podido obtener el lote seleccionado.");
            return;
        }

        const stock = Number(swineBatchData.stockQuantity);
        const processed = Number(selectquantitySwine);
        if (processed > stock) {
            toast.error("La cantidad de cerdos procesados no puede ser mayor que la cantidad de cerdos en el lote seleccionado.");
            return;
        }

        setShowConfirmModal(true);
    };

    return (
        <div style={{ height: "80vh", width: "75vw" }} className="flex flex-col pt-8">
            <BackButton />
            <div>
                <Toaster toastOptions={{ duration: 1500, removeDelay: 1000 }} />
            </div>
            <p className="mb-2 text-lg text-orange-800 font-semibold underline">Nuevo Lote de Producto</p>

            <div className="rounded overflow-y-auto p-0">
                
                <div className="bg-orange-200 border border-orange-300 px-4 py-6 flex space-x-5 justify-between">
                    <div className="flex flex-col flex-grow space-y-4">
                        <div className="flex flex-col bg-orange-100 text-md text-orange-800 px-4 py-2 space-y-2 rounded">
                            <p>Lote de Cerdos</p>
                            <select
                                className="bg-orange-200 px-3 py-1 rounded font-bold focus:outline-none"
                                onChange={(e) => setSelectedBatch(e.target.value)}
                            >
                                <option value="">Seleccionar lote</option>
                                {swineBatches.map(batch => (
                                    <option key={batch.idSwineBatch} value={batch.idSwineBatch}>
                                        Lote #{batch.idSwineBatch}
                                    </option>
                                ))}
                            </select>
                            <div className="flex justify-between items-center text-md text-orange-800 font-bold px-4">
                                <p>Cantidad de Cerdos Procesados</p>
                                <input
                                    className="bg-orange-200 rounded px-3 py-2"
                                    type="number"
                                    defaultValue={0}
                                    onChange={(e) => setSelectQuantitySwine(Number(e.target.value))}
                                    min="0"
                                />
                            </div>
                        </div>
                        <div className="bg-orange-100 py-2 flex flex-col">
                            <div className="flex justify-between items-center text-md text-orange-800 font-bold px-4">
                                <p>Fecha de ingreso</p>
                                <input
                                    className="bg-orange-200 rounded px-3 py-2"
                                    type="date"
                                    defaultValue={new Date().toISOString().split("T")[0]}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className="mt-6 bg-orange-200 border border-orange-300 p-6">
                    <p className="text-xl font-semibold text-orange-800 underline">Productos</p>
                    <table className="flex-grow w-full table-auto justify-self-center mt-4">
                        <thead>
                            <tr>
                                <th className="border border-orange-900 bg-orange-700 text-white w-48 px-2">Producto</th>
                                <th className="border border-orange-900 bg-orange-700 text-white w-32 px-2">Cantidad</th>
                                <th className="border border-orange-900 bg-orange-700 text-white w-48 px-2">Fecha de Expiración</th>
                                <th className="border border-orange-900 bg-orange-700 text-white w-32 px-2">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries.map((entry, idx) => (
                                <tr key={idx}>
                                    <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                        <select
                                            className="bg-orange-300 px-2 py-1 rounded font-semibold text-orange-700"
                                            value={entry.idProduct || ""}
                                            onChange={(e) => handleChangeEntry(idx, "idProduct", e.target.value)}
                                        >
                                            <option value="">Seleccionar producto</option>
                                            {products.map(p => (
                                                <option key={p.idProduct} value={p.idProduct}>
                                                    {p.productName}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                        <input
                                            className="bg-orange-300 py-1 px-2 rounded w-16 text-orange-700 font-extrabold focus:outline-none"
                                            type="number"
                                            min="1"
                                            value={entry.entryQuantity || ""}
                                            onChange={(e) => handleChangeEntry(idx, "entryQuantity", e.target.value)}
                                        />
                                    </td>
                                    <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                        <input
                                            className="bg-orange-300 py-1 px-2 rounded w-full text-orange-700 font-semibold focus:outline-none"
                                            type="date"
                                            value={entry.expirationDate || ""}
                                            onChange={(e) => handleChangeEntry(idx, "expirationDate", e.target.value)}
                                        />
                                    </td>
                                    <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md text-center">
                                        <button
                                            onClick={() => removeEntry(idx)}
                                            className="bg-orange-800 hover:bg-orange-900 text-white font-semibold rounded px-3 py-1"
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
                            onClick={handleAddEntry}
                            className="bg-orange-700 rounded px-3 py-1 font-semibold text-white mt-2"
                        >
                            + Añadir producto
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
                            ¿Está seguro que la cantidad de productos corresponde con la cantidad de cerdos procesados?
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

export default NewProductBatch;
