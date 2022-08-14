/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

import './style.css'
import {
  Row, Col, Card, Table, Button, Drawer, Input, InputNumber,
  Modal, notification, Spin, Select
} from "antd";
import { EditOutlined, FileTextOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { API_URL } from '../api/API_URL'
import axios from 'axios';
import useStateRef from 'react-usestateref';
import moment from 'moment'
import { Format } from '../services/Format'

const { Option } = Select



function Billing() {
  const history = useHistory()
  const auth = localStorage.getItem('token_admin') ? true : false
  useEffect(() => {
    !auth && history.replace('/sign-in')
  }, [])
  const [dataUser, setDataUser, dataUserRef] = useStateRef([])
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [isDataEdit, setIsDataEdit, isDataEditRef] = useStateRef([])
  const [isAddNew, setIsAddNew] = useState({})
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const fetchData = async () => {
    const response = await axios.get(`${API_URL}/order`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
      }
    })
    if (response && response.data) {
      setDataUser(response.data)
      setIsLoading(false)
      setSuccess(false)
    }
  }


  useEffect(() => {
    fetchData()
  }, [success, isLoading])

  const handleChangeStatus = async (record, e) => {
    const dataStatus = { Id: record.Id, StatusId: e }
    // update-bill
    await axios.put(`${API_URL}/bill/update-bill`, dataStatus, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        notification.success({
          message: 'Update Success',
          description: '',
          className: 'update-success'
        })
        setIsLoading(false)
        setSuccess(true)
      })
      .catch(err => {
        notification.error({
          message: 'Update Error' + err,
          description: '',
          className: 'update-error'
        })
        setSuccess(false)
      })
    console.log(dataStatus)
  }
  const columns = [
    {
      title: "Mã hóa đơn",
      dataIndex: "_id",
      key: "_id",
      width: 10,
    },
    {
      title: "Khách hàng",
      dataIndex: "username",
      key: "username",
      width: 30,
      // sorter: (a, b) => a.Name.length - b.Name.length,
      // fixed: 'left'
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: 50,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 50,
    },
    {
      title: "Ngày đặt",
      key: "createdAt",
      width: 50,
      render(record) {
        return (
          <div>
            {moment(record.createdAt).format('DD-MM-YYYY')}
          </div>
        );
      }
    },
    {
      title: "Trạng thái",
      key: "StatusId",
      width: 100,
      // dataIndex: "StatusId",
      render(record) {
        return (
          <div>
            {/* {Number(record.StatusId) === 3 ? 'Đang chờ' : (Number(record.StatusId) === 4 ? 'Đã duyệt' : 'Đã hủy')} */}
            <Select defaultValue={3} value={Number(record.StatusId) === 3 ? 'Đang chờ' : (Number(record.StatusId) === 4 ? 'Đã duyệt' : 'Đã hủy')} onChange={(e) => {
              // setIsDataEdit({
              //   Id: record.Id,
              //   StatusId: e
              // })
              // console.log({
              //   Id: record.Id,
              //   StatusId: e
              // })
              handleChangeStatus(record, e);
            }}>
              <Option value={3}>Đang chờ</Option>
              <Option value={4}>Đã duyệt</Option>
              <Option value={5}>Đã hủy</Option>
            </Select>
          </div>
        );
      }

    },
    {
      title: "Phương thức vận chuyển",
      key: "TransformMethod",
      width: 100,
      dataIndex: "TransformMethod",

    },
    {
      title: "Hành động",
      key: "Action",
      width: 100,
      render(record) {
        return (
          <div>
            <FileTextOutlined onClick={() => {
              handleDetailBill(record)
            }}
              style={{ color: 'aqua', cursor: 'pointer', fontSize: 20, marginRight: 10 }} />
          </div>
        );
      },
    },
  ];
  const columnsDetail = [
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
      // width: 10,
    },
    {
      title: "Màu",
      dataIndex: "productName",
      key: "color",
      // width: 10,
    },
    {
      title: "Kích cỡ",
      dataIndex: "size",
      key: "productName",
      // width: 10,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      // width: 30,
    },
    {
      title: "Đơn giá",
      key: "price",
      // width: 30,
      render(record) {
        return (
          <>
            {Format(record.price)}
          </>
        );
      }
    },


  ];
  const handleDetailBill = async (record) => {
    setIsEditing(true);
    setIsDataEdit(dataUserRef.current?.find(item => item._id === record._id).products)
    setIsLoading(false)
  }

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Danh sách hóa đơn"
            >
              <div className="table-responsive" >
                {isLoading ? <Spin /> :
                  <Table
                    rowKey='_id'
                    columns={columns}
                    dataSource={dataUserRef.current}
                    pagination={{ pageSize: 5 }}
                    className="ant-border-space"
                  />
                }

                <Drawer
                  title="Hóa đơn chi tiết"
                  width={600}
                  bodyStyle={{ paddingBottom: 80 }}
                  onClose={() => {
                    setIsEditing(false)
                  }}
                  visible={isEditing}
                >
                  <Row gutter={[24, 0]}>
                    <Table
                      width={"100%"}
                      rowKey='productId'
                      columns={columnsDetail}
                      dataSource={isDataEditRef.current}
                      pagination={{ pageSize: 5 }}
                      className="ant-border-space"
                    />
                  </Row>

                </Drawer>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Billing;
