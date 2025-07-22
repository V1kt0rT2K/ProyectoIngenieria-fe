import DropDown from "./DropDown";
import { Link } from "react-router-dom";

const SaleOptions = ({ idCheck }) => {
    return (
        <>
            <DropDown links={[
                <Link
                    to="sale_information"
                    state={{
                        idCheck: idCheck
                    }}
                    className="flex justify-center block px-4 py-2 font-semibold text-md text-white bg-orange-800 hover:cursor-pointer hover:bg-orange-900"
                >
                    Ver detalles
                </Link>,
            ]} />
        </>
    );
};

export default SaleOptions;