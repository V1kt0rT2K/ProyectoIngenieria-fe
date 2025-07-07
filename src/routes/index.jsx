import { Outlet, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import IndexPage from "../pages/IndexPage";

import MainLayout from "../layouts/MainLayout";

import HomePage from "../pages/HomePage";

import UsersPage from "../pages/users/UsersPage";
import UsersRequestsPage from "../pages/users/UsersRequestsPage";
import UserRequestPage from "../pages/users/UserRequestPage";
import UserActivityPage from "../pages/users/UserActivityPage";
import UserInfoPage from "../pages/users/UserInfoPage";

import InventoryPage from "../pages/inventory/InventoryPage";
import NewMeatTypePage from "../pages/inventory/NewMeatTypePage";
import NewLotPage from "../pages/inventory/NewLotPage";
import LotInfoPage from "../pages/inventory/LotInfoPage";

import ProtectedRoute from "./ProtectedRoute";

const Routes = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Outlet />} >

                <Route index element={<IndexPage />} />

                <Route element={<ProtectedRoute />} >
                    <Route path="home" element={<MainLayout title="Inicio" />} >
                        <Route index element={<HomePage title="Inicio" />} />
                    </Route>

                    <Route path="inventory" element={<MainLayout title="Inventario" />} >
                        <Route index element={<InventoryPage />} />

                        <Route path="new_meat_type" element={<NewMeatTypePage />} />
                        <Route path="lot_information" element={<LotInfoPage />} />
                        <Route path="new_lot" element={<NewLotPage />} />
                    </Route>

                    <Route path="providers" element={<MainLayout title="Proveedores" />} >
                        <Route index element={<HomePage />} />
                    </Route>

                    <Route path="purchases" element={<MainLayout title="Compras" />} >
                        <Route index element={<HomePage />} />
                    </Route>

                    <Route path="reports" element={<MainLayout title="Informes" />} >
                        <Route index element={<HomePage />} />
                    </Route>

                    <Route path="users" element={<MainLayout title="Usuarios" />} >
                        <Route index element={<UsersPage />} />
                        <Route path="requests" >
                            <Route index element={<UsersRequestsPage />} />
                            <Route path="user_request" element={<UserRequestPage />} />
                        </Route>
                        <Route path="user_information" element={<UserInfoPage />} />
                        <Route path="user_activity" element={<UserActivityPage />} />
                    </Route>

                    <Route path="sales" element={<MainLayout title="Ventas" />} >
                        <Route index element={<HomePage />} />
                    </Route>

                    <Route path="clients" element={<MainLayout title="Clientes" />} >
                        <Route index element={<HomePage />} />
                    </Route>
                </Route>

            </Route>
        )
    );

    return <RouterProvider router={ router } />;
}

export default Routes;