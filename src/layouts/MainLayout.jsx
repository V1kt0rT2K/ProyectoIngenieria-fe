import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useAuth } from "../provider/AuthProvider";

const MainLayout = ({ title }) => {
    const { session, _ } = useAuth();

    return (
        <>
            <div className="flex">
                <SideBar />
                <div className="flex flex-col flex-grow">
                    <div className="bg-orange-200 py-8 px-12 flex items-center place-content-between">
                        <p className="text-3xl font-semibold text-orange-800">{title}</p>
                        <p className="text-lg text-orange-800">{ JSON.parse(session).emailUser }</p>
                    </div>
                    <div className="flex justify-center items-center flex-grow bg-orange-100">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainLayout;