import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ProviderService from '../../utils/service/ProviderService';

const UpdateProviderModal = ({ isOpen, onClose, idProvider, idStatus }) => {
    const [statusOption, setstatusOption] = useState("");
    const [status, setStatus] = useState("0");
    if (!isOpen) return null;

    const updateProvider = () => {

        const payload = {
            idProvider: idProvider,
            idStatus: idStatus
        }

        ProviderService.updateProviderStatus(payload).then(response => {
            if (!response.hasError) {
                toast.success("Proveedor actualizado con éxito.");
                onClose();

                setTimeout(() => { window.location.reload() }, 1000);

            } else {
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
                    <p className="text-center my-5">¿Está seguro de que desea deshabilitar el proveedor?</p>
                    <select
                        className="focus:outline-none w-full bg-orange-200 border border-orange-700 rounded py-1 px-3 text-md"
                        onChange={e => { setstatusOption(e.target.value) }}
                    >
                        <option value="1">Aceptar</option>
                        <option value="0">Cancelar</option>
                    </select>
                </div>

                {/* <div className="flex my-3 gap-2">
                    <button
                        className="flex-grow justify-center block px-4 py-2 font-semibold text-md text-white bg-orange-800 hover:cursor-pointer hover:bg-orange-900"
                        onClick={() => { updateProvider() }}
                    >
                        Ok
                    </button>
                </div> */}

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

export default UpdateProviderModal;