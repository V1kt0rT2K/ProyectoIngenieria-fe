import { useEffect, useState } from "react";
import SwineBatchService from "../utils/service/SwineBatchService";
import SupplyBatchService from "../utils/service/SupplyBatchService";
import ProductBatchService from "../utils/service/ProductBatchService";

const fetchSwineBatch = async (page, size, sort) => {
  try {
    const response = await SwineBatchService.getSwineBatch(page, size, sort);
    if (!response.hasError && response.data) {
      return {
        data: response.data.data.map((item) => ({
          id: item.idSwineBatch,
          CantidadRestante: item.stockQuantity,
          fechadeNacimiento: new Date(item.birthDate).toLocaleDateString(),
          Cantidad: item.quantity,
          fecha: new Date(item.generationDate).toLocaleDateString(),
          etapa: item.Stage.stageName || "Desconocida",
        })),
        totalItems: response.data.totalItems,
      };
    }
    return { data: [], totalItems: 0 };
  } catch (error) {
    console.error("Error al cargar lotes de cerdos", error);
    return { data: [], totalItems: 0 };
  }
};

const fetchSupplyBatch = async (search, page, size, sort) => {
  try {
    const response = search
      ? await SupplyBatchService.searchSupplyBatch(search, page, size, sort)
      : await SupplyBatchService.getSupplyBatch(page, size, sort);

    if (!response.hasError && response.data) {
      return {
        data: response.data.data.map((item) => ({
          id: item.idSupplyBatch,
          insumo: item.Supply.nameSupply,
          tipo: item.Supply.SupplyType.nameSupplyType,
          cantidad: item.stockQuantity,
          fecha: new Date(item.expirationDate).toLocaleDateString(),
          etapa: item.Supply.Stage.stageName || "Desconocida",
        })),
        totalItems: response.data.totalItems,
      };
    }
    return { data: [], totalItems: 0 };
  } catch (error) {
    console.error("Error al cargar lotes de insumos", error);
    return { data: [], totalItems: 0 };
  }
};

const fetchSupplyBatchByType = async (type, search, page, size, sort) => {
  try {
    const response = search
      ? await SupplyBatchService.searchSupplyBatchbyType(type, search, page, size, sort)
      : await SupplyBatchService.getSupplyBatchByType(type, page, size, sort);

    if (!response.hasError && response.data) {
      return {
        data: response.data.data.map((item) => ({
          id: item.idSupplyBatch,
          insumo: item.Supply.nameSupply,
          tipo: item.Supply.SupplyType.nameSupplyType,
          cantidad: item.stockQuantity,
          fecha: new Date(item.expirationDate).toLocaleDateString(),
          etapa: item.Supply.Stage.stageName || "Desconocida",
        })),
        totalItems: response.data.totalItems,
      };
    }
    return { data: [], totalItems: 0 };
  } catch (error) {
    console.error("Error al cargar lotes de insumos por tipo", error);
    return { data: [], totalItems: 0 };
  }
};

const fetchProductBatch = async (search, page, size, sort) => {
  try {
    const response = search
      ? await ProductBatchService.searchProductBatch(search, page, size, sort)
      : await ProductBatchService.getAllProductBatch(page, size, sort);

    if (response.hasError) {
      console.error("Error del servidor:", response.meta.message);
      return { data: [], totalItems: 0 };
    }

    if (!response.data || !response.data.data) {
      return { data: [], totalItems: 0 };
    }

    return {
      data: response.data.data.map((item) => ({
        idproductBatch: item.idProductBatch,
        nombreProducto: item.Product.productName,
        CantidadRestante: item.stockQuantity,
        fechaExpiracion: new Date(item.expirationDate).toLocaleDateString(),
        precioProducto: item.Product.price,
        PuntodeReorden: item.Product.orderPoint,
      })),
      totalItems: response.data.totalItems,
    };
  } catch (error) {
    console.error("Error en fetchProductBatch:", error);
    return { data: [], totalItems: 0 };
  }
};

export const useInventoryData = (category, subCategory, page, size, sort, search) => {
  const [loading, setLoading] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let result = { data: [], totalItems: 0 };
    if (category === "Insumos" && !subCategory && !search) {
  setInventory([]);
  setTotalItems(0);
  setLoading(false);
  return;
}
      if (category === "Productos") {
        result = await fetchProductBatch(search, page, size, sort);
      } else if (category === "Lotes") {
        result = await fetchSwineBatch(page, size, sort);
      } else if (category === "Insumos") {
        if (subCategory === "concentrado") result = await fetchSupplyBatchByType(3, search, page, size, sort);
        else if (subCategory === "desparasitantes") result = await fetchSupplyBatchByType(1, search, page, size, sort);
        else if (subCategory === "vitaminas") result = await fetchSupplyBatchByType(2, search, page, size, sort);
        else result = await fetchSupplyBatch(search, page, size, sort);
      }

      setInventory(result.data);
      setTotalItems(result.totalItems);
      setLoading(false);
    };

    fetchData();
  }, [category, subCategory, page, size, sort, search]);

  return { loading, inventory, totalItems };
};
