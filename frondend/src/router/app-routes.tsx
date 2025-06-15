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
  import Unauthorized from "./ErrorPage";
  import ProtectedRoute from "./protectedRoutes"; 
  
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
        <ProtectedRoute requiredRole="USER">
        <Home/>
        </ProtectedRoute>
      )
    },
    {
      path: "detail/:productId", 
      element: (
        <ProtectedRoute requiredRole="USER">
        <Detail />
        </ProtectedRoute>
      )
    },
    {
      path: "profile", 
      element: (
        <ProtectedRoute requiredRole="USER">
          <Profile />
        </ProtectedRoute>
      ),
    },
    {
      path: "complain", 
      element: (
        <ProtectedRoute requiredRole="USER">
          <Complain />
        </ProtectedRoute>
      ),
    },
    {
      path: "category", 
      element: (
        <ProtectedRoute requiredRole="ADMIN">
          <Category />
        </ProtectedRoute>
      ),
    },
    {
      path: "product", 
      element: (
        <ProtectedRoute requiredRole="ADMIN">
          <Product />
        </ProtectedRoute>
      ),
    },
    {
      path: "category/edit/:id", 
      element: (
        <ProtectedRoute requiredRole="ADMIN">
          <EditCategory />
        </ProtectedRoute>
      ),
    },
    {
      path: "product/edit/:id", 
      element: (
        <ProtectedRoute requiredRole="ADMIN">
          <EditProduct />
        </ProtectedRoute>
      ),
    },
    {
      path: "cart", 
      element: (
        <ProtectedRoute requiredRole="USER">
          <Cart />
        </ProtectedRoute>
      ),
    },
    {
      path: "checkout", 
      element: (
        <ProtectedRoute requiredRole="USER">
          <Checkout />
        </ProtectedRoute>
      ),
    },
    {
      path: "dashboard", 
      element: (
        <ProtectedRoute requiredRole="ADMIN">
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "unauthorized", 
      element: (
        <ProtectedRoute >
          <Unauthorized/>
        </ProtectedRoute>
      ),
    }
  ];
  
  export default function Router() {
    return <RouterProvider router={createBrowserRouter(routes)} />;
  }
  