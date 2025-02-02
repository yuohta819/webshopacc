import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import {Button} from 'antd';
function HistoricATM() {
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
            const fillter = newData.filter(item => item.type === "")
            setUsers(fillter)
        })
    }, [])
    const columns = [
        {
            title: 'Id',
            key: 'name',
            render: (text, record, index) => <a>{index+1}</a>,
        },
        {
            title: 'Mã Đơn',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Tài Khoản',
            dataIndex: 'account',
            key: 'account',
        },
        {
            title: 'Mệnh Giá',
            key: 'price',
            dataIndex: 'price',
            
        },
        {
            title: 'Nội dung',
            key: 'node',
            dataIndex: 'node',
            
        },
        {
            title: 'Trạng Thái',
            key: 'active',
            dataIndex: 'active',
            render: (active, record) => (
              <Button  value={active} title={record.name}  type={active ? "primary" : "default"} danger={!active} > 
                {active  ? "Đã nhận đơn" : "Chờ nhận đơn"}
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
export default HistoricATM;