/* eslint-disable react/jsx-no-undef */
import { Add, Remove } from "@material-ui/icons";
import React, { Dispatch, useCallback, useEffect, useState } from "react";
import Comment from "../../components/Comment";
import Newsletter from "../../components/Newsletter";
import MainLayout from "../../layouts/MainLayout";
// import Lightbox from "react-image-lightbox";
// import "react-image-lightbox/style.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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
  const [value, setValue] = React.useState(0);
  const productId = id;
  const images = [
    "https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "//placekitten.com/800/1200",
    "//placekitten.com/1500/1500",
  ];
  const COLORS = ["black", "darkblue", "gray"];
  const SIZES = ["XS", "M", "S", "L", "XL"];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
          <Title>{product?.title} - ANSSJSM-200021</Title>
          <Price>{product && formatMoney(product?.price)}</Price>
          <br />
          <div>Tình trạng: Còn hàng</div>
          <br></br>
          <hr
            style={{
              width: "95%",
              background: "gray",
              marginLeft: "0",
              opacity: "0.5",
            }}
          ></hr>
          <Desc>
            {/* <div
              dangerouslySetInnerHTML={{ __html: product ? product?.desc : "" }}
            /> */}
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            cum labore omnis cupiditate quam. Quia doloribus incidunt voluptas,
            vel voluptatum amet excepturi eaque blanditiis laboriosam, veniam
            unde, eligendi voluptate vero?abore omnis cupiditate quam. Quia
            doloribus incidunt voluptas, vel voluptatum a
          </Desc>

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
          </AddContainer>
          <Button
            style={{ marginTop: "3rem" }}
            onClick={() => handleAddToCart(productId, quantity, color, size)}
          >
            ADD TO CART
          </Button>
        </InfoContainer>
      </Wrapper>
      <div style={{ padding: "0 50px", marginTop: "3rem" }}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Mô tả" {...a11yProps(0)} />
              <Tab label="Bình luận" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            Item One
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Comment comment={product && product?.reviews} />
          </TabPanel>
        </Box>
      </div>

      <Newsletter />

      {/* {isOpen && (
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
      )} */}
    </MainLayout>
  );
};

export default ProductPage;
