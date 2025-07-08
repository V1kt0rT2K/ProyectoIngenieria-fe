import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import AdminService from "../../utils/service/AdminService";



const UserRequestInfo = ({requestData}) => {

	return(
		<>
			<div className="bg-orange-200 rounded overflow-y-auto">
				<div className="pb-4 px-2 pr-6 ml-2 flex flex-col justify-center mt-2">
					<label className="text-md text-orange-900">Nombre completo</label>
					<input disabled value={requestData.User?.Person.fullName} className="focus:outline-none flex-grow rounded py-1 px-3 text-md" />

					<label className="mt-2 text-md text-orange-900">Numero de identidad</label>
					<input disabled value={requestData.User?.Person.identityNumber} className="focus:outline-none flex-grow rounded py-1 px-3 text-md" />

					<label className="mt-2 text-md text-orange-900">Rol de usuario</label>
					<input disabled value={requestData.UserRole?.roleName} className="focus:outline-none flex-grow rounded py-1 px-3 text-md" />

					<label className="mt-2 text-md text-orange-900">Fecha de creacion de solicitud</label>
					<input disabled value={requestData.generationDate} className="focus:outline-none flex-grow rounded py-1 px-3 text-md" />

					<label className="mt-2 text-md text-orange-900">Email</label>
					<input disabled value={requestData.email} className="focus:outline-none flex-grow rounded py-1 px-3 text-md" />
				</div>
			</div>
		</>
	);
}

const UsersRequestsPage = () => {
	const location = useLocation();
	const [requestData, setRequestData] = useState({});

	const [loading, setLoading] = useState({});
	const [msg, setMsg] = useState({});
	const [sent, setSent] = useState(false);

	useEffect(() =>{
		console.log(location.state.idUserRequest);
		AdminService.getUserRequestsById(location.state.idUserRequest).then(response=>{
			if(!response.hasError){
				setRequestData(response.data);
			}
		});

	},[]);

	const handleRequest = async (idStatus) => {
		setMsg({});
		setLoading(true);
		setLoading({ state: true, msg: idStatus == 1 ? "Aceptando solictud..." : "Rechazando solicitud..." });

		const payload = {
			idUserRequest : location.state.idUserRequest,
			idStatus : idStatus
		};
		AdminService.manageUserRequest(payload).then(response => {
			if(!response.hasError){
				setMsg({state:true, msg:"Actualización realizada con éxito."});
			}
			else{
				setMsg({state:true, msg:response.meta.message});
			}
			setLoading(false);
		});

		requestData.idStatus = idStatus;

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

				<UserRequestInfo requestData={requestData}/>
					
				<div className="flex justify-center space-x-2 mt-3 mb-1">
					{
						requestData.idStatus == 2 ?
						(
							<>
								<button onClick={() => handleRequest(1)} className="hover:cursor-pointer rounded text-md text-white font-semibold px-3 py-1 bg-green-700">Aceptar</button>
								<button onClick={() => handleRequest(3)} className="hover:cursor-pointer rounded text-md text-white font-semibold px-3 py-1 bg-red-700">Rechazar</button>
							</>
						) : ("")
					}
				</div>
			</div>
		</>
	);
}

export default UsersRequestsPage;
