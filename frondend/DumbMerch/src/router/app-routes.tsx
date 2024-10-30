import {
    createBrowserRouter,
    RouteObject,
    RouterProvider,
} from "react-router-dom";
import Register from "../components/auth/Register"; 
import Login from "../components/auth/login";
import Home from "../pages/home";
import Detail from "../pages/detail";
import Profile from "../pages/profile";
import Complain from "../pages/complain";
import Category from "../pages/category";
import Product from "../pages/product";
import EditCategory from "../layout/editCategory";
import EditProduct from "../layout/edit-product";

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
    {
        path: "profile", 
        element: <Profile/>, 
    },
    {
        path: "complain", 
        element: <Complain/>, 
    },
    {
        path: "category", 
        element: <Category/>, 
    },
    {
        path: "product", 
        element: <Product/>, 
    },
    {
        path: "category/edit/:id", 
        element: <EditCategory/>, 
    },
    {
        path: "product/edit/:id", 
        element: <EditProduct/>, 
    }
];

export default function Router() {
    return <RouterProvider router={createBrowserRouter(routes)} />;
}
