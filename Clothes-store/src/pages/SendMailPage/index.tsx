import React, { Dispatch, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form, Input, LinkCustom } from "./style";
import { toast } from "react-toastify";
import { Title, Wrapper, LoginContainer } from "../LoginPage/style";
import { SendMail } from "../../api/UserApi";

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không đúng định dạng")
        .required("không được để trống"),
    }),
    onSubmit: (values, { resetForm }) => {
      handleSendMail();
      resetForm();
    },
  });

  const handleSendMail = async () => {
    try {
      const req = await SendMail(
        "http://18.138.254.179:8000/api/reset-password",
        formik.values.email
      );
      if (req.data) {
        toast.success("gửi mail thành công!");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <LoginContainer>
      <Wrapper>
        <Title>Nhập Email Xác Nhận</Title>
        <Form onSubmit={formik.handleSubmit}>
          <div className="form__group--input">
            <Input
              placeholder="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email && formik.touched.email && (
              <span className="msg__error">{formik.errors.email}</span>
            )}
          </div>

          <Button>Gửi</Button>
          <LinkCustom>
            <Link to={"/login"}>Quay lại</Link>
          </LinkCustom>
        </Form>
      </Wrapper>
    </LoginContainer>
  );
};

export default LoginPage;
