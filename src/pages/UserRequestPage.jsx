import { useState } from "react";
import { useLocation } from "react-router-dom";
import BackButton from "../components/BackButton";
import Configuration from "../Configuration";
import Spinner from "../components/Spinner";

const UsersRequestsPage = () => {
	const location = useLocation();
	const { id, fullName, role, date, email, idNumber } = location.state;

	const [loading, setLoading] = useState({});
	const [msg, setMsg] = useState({});
	const [sent, setSent] = useState(false);

	const handleRequest = async (enabled, status) => {
		const accept = status === 1;

		setMsg({});
		setLoading(true);
		setLoading({ state: true, msg: accept ? "Aceptando solictud..." : "Rechazando solicitud..." });

		try {
			const res = await fetch(`${Configuration.API_BASE_URL}/user/put/status`, {
				method: "PUT",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					id: id,
					enabled: enabled,
					status: status
				})
			});

			if (!res.ok) {
				throw new Error();
			}

			setMsg({
				show: true,
				color: "text-green-700",
				msg: accept ? "Solicitud aceptada." : "Solicitud rechazada."
			});

			setSent(true);
		} catch (err) {
			setMsg({ show: true, color: "text-red-600", msg: "No se pudo realizar la operacion." });
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<div style={{ height: "80vh", width: "75vw" }} className="flex flex-col pt-8">
				<BackButton />
				<div className="flex justify-between">
					<p className="mb-2 text-lg text-orange-800 font-semibold underline">Informacion de la solicitud</p>
					{
						loading.state
						&& (
							<>
								<div className="flex justify-center items-center space-x-2">
									<Spinner loading={true} size={15} margin={2} />
									<p className="text-orange-800 text-lg font-semibold">{loading.msg}</p>
								</div>
							</>
						)
					}
					{
						msg.show
						&& (
							<>
								<p className={`${msg.color} font-semibold px-3 rounded text-lg`}>{msg.msg}</p>
							</>
						)
					}

				</div>
				<div className="bg-orange-200 rounded overflow-y-auto">
					<div className="pb-4 px-2 pr-6 ml-2 flex flex-col justify-center mt-2">
						<label className="text-md text-orange-900">Nombre completo</label>
						<input disabled value={fullName} className="focus:outline-none flex-grow rounded py-1 px-3 text-md" />

						<label className="mt-2 text-md text-orange-900">Numero de identidad</label>
						<input disabled value={idNumber} className="focus:outline-none flex-grow rounded py-1 px-3 text-md" />

						<label className="mt-2 text-md text-orange-900">Rol de usuario</label>
						<input disabled value={role} className="focus:outline-none flex-grow rounded py-1 px-3 text-md" />

						<label className="mt-2 text-md text-orange-900">Fecha de creacion de solicitud</label>
						<input disabled value={date} className="focus:outline-none flex-grow rounded py-1 px-3 text-md" />

						<label className="mt-2 text-md text-orange-900">Email</label>
						<input disabled value={email} className="focus:outline-none flex-grow rounded py-1 px-3 text-md" />

						<label className="mt-2 text-md text-orange-900">Rol de usuario</label>
						<input disabled value={role} className="focus:outline-none flex-grow rounded py-1 px-3 text-md" />
					</div>
				</div>
				<div className="flex justify-center space-x-2 mt-3 mb-1">
					{
						!sent
						&& (
							<>
								<button onClick={() => handleRequest(true, 1)} className="hover:cursor-pointer rounded-md text-md text-white font-semibold px-3 py-1 bg-green-700">Aceptar</button>
								<button onClick={() => handleRequest(false, 3)} className="hover:cursor-pointer rounded-md text-md text-white font-semibold px-3 py-1 bg-red-700">Rechazar</button>
							</>
						)
					}
				</div>
			</div>
		</>
	);
}

export default UsersRequestsPage;
