
import { useEffect, useState } from "react";
import SellerService from "../utils/service/SellerService";
import SwineBatchService from "../utils/service/SwineBatchService";
import ProductBatchService from "../utils/service/ProductBatchService";
import toast from 'react-hot-toast';

const useProductBatch = () => {
    const [swineBatches, setSwineBatches] = useState([]);
    const [products, setProducts] = useState([]);
    const [entries, setEntries] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState("");
    const [selectquantitySwine, setSelectQuantitySwine] = useState(0);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [swineBatchData, setSwineBatchData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setIsLoading(true);
                
                const [productsResponse, batchesResponse] = await Promise.all([
                    SellerService.getAllProducts(1, 30, 0),
                    SwineBatchService.getSwineBatchByIdStage(5)
                ]);
                
                if (!productsResponse.hasError) {
                    setProducts(productsResponse.data.data);
                }
                
                if (!batchesResponse.hasError) {
                    setSwineBatches(batchesResponse.data);
                }
            } catch (error) {
                console.error("Error al cargar datos iniciales:", error);
                toast.error("Error al cargar datos iniciales");
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (!selectedBatch) {
            setSwineBatchData(null);
            return;
        }

        const fetchBatchData = async () => {
            try {
                setIsLoading(true);
                const response = await SwineBatchService.getSwineBatchById(selectedBatch);
                
                if (!response.hasError) {
                    setSwineBatchData(response.data);
                } else {
                    toast.error("Error al obtener el lote seleccionado.");
                }
            } catch (error) {
                console.error("Error al obtener lote:", error);
                toast.error("Error al obtener datos del lote");
            } finally {
                setIsLoading(false);
            }
        };

        fetchBatchData();
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

    const executeSave = async () => {
        try {
            const payload = {
                idSwineBatch: parseInt(selectedBatch),
                decrementSwine: selectquantitySwine, 
                detail: entries.map(entry => ({
                    idProduct: parseInt(entry.idProduct),
                    entryQuantity: parseInt(entry.entryQuantity),
                    expirationDate: new Date(entry.expirationDate + "T00:00:00"),
                    generationDate: new Date() 
                }))
            };

            const response = await ProductBatchService.createProductBatch(payload);
            
            if (response && !response.hasError) {
                toast.success("Lote de producto guardado correctamente");
                setEntries([]);
                setSelectedBatch("");
                setSelectQuantitySwine(0);
                setSwineBatchData(null);
                setShowConfirmModal(false);
                return true;
            } 
            
            const errorMessage = response?.message || "Error al guardar el lote";
            toast.error(errorMessage);
            return false;
        } catch (error) {
            console.error("Error en executeSave:", error);
            toast.error("Error inesperado al procesar la solicitud");
            return false;
        }
    };

    const validateBeforeSave = () => {
        if(entries.length === 0 && !selectedBatch && selectquantitySwine === 0) {
            toast.error("Debe ingresar datos para poder agregar el Lote");
            return false;}
        if (entries.length === 0) {
            toast.error("Debe agregar al menos un producto al lote.");
            return false;
        }

        if (selectquantitySwine === 0) {
            toast.error("Debe ingresar una cantidad de cerdos procesados.");
            return false;
        }

        const invalidEntry = entries.find(entry =>
            !entry.idProduct || !entry.entryQuantity || !entry.expirationDate
        );

        if (invalidEntry) {
            toast.error("Debe completar todos los campos de cada producto antes de guardar.");
            return false;
        }

        if (!swineBatchData) {
            toast.error("No se ha podido obtener el lote seleccionado.");
            return false;
        }

        const stock = Number(swineBatchData.stockQuantity);
        const processed = Number(selectquantitySwine);
        if (processed > stock) {
            toast.error("La cantidad de cerdos procesados no puede ser mayor que la cantidad de cerdos en el lote seleccionado.");
            return false;
        }

        return true;
    };

    const handleSave = () => {
        if (validateBeforeSave()) {
            setShowConfirmModal(true);
        }
    };

    return {
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
    };
};

export default useProductBatch;