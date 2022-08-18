/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { DeleteOutlined } from '@ant-design/icons';
import { Card, Col, Form, notification, Popconfirm, Row, Spin, Table } from "antd";
import './style.css';

import axios from 'axios';
import { useHistory } from "react-router-dom";
import useStateRef from 'react-usestateref';
import { API_URL } from '../api/API_URL';

function News() {
    const history = useHistory()
    const auth = localStorage.getItem('token_admin') ? true : false
    useEffect(() => {
        !auth && history.replace('/sign-in')
    }, [])
    const [dataUser, setDataUser, dataUserRef] = useStateRef([])
    const [success, setSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const fetchData = async () => {
        const response = await axios.get(`${API_URL}/comments`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
            }
        })
        if (response && response.data) {
            setDataUser(response.data)
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
            title: "Tên người dùng",
            dataIndex: "name",
            key: "name",
            width: 100,
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: "Nội dung bình luận",
            dataIndex: "comment",
            key: "comment",
            width: 100,
            ellipsis: {
                showTitle: false,
            },
        },
        {
            title: "Hành động",
            key: "Action",
            fixed: 'right',
            width: 40,
            render(record) {
                return (
                    <>
                        <Popconfirm okText="Xóa" cancelText="Hủy" title="Chắc chắn xóa?" onConfirm={() => BtnDelete(record)}>
                            <DeleteOutlined style={{ color: 'red', cursor: 'pointer', fontSize: 20, marginRight: 10 }} />
                        </Popconfirm>
                    </>
                );
            }
        },
    ];

    const BtnDelete = async (record) => {
        // console.log(record._id)
        await axios.delete(`${API_URL}/comment/${record._id}`, {
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

    const [form] = Form.useForm();
    return (
        <>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Products Table"
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



                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default News;
