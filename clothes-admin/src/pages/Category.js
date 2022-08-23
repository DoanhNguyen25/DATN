/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

import './style.css'
import {
    Row, Col, Card, Table, Button, Upload,
    Typography, Modal, Input, Select, notification, Spin, Popconfirm,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusSquareOutlined, UploadOutlined } from '@ant-design/icons';
// import { ToTopOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { API_URL } from '../api/API_URL'
import axios from 'axios';
import useStateRef from 'react-usestateref';
import cloudinaryUpload from '../services/upload.cloudinary';
const { Option } = Select




function Category() {
    const history = useHistory()
    const auth = localStorage.getItem('token_admin') ? true : false
    useEffect(() => {
        !auth && history.replace('/sign-in')
    }, [])
    const [dataUser, setDataUser, dataUserRef] = useStateRef([])
    const [isEditing, setIsEditing] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const [isDataEdit, setIsDataEdit] = useState({})
    const [isAddNew, setIsAddNew] = useState({})
    const [success, setSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [disabled, setDisabled] = useState(true)
    const [categoryName, setCategoryName] = useState("")
    const fetchData = async () => {
        const response = await axios.get(`${API_URL}/categories`)
        if (response && response.data) {
            setDataUser(response.data)
            setIsLoading(false)
            setSuccess(false)
        }
    }
    const handleChangeCategoryName = (e) => {
        setCategoryName(e.target.value);
    }
    useEffect(() => {
        if (isAddNew.category_name) {
            setDisabled(false)
        }
        else setDisabled(true)
    }, [categoryName, isAddNew])
    useEffect(() => {
        fetchData()
    }, [success, isLoading])

    const columns = [
        {
            title: "Mã danh mục",
            dataIndex: "_id",
            key: "_id",
            width: 10,
            sorter: (a, b) => a._id - b._id,
        },
        {
            title: "Tên danh mục",
            dataIndex: "category_name",
            key: "category_name",
            width: 30,
            sorter: (a, b) => a.category_name.length - b.category_name.length,
        },
        {
            title: "Hành động",
            key: "Action",
            width: 40,
            render(record) {
                return (
                    <>
                        {/* <PlusSquareOutlined onClick={() => BtnAddNew(record)} style={{ color: 'green', cursor: 'pointer', marginRight: 10, fontSize: 20 }} /> */}
                        <EditOutlined onClick={() => BtnModalUpdate(record)} style={{ color: 'aqua', cursor: 'pointer', fontSize: 20 }} />
                        {/* <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} /> */}
                        {/* <Popconfirm cancelText="Hủy" okText='Xóa' title="Chắc chắn xóa?" onConfirm={() => BtnDelete(record)}>
                            <DeleteOutlined style={{ color: 'red', cursor: 'pointer', fontSize: 20, marginRight: 10 }} />
                        </Popconfirm> */}
                    </>
                );
            }
        },
    ];
    const BtnAddNew = () => {
        setIsAdding(true)
    }
    const BtnModalUpdate = (record) => {
        setIsEditing(true)
        setIsDataEdit({ ...record })

    }
    const resetModal = () => {
        setIsEditing(false)
        setIsDataEdit({})
    }
    const UpdateUser = async () => {
        await axios.patch(`${API_URL}/category/${isDataEdit._id}`, isDataEdit, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token_admin')} `
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
        // console.log(isDataEdit)

    }
    const AddNewCategory = async () => {
        await axios.post(`${API_URL}/create-category`, isAddNew, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token_admin')} `
            }
        })
            .then(() => {
                notification.success({
                    message: 'Add Success',
                    description: '',
                    className: 'Add-success'
                })
                setIsLoading(false)
                setSuccess(true)
            })
            .catch(err => {
                notification.error({
                    message: 'Add Error' + err,
                    description: '',
                    className: 'Add-error'
                })
                setSuccess(false)
            })
        console.log(isAddNew)
    }
    const BtnDelete = async (record) => {
        await axios.delete(`${API_URL}/category/${record._id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
            }
        })
            .then(() => {
                notification.success({
                    message: 'Delete Success!',
                    description: '',
                    className: "delete-success"
                })
                setSuccess(state => !state)
            })
            .catch(err => {
                notification.success({
                    message: 'Delete Failed:  ' + err,
                    description: '',
                    className: "delete-error"
                })
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
                            title="Danh sách danh mục"
                            extra={
                                <>
                                    <Button onClick={() => BtnAddNew()} type='second' style={{ display: 'flex', alignItem: 'center' }}>
                                        <PlusSquareOutlined style={{ color: 'green', cursor: 'pointer', marginTop: 4, fontSize: 30 }} />
                                        Thêm mới
                                    </Button>
                                    {/* add new category */}
                                    <Modal
                                        title='Thêm mới danh mục'
                                        okText={"Add"}
                                        visible={isAdding}
                                        onCancel={() => {
                                            setIsAdding(false)
                                            setIsAddNew({})
                                        }}
                                        footer={[
                                            <>
                                                <Button onClick={() => {
                                                    setIsAdding(false)
                                                    setIsAddNew({})
                                                }}>Hủy</Button>
                                                <Button type='primary' disabled={disabled}
                                                    onClick={() => {
                                                        AddNewCategory();
                                                        setIsAdding(false)
                                                        setIsAddNew({})
                                                    }}>Thêm</Button>
                                            </>
                                        ]}

                                    >
                                        <label> Tên danh mục:
                                            <Input value={isAddNew.category_name} autoFocus required placeholder='Tên danh mục'
                                                onChange={e => {
                                                    handleChangeCategoryName(e)
                                                    setIsAddNew(pre => {
                                                        return {
                                                            ...pre, category_name: e.target.value
                                                        }
                                                    })
                                                }
                                                } />
                                        </label><br /><br />
                                    </Modal>
                                </>
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
                                    />
                                }

                                {/* edit category */}
                                <Modal
                                    title='Cập nhật danh mục'
                                    okText={"Cập nhật"}
                                    cancelText="Hủy"
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
                                    <label> Tên danh mục:
                                        <Input placeholder='Fill in Category Name'
                                            value={isDataEdit.category_name}
                                            onChange={e =>
                                                setIsDataEdit(pre => {
                                                    return {
                                                        ...pre, category_name: e.target.value
                                                    }
                                                })
                                            } />
                                    </label>
                                </Modal>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Category;
