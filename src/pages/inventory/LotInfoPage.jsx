import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import BackButton from "../../components/BackButton";
import SwineBatchService from "../../utils/service/SwineBatchService";
import SwineSuppliesService from "../../utils/service/SwineSuppliesService";
import InventoryTable from "../../components/InventoryTable";
import SupplyOptionButton from "../../components/SupplyOptionButton";
import vacunaIcon from "../../assets/images/vacuna.png";
import concentradoIcon from "../../assets/images/concentrado.png";
import granjeroicon from "../../assets/images/granjero.png";
import Pagination from "react-js-pagination";
import toast, { Toaster } from 'react-hot-toast';

const UpdateSwineBatchStatusModal = ({ isOpen, onClose, idSwineBatch}) => {
  if (!isOpen) return null;

  const [stageList, setStageList] = useState([]);
  const [selectedStage , setSelectedStage] = useState(0);

  useEffect(()=>{
    SwineBatchService.getAllStages().then(response=>{
        if(!response.hasError){
            setStageList(response.data);
        }
    });
  },[]);

  const updateStage = () => {
    const payload = {
        idSwineBatch : idSwineBatch,
        idStage : selectedStage
    }

    SwineBatchService.updateSwineBatchStage(payload).then(response =>{
        if(!response.hasError){
            toast.success("Lote actualizado con éxito.");
            onClose();

            setTimeout(()=>{window.location.reload()},1000);

        }else{
            toast.error(response.meta.message);
        }
    });
  }

  return (
    <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}
    onClick={onClose}
  >
    <div
      style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        width: '80%', // Añade un ancho máximo
        maxWidth: '400px', // Ancho máximo para no hacerlo muy ancho
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Centra horizontalmente los elementos hijos
        gap: '20px', // Espacio uniforme entre elementos
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className='flex flex-col justify-center w-full'> 
        <p className="text-center my-5">Seleccione la etapa a cambiar del lote:</p>
        {
          stageList && (
            <select 
              className="focus:outline-none w-full bg-orange-200 border border-orange-700 rounded py-1 px-3 text-md"
              onChange={e => {setSelectedStage(e.target.value)}} 
            >
              <option key="0" value="0">
                Seleccionar etapa
              </option>
              {
                stageList.map((s, idx) =>
                  <option
                    key={s.idStage}
                    value={s.idStage}
                  >
                    {s.stageName}
                  </option>
                )
              }
            </select>
          )
        }
      </div>

      <div className="flex my-3 gap-2">
        <button
          className="flex-grow justify-center block px-4 py-2 font-semibold text-md text-white bg-orange-800 hover:cursor-pointer hover:bg-orange-900"
          onClick={() => {updateStage()}}
        >
          Ok
        </button>
      </div>

      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          fontSize: '1.2em',
          cursor: 'pointer',
        }}
      >
        &times;
      </button>
    </div>
  </div>
  );
};

const LotInfoPage = () => {

    const { idLote } = useParams(); // este parámetro vendrá de la ruta
    const [loteData, setLoteData] = useState(null);
    const [supplies, setSupplies] = useState([]);
    const [filter, setFilter] = useState("todos");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

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
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSupplies = filteredSupplies.slice(indexOfFirstItem, indexOfLastItem);
    
    const columns = [
        { label: "ID Lote", field: "idSwineSupply" },
        { label: "Insumo", field: (row) => row.Supply.nameSupply },
        { label: "Tipo de Insumo", field: (row) => row.Supply.SupplyType.nameSupplyType },
        { label: "Cantidad", field: "quantity" },
        { label: "Fecha de Generación", field: (row) => new Date(row.generationDate).toISOString().split('T')[0] },
        {label:"Operador de Granja", field: (row) => row.User?.email || "Desconocido" }
    ];

    useEffect(() => {
        fetchLoteInfo();
        fetchSupplies();
    }, []);

    return (
        <>
        <div><Toaster 
            toastOptions={{
            className: '',
            duration: 1500,
            removeDelay: 1000
            }}/>
        </div>
        <div className="rounded overflow-y-auto p-0">
        <div style={{ height: "80vh" }} className="flex flex-col pt-8">
        <div className="p-8 text-orange-800">
            <BackButton />
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
                    <button 
                        onClick={handleOpenModal}
                        className="bg-orange-800 mx-2 px-4 py-1 flex items-center justify-center text-lg text-white font-semibold rounded hover:cursor-pointer"
                    >
                        Actualizar etapa
                    </button>

                    <UpdateSwineBatchStatusModal isOpen={isModalOpen} onClose={ handleCloseModal} idSwineBatch={idLote}></UpdateSwineBatchStatusModal>

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
                    onClick={() => {setFilter("todos"),
                        setCurrentPage(1);
                    }}
                />
                <SupplyOptionButton
                    icon={concentradoIcon}
                    label="Concentrado"
                    onClick={() => {setFilter("concentrado"),
                        setCurrentPage(1);
                    }}
                />
                <SupplyOptionButton
                    icon={vacunaIcon}
                    label="Vitaminas"
                    onClick={() => {
                    setFilter("vitaminas");
                    setCurrentPage(1);
                    }}
                />

                <SupplyOptionButton
                    icon={vacunaIcon}
                    label="Desparasitantes"
                    onClick={() =>{ setFilter("desparasitantes"),
                        setCurrentPage(1);
                    }}
                />
            </div>
    
            <div className="mt-6">
                <InventoryTable columns={columns} data={currentSupplies} />

            </div>
            {filteredSupplies.length > itemsPerPage && (
                <div className="mt-4 flex justify-center">
                    <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={filteredSupplies.length}
                    pageRangeDisplayed={5}
                    onChange={(pageNumber) => setCurrentPage(pageNumber)}
                    innerClass="flex list-none rounded-md overflow-hidden shadow-sm"
                    itemClass="flex items-center justify-center"
                    linkClass="px-3 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                    activeClass="bg-green-500"
                    activeLinkClass="px-3 py-2 border border-blue-500 bg-blue-500 text-white hover:bg-blue-600"
                    disabledClass="opacity-50 cursor-not-allowed"
                    prevPageText="<<"
                    nextPageText=">>"
                    firstPageText="Primera"
                    lastPageText="Última"
                    />
                </div>
        )}

            
        </div>
        </div>
        </div>
        </>
    );
};

export default LotInfoPage;
