import {
  ADD_CART_FAIL,
  ADD_CART_SUCCESS,
  ADD_CART__REQUEST,
  GET_CART_DETAIL,
  REMOVE_ITEM,
  UPDATE_CART,
} from "../redux/actionTypes/ActionTypes";

export interface ProductInCart {
  productId: string;
  productName: String;
  quantity: Number;
  price: Number;
  color: string;
  size: string;
  image: string;
}

export interface CartState {
  loading: boolean;
  productInCart: ProductInCart[];
  message: String;
}

interface AddCartRequest {
  type: typeof ADD_CART__REQUEST;
}

interface AddCartSuccess {
  type: typeof ADD_CART_SUCCESS;
  payload: ProductInCart[];
}

interface AddCartFail {
  type: typeof ADD_CART_FAIL;
}

interface GetCart {
  type: typeof GET_CART_DETAIL;
  payload: ProductInCart[];
}

interface UpdateCart {
  type: typeof UPDATE_CART;
}

interface RemoveItem {
  type: typeof REMOVE_ITEM;
  payload: ProductInCart[];
}

export type CartAction =
  | AddCartRequest
  | AddCartSuccess
  | AddCartFail
  | GetCart
  | UpdateCart
  | RemoveItem;
