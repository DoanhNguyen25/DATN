import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { OrderPageWrapper } from "./style";
import { useFormik } from "formik";
import * as Yup from "yup";
import StripePayment from "../../components/Payment";

const OrderPage = () => {
  const formik = useFormik({
    initialValues: {
      first_name: "",
      email: "",
      phone: "",
      address: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
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
                    name="first_name"
                     
                  />
                  {formik.errors.first_name && formik.touched.first_name && (
                    <span className="msg__error">
                      {formik.errors.first_name}
                    </span>
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
              <div>
                <button type="submit">Đặt hàng</button>
              </div>
            </form>
            <StripePayment />
          </div>
          <div className="order__info"></div>
        </div>
      </OrderPageWrapper>
    </MainLayout>
  );
};

export default OrderPage;
