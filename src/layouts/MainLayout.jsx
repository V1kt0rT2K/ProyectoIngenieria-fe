import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const MainLayout = ({ title }) => {
    return (
        <>
            <div className="flex">
                <SideBar />
                <div className="flex flex-col flex-grow">
                    <div className="bg-orange-200 py-8 px-12 flex items-center place-content-between">
                        <p className="text-3xl font-semibold text-orange-800">{title}</p>
                        <p>Usuario</p>
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