import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../provider/AuthProvider";
import { navLinks, linkClass } from "./NavLinks";

const Roles = {
	ADMINISTRATOR: 1,
	CASHIER: 2,
	WAREHOUSE_MANAGER: 3,
};

const SideBar = () => {
	const { session, setSession } = useAuth();

	const navigate = useNavigate();

	const logout = () => {
		setSession();
		navigate("/", { replace: true });
	}

	let barElements = [];

	switch (JSON.parse(session).idRole) {
		case Roles.ADMINISTRATOR:
			barElements = Object.values(navLinks);
			break;
		case Roles.CASHIER:
			barElements = [navLinks.SALES, navLinks.REPORTS, navLinks.CLIENTS];
			break;
		case Roles.WAREHOUSE_MANAGER:
			barElements = [navLinks.INVENTORY, navLinks.PROVIDERS, navLinks.PURCHASES];
			break;
	}

	return (
		<nav className="space-y-4 flex flex-col h-screen w-60 bg-orange-800 text-xl font-semibold text-white pt-8">
			<button onClick={logout} className="hover:cursor-pointer ml-4 mb-6 self-start">Salir</button>

			<NavLink className={linkClass} to="/home">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
					<path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
				</svg>
				<span className="ml-4">Inicio</span>
			</NavLink>

			{barElements}
		</nav>
	);
}

export default SideBar;
