import DropDown from "./DropDown";
import { Link } from "react-router-dom";

const ProviderOptions = ({ id }) => {
    return (
        <DropDown links={[
            <Link className="flex justify-center block px-4 py-2 font-semibold text-md text-white bg-orange-800 hover:cursor-pointer hover:bg-orange-900" to="view_provider" state={{ id: id }}>Ver Detalles</Link>,
            <Link className="flex justify-center block px-4 py-2 font-semibold text-md text-white bg-orange-800 hover:cursor-pointer hover:bg-orange-900" to="edit_provider" state={{ id: id }}>Editar</Link>,
            <Link className="flex justify-center block px-4 py-2 font-semibold text-md text-white bg-orange-800 hover:cursor-pointer hover:bg-orange-900" to="make_order_provider" state={{ id: id }}>Hacer Pedido</Link>,
            <button className="w-full block px-4 py-2 font-semibold text-md text-white bg-red-700 hover:cursor-pointer hover:bg-orange-900">
                Eliminar
            </button>
        ]} />
    );
};
export default ProviderOptions;