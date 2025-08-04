// src/components/NewProductBatch.js
import { Toaster } from 'react-hot-toast';
import BackButton from "../../components/BackButton";
import useProductBatch from "../../hooks/useProductBatchData"; // Hook para manejar la lógica del lote de productos
import ProductEntryTable from "../../components/ProductEntryTable"; // Componente extraído

const NewProductBatch = () => {
    const {
        swineBatches,
        products,
        entries,
        selectedBatch,
        setSelectedBatch,
        selectquantitySwine,
        setSelectQuantitySwine,
        showConfirmModal,
        setShowConfirmModal,
        isLoading,
        handleAddEntry,
        handleChangeEntry,
        removeEntry,
        executeSave,
        handleSave
    } = useProductBatch();

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
                                value={selectedBatch}
                                onChange={(e) => setSelectedBatch(e.target.value)}
                                disabled={isLoading}
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
                                    value={selectquantitySwine}
                                    onChange={(e) => setSelectQuantitySwine(Number(e.target.value))}
                                    min="0"
                                    disabled={isLoading}
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
                                    disabled={true} 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 bg-orange-200 border border-orange-300 p-6">
                    <p className="text-xl font-semibold text-orange-800 underline">Productos</p>
                    
                    <ProductEntryTable 
                        entries={entries}
                        products={products}
                        handleChangeEntry={handleChangeEntry}
                        removeEntry={removeEntry}
                        isLoading={isLoading}
                    />
                    
                    <div className="flex justify-center">
                        <button
                            onClick={handleAddEntry}
                            className="bg-orange-700 rounded px-3 py-1 font-semibold text-white mt-2"
                            disabled={isLoading}
                        >
                            + Añadir producto
                        </button>
                    </div>

                    <div className="mt-4 flex justify-center">
                        <button
                            className="px-3 py-1 bg-green-600 rounded text-md text-white font-semibold"
                            onClick={handleSave}
                            disabled={isLoading}
                        >
                            {isLoading ? "Guardando..." : "Guardar"}
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
                                onClick={async () => {
                                    const success = await executeSave();
                                    if (success) setShowConfirmModal(false);
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