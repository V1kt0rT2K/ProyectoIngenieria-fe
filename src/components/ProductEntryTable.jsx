
import React from 'react';

const ProductEntryTable = ({ entries, products, handleChangeEntry, removeEntry, isLoading }) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-40">
                <p className="text-orange-700 font-semibold">Cargando datos...</p>
            </div>
        );
    }

    return (
        <table className="flex-grow w-full table-auto justify-self-center mt-4">
            <thead>
                <tr>
                    <th className="border border-orange-900 bg-orange-700 text-white w-48 px-2">Producto</th>
                    <th className="border border-orange-900 bg-orange-700 text-white w-32 px-2">Cantidad en libras</th>
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
                                disabled={isLoading}
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
                                disabled={isLoading}
                            />
                        </td>
                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                            <input
                                className="bg-orange-300 py-1 px-2 rounded w-full text-orange-700 font-semibold focus:outline-none"
                                type="date"
                                value={entry.expirationDate || ""}
                                onChange={(e) => handleChangeEntry(idx, "expirationDate", e.target.value)}
                                disabled={isLoading}
                            />
                        </td>
                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md text-center">
                            <button
                                onClick={() => removeEntry(idx)}
                                className="bg-orange-800 hover:bg-orange-900 text-white font-semibold rounded px-3 py-1"
                                disabled={isLoading}
                            >
                                Borrar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductEntryTable;