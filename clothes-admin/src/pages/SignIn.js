/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import jwtDecode from "jwt-decode";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
  notification,
} from "antd";
import { callApiHeaders } from "../api/apiClient";
// import { useNavigate } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import {
  DribbbleOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;
const urlImg = 'https://res.cloudinary.com/dbfjceflf/image/upload/v1651163135/h2tstore/sale_birthday.png'

const SignIn = () => {
  const auth = localStorage.getItem('token_admin') ? true : false;
  const [form] = Form.useForm();
  const history = useHistory()
  const [remember, setRemember] = useState(true)

  const onChange = (e) => {
    setRemember(state => !state)
  }
  useEffect(() => {
    auth &&
      history.replace('/')
  }, [])
  const onFinish = async (values) => {

    await callApiHeaders('POST', 'login', { username: values.username, password: values.password })
      .then((res) => {
        console.log(res.data)
        if (res.data.role !== 3 && res.data.isActive) {
          notification.success({
            message: 'Login Success!',
            description: '',
            className: 'admin-login-success'
          })
          localStorage.setItem('token_admin', res.data.access_token)
          localStorage.setItem('user_name', res.data.fullname)
          localStorage.setItem('role', res.data.role)
          history.push('/')
        }
        else {
          notification.success({
            message: 'You are not admin!',
            description: '',
            className: 'admin-login-error'
          })
          form.resetFields();
        }
      })
      .catch(err => {
        notification.error({
          message: 'Login Failed!',
          description: '',
          className: 'admin-login-error'
        })
      })
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Layout className="layout-default layout-signin">
        <Header>
        </Header>
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 2 }}
              md={{ span: 12 }}
            >
              <Title className="mb-15">Đăng nhập</Title>
              <Title className="font-regular text-muted" level={5}>
                Nhập email và mật khẩu để đăng nhập
              </Title>
              <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  className="username"
                  label="Tên người dùng"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Nhập Username!",
                    },
                  ]}
                >
                  <Input type='text' placeholder="Username" />
                </Form.Item>

                <Form.Item
                  className="username"
                  label="Mật khẩu"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Nhập mật khẩu!",
                    },
                  ]}
                >
                  <Input type="password" placeholder="Mật khẩu" />
                </Form.Item>

                

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    ĐĂNG NHẬP
                  </Button>
                </Form.Item>
                {/* <p className="font-semibold text-muted">
                  Don't have an account?{" "}
                  <Link to="/sign-up" className="text-dark font-bold">
                    Sign Up
                  </Link>
                </p> */}
              </Form>
            </Col>
            <Col
              className="sign-img"
              style={{ padding: 12 }}
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
            >
              <img src={urlImg} alt="" />
            </Col>
          </Row>
        </Content>
        <Footer>
          <Menu mode="horizontal">
            <Menu.Item>Công ty</Menu.Item>
            <Menu.Item>Giới thiệ</Menu.Item>
            <Menu.Item>Đội ngũ</Menu.Item>
            <Menu.Item>Sản phẩm</Menu.Item>
            <Menu.Item>Blogs</Menu.Item>
            <Menu.Item>Định giá</Menu.Item>
          </Menu>
          <Menu mode="horizontal" className="menu-nav-social">
            <Menu.Item>
              <Link to="#">{<DribbbleOutlined />}</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="#">{<TwitterOutlined />}</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="#">{<InstagramOutlined />}</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="#">
                <svg
                  width="18"
                  height="18"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z"></path>
                </svg>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="#">{<GithubOutlined />}</Link>
            </Menu.Item>
          </Menu>
          <p className="copyright">
            {" "}
            Copyright © 2021 Muse by <a href="#pablo">Creative Tim</a>.{" "}
          </p>
        </Footer>
      </Layout>
    </>
  );

}
export default SignIn
