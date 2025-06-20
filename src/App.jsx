import { Outlet, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import IndexPage from "./pages/IndexPage";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <Outlet /> } >

      <Route index element={ <IndexPage /> } />

      <Route path="hello" element={ <MainLayout /> } >
        <Route index element={ <HomePage /> } />
      </Route>

    </Route>
  )
);

const App = () => {
  return <RouterProvider router={ router } />;
}

export default App;
