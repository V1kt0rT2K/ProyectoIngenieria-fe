import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage";
import AnotherPage from "./pages/AnotherPage";
import MainLayout from "./layouts/MainLayout";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <MainLayout /> } >
        <Route index element={ <HomePage /> } />
        <Route path="hello" element={ <AnotherPage /> } />
    </Route>
  )
);

function App(){
  return <RouterProvider router={ router } />;
}

export default App;
