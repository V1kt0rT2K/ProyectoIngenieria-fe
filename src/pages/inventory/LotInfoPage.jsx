import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import SwineBatchService from "../../utils/service/SwineBatchService";
import SwineSuppliesService from "../../utils/service/SwineSuppliesService";
import InventoryTable from "../../components/InventoryTable";
import SupplyOptionButton from "../../components/SupplyOptionButton";
import vacunaIcon from "../../assets/images/vacuna.png";
import concentradoIcon from "../../assets/images/concentrado.png";
import granjeroicon from "../../assets/images/granjero.png";

const LotInfoPage = () => {
    const { idLote } = useParams(); // este parámetro vendrá de la ruta
    const [loteData, setLoteData] = useState(null);
    const [supplies, setSupplies] = useState([]);
    const [filter, setFilter] = useState("todos");

    const fetchLoteInfo = async () => {
        try {
            const response = await SwineBatchService.getSwineBatchById(idLote);
            if (!response.hasError) {
                const lote = response.data;
                setLoteData({
                    numero: lote.idSwineBatch,
                    cantidadInicial: lote.quantity,
                    cantidadStock: lote.stockQuantity,
                    fechaNacimiento: new Date(lote.birthDate).toLocaleDateString(),
                    fechaIngreso: new Date(lote.generationDate).toLocaleDateString(),
                    etapa: lote.Stage?.stageName || "Desconocido"
                });
            }
        } catch (error) {
            console.error("Error al cargar información del lote:", error);
        }
    };

    const fetchSupplies = async () => {
        try {
            const response = await SwineSuppliesService.getSuppliesByBatchId(idLote);
            if (!response.hasError) {
                setSupplies(response.data);
            }
        } catch (error) {
            console.error("Error al cargar insumos del lote:", error);
        }
    };


    const filteredSupplies = supplies.filter(supply => {
        if (filter === "todos") return true;
        if (filter === "Concentrado") return true;
        if(filter==="Vitaminas")return true;
        if(filter==="Desparasitantes")return true
        return supply.Supply.SupplyType.nameSupplyType.toLowerCase() === filter;
        
            
    });
    
    const columns = [
        { label: "ID Lote", field: "idSwineSupply" },
        { label: "Insumo", field: (row) => row.Supply.nameSupply },
        { label: "Tipo de Insumo", field: (row) => row.Supply.SupplyType.nameSupplyType },
        { label: "Cantidad", field: "quantity" },
        { label: "Fecha de Generación", field: (row) => new Date(row.generationDate).toLocaleDateString() },
        {label:"Operador de Granja", field: (row) => row.User?.Person.firstName || "Desconocido" }
    ];

    useEffect(() => {
        fetchLoteInfo();
        fetchSupplies();
    }, []);

    return (
        <div className="rounded overflow-y-auto p-0">
        <div style={{ height: "80vh" }} className="flex flex-col pt-8">
        <div className="p-8 text-orange-800">
            <h1 className="text-2xl font-bold mb-4">Detalle del Lote #{idLote}</h1>

            {loteData && (
                <div className="grid grid-cols-2 gap-6 bg-orange-100 p-6 rounded-lg border border-orange-700 mb-8">
                    <div>
                        <label className="font-semibold">Cantidad Inicial:</label>
                        <p>{loteData.cantidadInicial}</p>
                    </div>
                    <div>
                        <label className="font-semibold">Cantidad en Stock:</label>
                        <p>{loteData.cantidadStock}</p>
                    </div>
                    <div>
                        <label className="font-semibold">Fecha de Nacimiento:</label>
                        <p>{loteData.fechaNacimiento}</p>
                    </div>
                    <div>
                        <label className="font-semibold">Fecha de Ingreso:</label>
                        <p>{loteData.fechaIngreso}</p>
                    </div>
                    <div>
                        <label className="font-semibold">Etapa:</label>
                        <p>{loteData.etapa}</p>
                    </div>
                    <div>
                   <Link 
                    to={`/inventory/${idLote}/new-supplies`} 
                    className="bg-orange-800 mx-2 px-4 py-1 flex items-center justify-center text-lg text-white font-semibold rounded hover:cursor-pointer">
                    + Suministrar Insumos
                    </Link>
                    </div>
                </div>
            )}

            <div className="flex justify-center space-x-6 mb-4">
                <SupplyOptionButton
                    icon={granjeroicon}
                    label="Todos"
                    onClick={() => setFilter("todos")}
                />
                <SupplyOptionButton
                    icon={concentradoIcon}
                    label="Concentrado"
                    onClick={() => setFilter("concentrado")}
                />
                <SupplyOptionButton
                    icon={vacunaIcon}
                    label="Vitaminas"
                    onClick={() => setFilter("vitaminas")}
                />
                <SupplyOptionButton
                    icon={vacunaIcon}
                    label="Desparasitantes"
                    onClick={() => setFilter("desparasitantes")}
                />
            </div>
    
            <div className="mt-6">
                <InventoryTable columns={columns} data={filteredSupplies} />
            </div>
            
        </div>
        </div>
        </div>
    );
};

export default LotInfoPage;
