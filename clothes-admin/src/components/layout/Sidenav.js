

// import { useState } from "react";
import { Menu, Button, notification } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import {
  SolutionOutlined, SplitCellsOutlined, SkinOutlined, BranchesOutlined, BookOutlined


} from "@ant-design/icons";

function Sidenav({ color }) {
  const { pathname } = useLocation();
  // const history = useHistory();
  const page = pathname.replace("/", "");
  const UserName = localStorage.getItem('user_name')
  const role = Number(localStorage.getItem('role'));

  const dashboard = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
        fill={color}
      ></path>
      <path
        d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
        fill={color}
      ></path>
      <path
        d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
        fill={color}
      ></path>
    </svg>,
  ];



  const billing = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M4 4C2.89543 4 2 4.89543 2 6V7H18V6C18 4.89543 17.1046 4 16 4H4Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 9H2V14C2 15.1046 2.89543 16 4 16H16C17.1046 16 18 15.1046 18 14V9ZM4 13C4 12.4477 4.44772 12 5 12H6C6.55228 12 7 12.4477 7 13C7 13.5523 6.55228 14 6 14H5C4.44772 14 4 13.5523 4 13ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H10C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12H9Z"
        fill={color}
      ></path>
    </svg>,
  ];


  const profile = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const SignOut = () => {
    notification.success({
      message: 'Log out success!',
      description: '',
      className: 'logout-success'
    })
    localStorage.clear();
    // history.push('/sign-in')
  }



  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        {role === 0 ?
          <span>Admin: {UserName}</span> : <span>Nhân viên: {UserName}</span>
        }
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="1">
          <NavLink to="/Thống kê">
            <span
              className="icon"
              style={{
                background: page === "Thống kê" ? color : "",
              }}
            >
              {dashboard}
            </span>
            <span className="label">Thống kê</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/Sản phẩm">
            <span
              className="icon"
              style={{
                background: page === "Sản phẩm" ? color : "",
              }}
            >
              <SkinOutlined />
            </span>
            <span className="label">Quản lý sản phẩm</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/Hóa đơn">
            <span
              className="icon"
              style={{
                background: page === "Hóa đơn" ? color : "",
              }}
            >
              {billing}
            </span>
            <span className="label">Hóa đơn</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="4">
          <NavLink to="/Danh mục">
            <span
              className="icon"
              style={{
                background: page === "Danh mục" ? color : "",
              }}
            >
              <BranchesOutlined />
            </span>
            <span className="label">Quản lý danh mục</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="7">
          <NavLink to="/Tin tức">
            <span
              className="icon"
              style={{
                background: page === "Tin tức" ? color : "",
              }}
            >
              <BookOutlined />
            </span>
            <span className="label">Quản lý tin tức</span>
          </NavLink>
        </Menu.Item>
        {role === 0 &&
          <Menu.Item key="8">
            <NavLink to="/Người dùng">
              <span
                className="icon"
                style={{
                  background: page === "Người dùng" ? color : "",
                }}
              >
                <SolutionOutlined />
              </span>
              <span className="label">Quản lý người dùng</span>
            </NavLink>
          </Menu.Item>
        }
        <Menu.Item className="menu-item-header" key="9">
          Trang tài khoản
        </Menu.Item>
        {/* <Menu.Item key="10">
          <NavLink to="/profile">
            <span
              className="icon"
              style={{
                background: page === "profile" ? color : "",
              }}
            >
              {profile}
            </span>
            <span className="label">Profile</span>
          </NavLink>
        </Menu.Item> */}
        <Menu.Item key="11">
          <NavLink to="/sign-in" onClick={SignOut}>
            <span className="icon"><SplitCellsOutlined /></span>
            <span className="label">Đăng xuất</span>
          </NavLink>
        </Menu.Item>
      </Menu>
      {/* <div className="aside-footer">
        <div
          className="footer-box"
          style={{
            background: color,
          }}
        >
          <span className="icon" style={{ color }}>
            {dashboard}
          </span>
          <h6>Need Help?</h6>
          <p>Please check our docs</p>
          <Button type="primary" className="ant-btn-sm ant-btn-block">
            DOCUMENTATION
          </Button>
        </div>
      </div> */}
    </>
  );
}

export default Sidenav;
