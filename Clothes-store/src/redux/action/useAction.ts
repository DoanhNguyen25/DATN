import React, { Dispatch } from "react";
import { UserAction } from "../../types/user.types";
import { toast } from "react-toastify";

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../actionTypes/ActionTypes";
import { LoginData, RegisterData } from "../../api/AuthApi";

export const login =
  (username: String, password: String) =>
  async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });

      const req = await LoginData("http://localhost:8000/api/login", {
        username: username,
        password: password,
      });

      if (req.data) {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: req.data,
        });
        localStorage.setItem("userInfo", JSON.stringify(req.data));
        localStorage.setItem("access", JSON.stringify(req.data.access_token));
      }
      toast.success("Đăng nhập thành công");
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: "Email hoặc mật khẩu không chính xác",
      });
      toast.error("Email hoặc mật khẩu không chính xác");
    }
  };

export const logout = () => (dispatch: Dispatch<UserAction>) => {
  dispatch({
    type: USER_LOGOUT,
    payload: {
      _id: "",
      access_token: "",
      avatar: "",
      email: "",
      fullname: "",
      isActive: false,
      isAdmin: false,
      phone: "",
      username: "",
    },
  });
};

export const register =
  (
    username: String,
    fullname: String,
    email: String,
    password: String,
    phone: String
  ) =>
  async (dispath: Dispatch<UserAction>) => {
    try {
      dispath({
        type: USER_REGISTER_REQUEST,
      });
      const req = await RegisterData("http://localhost:8000/api/register", {
        email: email,
        fullname: fullname,
        username: username,
        phone: phone,
        password: password,
      });

      if (req.data) {
        dispath({
          type: USER_REGISTER_SUCCESS,
          payload: "success",
        });
      }
      toast.success("đăng kí thành công");
    } catch (error: any) {
      dispath({
        type: USER_REGISTER_FAIL,
        payload: error.message,
      });
      toast.error("đăng kí không thành công");
    }
  };
