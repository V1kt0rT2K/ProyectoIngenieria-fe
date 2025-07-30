import { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import SellerService from "../../utils/service/SellerService";
import SwineBatchService from "../../utils/service/SwineBatchService";
import ProductBatchService from "../../utils/service/ProductBatchService";
const NewProductBatch = () => {
    const [swineBatches, setSwineBatches] = useState([]);
    const [products, setProducts] = useState([]);
    const [entries, setEntries] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState("");

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
    }, []);

const handleAddEntry = () => {
    setEntries([...entries, { idSwineBatch: selectedBatch }]);
};


    const handleChangeEntry = (idx, field, value) => {
        const updated = [...entries];
        updated[idx] = { ...updated[idx], [field]: value };
        setEntries(updated);
    };
const swineBatchData=SwineBatchService.getSwineBatchById(selectedBatch);
if(swineBatchData.stockQuantity === 0){
    alert("El lote de cerdos seleccionado no tiene cerdos disponibles.");
    return;
}else{


    const handleSave = () => {
        const payload = entries.map(entry => ({
            idProduct: parseInt(entry.idProduct),
            idSwineBatch: parseInt(entry.idSwineBatch),
            entryQuantity: parseInt(entry.entryQuantity),
            expirationDate: entry.expirationDate,
        }));

        console.log("Payload a enviar:", payload);
        if(payload.length === 0) {
            alert("Debe agregar al menos un producto al lote.");

            }else{
            payload.forEach(ProductBatch => {
            ProductBatchService.createProductBatch(ProductBatch)});
            alert("Lote de producto guardado correctamente.");
            setEntries([]); 
            }
            
    };


    return (
        <div style={{ height: "80vh", width: "75vw" }} className="flex flex-col pt-8">
            <BackButton />
            <p className="mb-2 text-lg text-orange-800 font-semibold underline">Nuevo Lote de Producto</p>

            <div className="rounded overflow-y-auto p-0">
                <div className="bg-orange-200 border border-orange-300 px-4 py-6 flex space-x-5 justify-between">
                    <div className="flex flex-col flex-grow space-y-4">
                        <div className="flex flex-col bg-orange-100 text-md text-orange-800 px-4 py-2 space-y-2 rounded">
                            <p>Lote de Cerdos</p>
                            <select
                                className="bg-orange-200 px-3 py-1 rounded font-bold focus:outline-none"
                                onChange={(e) => {
                                const value = e.target.value;
                                setEntries(entries.map((entry) => ({ ...entry, idSwineBatch: value })));
                                setSelectedBatch(value); 
                                }}
                            >

                                <option value="">Seleccionar lote</option>
                                
                                {swineBatches.map(batch => (
                                    <option key={batch.idSwineBatch} value={batch.idSwineBatch}>
                                        Lote #{batch.idSwineBatch}
                                    </option>
                                ))}
                            </select>
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
                                <th className="border border-orange-900 bg-orange-700 text-white w-32 px-2">Cantidad de Entrada</th>
                                <th className="border border-orange-900 bg-orange-700 text-white w-48 px-2">Fecha de Expiración</th>
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
                                            onChange={(e) =>
                                                handleChangeEntry(idx, "entryQuantity", e.target.value)
                                            }
                                        />
                                    </td>
                                    <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                        <input
                                            className="bg-orange-300 py-1 px-2 rounded w-full text-orange-700 font-semibold focus:outline-none"
                                            type="date"
                                            value={entry.expirationDate || ""}
                                            onChange={(e) =>
                                                handleChangeEntry(idx, "expirationDate", e.target.value)
                                            }
                                        />
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
        </div>
    );
};
};
export default NewProductBatch;
