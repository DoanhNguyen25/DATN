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
    const response = await axios.get(`${API_URL}/bill/all`)
    if (response && response.data) {
      setDataUser(response.data.data.data)
      setIsLoading(false)
      setSuccess(false)
      // console.log(dataUserRef.current)
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
      dataIndex: "Code",
      key: "Code",
      width: 10,
    },
    {
      title: "Khách hàng",
      dataIndex: "Account",
      key: "Account",
      width: 30,
      // sorter: (a, b) => a.Name.length - b.Name.length,
      // fixed: 'left'
    },
    {
      title: "Thành tiền",
      // dataIndex: "Total",
      key: "Total",
      width: 30,
      render(record) {
        return (
          <>
            {Format(record.Total)}
          </>
        );
      }
    },
    {
      title: "Ngày đặt",
      key: "OrderDate",
      width: 50,
      render(record) {
        return (
          <div>
            {moment(record.OrderDate).format('DD-MM-YYYY')}
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
      dataIndex: "Name",
      key: "Name",
      width: 10,
    },
    {
      title: "Số lượng",
      dataIndex: "Quantity",
      key: "Quantity",
      width: 30,
      // sorter: (a, b) => a.Name.length - b.Name.length,
      // fixed: 'left'
    },
    {
      title: "Đơn giá",
      // dataIndex: "Price",
      key: "Price",
      width: 30,
      render(record) {
        return (
          <>
            {Format(record.Price)}
          </>
        );
      }
    },
    {
      title: "Thành tiền",
      key: "Amount",
      width: 100,
      // dataIndex: "TransformMethod",
      render(record) {
        return (
          <>
            {Format(record.Amount)}
          </>
        );
      }
    },

  ];
  const handleDetailBill = async (record) => {
    setIsEditing(true);
    await axios.get(`${API_URL}/bill/${record.Id}`)
      .then(res => {
        setIsDataEdit(res.data.data.data)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
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
                    rowKey={dataUserRef.current.map(item => { return (item.Id) })}
                    columns={columns}
                    dataSource={dataUserRef.current}
                    pagination={{ pageSize: 5 }}
                    className="ant-border-space"
                  />
                }

                <Drawer
                  title="Hóa đơn chi tiết"
                  width={720}
                  bodyStyle={{ paddingBottom: 80 }}
                  onClose={() => {
                    setIsEditing(false)
                  }}
                  visible={isEditing}
                >
                  <Row gutter={[24, 0]}>
                    <Table
                      rowKey={isDataEditRef.current.map(item => { return (item.Id) })}
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
