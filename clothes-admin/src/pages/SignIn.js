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
import { useHistory } from "react-router-dom";
import {
  DribbbleOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;
const urlImg =
  "https://res.cloudinary.com/dbfjceflf/image/upload/v1651163135/h2tstore/sale_birthday.png";

const SignIn = () => {
  const auth = localStorage.getItem("token_admin") ? true : false;
  const [form] = Form.useForm();
  const history = useHistory();
  const [remember, setRemember] = useState(true);

  const onChange = (e) => {
    setRemember((state) => !state);
  };
  useEffect(() => {
    auth && history.replace("/");
  }, []);
  const onFinish = async (values) => {
    await callApiHeaders("POST", "login", {
      username: values.username,
      password: values.password,
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.role !== 3 && res.data.isActive) {
          notification.success({
            message: "Login Success!",
            description: "",
            className: "admin-login-success",
          });
          localStorage.setItem("token_admin", res.data.access_token);
          localStorage.setItem("user_name", res.data.fullname);
          localStorage.setItem("role", res.data.role);
          history.push("/");
        } else {
          notification.success({
            message: "You are not admin!",
            description: "",
            className: "admin-login-error",
          });
          form.resetFields();
        }
      })
      .catch((err) => {
        notification.error({
          message: "Login Failed!",
          description: "",
          className: "admin-login-error",
        });
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Layout className="layout-default layout-signin">
        <Header></Header>
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
                  <Input type="text" placeholder="Username" />
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
              <img
                src={
                  "https://images.ctfassets.net/5gvckmvm9289/3BlDoZxSSjqAvv1jBJP7TH/65f9a95484117730ace42abf64e89572/Noissue-x-Creatsy-Tote-Bag-Mockup-Bundle-_4_-2.png"
                }
                alt=""
              />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};
export default SignIn;
