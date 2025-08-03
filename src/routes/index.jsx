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
import NewProductBatchPage from "../pages/inventory/NewProductBatchPage";
import NewLotPage from "../pages/inventory/NewLotPage";
import LotInfoPage from "../pages/inventory/LotInfoPage";
import ProductCatalogPage from "../pages/inventory/ProductCatalogPage";
import NewProductPage from "../pages/inventory/NewProductPage";
import NewSwineSupplies from "../pages/inventory/NewSwineSupplies"; 

import PurchasesPage from "../pages/purchases/PurchasesPage";
import PurchaseInfoPage from "../pages/purchases/PurchaseInfoPage";
import NewPurchasePage from "../pages/purchases/NewPurchasePage";
import EntryPurcharsePage from "../pages/purchases/EntryPurcharsePage";

import ProvidersPage from "../pages/providers/ProvidersPage";
import NewProviderPage from "../pages/providers/NewProviderPage";

import SalesPage from "../pages/sales/SalesPage";
import NewSalePage from "../pages/sales/NewSalePage";
import SaleDetailPage from "../pages/sales/SaleDetailPage";

import ClientsPage from "../pages/clients/ClientsPage";
import NewClientPage from "../pages/clients/NewClientPage";

import OrdersWholesalerPage from "../pages/orders/OrdersWholesalerPage";
import OrderWholesalerInfoPage from "../pages/orders/OrderWholesalerInfoPage";

//VISTAS DE ADMINISTRADOR
import AdminSalesPage from "../pages/admin/AdminSalesPage";
import CaiCodesPage from "../pages/admin/CaiCodesPage";
import AdminSaleDetailPage from "../pages/admin/AdminSaleDetailPage";

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

                        <Route path="new_product_batch" element={<NewProductBatchPage />} />
                        <Route path="/inventory/lot/:idLote" element={<LotInfoPage />} />
                        <Route path="new_lot" element={<NewLotPage />} />
                        <Route path="product_catalog" element={<ProductCatalogPage />} />
                        <Route path="new_product" element={<NewProductPage />} />   
                        <Route path="/inventory/:idLote/new-supplies" element={<NewSwineSupplies />} />
                    
                    </Route>

                    <Route path="providers" element={<MainLayout title="Proveedores" />} >
                        <Route index element={<ProvidersPage />} />
                        <Route path="new_provider" element={<NewProviderPage />} />
                        <Route path="edit_provider" element={<NewProviderPage />} />
                        <Route path="view_provider" element={<NewProviderPage />} />
                    </Route>

                    <Route path="purchases" element={<MainLayout title="Compras" />} >
                        <Route index element={<PurchasesPage />} />
                        <Route path="purchase_information" element={<PurchaseInfoPage />} />
                        <Route path="new_purchase_order" element={<NewPurchasePage />} />
                        <Route path="entry_purcharse" element={<EntryPurcharsePage/>}/>
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
                        <Route index element={<SalesPage />} />
                        <Route path="new_sale" element={<NewSalePage />} />
                        <Route path="sale_detail" element={<SaleDetailPage/>} />
                    </Route>

                    <Route path="clients" element={<MainLayout title="Clientes" />} >
                        <Route index element={<ClientsPage />} />
                        <Route path="new_client" element={<NewClientPage />} />
                    </Route>

                    <Route path="orders" element={<MainLayout title="Pedidos" />} >
                        <Route index element={<OrdersWholesalerPage />} />
                        <Route path="order_wholesaler_information" element={<OrderWholesalerInfoPage />} />
                    </Route>
                    {/* RUTAS DE ADMINISTRADOR */}
                    <Route path="admin">

                        {/* <Route index element={<HomePage title="Inicio" />} /> */}

                        <Route path="sales" element={<MainLayout title="Ventas" />} >
                            <Route index element={<AdminSalesPage />} />
                            <Route path="codes" element={<CaiCodesPage/>} />
                            <Route path="sale_detail" element={<AdminSaleDetailPage/>} />
                        </Route>
                    </Route>

                </Route>

            </Route>
        )
    );

    return <RouterProvider router={ router } />;
}

export default Routes;