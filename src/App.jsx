import { Outlet, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import IndexPage from "./pages/IndexPage";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <Outlet /> } >

      <Route index element={ <IndexPage /> } />

      <Route path="inicio" element={ <MainLayout title="Inicio" /> } >
        <Route index element={ <HomePage title="Inicio" /> } />
      </Route>

      <Route path="/inventario" element={ <MainLayout title="Inventario" /> } >
        <Route index element={ <HomePage />}/>
      </Route>

      <Route path="/proveedores" element={ <MainLayout title="Proveedores" /> } >
        <Route index element={ <HomePage />}/>
      </Route>

      <Route path="/compras" element={ <MainLayout title="Compras" /> } >
        <Route index element={ <HomePage />}/>
      </Route>

      <Route path="/informes" element={ <MainLayout title="Informes" /> } >
        <Route index element={ <HomePage />}/>
      </Route>

      <Route path="/usuarios" element={ <MainLayout title="Usuarios" /> } >
        <Route index element={ <HomePage />}/>
      </Route>

      <Route path="/ventas" element={ <MainLayout title="Ventas" /> } >
        <Route index element={ <HomePage />}/>
      </Route>

      <Route path="/clientes" element={ <MainLayout title="Clientes" /> } >
        <Route index element={ <HomePage />}/>
      </Route>

    </Route>
  )
);

const App = () => {
  return <RouterProvider router={ router } />;
}

export default App;
