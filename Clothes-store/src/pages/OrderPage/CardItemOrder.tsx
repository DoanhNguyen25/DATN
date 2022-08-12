import React from "react";
import { CartItemWrapper } from "./style";

const CardItemProduct = () => {
  return (
    <CartItemWrapper>
      <div className="order--product__image">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT81g7tlDiHOq-RkJbH1EjpRfHhK_92RjfVdw&usqp=CAU"
          alt="not"
        />
      </div>
      <div className="order--product__content">
        <div className="product__content--left">
          <span className="product__name">ao thun  x1</span>
          <p className="product__color">Color: red, Size:XL</p>
        </div>
        <div className="product__content_right">
          <span className="product__price">576,000vnd</span>
        </div>
      </div>
    </CartItemWrapper>
  );
};

export default CardItemProduct;
