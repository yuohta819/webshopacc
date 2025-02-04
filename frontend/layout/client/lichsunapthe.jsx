import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import {Button} from 'antd';
function HistoricNapThe() {
    const [users, setUsers] = useState([])
    const host = import.meta.env.VITE_API_URL_BACKEND;
    const action = `${host}/detail/naptien`
    const link = import.meta.env.VITE_FACEBOOK
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
            const newData = data.map((item) => ({
                ...item,
                key: item._id
            }))
            setUsers(newData)
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
            title: 'Tài Khoản',
            dataIndex: 'account',
            key: 'account',
        },
        {
            title: 'Loại thẻ',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Mệnh Giá',
            key: 'price',
            dataIndex: 'price',
            
        },
        {
            title: 'Số seri',
            key: 'seri',
            dataIndex: 'seri',
            
        },
        {
            title: 'Mã Thẻ',
            key: 'code',
            dataIndex: 'code',
            
        },
        {
            title: 'Trạng Thái',
            key: 'active',
            dataIndex: 'active',
            render: (active, record) => (
              <Button  value={active} title={record.name}  type={active ? "primary" : "default"} danger={!active} > 
                {active  ? "Đã Xác Nhận" : "Chờ Xác Nhận"}
              </Button>
            ),
          },
    ];
    return (
        <>
            <Table columns={columns} dataSource={users} />;
        </>
    )



}
export default HistoricNapThe;