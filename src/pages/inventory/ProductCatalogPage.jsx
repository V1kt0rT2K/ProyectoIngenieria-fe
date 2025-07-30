import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "../../components/BackButton";
import InventoryTable from "../../components/InventoryTable";
import SellerService from "../../utils/service/SellerService";

const ProductCatalogPage = () => {
    const [productBatches, setProductBatches] = useState([]);
   

    useEffect(() => {
        SellerService.getAllProducts().then(response => {
            if (!response.hasError) {
                setProductBatches(response.data);
            }
        });
    }, []);

    const columns = [
        { label: "No.", field: "idProduct" },
        { label: "Producto", field: "productName" },
        { label: "Descripción", field: "productDescription" },
        { label: "Precio por libra", field: "price" }
    ];

    return (
        <div style={{ height: "80vh", width: "75vw" }} className="flex flex-col pt-8">
        
            
            <h1 className="text-3xl font-semibold text-orange-800 mb-4">
                Catálogo de Productos
            </h1>

            <div className="mb-4 flex justify-between items-center">
                <div className="space-x-2">
                    <Link to={`/inventory`} className="bg-orange-800 mx-2 px-4 py-1 flex items-center justify-center text-lg text-white font-semibold rounded hover:cursor-pointer">Regresar</Link>
                </div>
                <input
                    className="border px-2 py-1 rounded text-orange-800 border-orange-500" style={{ width: "60%" }}
                    placeholder="Filtrar"
                />
                <div className="space-x-2">
                    <Link to={`/inventory/new_product`} className="bg-orange-800 mx-2 px-4 py-1 flex items-center justify-center text-lg text-white font-semibold rounded hover:cursor-pointer">+ Agregar</Link>
                </div>
            </div>

            <div
                style={{ width: "75vw", height: "65vh" }}
                className="rounded border border-orange-700 bg-orange-200 overflow-y-auto"
            >
                <div className="mt-6 px-6">
                    <InventoryTable columns={columns} data={productBatches} to="/productos" />
                </div>
            </div>
        </div>
    );
};

export default ProductCatalogPage;
