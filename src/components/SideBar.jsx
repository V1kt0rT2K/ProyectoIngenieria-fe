import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
    const navigate = useNavigate();
    const linkClass = ({ isActive }) => isActive ? "pl-6 py-3 bg-orange-900" : "pl-6 py-3 hover:bg-orange-900"

    const exit = () => {
        navigate("/");
    }

    return (
        <nav className="space-y-6 flex flex-col h-screen w-60 bg-orange-800 text-xl font-semibold text-white pt-8">
            <button onClick={ exit } className="hover:cursor-pointer ml-4 mb-18 self-start">Salir</button>
            <NavLink className={ linkClass } to="/inventario">Inventario</NavLink>
            <NavLink className={ linkClass } to="/proveedores">Proveedores</NavLink>
            <NavLink className={ linkClass } to="/compras">Compras</NavLink>
            <NavLink className={ linkClass } to="/informes">Informes</NavLink>
            <NavLink className={ linkClass } to="/usuarios">Usuarios</NavLink>
            <NavLink className={ linkClass } to="/ventas">Ventas</NavLink>
            <NavLink className={ linkClass } to="/clientes">Clientes</NavLink>
        </nav>
    );
}

export default SideBar;