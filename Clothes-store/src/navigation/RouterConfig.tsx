import { useRoutes } from "react-router-dom";
import {
  CART,
  CATEGORY,
  ORDER,
  ORDER_HISTORY,
  PRODUCTDETAIL,
  ROOT,
  SEARCH,
  USER_PROFILE,
} from "./CONSTANT";
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
import UserProfile from "../pages/UserProfile";
import OrderHistory from "../pages/OrderHistory";

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
      path: ORDER_HISTORY,
      element: <OrderHistory />,
    },
    {
      path: SEARCH,
      element: <SearchPage />,
    },
    {
      path: USER_PROFILE,
      element: <UserProfile />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return routes;
};

export default RouterConfig;
