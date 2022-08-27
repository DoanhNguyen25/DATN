import { UserAction, UserState } from "../../types/user.types";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
} from "../actionTypes/ActionTypes";

const initialState: UserState = {
  loading: false,
  message: "",
  userInfo: {
    _id: "",
    username: "",
    fullname: "",
    isAdmin: true,
    isActive: true,
    role: 2,
    avatar: "",
    phone: "",
    email: "",
    access_token: "",
  },
};

export const userReducer = (
  state: UserState = initialState,
  action: UserAction
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };

    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};
