import Badge from "@mui/material/Badge";
import { Search } from "@material-ui/icons";
import React, { Dispatch, useState } from "react";
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

const Header = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const userInfo = useSelector((state: State) => state.userReducer.userInfo);
  const isLoggedIn = !!userInfo._id;
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const toggleUserMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("access");
    navigate("/login");
  };

  return (
    <HeaderWrapper>
      <div className="header__container">
        <Left>
          <Link to={"/"}>
            <Logo>LAMA</Logo>
          </Link>
        </Left>
        <Center>
          <ul className="navbar__menu">
            <li>Outlet</li>
            <li>
              Sản Phẩm
              <ul className="navbar__submenu">
                <li>
                  <Link to={"/category/1"}>Áo</Link>
                </li>
                <li>
                  <Link to={"/category/1"}>Quần</Link>
                </li>
                <li>
                  <Link to={"/category/1"}>Túi</Link>
                </li>
                <li>
                  <Link to={"/category/1"}>Phụ kiện khác</Link>
                </li>
              </ul>
            </li>
            <li>Coolxprint</li>
            <li>Về chúng tôi</li>
            <li>Blog</li>
          </ul>
        </Center>
        <Right>
          <MenuItem>
            <div className="header__container--search">
              <Input placeholder="Tìm kiếm" />
              <Search style={{ color: "gray", fontSize: "1.25rem" }} />
            </div>
          </MenuItem>

          <MenuItem isOpen={isOpen}>
            {isLoggedIn ? (
              <div onClick={toggleUserMenu}>{userInfo.username}</div>
            ) : (
              <Link to={"/login"}>
                <AccountCircleIcon color="action" />
              </Link>
            )}

            <div className="user__menu">
              <div className="user__menu--item">Thông tin tài khoản</div>
              <div className="user__menu--item">Lịch sử đặt hàng</div>
              <div className="user__menu--item" onClick={handleLogout}>
                Đăng xuất
              </div>
            </div>
          </MenuItem>

          <MenuItem>
            <Badge badgeContent={4} color="primary">
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
