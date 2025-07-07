import DropDown from "./DropDown";
import { Link } from "react-router-dom";

const InventoryOptions = ({ id, to }) => {
    return (
        <>
            <DropDown links={[
                <Link
                    to={to}
                    state={{ id: id }}
                    className="flex justify-center block px-4 py-2 font-semibold text-md text-white bg-orange-800 hover:cursor-pointer hover:bg-orange-900"
                >
                    Ver detalles
                </Link>,

                <button className="w-full block px-4 py-2 font-semibold text-md text-white bg-red-700 hover:cursor-pointer hover:bg-orange-900">
                    Eliminar
                </button>
            ]} />
        </>
    );
};

export default InventoryOptions;