import React from "react";
import { Circle, Icon, Info, ProductWrapper } from "./style";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link } from "react-router-dom";
import { formatMoney } from "../Functions";

const Product = ({ item }: any) => {
  return (
    <ProductWrapper>
      <Circle />
      <img src={item.listImg[0]} alt="hello ae" />
      <Info>
        {/* <Icon>
          <ShoppingCartIcon />
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlinedIcon />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlinedIcon />
        </Icon> */}
        <div className="info__container">
          <div className="info--title">{item.title}</div>
          <div className="info--desc">{item.desc}</div>
          <div className="info--detail">
            <div className="detail--price">Giá:{formatMoney(item.price)}</div>
            <div className="detail--quantity">
              Số lượng còn lại :{item.quantityInStock}
            </div>
          </div>
          <br />
          <div className="info--link">
            {" "}
            <Link to={`/product/${item._id}`}>Xem chi tiết</Link>
          </div>
        </div>
      </Info>
    </ProductWrapper>
  );
};

export default Product;
