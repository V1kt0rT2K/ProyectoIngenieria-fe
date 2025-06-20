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
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default MainLayout;