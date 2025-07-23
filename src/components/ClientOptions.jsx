import DropDown from "./DropDown";
import { Link } from "react-router-dom";

const ClientOptions = ({ id }) => {
    return (
        <>
            <DropDown links={[
                <Link
                    to="user_information"
                    state={{ id: id }}
                    className="flex justify-center block px-4 py-2 font-semibold text-md text-white bg-orange-800 hover:cursor-pointer hover:bg-orange-900"
                >
                    Ver detalles
                </Link>,
            ]} />
        </>
    );
};

export default ClientOptions;