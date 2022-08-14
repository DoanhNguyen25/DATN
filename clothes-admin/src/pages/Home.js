/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";

import {
  Card,
  Col,
  Row,
  Typography,
  Table, Spin, Select
} from "antd";

import useStateRef from "react-usestateref";
import { Format } from '../services/Format'

import axios from 'axios'


import { API_URL } from '../api/API_URL'
import { Authentication } from "../services/authentication";
const { Option } = Select;
// const url = 'https://res.cloudinary.com/dbfjceflf/image/upload/v1651304838/h2tstore/'
function Home() {
  Authentication()

  const { Title } = Typography;
  const [dataUser, setDataUser, dataUserRef] = useStateRef([])
  const [category, setCategory, categoryRef] = useStateRef([])
  const [dashboard, setDashboard, dashboardRef] = useStateRef([])
  const [isLoading, setIsLoading] = useState(true)
  const [monthOrder, setMonth] = useState(new Date().getMonth() + 1)


  const fetchData = async () => {
    // const dash = await axios.get(`${API_URL}/dashboard/all/${monthOrder}`)
    const response = await axios.get(`${API_URL}/products`)
    const res = await axios.get(`${API_URL}/categories`)
    // if (dash && dash.data) {
    //   setDashboard(dash)
    // }
    if (response && response.data) {
      setDataUser(response.data.products)
      setIsLoading(false)
    }
    if (res && res.data) {
      setCategory(res.data)
    }
  }
  useEffect(() => {
    fetchData()
  }, [monthOrder])
  const dollor = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z"
        fill="#fff"
      ></path>
      <path
        d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z"
        fill="#fff"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const profile = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z"
        fill="#fff"
      ></path>
      <path
        d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z"
        fill="#fff"
      ></path>
      <path
        d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z"
        fill="#fff"
      ></path>
      <path
        d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const heart = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const cart = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const count = [
    {
      today: "Tổng sản phầm",
      // title: dashboardRef.current?.TotalProduct,
      title: 1,
      icon: dollor,
      bnb: "bnb2",
    },
    {
      today: "Tổng đơn hàng",
      title: 1,
      // title: dashboardRef.current?.TotalOrder,
      icon: profile,
      bnb: "bnb2",
    },
    {
      today: "Tài khoản",
      title: '+' + 1,
      // title: '+' + dashboardRef.current?.TotalAccount,
      icon: heart,
      bnb: "redtext",
    },
    {
      today: "Doanh thu",
      title: Format(1),
      // title: Format(dashboardRef.current?.TotalRevenues),
      icon: cart,
      bnb: "bnb2",
    },
  ];

  const columns = [

    {
      title: "Tên sản phẩm",
      key: "Name",
      width: 200,
      fixed: 'left',
      ellipsis: {
        showTitle: false,
      },
      render(record) {
        return (
          <>
            <img src={record.listImg[0]} alt='not' width={30} height={35} title={record.title} />&emsp;{record.title}
          </>
        );
      }
    },
    {
      title: "Mô tả",
      key: "desc",
      dataIndex: 'desc',
      width: 400,
      ellipsis: {
        showTitle: false,
      },
      // render(record) {
      //   return (
      //     <>
      //       {record.Description.substr(0, 70)}...
      //     </>
      //   );
      // }
    },
    {
      title: "Giá ban đầu",
      key: "Price",
      width: 80,
      render(record) {
        return (
          <>
            {Format(record.price)}
          </>
        );
      }
    },
    {
      title: "Giá bán",
      key: "SalePrice",
      width: 80,
      render(record) {
        return (
          <>
            {Format(record.price)}
          </>
        );
      }
    },
    {
      title: "Danh mục",
      key: "Category",
      // dataIndex: "categories",
      width: 100,
      render(record) {
        return (
          <>
            {record.categories.category_name}
          </>
        );
      }
    },
    {
      title: "Sô lượng",
      key: "quantityInStock",
      dataIndex: "quantityInStock",
      width: 80,
    },
    // {
    //   title: "Size",
    //   key: "Size",
    //   width: 130,
    //   render(record) {
    //     return (
    //       <div>
    //         {record.Size.join(',')}
    //       </div>
    //     );
    //   }
    // }

  ];

  return (
    <>
      <div className="layout-content">
        {/* thong ke */}
        &emsp;Doanh thu tháng: <Select defaultValue={new Date().getMonth() + 1} style={{ width: 80, marginLeft: 10 }}
          onChange={(e) => {
            setMonth(e)
          }}>
          <Option value={1}>1</Option>
          <Option value={2}>2</Option>
          <Option value={3}>3</Option>
          <Option value={4}>4</Option>
          <Option value={5}>5</Option>
          <Option value={6}>6</Option>
          <Option value={7}>7</Option>
          <Option value={8}>8</Option>
          <Option value={9}>9</Option>
          <Option value={10}>10</Option>
          <Option value={11}>11</Option>
          <Option value={12}>12</Option>
        </Select><br />
        {isLoading ? <Spin /> :
          <Row className="rowgap-vbox" gutter={[24, 0]}>

            {count.map((c, index) => (
              <Col
                key={index}
                xs={24}
                sm={24}
                md={12}
                lg={6}
                xl={6}
                className="mb-24"
              >
                {/* thong ke */}
                <Card bordered={false} className="criclebox ">
                  <div className="number">
                    <Row align="middle" gutter={[24, 0]}>

                      <Col xs={24}>
                        <span>{c.today}</span>
                        <Title level={3}>
                          {c.title}
                        </Title>
                      </Col>
                      {/* <Col xs={6}> */}
                      {/* <div className="icon-box">{c.icon}</div> */}
                      {/* </Col> */}
                    </Row>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        }

        {/* sản phẩm mới nhất */}
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={24} className="mb-24">
            <Card bordered={false} className="criclebox cardbody h-full">
              <div className="project-ant">
                <div>
                  <Title level={5}>Sản phẩm mới</Title>
                </div>
                <div className="ant-filtertabs">
                  <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">

                  </div>
                </div>
              </div>
              <div className="ant-list-box table-responsive">
                {isLoading ? <Spin /> :
                  <Table
                    rowKey='_id'
                    // expandable={{
                    //   expandedRowRender: record => <p style={{ margin: 0 }}>{record.Description}</p>,
                    //   // rowExpandable: record => record.Name !== 'Not Expandable',
                    // }}
                    columns={columns}
                    dataSource={dataUserRef.current}
                    pagination={{ pageSize: 10 }}
                    className="ant-border-space"
                    scroll={{ x: 1300 }}
                  />
                }
              </div>

            </Card>
          </Col>

        </Row>


      </div>
    </>
  );
}

export default Home;
