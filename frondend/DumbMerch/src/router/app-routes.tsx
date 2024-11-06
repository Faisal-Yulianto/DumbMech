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
  import Cart from "../pages/cart";
  import Checkout from "../pages/checkout";
  import Dashboard from "../pages/dashboard";
  import ProtectedRoute from "./protectedRoutes"; // Impor ProtectedRoute
  
  const routes: RouteObject[] = [
    {
      path: "register", 
      element: <Register />,
    },
    {
      path: "login", 
      element: <Login />,
    },
    {
      path: "/", 
      element: (
        <ProtectedRoute>
        <Home />
        </ProtectedRoute>
      )
    },
    {
      path: "detail/:productId", 
      element: (
        <ProtectedRoute>
        <Detail />,
        </ProtectedRoute>
      )
    },
    {
      path: "profile", 
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ),
    },
    {
      path: "complain", 
      element: (
        <ProtectedRoute>
          <Complain />
        </ProtectedRoute>
      ),
    },
    {
      path: "category", 
      element: (
        <ProtectedRoute>
          <Category />
        </ProtectedRoute>
      ),
    },
    {
      path: "product", 
      element: (
        <ProtectedRoute>
          <Product />
        </ProtectedRoute>
      ),
    },
    {
      path: "category/edit/:id", 
      element: (
        <ProtectedRoute>
          <EditCategory />
        </ProtectedRoute>
      ),
    },
    {
      path: "product/edit/:id", 
      element: (
        <ProtectedRoute>
          <EditProduct />
        </ProtectedRoute>
      ),
    },
    {
      path: "cart", 
      element: (
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      ),
    },
    {
      path: "checkout", 
      element: (
        <ProtectedRoute>
          <Checkout />
        </ProtectedRoute>
      ),
    },
    {
      path: "dashboard", 
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    }
  ];
  
  export default function Router() {
    return <RouterProvider router={createBrowserRouter(routes)} />;
  }
  