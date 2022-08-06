/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

import './style.css'
import {
    Row, Col, Card, Table, Button, Upload,
    Typography, Modal, Input, Select, notification, Spin,
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
        const response = await axios.get(`${API_URL}/category/all`)
        if (response && response.data) {
            setDataUser(response.data.data.data)
            setIsLoading(false)
            setSuccess(false)
            // console.log(dataUserRef.current)
        }
    }
    const handleChangeCategoryName = (e) => {
        setCategoryName(e.target.value);
    }
    useEffect(() => {
        if (categoryName && isAddNew.Code && isAddNew.StatusId) {
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
            dataIndex: "Id",
            key: "Id",
            width: 10,
            sorter: (a, b) => a.Id - b.Id,

            // fixed: 'left'
        },
        {
            title: "Tên danh mục",
            dataIndex: "Name",
            key: "Name",
            width: 30,
            sorter: (a, b) => a.Name.length - b.Name.length,
            // fixed: 'left'
        },
        {
            title: "Danh mục loại",
            dataIndex: "Code",
            key: "Code",
            width: 30,
            filters: [
                {
                    text: 'Áo',
                    value: 'ao',
                },
                {
                    text: 'Quần',
                    value: 'quan',
                },
                // {
                //     text: 'Balo',
                //     value: 'balo',
                // },
                // {
                //     text: 'Giày',
                //     value: 'giay',
                // },
                // {
                //     text: 'Khác',
                //     value: 'khac',
                // },
            ],
            onFilter: (value, record) => record.Code.indexOf(value) === 0,
        },
        {
            title: "Trạng thái",
            key: "StatusId",
            width: 50,
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
            title: "Hành động",
            key: "Action",
            // fixed: 'right',
            width: 40,
            render(record) {
                return (
                    <>
                        {/* <PlusSquareOutlined onClick={() => BtnAddNew(record)} style={{ color: 'green', cursor: 'pointer', marginRight: 10, fontSize: 20 }} /> */}
                        <EditOutlined onClick={() => BtnModalUpdate(record)} style={{ color: 'aqua', cursor: 'pointer', fontSize: 20 }} />
                        {/* <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} /> */}
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
        await axios.put(`${API_URL}/category/update/${isDataEdit.Id}`, { ...isDataEdit, Image: 'empty.png' }, {
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
        // console.log(isDataEdit)

    }
    const AddNewCategory = async () => {
        await axios.post(`${API_URL}/category/add-new`, { ...isAddNew, Image: 'empty.png' }, {
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
        console.log(isAddNew)
    }
    // const uploadCloud = () => {
    //     cloudinaryUpload();
    // }
    const [fileInputState, setFileInputState] = useState('')
    const [previewSource, setPreviewSource] = useState('')
    const [selectedFile, setSelectedFile] = useState('');
    const [fileName, setFileName] = useState('');
    const handleFileUpload = (e) => {
        const uploadData = new FormData();
        uploadData.append("img", e.target.files[0], e.target.files[0].name);
        axios.post(API_URL + '/upload/cloudinary', uploadData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                setFileName(res.data.fileName)
                console.log(fileName)
            }
            )
            .catch(err => console.log(err))
        console.log(e.target.files[0].name)
        // const file = e.target.files[0];
        // previewFile(file);
        // setSelectedFile(file);
        // setFileInputState(e.target.value);


    }
    const previewFile = file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }
    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result)
        }
        reader.onerror = () => {
            console.log('Error');
        }
    }
    const uploadImage = async (image) => {
        await axios.post('http://localhost:5000/api/v1/upload/cloudinary', JSON.stringify({ data: image }), {
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'multipart/form-data'
            }
        })
            .then(() => {
                setFileInputState('');
                setPreviewSource('');
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
                                            <Input value={isAddNew.Name} autoFocus required placeholder='Tên danh mục'
                                                onChange={e => {
                                                    handleChangeCategoryName(e)
                                                    setIsAddNew(pre => {
                                                        return {
                                                            ...pre, Name: e.target.value
                                                        }
                                                    })
                                                }
                                                } />
                                        </label><br /><br />
                                        <Select
                                            value={isAddNew.Code}
                                            style={{ width: 160 }}
                                            placeholder="Danh mục loại"
                                            onChange={(e) => {
                                                setIsAddNew(pre => {
                                                    return { ...pre, Code: e ? e : 'ao' }
                                                })
                                            }}
                                        >
                                            <Option value="ao">Áo</Option>
                                            <Option value="quan">Quần</Option>
                                            {/* <Option value="balo">Balo</Option> */}
                                            {/* <Option value="giay">Giày</Option> */}
                                            {/* <Option value="khac">Khác</Option> */}

                                        </Select> &emsp;
                                        <Select
                                            defaultValue={isAddNew.StatusId}
                                            value={isAddNew.StatusId}
                                            style={{ width: 160 }}
                                            placeholder="Trạng thái"
                                            onChange={(e) => {
                                                setIsAddNew(pre => {
                                                    return { ...pre, StatusId: e }
                                                })
                                            }}
                                        >
                                            <Option value="1">Đang hoạt động</Option>
                                            <Option value="2">Chưa hoạt động</Option>

                                        </Select>
                                    </Modal>
                                </>
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
                                    // scroll={{ x: 1300 }}
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
                                        // console.log(isDataEdit)
                                    }}
                                >
                                    <label> Tên danh mục:
                                        <Input placeholder='Fill in Category Name'
                                            value={isDataEdit.Name}
                                            onChange={e =>
                                                setIsDataEdit(pre => {
                                                    return {
                                                        ...pre, Name: e.target.value
                                                    }
                                                })
                                            } />
                                    </label><br /><br />
                                    <Select
                                        style={{ width: 160 }}
                                        placeholder="Chọn danh mục loại"
                                        onChange={(e) => {
                                            setIsDataEdit(pre => {
                                                return { ...pre, Code: e }
                                            })
                                        }}
                                    >
                                        <Option value="ao">Áo</Option>
                                        <Option value="quan">Quần</Option>
                                        {/* <Option value="balo">Balo</Option> */}
                                        {/* <Option value="giay">Giày</Option> */}
                                        {/* <Option value="khac">Khác</Option> */}

                                    </Select> &emsp;
                                    <Select
                                        style={{ width: 160 }}
                                        placeholder="Trang thái"
                                        onChange={(e) => {
                                            setIsDataEdit(pre => {
                                                return { ...pre, StatusId: e }
                                            })
                                        }}
                                    >
                                        <Option value="1">Đang hoạt động</Option>
                                        <Option value="2">Chưa hoạt động</Option>

                                    </Select>
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
