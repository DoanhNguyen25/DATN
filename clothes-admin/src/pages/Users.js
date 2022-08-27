/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { EditOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Button, Card, Col, Drawer, Form, Input, Modal, notification, Row, Select, Spin, Table, Typography } from "antd";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import useStateRef from 'react-usestateref';
import { API_URL } from '../api/API_URL';
import './style.css';

const { Title } = Typography;
const { Option } = Select

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 4,
        },
    },
    // wrapperCol: {
    //   xs: {
    //     span: 26,
    //   },
    //   sm: {
    //     span: 16,
    //   },
    // },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

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
    const [addNews, setAddNews] = useState(false)
    const [isDataAdd, setIsDataAdd] = useState({})
    const fetchData = async () => {
        const response = await axios.get(`${API_URL}/users`)
        if (response && response.data) {
            setDataUser(response.data)
            setIsLoading(false)
            setSuccess(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [success, isLoading])
    const columns = [
        {
            title: "Tên khách hàng",
            dataIndex: "fullname",
            key: "fullname",
            width: 150,
            fixed: 'left'
        },
        {
            title: "Tên sử dụng",
            dataIndex: "username",
            key: "username",
            width: 100,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: 160,
        },
        {
            title: "Số điện thoại",
            key: "phone",
            dataIndex: "phone",
            width: 100,
        },
        {
            title: "Trạng thái",
            key: "isActive",
            width: 130,
            render(record) {
                return (
                    <div>
                        {record.isActive ? 'Đang hoạt động' : 'Chưa hoạt động'}
                    </div>
                );
            }
        },
        {
            title: "Quyền",
            key: "role",
            width: 150,
            render(record) {
                return (
                    <div>
                        {record.role === 1 ? 'Quản trị viên' : (record.role === 2 ? 'Nhân viên' : 'Khách hàng')}
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
        await axios.patch(`${API_URL}/user/${isDataEdit._id}`, {
            role: isDataEdit.role,
            isActive: isDataEdit.isActive,
        }, {
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
    }
    const [form] = Form.useForm();
    const AddNewAccount = async (values) => {
        console.log(values)
        const valueUpdate = {
            ...values,
            fullname: values.fullname,
            username: values.username,
            email: values.email,
            password: values.password,
            phone: values.phone,
            role: 2
        }
        axios.post(`${API_URL}/register`, valueUpdate, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
            }
        })
            .then(() => {
                notification.success({
                    message: 'Add Success',
                    description: '',
                    className: 'add-success'
                })
                setIsLoading(false)
                setSuccess(true)
                form.resetFields();
            })
            .catch(err => {
                notification.error({
                    message: 'Add Error:  ' + err,
                    description: '',
                    className: 'add-error'
                })
                setSuccess(false)
            })
        console.log('Received values of form: ', valueUpdate);
    };
    return (
        <>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Danh sách sản phẩm"
                            extra={
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    {/* <Input
                                        className="header-search"
                                        placeholder="Tìm kiếm..."
                                        prefix={<SearchOutlinedlined />}
                                        style={{ padding: '0 10px', borderRadius: 10, marginRight: 10 }}
                                        onChange={handleSearch}
                                    /> */}
                                    <Button onClick={() => setAddNews(true)} type='second' style={{ display: 'flex', alignItem: 'center' }}>
                                        <PlusSquareOutlined style={{ color: 'green', cursor: 'pointer', marginTop: 4, fontSize: 30 }} />
                                        Thêm mới
                                    </Button>
                                    <Drawer
                                        title="Thêm mới 1 tài khoản"
                                        width={720}
                                        bodyStyle={{ paddingBottom: 80 }}
                                        onClose={() => {
                                            setAddNews(false)
                                        }}
                                        visible={addNews}
                                    >
                                        <Form
                                            {...formItemLayout}
                                            form={form}
                                            name="Add News"
                                            onFinish={AddNewAccount}
                                            scrollToFirstError
                                        >
                                            <Row gutter={[24, 0]}>
                                                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
                                                    <Card bordered={false} className="criclebox h-full">
                                                        <Form.Item
                                                            name="fullname"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Nhập tên',
                                                                },
                                                            ]}
                                                        >
                                                            <Input autoFocus placeholder='Họ và tên' />
                                                        </Form.Item>
                                                    </Card>
                                                </Col>
                                                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
                                                    <Card bordered={false} className="criclebox h-full">
                                                        <Form.Item
                                                            name="username"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Nhập tên người dùng',
                                                                },
                                                            ]}
                                                        >
                                                            <Input placeholder='Tên người dùng' />
                                                        </Form.Item>
                                                    </Card>
                                                </Col>
                                            </Row>
                                            <Row gutter={[24, 0]}>
                                                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
                                                    <Card bordered={false} className="criclebox h-full">
                                                        <Form.Item
                                                            name="email"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Nhập E-mail',
                                                                },
                                                            ]}
                                                        >
                                                            <Input style={{ width: '100%', lineHeight: "40px", borderRadius: 5 }} placeholder='E-mail' />
                                                        </Form.Item>
                                                    </Card>
                                                </Col>
                                                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
                                                    <Card bordered={false} className="criclebox h-full">
                                                        <Form.Item
                                                            name="password"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Nhập mật khẩu',
                                                                },
                                                            ]}
                                                        >
                                                            <Input style={{ width: '100%', lineHeight: "40px", borderRadius: 5 }} type='password' placeholder='Mật khẩu' />
                                                        </Form.Item>
                                                    </Card>
                                                </Col>
                                            </Row>
                                            <Row gutter={[24, 0]}>
                                                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
                                                    <Card bordered={false} className="criclebox h-full">
                                                        <Form.Item
                                                            name="phone"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Nhập số điện thoại',
                                                                },
                                                            ]}
                                                        >
                                                            <Input style={{ width: '100%', lineHeight: "40px", borderRadius: 5 }} placeholder='Số điện thoại' />
                                                        </Form.Item>
                                                    </Card>
                                                </Col>
                                            </Row>
                                            <Form.Item {...tailFormItemLayout}>
                                                <Button type="primary" htmlType="submit">
                                                    Thêm mới
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </Drawer>
                                </div>
                            }
                        >
                            <div className="table-responsive" >
                                {isLoading ? <Spin /> :
                                    <Table
                                        rowKey='_id'
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
                                    }}
                                >
                                    <Select
                                        style={{ width: 160 }}
                                        placeholder="Trạng thái"
                                        onChange={(e) => {
                                            setIsDataEdit(pre => {
                                                return { ...pre, isActive: e }
                                            })
                                        }}
                                    >
                                        <Option value={true}>Đang hoạt động</Option>
                                        <Option value={false}>Chưa hoạt động</Option>

                                    </Select> &emsp;
                                    <Select
                                        style={{ width: 160 }}
                                        placeholder="Quyền"
                                        onChange={(e) => {
                                            setIsDataEdit(pre => {
                                                return { ...pre, role: e }
                                            })
                                        }}
                                    >
                                        <Option value={1}>Quản trị viên</Option>
                                        <Option value={2}>Nhân viên</Option>
                                        <Option value={3}>Khách hàng</Option>

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
