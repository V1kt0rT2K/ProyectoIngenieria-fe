import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

const ProtectedRoute = () => {
    const { session } = useAuth();

    return session ? <Outlet /> : <Navigate to="/" />
};

export default ProtectedRoute;
