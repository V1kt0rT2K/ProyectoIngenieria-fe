import DropDown from "./DropDown";
import { Link } from "react-router-dom";

const ReportOptions = ({ id, idStatus, onDelete }) => {
    return (
        <>
            <DropDown links={[
                <Link className="flex justify-center block px-4 py-2 font-semibold text-md text-white bg-orange-800 hover:cursor-pointer hover:bg-orange-900" to="view_report" state={{ id: id }}>Ver Detalles</Link>,
                // <Link className="flex justify-center block px-4 py-2 font-semibold text-md text-white bg-orange-800 hover:cursor-pointer hover:bg-orange-900" to="edit_report" state={{ id: id }}>Editar</Link>,
                // <Link className="flex justify-center block px-4 py-2 font-semibold text-md text-white bg-orange-800 hover:cursor-pointer hover:bg-orange-900" to="/purchases/new_purchase_order" state={{ preSelectedProvider: id, prevPage: "/providers" }}>Generar Reporte</Link>,
                <button
                onClick={() => onDelete(id, idStatus)}
                className="w-full block px-4 py-2 font-semibold text-md text-white bg-red-700 hover:cursor-pointer hover:bg-orange-900">
                Eliminar
            </button>
            ]} />
        </>
    );
};

export default ReportOptions;