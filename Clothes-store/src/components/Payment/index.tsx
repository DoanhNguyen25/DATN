import axios from "axios";
import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";

interface IProps {
  name: string;
  amount: number;
  onClick: () => void;
  formik: any;
  disable: boolean;
}
const StripePayment = (props: IProps) => {
  const [stripeToken, setStripeToken] = useState<any>("");
  const onToken = (token: any) => {
    setStripeToken(token);
    props.formik.submitForm();
  };

  console.log(props.formik);
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post("http://localhost:8000/api/payment", {
          tokenId: stripeToken.id,
          amount: props.amount,
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
        amount={props.amount}
        name={props.name}
        currency="vnd"
      >
        <button disabled={props.disable}>Đặt hàng</button>
      </StripeCheckout>
    </>
  );
};

export default StripePayment;
