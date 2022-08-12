import React from "react";
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

const OrderPage = () => {
  const [value, setValue] = React.useState("0");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
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
      alert(JSON.stringify(values, null, 2));
    },
  });
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
            <StripePayment />
          </div>
          <div className="order__info">
            <div className="order__info--products">
              <CardItemOrder />
              <CardItemOrder />
              <CardItemOrder />
              <CardItemOrder />
              <CardItemOrder />
            </div>

            <div className="order__info--payment">
              <div style={{ padding: "0.5rem 2rem" }}>
                <div className="pricing">
                  <span style={{ fontSize: "2rem" }}>Tổng:</span>
                  <span style={{ textAlign: "right", fontSize: "1.5rem" }}>
                    120000$
                  </span>
                </div>

                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
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
                  <button
                    type="submit"
                    onClick={() => {
                      formik.submitForm();
                    }}
                  >
                    Đặt hàng
                  </button>
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
