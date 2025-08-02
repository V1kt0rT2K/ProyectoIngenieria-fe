import { Link } from "react-router-dom";
import DropDown from "./DropDown";
import UpdatePurcharseModal from "../pages/purchases/UpdatePurcharseModal";
import { useState } from "react";

const PurchaseOptions = ({ idSupplyPurcharse, idStatus }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <DropDown links={[
                <Link
                    to="/purchases/purchase_information"
                    state={{ id: idSupplyPurcharse }}
                    className="flex justify-center block px-4 py-2 font-semibold text-md text-white bg-orange-800 hover:cursor-pointer hover:bg-orange-900"
                >
                    Ver detalles
                </Link>,
                <>
                    {
                        idStatus != 7 && idStatus != 6 && (
                            <button 
                                onClick={handleOpenModal}
                                className="flex justify-center block px-4 py-2 font-semibold text-md text-white bg-orange-800 hover:cursor-pointer hover:bg-orange-900"
                            >
                                Actualizar estado
                            </button>
                        )
                    }
                </>
                ,
                <>
                    {
                        idStatus == 5 && (
                            <Link
                                to="/purchases/entry_purcharse"
                                state={{ idSupplyPurcharse: idSupplyPurcharse }}
                                className="flex  text-center justify-center block px-4 py-2 font-semibold text-md text-white bg-orange-800 hover:cursor-pointer hover:bg-orange-900"
                            >
                                Ingresar compra
                            </Link>
                        )
                    }
                </>
            ]} />

            <UpdatePurcharseModal isOpen={isModalOpen} onClose={ handleCloseModal} idSupplyPurcharse={idSupplyPurcharse}></UpdatePurcharseModal>
        </>
    );
};

export default PurchaseOptions;