import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../redux/actionTypes/ActionTypes";

export interface UserInfo {
  _id: String;
  fullname: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  isAdmin: boolean;
  isActive: boolean;
  role: Number;
  access_token: String;
}

export interface UserState {
  loading: boolean;
  message: String;
  userInfo: UserInfo;
}

export interface UserRegisterState {
  loading: boolean;
  message: String;
}

interface LoginRequest {
  type: typeof USER_LOGIN_REQUEST;
}

interface LoginSuccess {
  type: typeof USER_LOGIN_SUCCESS;
  payload: UserInfo;
}

interface LoginFail {
  type: typeof USER_LOGIN_FAIL;
  payload: String;
}

interface RegisterRequest {
  type: typeof USER_REGISTER_REQUEST;
}

interface RegisterSuccess {
  type: typeof USER_REGISTER_SUCCESS;
  payload: String;
}
interface RegisterFail {
  type: typeof USER_REGISTER_FAIL;
  payload: String;
}

interface LogOut {
  type: typeof USER_LOGOUT;
  payload: UserInfo;
}

export type UserAction =
  | LoginRequest
  | LoginFail
  | LoginSuccess
  | LogOut
  | RegisterFail
  | RegisterRequest
  | RegisterSuccess;
