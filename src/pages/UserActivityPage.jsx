import { useLocation } from "react-router-dom";
import BackButton from "../components/BackButton";

const UserActivityPage = () => {
    const location = useLocation();
    const { id, username } = location.state;

    return (
        <>
            <div style={{ height: "80vh", width: "75vw" }} className="flex flex-col pt-8">
                <BackButton />
                <p className="mb-2 text-lg text-orange-800 font-semibold underline">Actividad de usuario @{username}</p>
            </div>
        </>
    );
}

export default UserActivityPage;