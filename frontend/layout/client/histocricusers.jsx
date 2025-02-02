import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';

function Historic() {
    const [users, setUsers] = useState([])
    const host = import.meta.env.VITE_API_URL_BACKEND;
    const action = `${host}/detail/lichsu`
    const link = import.meta.env.VITE_FACEBOOK
    const navigate = useNavigate()
    const token = sessionStorage.getItem("token-account")
    useEffect(() => {
        fetch(action, {
            method: "GET",
            headers: {
                Authorization: `${token}`,
                "Content-type": "application/json"
            }
            
        })
        .then(res => res.json())
        .then(data => {
            if (data == "error"){
                sessionStorage.clear()
            } else {
                const newData = data.map((item) => ({
                    ...item,
                    key: item._id
                }))
                setUsers(newData)
            } 
            
        })
    }, [])
    const columns = [
        {
            title: 'Name',
            key: 'name',
            render: (text, record, index) => <a>{index+1}</a>,
        },
        {
            title: 'Mã Đơn Hàng',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Tài Khoản',
            dataIndex: 'taikhoan',
            key: 'taikhoan',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Tổng dịch vụ',
            key: 'total',
            dataIndex: 'total',
            
        },
        {
            title: 'Dịch vụ',
            key: 'work',
            dataIndex: 'work',
            
        },
    ];
    return (
        <>
            <Table columns={columns} dataSource={users} />;
        </>
    )



}
export default Historic;