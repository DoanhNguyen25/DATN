/* eslint-disable react/jsx-no-undef */
import { Add, Remove } from "@material-ui/icons";
import React, { Dispatch, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
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
  const dispatch: Dispatch<any> = useDispatch();
  // const [quantity, setQuantity] = useState<Number>();
  const productIncart = useSelector(
    (state: State) => state.cartReducer.productInCart
  );

  useEffect(() => {
    dispatch(getCart());
  }, []);
  return (
    <MainLayout>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton typeBtn={""}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
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
              <div>không có sản phẩm nào trong giỏ hàng đâu e êi</div>
            )}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem type={""}>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ 80</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type={""}>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type={""}>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ 80</SummaryItemPrice>
            </SummaryItem>
            <Link to={"/my-order"}>
              <Button style={{ cursor: "pointer" }}>CHECKOUT NOW</Button>
            </Link>
          </Summary>
        </Bottom>
      </Wrapper>
    </MainLayout>
  );
};

export default CartPage;
