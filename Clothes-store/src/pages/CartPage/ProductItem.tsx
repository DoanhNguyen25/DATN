import { Add, Remove } from "@material-ui/icons";
import React, { Dispatch, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteItemInCart, updateCart } from "../../redux/action/cartAction";
import { ProductInCart } from "../../types/cart.types";
import {
  Details,
  PriceDetail,
  Product,
  ProductAmount,
  ProductAmountContainer,
  ProductColor,
  ProductDetail,
  ProductId,
  ProductName,
  ProductPrice,
  ProductSize,
  Image,
} from "./style";

interface IProps {
  item: ProductInCart;
}
const ProductItem = (props: IProps) => {
  const number = parseInt(props.item.quantity.toString());
  const [quantity, setQuantity] = useState(number);
  const dispatch: Dispatch<any> = useDispatch();
  const handleIncreaseQuantity = useCallback(() => {
    setQuantity((pre) => pre + 1);
    dispatch(updateCart(props.item.productId, "add"));
  }, [quantity]);

  const handleDecreaseQuantity = useCallback(() => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      dispatch(updateCart(props.item.productId, "minus"));
    } else {
      dispatch(deleteItemInCart(props.item.productId));
    }
  }, [quantity]);
  return (
    <Product>
      <ProductDetail>
        <Image src={props.item.image} />
        <Details>
          <ProductName>
            <b>Product:</b> {props.item.productName}
          </ProductName>
          <ProductId>
            <b>ID:</b> {props.item.productId}
          </ProductId>
          <ProductColor color={"red"} />
          <ProductSize>
            <b>Size:</b> {props.item.size}
          </ProductSize>
        </Details>
      </ProductDetail>
      <PriceDetail>
        <ProductAmountContainer>
          <span onClick={handleDecreaseQuantity}>
            <Remove />
          </span>
          <ProductAmount>{quantity}</ProductAmount>
          <span onClick={handleIncreaseQuantity}>
            <Add />
          </span>
        </ProductAmountContainer>
        <ProductPrice>$ {props.item.price}</ProductPrice>
      </PriceDetail>
    </Product>
  );
};

export default ProductItem;
