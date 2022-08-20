import React, { Dispatch, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  LoginContainer,
  Form,
  Input,
  LinkCustom,
  Title,
  Wrapper,
} from "./style";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/action/useAction";
// import { useAppDispatch } from "../../hooks/hooks";
import { UserAction } from "../../types/user.types";
import { State } from "../../redux/reducers";
import { toast } from "react-toastify";

const LoginPage = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const userInfo = useSelector((state: State) => state.userReducer.userInfo);
  const navigate = useNavigate();
  const {pathname} = useLocation()
  useEffect(() => {
    if (userInfo !== undefined && userInfo._id) {
      if(pathname === "/login"){
        navigate("/");
      }else{
        navigate(`${pathname}`)
      }
    }
  }, [userInfo, navigate]);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("không được để trống"),
      password: Yup.string()
        .required("không được để trống")
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          "Mật khẩu cần chứa ít nhất 8 kí tự bao gồm kí tự thường, kí tự in hoa, số, kí tự đặc biệt"
        ),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(login(values.username, values.password));
      resetForm();
    },
  });

  return (
    <LoginContainer>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={formik.handleSubmit}>
          <div className="form__group--input">
            <Input
              placeholder="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            {formik.errors.username && formik.touched.username && (
              <span className="msg__error">{formik.errors.username}</span>
            )}
          </div>

          <div className="form__group--input">
            <Input
              placeholder="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password && formik.touched.password && (
              <span className="msg__error">{formik.errors.password}</span>
            )}
          </div>
          <Button>LOGIN</Button>
          <LinkCustom>
            <Link to={"/forgot-pass"}>QUÊN MẬT KHẨU?</Link>
          </LinkCustom>
          <LinkCustom>
            <Link to={"/signup"}>ĐĂNG KÝ TÀI KHOẢN</Link>
          </LinkCustom>
        </Form>
      </Wrapper>
    </LoginContainer>
  );
};

export default LoginPage;
