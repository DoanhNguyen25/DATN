import { useRoutes } from "react-router-dom";
import { CART, CATEGORY, ORDER, PRODUCTDETAIL, ROOT, SEARCH } from "./CONSTANT";
import HomePage from "../pages/HomePage";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/RegisterPage";
import ErrorPage from "../pages/ErrorPage";
import CartPage from "../pages/CartPage";
import Product from "../components/Product";
import ProductPage from "../pages/ProductPage";
import CategoryPage from "../pages/CategoryPage";
import OrderPage from "../pages/OrderPage";
import SearchPage from "../pages/SearchPage";

const RouterConfig = () => {
  const user = localStorage.getItem("access");

  const routes = useRoutes([
    {
      path: ROOT,
      element: <HomePage />,
    },
    {
      element: <AuthLayout />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "signup", element: <SignUpPage /> },
      ],
    },
    {
      path: CART,
      element: !user ? <LoginPage /> : <CartPage />,
    },
    {
      path: PRODUCTDETAIL,
      element: <ProductPage />,
    },
    {
      path: CATEGORY,
      element: <CategoryPage />,
    },
    {
      path: ORDER,
      element: <OrderPage />,
    },
    {
      path:SEARCH,
      element:<SearchPage/>
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return routes;
};

export default RouterConfig;
