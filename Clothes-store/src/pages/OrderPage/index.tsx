import React, { Dispatch, useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { OrderPageWrapper } from "./style";
import { useFormik } from "formik";
import * as Yup from "yup";
import StripePayment from "../../components/Payment";
import CardItemOrder from "./CardItemOrder";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useSelector } from "react-redux";
import { State } from "../../redux/reducers";
import { useDispatch } from "react-redux";
import {
  deleteItemInCart,
  getCart,
  removeAllItems,
} from "../../redux/action/cartAction";
import { ProductInCart } from "../../types/cart.types";
import { formatMoney } from "../../components/Functions";
import { CreateOrder } from "../../api/OrderApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const [payment, setPayment] = React.useState("0");
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch: Dispatch<any> = useDispatch();
  const products = useSelector(
    (state: State) => state.cartReducer.productInCart
  );
  const navigate = useNavigate();

  console.log(products);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayment(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      phone: "",
      address: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("không được để trống"),
      email: Yup.string()
        .email("Invalid email format")
        .required("không được để trống"),
      phone: Yup.string().required("không được để trống"),
      address: Yup.string().required("không được để trống"),
    }),
    onSubmit: (values) => {
      createOrder();
    },
  });

  const getTotal = (products: ProductInCart[]) => {
    return products.reduce((pre: number, curr: ProductInCart) => {
      return pre + curr.price * curr.quantity;
    }, 0);
  };

  const createOrder = async () => {
    try {
      const req = await CreateOrder(
        "http://localhost:8000/api/create-order",
        formik.values
      );

      if (req.data) {
        toast.success("đặt hàng thành công!!!");
        dispatch(removeAllItems());
        navigate("/");
      }
    } catch (error) {
      toast.error("đặt hàng thất bại!!");
    }
  };
  return (
    <MainLayout>
      <OrderPageWrapper>
        <h1 style={{ textAlign: "center" }}>Đặt hàng</h1>
        <div className="order__container">
          <div className="order__form">
            <form onSubmit={formik.handleSubmit}>
              <div className="form__group">
                <label className="form__group--label">Họ và tên:</label>
                <div className="form__group--input">
                  <input
                    type="text"
                    name="fullname"
                    value={formik.values.fullname}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.fullname && formik.touched.fullname && (
                    <span className="msg__error">{formik.errors.fullname}</span>
                  )}
                </div>
              </div>
              <div className="form__group">
                <label className="form__group--label">Email:</label>
                <div className="form__group--input">
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <span className="msg__error">{formik.errors.email}</span>
                  )}
                </div>
              </div>
              <div className="form__group">
                <label className="form__group--label">Số điện thoại:</label>
                <div className="form__group--input">
                  <input
                    type="text"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.phone && formik.touched.phone && (
                    <span className="msg__error">{formik.errors.phone}</span>
                  )}
                </div>
              </div>
              <div className="form__group">
                <label className="form__group--label">Địa chỉ:</label>
                <div className="form__group--input">
                  <input
                    type="text"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.address && formik.touched.address && (
                    <span className="msg__error">{formik.errors.address}</span>
                  )}
                </div>
              </div>
            </form>
          </div>
          <div className="order__info">
            <div className="order__info--products">
              {products.map((product) => (
                <CardItemOrder product={product} key={product.productId} />
              ))}
            </div>

            <div className="order__info--payment">
              <div style={{ padding: "0.5rem 2rem" }}>
                <div className="pricing">
                  <span style={{ fontSize: "2rem" }}>Tổng:</span>
                  <span style={{ textAlign: "right", fontSize: "1.5rem" }}>
                    {formatMoney(getTotal(products))}
                  </span>
                </div>

                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={payment}
                    onChange={handleChange}
                    style={{ flexDirection: "row" }}
                  >
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="Thanh toán khi nhận hàng"
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Thanh Toán qua Stripe"
                    />
                  </RadioGroup>
                </FormControl>

                <div className="btn-order">
                  {payment === "0" ? (
                    <button
                      type="submit"
                      onClick={() => {
                        formik.submitForm();
                      }}
                    >
                      Đặt hàng
                    </button>
                  ) : (
                    <StripePayment
                      onClick={() => formik.submitForm()}
                      name={formik.values.fullname}
                      amount={getTotal(products)}
                      formik={formik}
                      disable={
                        formik.values.fullname ||
                        formik.values.phone ||
                        formik.values.email ||
                        formik.values.address
                          ? false
                          : true
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </OrderPageWrapper>
    </MainLayout>
  );
};

export default OrderPage;
