import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { Button } from 'antd';
import { use } from 'react'

function AccountUser() {
    const host = import.meta.env.VITE_API_URL_BACKEND;
    const admin = import.meta.env.VITE_ADMIN;
    const [bill, setBill] = useState([])
    const action = `${host}/${admin}/useraccount`
    const [data, setData] = useState(null)
    const [deleted, setDeleted] = useState(null)
    useEffect(() => {
        fetch(action)
            .then(res => res.json())
            .then(data => {
                const newData = data.map((item) => ({
                    ...item,
                    key: item.count || item.id, // Dùng count hoặc id làm key
                }));
                setBill(newData)
            })
    }, [data, deleted])
    const columns = [
        {
            title: 'Id',
            dataIndex: 'count',
            key: 'count',
            render: (text, record, index) => <a>{index + 1}</a>,
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Nickname',
            dataIndex: 'nickname',
            key: 'nickname',
        },
        {
            title: 'Tài Khoản',
            dataIndex: 'account',
            key: 'account',
        },
        {
            title: 'Tổng số bill',
            dataIndex: 'totalbill',
            key: 'totalbill',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalprice',
            key: 'totalprice',
        }
    ];
    return <Table columns={columns} dataSource={bill} />;
}
export default AccountUser