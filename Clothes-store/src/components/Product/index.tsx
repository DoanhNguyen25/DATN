import React from "react";
import { Circle, Icon, Info, ProductWrapper } from "./style";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link } from "react-router-dom";
const Product = ({ item }: any) => {
  return (
    <ProductWrapper>
      <Circle />
      <img src={item.img} alt="hello ae" />
      <Info>
        <Icon>
          <ShoppingCartIcon />
        </Icon>
        <Icon>
          <Link to={`/product/${item.id}`}>
            <SearchOutlinedIcon />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlinedIcon />
        </Icon>
      </Info>
    </ProductWrapper>
  );
};

export default Product;
