import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";

const MainLayout = ({ title }) => {
    return (
        <>
            <div className="flex">
                <SideBar />
                <div className="flex flex-col flex-grow">
                    <TopBar title={ title } />
                    <div className="flex justify-center items-center flex-grow bg-orange-100">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainLayout;