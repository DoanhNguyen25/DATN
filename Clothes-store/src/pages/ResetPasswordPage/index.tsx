import React, { Dispatch, useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
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
import { EditUser } from "../../api/UserApi";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userId = searchParams.get("idReset");
  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("không được để trống")
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          "Mật khẩu cần chứa ít nhất 8 kí tự bao gồm kí tự thường, kí tự in hoa, số, kí tự đặc biệt"
        ),
      confirm_password: Yup.string()
        .required("không được để tronnsgo")
        .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp"),
    }),
    onSubmit: (values, { resetForm }) => {
      editUser({ password: formik.values.password });
      resetForm();
    },
  });

  const editUser = async (data: any) => {
    try {
      const req = await EditUser(
        `http://18.138.254.179:8000/api/user/${userId}`,
        data
      );
      if (req.data) {
        toast.success("sửa thành công!!!");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      toast.error("sửa thất bại!!!");
    }
  };

  return (
    <LoginContainer>
      <Wrapper>
        <Title>Đặt Lại Mật Khẩu</Title>
        <Form onSubmit={formik.handleSubmit}>
          <div className="form__group--input">
            <Input
              placeholder="password"
              name="password"
              type={"password"}
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password && formik.touched.password && (
              <span className="msg__error">{formik.errors.password}</span>
            )}
          </div>

          <div className="form__group--input">
            <Input
              placeholder="password"
              name="confirm_password"
              type={"password"}
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
            />
            {formik.errors.confirm_password &&
              formik.touched.confirm_password && (
                <span className="msg__error">
                  {formik.errors.confirm_password}
                </span>
              )}
          </div>

          <Button>Đặt lại mật khẩu</Button>
        </Form>
      </Wrapper>
    </LoginContainer>
  );
};

export default ResetPasswordPage;
