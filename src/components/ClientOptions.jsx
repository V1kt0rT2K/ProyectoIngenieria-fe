import DropDown from "./DropDown";
import { Link } from "react-router-dom";

const ClientOptions = ({ id }) => {
    return (
        <>
            <DropDown links={[
                <button className="w-full block px-4 py-2 font-semibold text-md text-white bg-red-700 hover:cursor-pointer hover:bg-orange-900">
                    Eliminar
                </button>
            ]} />
        </>
    );
};

export default ClientOptions;