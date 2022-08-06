/* eslint-disable react/jsx-no-undef */
import { Add, Remove } from "@material-ui/icons";
import React, {
  Dispatch,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Comment from "../../components/Comment";
import Newsletter from "../../components/Newsletter";
import MainLayout from "../../layouts/MainLayout";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import {
  AddContainer,
  Amount,
  AmountContainer,
  Button,
  Desc,
  Filter,
  FilterColor,
  FilterContainer,
  FilterSize,
  FilterSizeOption,
  FilterTitle,
  Image,
  ImgContainer,
  InfoContainer,
  Price,
  Title,
  Wrapper,
} from "./style";
import { sizeHeight } from "@mui/system";
import { useLocation, useParams } from "react-router-dom";
import { addToCart } from "../../redux/action/cartAction";
import { useDispatch } from "react-redux";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(0);
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isActive, setIsActive] = useState(0);
  const { id } = useParams();
  const dispatch: Dispatch<any> = useDispatch();

  const productId = id;
  const images = [
    "https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "//placekitten.com/800/1200",
    "//placekitten.com/1500/1500",
  ];
  const COLORS = ["black", "darkblue", "gray"];
  const SIZES = ["XS", "M", "S", "L", "XL"];

  const handleIncreaseQuantity = useCallback(
    () => setQuantity((pre) => pre + 1),
    [quantity]
  );

  const handleDecreaseQuantity = useCallback(() => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    } else {
      setQuantity(0);
    }
  }, [quantity]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const handlecolor = (color: string, index: number) => {
    setColor(color);
    setIsActive(index);
  };

  const handleAddToCart = (
    productId: any,
    quantity: number,
    color: string,
    size: string
  ) => {
    dispatch(addToCart(productId, color, size, quantity));
  };

  return (
    <MainLayout>
      <Wrapper>
        <ImgContainer onClick={() => setIsOpen(true)}>
          <Image src="https://i.ibb.co/S6qMxwr/jean.jpg" />
        </ImgContainer>
        <InfoContainer>
          <Title>Denim Jumpsuit</Title>
          <Desc>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at
            iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget
            tristique tortor pretium ut. Curabitur elit justo, consequat id
            condimentum ac, volutpat ornare.
          </Desc>
          <Price>$ 20</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {COLORS.map((color, index) => (
                <FilterColor
                  color={color}
                  key={index}
                  onClick={() => handlecolor(color, index)}
                  style={{
                    border: `${isActive === index ? "3px solid teal" : ""}`,
                  }}
                />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {SIZES.map((size, index) => (
                  <FilterSizeOption key={index}>{size}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <div onClick={handleDecreaseQuantity}>
                <Remove />
              </div>
              <Amount>{quantity}</Amount>
              <div onClick={handleIncreaseQuantity}>
                <Add />
              </div>
            </AmountContainer>
            <Button
              onClick={() => handleAddToCart(productId, quantity, color, size)}
            >
              ADD TO CART
            </Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>

      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}

      <Comment />
      <Newsletter />
    </MainLayout>
  );
};

export default ProductPage;
