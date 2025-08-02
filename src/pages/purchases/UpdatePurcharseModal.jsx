import React, { useEffect, useState } from 'react';
import PurchaseService from '../../utils/service/PurchaseService';
import AdminService from '../../utils/service/AdminService';
import toast, { Toaster } from 'react-hot-toast';

const UpdatePurcharseModal = ({ isOpen, onClose, idSupplyPurcharse}) => {
  if (!isOpen) return null;

  const [statusList, setStatusList] = useState([]);
  const [selectedStatus , setSelectedStatus] = useState(0);

  useEffect(()=>{
    AdminService.getStatusByIdType(2).then(response=>{
        if(!response.hasError){
            setStatusList(response.data);
        }
    });

  },[]);

  const updatePurcharse = () => {
    const payload = {
        idSupplyPurcharse : idSupplyPurcharse,
        idStatus : selectedStatus
    }

    PurchaseService.updatePurcharseStatus(payload).then(response =>{
        if(!response.hasError){
            toast.success("Orden actualizada con éxito.");
            onClose();

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
        <p className="text-center my-5">Seleccione el estado a cambiar de la compra:</p>
        {
          statusList && (
            <select 
              className="focus:outline-none w-full bg-orange-200 border border-orange-700 rounded py-1 px-3 text-md"
              onChange={e => {setSelectedStatus(e.target.value)}} 
            >
              <option key="0" value="0">
                Seleccionar estado
              </option>
              {
                statusList.map((s, idx) =>
                  <option
                    key={s.idStatus}
                    value={s.idStatus}
                  >
                    {s.statusName}
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
          onClick={() => {updatePurcharse()}}
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

export default UpdatePurcharseModal;