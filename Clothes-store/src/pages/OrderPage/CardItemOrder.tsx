import React from "react";
import { formatMoney } from "../../components/Functions";
import { ProductInCart } from "../../types/cart.types";
import { IProduct } from "../../types/product.types";
import { CartItemWrapper } from "./style";
interface IProp {
  product: ProductInCart;
  // hello: string;
}

const CardItemProduct = (props: IProp) => {

  return (
    <CartItemWrapper>
      <div className="order--product__image">
        <img src={props.product.image} alt="not" />
      </div>
      <div className="order--product__content">
        <div className="product__content--left">
          <span className="product__name">
            {props.product.productName} {"  x"} {props.product.quantity}
          </span>
          <p className="product__color">{`Color:${props.product.color}, Size:${props.product.size}`}</p>
        </div>
        <div className="product__content_right">
          <span className="product__price">
            {formatMoney(props.product.price * props.product.quantity)}
          </span>
        </div>
      </div>
    </CartItemWrapper>
  );
};

export default CardItemProduct;
