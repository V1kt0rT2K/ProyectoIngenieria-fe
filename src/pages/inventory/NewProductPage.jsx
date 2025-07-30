import { useState } from "react";
import BackButton from "../../components/BackButton";
import SellerService from "../../utils/service/SellerService";

const NewProductPage = () => {
    const [product, setProduct] = useState({
        productName: "",
        productDescription: "",
        price: "",
        orderPoint: ""
    });

    const handleChange = (field, value) => {
        setProduct({
            ...product,
            [field]: value
        });
    };

    const handleSave = async () => {
        if (!product.productName || !product.productDescription || !product.price || !product.orderPoint) {
            alert("Debe llenar todos los campos antes de guardar.");
            return;
        }

        try {
            const response = await SellerService.createProduct(product);
            if (!response.hasError) {
                alert("Producto guardado correctamente.");
                setProduct({
                    productName: "",
                    productDescription: "",
                    price: "",
                    orderPoint: ""
                });
            } else {
                alert("Hubo un error al guardar el producto.");
            }
        } catch (error) {
            console.error("Error al guardar el producto:", error);
            alert("No se pudo guardar el producto. Intente nuevamente.");
        }
    };

    return (
        <div style={{ height: "80vh", width: "75vw" }} className="flex flex-col pt-8">
            <BackButton />
            <p className="mb-4 text-lg text-orange-800 font-semibold underline">
                Nuevo Producto
            </p>

            <div className="mt-6 bg-orange-200 border border-orange-300 p-6 rounded-xl shadow-md">
                <form className="flex flex-col gap-4">
                    <div>
                        <label className="block text-orange-800 font-semibold mb-1">
                            Nombre del Producto
                        </label>
                        <input
                            className="w-full bg-orange-300 py-2 px-3 rounded text-orange-700 font-semibold focus:outline-none"
                            type="text"
                            value={product.productName}
                            onChange={(e) => handleChange("productName", e.target.value)}
                            placeholder="Ej. Cabeza"
                        />
                    </div>

                    <div>
                        <label className="block text-orange-800 font-semibold mb-1">
                            Descripción
                        </label>
                        <textarea
                            className="w-full bg-orange-300 py-2 px-3 rounded text-orange-700 font-semibold focus:outline-none"
                            rows="3"
                            value={product.productDescription}
                            onChange={(e) => handleChange("productDescription", e.target.value)}
                            placeholder="Ej. Incluye orejas, morro, cachetes..."
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-orange-800 font-semibold mb-1">
                                Precio por libra
                            </label>
                            <input
                                className="w-full bg-orange-300 py-2 px-3 rounded text-orange-700 font-semibold focus:outline-none"
                                type="number"
                                min="1"
                                value={product.price}
                                onChange={(e) => handleChange("price", e.target.value)}
                                placeholder="Ej. 200"
                            />
                        </div>

                        <div className="flex-1">
                            <label className="block text-orange-800 font-semibold mb-1">
                                Punto de Reorden
                            </label>
                            <input
                                className="w-full bg-orange-300 py-2 px-3 rounded text-orange-700 font-semibold focus:outline-none"
                                type="number"
                                min="1"
                                value={product.orderPoint}
                                onChange={(e) => handleChange("orderPoint", e.target.value)}
                                placeholder="Ej. 5"
                            />
                        </div>
                    </div>
                </form>

                <div className="mt-6 flex justify-center">
                    <button
                        className="bg-green-600 rounded px-4 py-2 font-semibold text-white hover:bg-green-700 transition"
                        onClick={handleSave}
                    >
                        Guardar Producto
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewProductPage;
