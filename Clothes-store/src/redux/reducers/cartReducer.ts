import { Dispatch } from "react";
import { CartAction, CartState } from "../../types/cart.types";
import {
  ADD_CART_FAIL,
  ADD_CART_SUCCESS,
  ADD_CART__REQUEST,
  GET_CART_DETAIL,
  REMOVE_ITEM,
  UPDATE_CART,
} from "../actionTypes/ActionTypes";

const initialState: CartState = {
  loading: false,
  productInCart: [],
  message: "",
};
export const cartReducer = (
  state: CartState = initialState,
  action: CartAction
) => {
  switch (action.type) {
    case ADD_CART__REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        productInCart: action.payload,
      };
    case ADD_CART_FAIL:
      return {
        ...state,
        loading: false,
      };
    case GET_CART_DETAIL:
      return {
        ...state,
        productInCart: action.payload,
      };
    case UPDATE_CART:
      return {
        ...state,
        message: "thành công",
      };
    case REMOVE_ITEM:
      return {
        ...state,
        productInCart: action.payload,
      };
    default:
      return state;
  }
};
