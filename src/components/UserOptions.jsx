import DropDown from "./DropDown";
import { Link } from "react-router-dom";

const UserOptions = ({ user }) => {
    return (
        <>
            <DropDown links={[
                <Link
                    to="user_information"
                    state={{
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        secondName: user.secondName,
                        lastName: user.lastName,
                        secondLastName: user.secondLastName,
                        idNumber: user.idNumber,
                        role: user.idRole,
                        date: user.date,
                        email: user.email,
                        enabled: user.enabled
                    }}
                    className="flex justify-center block px-4 py-2 font-semibold text-md text-white bg-orange-800 hover:cursor-pointer hover:bg-orange-900"
                >
                    Ver detalles
                </Link>,

                <Link
                    to="user_activity"
                    state={{ id: user.id, username: user.username }}
                    className="flex justify-center block px-4 py-2 font-semibold text-md text-white bg-orange-800 hover:cursor-pointer hover:bg-orange-900"
                >
                    Actividad
                </Link>,

                <button className="w-full block px-4 py-2 font-semibold text-md text-white bg-red-700 hover:cursor-pointer hover:bg-orange-900">
                    Eliminar
                </button>
            ]} />
        </>
    );
};

export default UserOptions;