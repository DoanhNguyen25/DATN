import React, { Dispatch, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Agreement,
  Button,
  Form,
  Input,
  SignUpContainer,
  Title,
  Wrapper,
} from "./style";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../redux/reducers";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/action/useAction";

const SignUpPage = () => {
  const navigate = useNavigate();
  const message = useSelector(
    (state: State) => state.userRegisterReducer.message
  );
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    const registerTimeout = setTimeout(() => {
      if (message === "success") {
        navigate("/login");
      }
    }, 1000);

    return () => {
      clearTimeout(registerTimeout);
    };
  }, [message, navigate]);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      cfpassword: "",
      phone: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("không được để trống"),
      username: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("không được để trống"),
      email: Yup.string()
        .required("không được để trống")
        .email("email không hợp lệ"),
      phone: Yup.string()
        .required("không được để trống")
        .matches(
          /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/,
          "Số điện thoại không hợp lệ"
        ),
      password: Yup.string()
        .required("không được để trống")
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          "Mật khẩu cần chứa ít nhất 8 kí tự bao gồm kí tự thường, kí tự in hoa, số, kí tự đặc biệt"
        ),
      cfpassword: Yup.string()
        .required("không được để trống")
        .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        register(
          values.username,
          values.fullname,
          values.email,
          values.password,
          values.phone
        )
      );
      resetForm();
     
    },
  });
  return (
    <SignUpContainer>
      <Wrapper>
        <Title>ĐĂNG KÝ TÀI KHOẢN</Title>
        <Form onSubmit={formik.handleSubmit}>
          <div className="form__group">
            <label>Họ và Tên: </label>
            <div className="form__group--input">
              <Input
                placeholder="Họ và tên"
                name="fullname"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                className={formik.errors.fullname && "error-field"}
              />
              {formik.errors.fullname && formik.touched.fullname && (
                <span className="msg__error">{formik.errors.fullname}</span>
              )}
            </div>
          </div>
          <div className="form__group">
            <label htmlFor="">Tên đăng nhập:</label>
            <div className="form__group--input">
              <Input
                placeholder="Tên đăng nhập"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                className={formik.errors.username && "error-field"}
              />
              {formik.errors.username && formik.touched.username && (
                <span className="msg__error">{formik.errors.username}</span>
              )}
            </div>
          </div>
          <div className="form__group">
            <label htmlFor="">Email:</label>
            <div className="form__group--input">
              <Input
                placeholder="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className={formik.errors.email && "error-field"}
              />
              {formik.errors.email && formik.touched.email && (
                <span className="msg__error">{formik.errors.email}</span>
              )}
            </div>
          </div>
          <div className="form__group">
            <label htmlFor="">Phone:</label>
            <div className="form__group--input">
              <Input
                placeholder="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                className={formik.errors.phone && "error-field"}
              />
              {formik.errors.phone && formik.touched.phone && (
                <span className="msg__error">{formik.errors.phone}</span>
              )}
            </div>
          </div>
          <div className="form__group">
            <label htmlFor="">Mật khẩu:</label>
            <div className="form__group--input">
              <Input
                type={"password"}
                placeholder="Mật khẩu"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className={formik.errors.password && "error-field"}
              />
              {formik.errors.password && formik.touched.password && (
                <span className="msg__error">{formik.errors.password}</span>
              )}
            </div>
          </div>
          <div className="form__group">
            <label htmlFor="">Xác nhận mật khẩu:</label>
            <div className="form__group--input">
              <Input
                type={"password"}
                placeholder="Xác nhận mật khẩu"
                name="cfpassword"
                value={formik.values.cfpassword}
                onChange={formik.handleChange}
                className={formik.errors.cfpassword && "error-field"}
              />
              {formik.errors.cfpassword && formik.touched.cfpassword && (
                <span className="msg__error">{formik.errors.cfpassword}</span>
              )}
            </div>
          </div>
          <Agreement>
            <input type="checkbox" id="policy"></input>
            <label htmlFor="policy">
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </label>
          </Agreement>
          <Button>Đăng Ký</Button>
        </Form>
      </Wrapper>
    </SignUpContainer>
  );
};

export default SignUpPage;
