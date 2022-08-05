import {
  UserAction,
  UserRegisterState,
  UserState,
} from "../../types/user.types";
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../actionTypes/ActionTypes";

const initialState: UserRegisterState = {
  loading: false,
  message: "",
};

export const userRegisterReducer = (
  state: UserRegisterState = initialState,
  action: UserAction
) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };

    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    default:
      return state;
  }
};
