/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

import './style.css'
import {
    Row, Col, Card, Radio, Table, Button, Avatar,
    Typography, Pagination, Modal, Input, Select, notification, Spin,
} from "antd";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
// import { ToTopOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { API_URL } from '../api/API_URL'
import axios from 'axios';
import useStateRef from 'react-usestateref';
// Images
// import ava1 from "../assets/images/logo-shopify.svg";
// import ava2 from "../assets/images/logo-atlassian.svg";
// import ava3 from "../assets/images/logo-slack.svg";
// import ava5 from "../assets/images/logo-jira.svg";
// import ava6 from "../assets/images/logo-invision.svg";
import face from "../assets/images/face-1.jpg";
import face2 from "../assets/images/face-2.jpg";
import face3 from "../assets/images/face-3.jpg";
import face4 from "../assets/images/face-4.jpg";
import face5 from "../assets/images/face-5.jpeg";
import face6 from "../assets/images/face-6.jpeg";
// import pencil from "../assets/images/pencil.svg";

const { Title } = Typography;
const { Option } = Select

// table code start



function Users() {
    const history = useHistory()
    const auth = localStorage.getItem('token_admin') ? true : false

    useEffect(() => {
        !auth && history.replace('/sign-in')
    }, [])
    const [dataUser, setDataUser, dataUserRef] = useStateRef([])
    const [isEditing, setIsEditing] = useState(false)
    const [isDataEdit, setIsDataEdit] = useState({})
    const [success, setSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const fetchData = async () => {
        const response = await axios.get(`${API_URL}/users/user-list`)
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
    const columns = [
        {
            title: "Tên khách hàng",
            dataIndex: "Name",
            key: "Name",
            width: 150,
            fixed: 'left'
        },
        {
            title: "Tên sử dụng",
            dataIndex: "UserName",
            key: "UserName",
            width: 100,
        },
        {
            title: "Email",
            dataIndex: "Email",
            key: "Email",
            width: 160,
        },
        {
            title: "Địa chỉ",
            key: "Address",
            dataIndex: "Address",
            width: 300,
            ellipsis: {
                showTitle: false,
            },
        },
        {
            title: "Số điện thoại",
            key: "Phone",
            dataIndex: "Phone",
            width: 100,
        },
        {
            title: "Trạng thái",
            key: "StatusId",
            width: 130,
            // dataIndex: "StatusId",
            render(record) {
                return (
                    <div>
                        {Number(record.StatusId) === 1 ? 'Đang hoạt động' : 'Chưa hoạt động'}
                    </div>
                );
            }
        },
        {
            title: "Quyền",
            key: "Role",
            width: 150,
            // dataIndex: "StatusId",
            render(record) {
                return (
                    <div>
                        {Number(record.Role) === 0 ? 'Quản trị viên' : (Number(record.Role) === 2 ? 'Nhân viên' : 'Khách hàng')}
                    </div>
                );
            }
        },
        {
            title: "Hành động",
            key: "Action",
            fixed: 'right',
            width: 70,
            render(record) {
                return (
                    <>

                        <EditOutlined onClick={() => BtnModalUpdate(record)} style={{ color: 'aqua', cursor: 'pointer' }} />
                        {/* <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} /> */}
                    </>
                );
            }
        },
    ];
    const BtnModalUpdate = (record) => {
        setIsEditing(true)
        setIsDataEdit({ ...record })

    }
    const resetModal = () => {
        setIsEditing(false)
        setIsDataEdit({})
    }
    const UpdateUser = async () => {
        await axios.put(`${API_URL}/users/update-user`, isDataEdit, {
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
    }
    const onChange = (e) => console.log(`radio checked:${e.target.value}`);
    return (
        <>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Authors Table"
                            extra={
                                <></>
                            }
                        >
                            <div className="table-responsive" >
                                {isLoading ? <Spin /> :
                                    <Table
                                        rowKey={dataUserRef.current.map(item => { return (item.Id) })}
                                        columns={columns}
                                        dataSource={dataUserRef.current}
                                        pagination={{ pageSize: 5 }}
                                        className="ant-border-space"
                                        scroll={{ x: 1300 }}
                                    />
                                }
                                <Modal
                                    title='Sửa trạng thái và phân quyền'
                                    okText={"Lưu"}
                                    cancelText='Hủy'
                                    visible={isEditing}
                                    onCancel={() => {
                                        resetModal()
                                    }
                                    }
                                    onOk={() => {
                                        UpdateUser();
                                        resetModal();
                                        // console.log(isDataEdit)
                                    }}
                                >
                                    <Select
                                        style={{ width: 160 }}
                                        placeholder="Trạng thái"
                                        onChange={(e) => {
                                            setIsDataEdit(pre => {
                                                return { ...pre, StatusId: e }
                                            })
                                        }}
                                    >
                                        <Option value="1">Đang hoạt động</Option>
                                        <Option value="2">Chưa hoạt động</Option>

                                    </Select> &emsp;
                                    <Select
                                        style={{ width: 160 }}
                                        placeholder="Quyền"
                                        onChange={(e) => {
                                            setIsDataEdit(pre => {
                                                return { ...pre, Role: e }
                                            })
                                        }}
                                    >
                                        <Option value="0">Quản trị viên</Option>
                                        <Option value="1">Khách hàng</Option>
                                        {/* <Option value="2">Nhân viên</Option> */}

                                    </Select>
                                </Modal>
                            </div>
                        </Card>

                        {/* <Card
                        >
                            <Pagination total={20} showSizeChanger={false} />
                        </Card> */}
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Users;
