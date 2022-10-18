import { Dispatch } from "react";
import {
  AddToCart,
  DeleteAllItems,
  DeleteItem,
  GetCart,
  UpdateCart,
} from "../../api/CartApi";
import { CartAction } from "../../types/cart.types";
import {
  ADD_CART_FAIL,
  ADD_CART_SUCCESS,
  ADD_CART__REQUEST,
  GET_CART_DETAIL,
  REMOVE_ALL_ITEM,
  REMOVE_ITEM,
  UPDATE_CART,
} from "../actionTypes/ActionTypes";
import { toast } from "react-toastify";

export const addToCart =
  (productId: string, color: string, size: string, quantity: number) =>
    async (dispatch: Dispatch<CartAction>) => {
      try {
        dispatch({
          type: ADD_CART__REQUEST,
        });
        const req = await AddToCart("http://18.138.254.179:8000/api/add_to_cart", {
          productId: productId,
          color: color,
          size: size,
          quantity: quantity,
        });

        if (req.data) {
          dispatch({
            type: ADD_CART_SUCCESS,
            payload: req.data.products,
          });
        }
      } catch (error) {
        dispatch({
          type: ADD_CART_FAIL,
        });
      }
    };

export const getCart = () => async (dispath: Dispatch<CartAction>) => {
  try {
    const req = await GetCart("http://18.138.254.179:8000/api/cart");
    if (req.data) {
      dispath({
        type: GET_CART_DETAIL,
        payload: req.data.products,
      });
    }
  } catch (error: any) {
    console.log(error.message);
  }
};

export const updateCart =
  (productId: string, type: string) =>
    async (dispatch: Dispatch<CartAction>) => {
      try {
        const req = await UpdateCart("http://18.138.254.179:8000/api/cart/update", {
          productId: productId,
          type: type,
        });
        if (req.data) {
          dispatch({
            type: UPDATE_CART,
            payload: req.data.cart.products,
          });
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };

export const deleteItemInCart =
  (productId: string) => async (dispatch: Dispatch<CartAction>) => {
    try {
      const req = await DeleteItem(
        `http://18.138.254.179:8000/api/remove/${productId}`
      );
      if (req.data) {
        dispatch({
          type: REMOVE_ITEM,
          payload: req.data.cart.products,
        });
      }
      toast.success("Xóa thành công");
    } catch (error) {
      toast.error("Xóa không thành công");
    }
  };

export const removeAllItems = () => async (dispath: Dispatch<CartAction>) => {
  const req = await DeleteAllItems("http://18.138.254.179:8000/api/removeAll");
  if (req.data) {
    dispath({
      type: REMOVE_ALL_ITEM,
      payload: req.data.products,
    });
  }
};
