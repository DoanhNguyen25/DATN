/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

import './style.css'
import {
  Row, Col, Card, Button, Table, Avatar, Form, InputNumber, Upload,
  Typography, Pagination, Modal, Input, Select, notification, Spin, Drawer, Popconfirm, message,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusSquareOutlined, UploadOutlined, SearchOutlined } from '@ant-design/icons';

import { Format } from "../services/Format"
import { useHistory } from "react-router-dom";
import { API_URL } from '../api/API_URL'
import axios from 'axios';
import useStateRef from 'react-usestateref';
import moment from 'moment'

import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Editor from '../components/common/Editor';
// Images
const { TextArea } = Input;
const url = 'https://res.cloudinary.com/dbfjceflf/image/upload/v1651163135/h2tstore/'

const { Title } = Typography;
const { Option } = Select

// table code start

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

function News() {
  const history = useHistory()
  const auth = localStorage.getItem('token_admin') ? true : false
  useEffect(() => {
    !auth && history.replace('/sign-in')
  }, [])
  const [category, setCategory, categoryRef] = useStateRef([])
  const [dataUser, setDataUser, dataUserRef] = useStateRef([])
  const [dataSearch, setDataSearch, dataSearchRef] = useStateRef([])
  const [isEditing, setIsEditing] = useState(false)
  const [isDataEdit, setIsDataEdit] = useState({})
  const [isDataAdd, setIsDataAdd] = useState({})
  const [isAddNew, setIsAddNew] = useState({})
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [fileName, setFileName] = useState('');
  const [addNews, setAddNews] = useState(false)
  const [editorLoaded, setEditorLoaded] = useState(false);
  const fetchData = async () => {
    const response = await axios.get(`${API_URL}/products?size=10`)
    const res = await axios.get(`${API_URL}/categories`)
    if (response && response.data) {
      setDataUser(response.data.products)
      setDataSearch(response.data.products)
      setIsLoading(false)
      setSuccess(false)
    }
    if (res && res.data) {
      setCategory(res.data)
    }
  }


  useEffect(() => {
    fetchData()
  }, [success, isLoading])

  useEffect(() => {
    setEditorLoaded(true);
  }, []);


  const handleSearch = (e) => {
    const search = e.target.value;
    setDataUser(pre => {
      return (dataSearchRef.current.filter(item => {
        if (item.Name.includes(search))
          return item
      }))
    })
  }
  const columns = [
    {
      title: "Tên sản phẩm",
      key: "title",
      width: 220,
      fixed: 'left',
      sorter: (a, b) => a.title.length - b.title.length,
      ellipsis: {
        showTitle: false,
      },
      render(record) {
        return (
          <>
            {record.listImg ?
              (<><img src={record.listImg[0]} alt='not' width={30} height={35} title={record.title} />&emsp;{record.title}</>)
              : (<><img src={url + 'empty.png'} alt='not' width={30} height={35} title={record.title} />&emsp;{record.title}</>)
            }
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
    },
    {
      title: "Giá ban đầu",
      key: "price",
      width: 120,
      sorter: (a, b) => a.price - b.price,
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
      key: "categories",
      width: 120,
      filters: categoryRef.current.map(item => ({
        text: item.category_name,
        value: item._id,
      })),
      onFilter: (value, record) => record.categories._id?.indexOf(value) === 0,
      sorter: (a, b) => a._id - b._id,
      render(record) {
        return (
          <>
            {record.categories.category_name}
          </>
        );
      }
    },
    {
      title: "Trạng thái",
      key: "StatusId",
      width: 120,
      filters: [
        {
          text: 'Còn hàng',
          value: '6',
        },
        {
          text: 'Sắp hết hàng',
          value: '7',
        },
        {
          text: 'Hết hàng',
          value: '8',
        },
      ],
      onFilter: (value, record) => {
        if (Number(value) === 6)
          return (record.quantityInStock >= 10)
        if (Number(value) === 7)
          return (record.quantityInStock <= 10 & record.quantityInStock > 0)
        if (Number(value) === 8)
          return (record.quantityInStock === 0)

      },
      render(record) {
        return (
          <>
            {record.quantityInStock &&
              record.quantityInStock !== 0 ? (record.quantityInStock > 10 ? 'Còn hàng' : (record.quantityInStock <= 10 & record.quantityInStock > 0) && 'Sắp hết hàng') : ('Hết hàng')
            }
          </>
        );
      }
    },
    {
      title: "Số lượng",
      key: "quantityInStock",
      dataIndex: "quantityInStock",
      width: 90,
      sorter: (a, b) => a.quantityInStock - b.quantityInStock,
    },
    {
      title: "Hành động",
      key: "Action",
      fixed: 'right',
      width: 100,
      render(record) {
        return (
          <>
            {/* <PlusSquareOutlined onClick={() => BtnAddNew(record)} style={{ color: 'green', cursor: 'pointer', marginRight: 10, fontSize: 20 }} /> */}
            <EditOutlined onClick={() => BtnModalUpdate(record)} style={{ color: 'aqua', cursor: 'pointer', fontSize: 20, marginRight: 10 }} />
            <Popconfirm cancelText="Hủy" okText='Xóa' title="Chắc chắn xóa?" onConfirm={() => BtnDelete(record)}>
              <DeleteOutlined style={{ color: 'red', cursor: 'pointer', fontSize: 20, marginRight: 10 }} />
            </Popconfirm>
          </>
        );
      }
    },

  ];
  const props = {
    name: 'listImage',
    action: 'http://localhost:8000/api/upload/multiple',
    headers: {
      authorization: 'authorization-text',
    },
    maxCount: 5,
    multiple: true,

    onChange(info) {
      if (info.file.status !== 'uploading') {
        setIsDataEdit({
          ...isDataEdit,
          listImg: info.fileList?.map(item => item.response[0]),
        })
      }

      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const addProps = {
    name: 'avatar',
    action: 'http://localhost:8000/api/upload/single',
    headers: {
      authorization: 'authorization-text',
    },
    maxCount: 1,
    onChange(info) {
      console.log(info)
      if (info.file.status !== 'uploading') {
        setIsDataAdd({
          ...isDataAdd,
          listImg: info.fileList[0].response.url,
        })
      }

      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const BtnModalUpdate = (record) => {
    setIsEditing(true)
    setIsDataEdit({ ...record, _id: record._id, listImg: [] })
    console.log(record._id);
  }

  const BtnDelete = async (record) => {
    // Modal.confirm({
    //   title: "You sure delete?",
    //   onText: "Yes",
    //   okType: 'danger',
    //   onOk: async () => {
    await axios.delete(`${API_URL}/product/${record._id}`, {
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
    // }
    // })


  }
  const UpdateUser = async () => {
    await axios.patch(`${API_URL}/product/${isDataEdit._id}`,
      {
        title: isDataEdit.title,
        color: isDataEdit.color,
        size: isDataEdit.size,
        categories: isDataEdit.categories._id,
        listImg: isDataEdit.listImg?.join(),
        desc: isDataEdit.desc,
      },
      {
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
        setIsEditing(false)
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
  //create code random
  // const string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  // const randomCode = Array.apply(null, Array(12)).map(function () { return string.charAt(Math.floor(Math.random() * string.length)); }).join('');

  const AddNews = async (values) => {
    const valueUpdate = {
      ...values,
      hello: values.size,
      categories: values.categories,
      color: 'Trắng',
      listImg: isDataAdd.listImg,
      desc: isDataAdd.desc
    }
    axios.post(`${API_URL}/create`, valueUpdate, {
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
                  <Input
                    className="header-search"
                    placeholder="Tìm kiếm..."
                    prefix={<SearchOutlined />}
                    style={{ padding: '0 10px', borderRadius: 10, marginRight: 10 }}
                    onChange={handleSearch}
                  />
                  <Button onClick={() => setAddNews(true)} type='second' style={{ display: 'flex', alignItem: 'center' }}>
                    <PlusSquareOutlined style={{ color: 'green', cursor: 'pointer', marginTop: 4, fontSize: 30 }} />
                    Thêm mới
                  </Button>
                  <Drawer
                    title="Thêm mới 1 sản phẩm"
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
                      onFinish={AddNews}
                      scrollToFirstError
                    >
                      <Row gutter={[24, 0]}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={24} className="mb-24">
                          <Card bordered={false} className="criclebox h-full">
                            <Form.Item
                              name="title"
                              rules={[
                                {
                                  required: true,
                                  message: 'Nhập tên sản phẩm',
                                },
                              ]}
                            >
                              <Input autoFocus placeholder='Tên sản phẩm' />
                            </Form.Item>
                          </Card>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
                          <Card bordered={false} className="criclebox h-full">
                            <Form.Item
                              name="price"
                              rules={[
                                {
                                  type: 'number',
                                  min: 1,
                                },
                                {
                                  required: true,
                                  message: 'Nhập giá',
                                },
                              ]}
                            >
                              <InputNumber style={{ width: '100%', lineHeight: "31px", borderRadius: 5 }} placeholder='Giá' />
                            </Form.Item>
                          </Card>
                        </Col>
                      </Row>
                      <Row gutter={[24, 0]}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
                          <Card bordered={false} className="criclebox h-full">
                            <Form.Item
                              name="categories"
                              rules={[
                                {
                                  required: true,
                                  message: 'Chọn danh mục',
                                },
                              ]}
                            >
                              <Select style={{ width: "100%", lineHeight: "31px" }} placeholder="Danh mục">
                                {categoryRef.current.map(item =>
                                  <Option key={item._id} value={item._id}>{item.category_name}</Option>
                                )}
                              </Select>
                            </Form.Item>
                          </Card>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
                          <Card bordered={false} className="criclebox h-full">
                            <Form.Item
                              name="size"
                              rules={[
                                {
                                  required: true,
                                  message: 'Chọn size',
                                },
                              ]}
                            >
                              <Select
                                style={{ width: '100%', lineHeight: "31px", borderRadius: '20px' }}
                                allowClear
                                placeholder="size"
                              >
                                <Option value="S">S</Option>
                                <Option value="M">M</Option>
                                <Option value="L">L</Option>
                                <Option value="X">X</Option>
                                <Option value="XXL">XXL</Option>
                              </Select>
                            </Form.Item>
                          </Card>
                        </Col>
                      </Row>
                      <Row gutter={[24, 0]}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
                          <Card bordered={false} className="criclebox h-full">
                            <Form.Item
                              name="quantityInStock"
                              rules={[
                                {
                                  type: "number",
                                  min: 0, max: 200
                                },
                                {
                                  required: true,
                                  message: 'Nhập số lượng',
                                },
                              ]}
                            >
                              <InputNumber style={{ width: '100%', lineHeight: "40px", borderRadius: 5 }} placeholder='Số lượng' />
                            </Form.Item>
                          </Card>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
                          <Card bordered={false} className="criclebox h-full">
                            <Upload {...addProps}
                            >
                              <Button icon={<UploadOutlined />}>Thêm ảnh (Max:1)</Button>
                            </Upload>
                          </Card>
                        </Col>
                      </Row>
                      <p> Mô tả:
                        <CKEditor
                          editor={ClassicEditor}
                          data={isDataEdit.desc}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setIsDataAdd(pre => {
                              return {
                                ...pre, desc: data
                              }
                            })
                          }}

                        />

                      </p><br /> <br />
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
                    dataSource={dataUserRef.current}
                    className="ant-border-space"
                    columns={columns}
                    pagination={{ pageSize: 10, showSizeChanger: false }}
                    scroll={{ x: 1300 }}
                  />
                }

                {/* edit news */}

                <Drawer
                  title="Cập nhập sản phẩm"
                  width={720}
                  bodyStyle={{ paddingBottom: 80 }}
                  onClose={() => {
                    setIsEditing(false)
                    form.resetFields()
                  }}
                  visible={isEditing}
                >
                  <Row gutter={[24, 0]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={24} className="mb-24">
                      <Card bordered={false} className="criclebox h-full">
                        <Input autoFocus placeholder={isDataEdit.name}
                          onChange={e =>
                            setIsDataEdit(pre => {
                              return {
                                ...pre, name: e.target.value
                              }
                            })
                          }
                        />
                      </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={24} className="mb-24">
                      <Card bordered={false} className="criclebox h-full">
                        <Card bordered={false} className="criclebox h-full">
                          <Form.Item
                            name="_id"
                            rules={[
                              {
                                required: true,
                                message: 'Chọn danh mục',
                              },
                            ]}
                          >
                            <Select style={{ width: "100%", lineHeight: "31px" }} placeholder="Danh mục">
                              {categoryRef.current.map(item =>
                                <Option key={item._id} value={item._id}>{item.category_name}</Option>
                              )}
                            </Select>
                          </Form.Item>
                        </Card>
                      </Card>
                    </Col>
                  </Row>
                  <Row gutter={[24, 0]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
                      <Card bordered={false} className="criclebox h-full">
                        <InputNumber style={{ width: '100%', lineHeight: "31px", borderRadius: 5 }}
                          placeholder='Nhập giá ban đầu'
                          min={0}
                          value={isDataEdit.price}
                          onChange={e =>
                            setIsDataEdit(pre => {
                              return {
                                ...pre, price: e?.target?.value
                              }
                            })
                          }
                        />
                      </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
                      <Card bordered={false} className="criclebox h-full">
                        <Select
                          style={{ width: '100%', lineHeight: "31px", borderRadius: '20px' }}
                          // mode="multiple"
                          allowClear
                          placeholder={isDataEdit.color}
                          onChange={e =>
                            setIsDataEdit(pre => {
                              return {
                                ...pre, color: e
                              }
                            })
                          }
                        >
                          <Option value="Trắng">Trắng</Option>
                          <Option value="Ghi">Ghi</Option>
                          <Option value="Xanh">Xanh</Option>
                          <Option value="Đỏ">Đỏ</Option>
                          <Option value="Vàng">Vàng</Option>
                        </Select>

                      </Card>
                    </Col>
                  </Row>
                  <Row gutter={[24, 0]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
                      <Card bordered={false} className="criclebox h-full">
                        <Select
                          style={{ width: '100%', lineHeight: "31px", borderRadius: '20px' }}
                          // mode="multiple"
                          allowClear
                          placeholder={isDataEdit.size}
                          onChange={e =>
                            setIsDataEdit(pre => {
                              return {
                                ...pre, size: e
                              }
                            })
                          }
                        >
                          <Option value="S">S</Option>
                          <Option value="M">M</Option>
                          <Option value="L">L</Option>
                          <Option value="X">X</Option>
                          <Option value="XXL">XXL</Option>
                        </Select>
                      </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
                      <Card bordered={false} className="criclebox h-full">
                        <Upload {...props}>
                          <Button icon={<UploadOutlined />}>Thêm ảnh (Max&lt;=5)</Button>
                        </Upload>
                      </Card>
                    </Col>
                  </Row>
                  <p> Mô tả:
                    <CKEditor
                      editor={ClassicEditor}
                      data={isDataEdit.desc}

                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setIsDataEdit(pre => {
                          return {
                            ...pre, desc: data
                          }
                        })
                      }}

                    />

                  </p><br /> <br />
                  <div style={{ textAlign: 'center' }}>
                    <Button type='primary' onClick={UpdateUser}>Cập nhật</Button>
                  </div>
                </Drawer>

              </div>
            </Card>
          </Col>
        </Row>
      </div >
    </>
  );
}

export default News;
