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
        <Title>GIỎ HÀNG CỦA BẠN</Title>
        <Top>
          <TopButton typeBtn={""}>TIẾP TỤC MUA HÀNG</TopButton>
          <TopTexts>
            <TopText>{`Giỏ Hàng (${productIncart.length})`}</TopText>
          
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
            <SummaryTitle>Hóa Đơn</SummaryTitle>

            <SummaryItem type={""}>
              <SummaryItemText>Phí vận chuyển ước tính:</SummaryItemText>
              <SummaryItemPrice>{formatMoney(10000)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type={""}>
              <SummaryItemText>Giảm giá phí vận chuyển:</SummaryItemText>
              <SummaryItemPrice>{formatMoney(-10000)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Tổng Tiền:</SummaryItemText>
              <SummaryItemPrice>
                {formatMoney(getTotal(productIncart))}
              </SummaryItemPrice>
            </SummaryItem>
            <Link to={"/my-order"}>
              <Button
                style={{ cursor: "pointer" }}
                disabled={productIncart.length ? false : true}
              >
                Đặt Hàng Ngay
              </Button>
            </Link>
          </Summary>
        </Bottom>
      </Wrapper>
    </MainLayout>
  );
};

export default CartPage;
