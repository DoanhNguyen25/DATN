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
    const response = await axios.get(`${API_URL}/order/admin`, {
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
    const dataStatus = { status: e }
    // update-bill
    await axios.patch(`${API_URL}/order/${record._id}`, dataStatus, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
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
      title: "M?? h??a ????n",
      dataIndex: "_id",
      key: "_id",
      width: 10,
    },
    {
      title: "Kh??ch h??ng",
      dataIndex: "fullname",
      key: "fullname",
      width: 30,
      // sorter: (a, b) => a.Name.length - b.Name.length,
      // fixed: 'left'
    },
    {
      title: "?????a ch???",
      dataIndex: "address",
      key: "address",
      width: 50,
    },
    {
      title: "S??? ??i???n tho???i",
      dataIndex: "phone",
      key: "phone",
      width: 50,
    },
    {
      title: "Ng??y ?????t",
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
      title: "Tr???ng th??i",
      key: "status",
      width: 100,
      // dataIndex: "status",
      render(record) {
        return (
          <div>
            {/* {Number(record.status) === 3 ? '??ang ch???' : (Number(record.status) === 4 ? '???? duy???t' : '???? h???y')} */}
            <Select defaultValue={0} value={Number(record.status) === 0 ? '??ang ch???' : (Number(record.status) === 1 ? '???? duy???t' : '???? h???y')} onChange={(e) => {
              // setIsDataEdit({
              //   Id: record.Id,
              //   status: e
              // })
              // console.log({
              //   Id: record.Id,
              //   status: e
              // })
              handleChangeStatus(record, e);
            }}>
              <Option value={0}>??ang ch???</Option>
              <Option value={1}>???? duy???t</Option>
              <Option value={3}>???? h???y</Option>
            </Select>
          </div>
        );
      }

    },
    {
      title: "H??nh ?????ng",
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
      title: "T??n s???n ph???m",
      dataIndex: "productName",
      key: "productName",
      // width: 10,
    },
    {
      title: "M??u",
      dataIndex: "productName",
      key: "color",
      // width: 10,
    },
    {
      title: "K??ch c???",
      dataIndex: "size",
      key: "productName",
      // width: 10,
    },
    {
      title: "S??? l?????ng",
      dataIndex: "quantity",
      key: "quantity",
      // width: 30,
    },
    {
      title: "????n gi??",
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
              title="Danh s??ch h??a ????n"
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
                  title="H??a ????n chi ti???t"
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
