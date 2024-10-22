import {
    createBrowserRouter,
    RouteObject,
    RouterProvider,
} from "react-router-dom";
import Register from "../components/auth/Register"; 
import Login from "../components/auth/login";
import Home from "../pages/home";
import Detail from "../pages/detail";

const routes: RouteObject[] = [
    {
        path: "register", 
        element: <Register />, 
    },
    {
        path: "login", 
        element: <Login/>, 
    },
    {
        path: "/", 
        element: <Home/>, 
    },
    {
        path: "detail", 
        element: <Detail/>, 
    },
];

export default function Router() {
    return <RouterProvider router={createBrowserRouter(routes)} />;
}
