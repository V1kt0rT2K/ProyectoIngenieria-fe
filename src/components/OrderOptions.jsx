import DropDown from "./DropDown";
import { Link } from "react-router-dom";

const OrderOptions = ({ id }) => {
    return (
        <DropDown links={[
            <Link
                className="flex justify-center block px-4 py-2 font-semibold text-md text-white bg-orange-800 hover:cursor-pointer hover:bg-orange-900"
                to="order_wholesaler_information"
                state={{ id: id }}
            >
                Ver Detalles
            </Link>,
        ]} />
    );
};
export default OrderOptions;