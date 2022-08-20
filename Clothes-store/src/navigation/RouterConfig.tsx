import { useRoutes } from "react-router-dom";
import {
  CART,
  CATEGORY,
  FORGOT_PASS,
  ORDER,
  ORDER_HISTORY,
  PRODUCTDETAIL,
  RESET_PASS,
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
import { SendMail } from "../api/UserApi";
import SendMailPage from "../pages/SendMailPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";

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
        { path: FORGOT_PASS, element: <SendMailPage /> },
        { path: RESET_PASS, element: <ResetPasswordPage /> },
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
