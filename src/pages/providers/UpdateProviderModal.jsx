import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ProviderService from '../../utils/service/ProviderService';

const UpdateProviderModal = ({ isOpen, onClose, idProvider, isEnabled, reloadProviders }) => {
    if (!isOpen) return null;
    

    const updateProvider = async () => {
        const payload = {
            idProvider: idProvider,
            enabled: !isEnabled
        };

        try {
            const response = await ProviderService.updateProviderStatus(payload);
            if (!response.hasError) {
                toast.success("Proveedor actualizado con éxito.");
                onClose();
                await reloadProviders();
            } else {
                toast.error(response.meta.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Error al actualizar proveedor.");
        }
    };


    // const updateProvider = () => {

    //     const payload = {
    //         idProvider: idProvider,
    //         enabled: !isEnabled
    //     }

    //     console.log(payload);

    //     ProviderService.updateProviderStatus(payload).then(response => {
    //         if (!response.hasError) {
    //             console.log(response);
    //             toast.success("Proveedor actualizado con éxito.");
    //             onClose();

    //             window.location.reload();
    //         } else {
    //             toast.error(response.meta.message);
    //         }
    //     });
    // }

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
                    <p className="text-center my-5">¿Está seguro de que desea actualizar el proveedor?</p>
                    <div className="flex items-center justify-center space-x-4">
                        <button onClick={updateProvider} className="bg-orange-700 py-1 px-3 border text-white font-semibold rounded">Aceptar</button>
                        <button onClick={onClose} className="bg-orange-700 py-1 px-3 border text-white font-semibold rounded">Cancelar</button>
                    </div>
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

export default UpdateProviderModal;