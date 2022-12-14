import Badge from "@mui/material/Badge";
import { Search } from "@material-ui/icons";
import ClearIcon from "@mui/icons-material/Clear";
import React, { Dispatch, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../common/Container";
import {
  HeaderWrapper,
  Left,
  Right,
  Center,
  Input,
  MenuItem,
  Logo,
} from "./style";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector, useDispatch } from "react-redux";

import { State } from "../../redux/reducers";
import { logout } from "../../redux/action/useAction";
import { getCart } from "../../redux/action/cartAction";
import { GetUserInfo } from "../../api/UserApi";
import { UserInfo } from "../../types/user.types";
import axios from "axios";
const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [wordEnter, setWordEnter] = useState<string>("");
  const [categories, setCategories] = useState<any>([]);
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const userInfo = useSelector((state: State) => state.userReducer.userInfo);
  const cart = useSelector((state: State) => state.cartReducer.productInCart);
  const isLoggedIn = !!userInfo._id;
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();

  const toggleUserMenu = () => {
    setIsOpen(!isOpen);
  };

  const clearInput = () => {
    setWordEnter("");
  };

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 200) {
      setIsSticky(true);
    } else if (scrolled <= 300) {
      setIsSticky(false);
    }
  };

  const userInfoFromStorage: UserInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") + "")
    : undefined;

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("access");
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const handleOnkeyPress = (e: any) => {
    if (e.key === "Enter" && wordEnter !== "") {
      navigate(`/search?keySearch=${wordEnter}`);
      setWordEnter("");
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWordEnter(e.target.value);
  };

  useEffect(() => {
    dispatch(getCart());
    const getCategory = async () => {
      try {
        const req = await axios.get("http://18.138.254.179:8000/api/categories");
        if (req.data) {
          setCategories(req.data);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };

    getCategory();

    window.addEventListener("scroll", toggleVisible);

    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  return (
    <HeaderWrapper visible={isSticky}>
      <div className="header__container">
        <Left>
          <Link to={"/"}>
            <Logo>LAMA</Logo>
          </Link>
        </Left>
        <Center>
          <ul className="navbar__menu">
            <li>
              <Link to={"/outlet"}>Outlet</Link>
            </li>
            <li>
              S???n Ph???m
              <ul className="navbar__submenu">
                {categories &&
                  categories.map((category: any) => (
                    <li key={category._id}>
                      <Link to={`/category/${category._id}`}>
                        {category.category_name}
                      </Link>
                    </li>
                  ))}
                <li>
                  <Link to={"/category/1"}>T??i</Link>
                </li>
                <li>
                  <Link to={"/category/1"}>Ph??? ki???n kh??c</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to={"/coolxprint"}>Coolxprint</Link>
            </li>
            <li>
              <Link to={"/about-us"}>V??? ch??ng t??i</Link>
            </li>
            <li>
              <Link to={"/contact"}>Li??n h???</Link>
            </li>
          </ul>
        </Center>
        <Right>
          <MenuItem>
            <div className="header__container--search">
              <Input
                placeholder="T??m ki???m"
                onKeyPress={handleOnkeyPress}
                value={wordEnter}
                onChange={handleOnChange}
              />
              {wordEnter === "" ? (
                <Search
                  style={{
                    color: "gray",
                    fontSize: "1.25rem",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <span onClick={clearInput}>
                  <ClearIcon
                    style={{
                      color: "gray",
                      fontSize: "1rem",
                      cursor: "pointer",
                    }}
                  />
                </span>
              )}
            </div>
          </MenuItem>

          <MenuItem isOpen={isOpen}>
            {userInfoFromStorage ? (
              <div onClick={toggleUserMenu}>{userInfoFromStorage.username}</div>
            ) : (
              <Link to={"/login"}>
                <AccountCircleIcon color="action" />
              </Link>
            )}

            <div className="user__menu">
              <div className="user__menu--item">
                <Link to={"/user-profile"}>Th??ng tin t??i kho???n</Link>
              </div>
              <div className="user__menu--item">
                <Link to={"/order-history"}>L???ch s??? ?????t h??ng</Link>
              </div>
              <div className="user__menu--item" onClick={handleLogout}>
                ????ng xu???t
              </div>
            </div>
          </MenuItem>

          <MenuItem>
            <Badge badgeContent={cart ? cart.length : 0} color="primary">
              <Link to={"/cart"}>
                <ShoppingCartIcon color="action" />
              </Link>
            </Badge>
          </MenuItem>
        </Right>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
