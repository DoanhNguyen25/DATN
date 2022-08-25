/* eslint-disable react/jsx-no-undef */
import { Add, Remove } from "@material-ui/icons";
import React, { Dispatch, useCallback, useEffect, useState } from "react";
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
  ImgContainer,
  InfoContainer,
  Price,
  Title,
  Wrapper,
} from "./style";
import { useParams } from "react-router-dom";
import { addToCart } from "../../redux/action/cartAction";
import { useDispatch } from "react-redux";
import axios from "axios";
import { IProduct } from "../../types/product.types";
import { getComment } from "../../redux/action/productAction";
import { formatMoney } from "../../components/Functions";

const ProductPage = () => {
  const [product, setProduct] = useState<IProduct>();
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isActive, setIsActive] = useState(0);
  const { id } = useParams();
  const dispatch: Dispatch<any> = useDispatch();
  const [img, setImg] = useState<any>("");
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
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else {
      setQuantity(1);
    }
  }, [quantity]);

  const handleSwitchImage = (e: any) => {
    setImg(e.target.src);
  };

  useEffect(() => {
    window.scroll(0, 0);
    const getData = async () => {
      const req = await axios.get(`http://localhost:8000/api/product/${id}`);
      if (req.data) {
        setProduct(req.data);
        setImg(req.data.listImg[0]);
      }
    };
    getData();

    dispatch(getComment());
  }, [id]);

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

  console.log(typeof product?.price);
  console.log(img);

  return (
    <MainLayout>
      <Wrapper>
        <ImgContainer imageHover={images[0]}>
          <div className="list--image">
            <div className="sub--image">
              <img
                src="https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="anh1"
                onClick={handleSwitchImage}
              />
            </div>
            <div className="sub--image">
              <img
                src="https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="anh2"
                onClick={handleSwitchImage}
              />
            </div>
            <div className="sub--image">
              <img
                src="//placekitten.com/800/1200"
                alt="anh3"
                onClick={handleSwitchImage}
              />
            </div>
          </div>
          <div className="main--image" onClick={() => setIsOpen(true)}>
            <img src={img} alt="main-avatar" />
          </div>
          {/* <Image src={product && product?.listImg[0]} /> */}
        </ImgContainer>
        <InfoContainer>
          <Title>{product?.title}</Title>
          <Desc>
            <div
              dangerouslySetInnerHTML={{ __html: product ? product?.desc : "" }}
            />
          </Desc>
          <Price>{product && formatMoney(product?.price)}</Price>
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

      <Comment comment={product && product?.reviews} />
      <Newsletter />
    </MainLayout>
  );
};

export default ProductPage;
