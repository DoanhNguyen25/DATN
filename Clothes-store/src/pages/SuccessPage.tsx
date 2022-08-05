import axios from "axios";
import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import CategoryPage from "./CategoryPage";
import LoginPage from "./LoginPage";
import ProductPage from "./ProductPage";
import CartPage from "./CartPage";
import StripePayment from "../components/Payment";

const SuccessPage = () => {
  return (
    <>
      <CartPage />
    </>
  );
};

export default SuccessPage;
