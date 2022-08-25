/* eslint-disable react/jsx-no-undef */
import { Add, Remove } from "@material-ui/icons";
import React, { Dispatch, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { formatMoney } from "../../components/Functions";
import MainLayout from "../../layouts/MainLayout";
import { ProductInCart } from "../../types/cart.types";
import {
  deleteItemInCart,
  getCart,
  updateCart,
} from "../../redux/action/cartAction";
import { State } from "../../redux/reducers";
import ProductItem from "./ProductItem";
import {
  Bottom,
  Details,
  Info,
  PriceDetail,
  Product,
  ProductAmount,
  ProductAmountContainer,
  ProductColor,
  ProductDetail,
  ProductId,
  ProductName,
  ProductSize,
  Title,
  Top,
  TopButton,
  TopText,
  TopTexts,
  Wrapper,
  Image,
  ProductPrice,
  Summary,
  SummaryItem,
  SummaryItemText,
  SummaryTitle,
  SummaryItemPrice,
  Button,
} from "./style";

const CartPage = () => {
  // const [quantity, setQuantity] = useState<Number>();
  const productIncart = useSelector(
    (state: State) => state.cartReducer.productInCart
  );

  const getTotal = (products: ProductInCart[]) => {
    return products.reduce((pre: number, curr: ProductInCart) => {
      return pre + curr.price * curr.quantity;
    }, 0);
  };

  return (
    <MainLayout>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton typeBtn={""}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>{`Shopping Bag(${productIncart.length})`}</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {productIncart.length > 0 ? (
              productIncart.map((product, index) => (
                <div key={index}>
                  <ProductItem item={product} />
                  <hr />
                </div>
              ))
            ) : (
              <div style={{ textAlign: "center" }}>
                không có sản phẩm nào trong giỏ hàng
              </div>
            )}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>

            <SummaryItem type={""}>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>{formatMoney(10000)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type={""}>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>{formatMoney(-10000)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>
                {formatMoney(getTotal(productIncart))}
              </SummaryItemPrice>
            </SummaryItem>
            <Link to={"/my-order"}>
              <Button
                style={{ cursor: "pointer" }}
                disabled={productIncart.length ? false : true}
              >
                CHECKOUT NOW
              </Button>
            </Link>
          </Summary>
        </Bottom>
      </Wrapper>
    </MainLayout>
  );
};

export default CartPage;
