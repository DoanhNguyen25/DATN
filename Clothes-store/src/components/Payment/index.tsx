import axios from "axios";
import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
const StripePayment = () => {
  const [stripeToken, setStripeToken] = useState<any>("");
  const onToken = (token: any) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post("http://localhost:8000/api/payment", {
          tokenId: stripeToken.id,
          amount: 2000,
        });
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken]);

  return (
    <>
      {/* <CategoryPage /> */}
      <StripeCheckout
        token={onToken}
        stripeKey="pk_test_51LPHggHeJ0aAGxilBYlgCnYeR3fG3om1i08TbWplsafhk3Kl4rqi8FaRPkckhwnvheTJXad8GhQjrk8WVW50zhtX00NNNqpNjh"
        amount={2000}
        name="DoanhNGuyen"
      >
        <button>payment</button>
      </StripeCheckout>
    </>
  );
};

export default StripePayment;
