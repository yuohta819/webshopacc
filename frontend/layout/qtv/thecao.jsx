import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Input } from 'antd';
import { Button } from 'antd';
import { use } from 'react';
function TheCao() {
    const host = import.meta.env.VITE_API_URL_BACKEND;
    const qtv = import.meta.env.VITE_QTV;
    const [bill, setBill] = useState("")
    const action = `${host}/${qtv}/thecao`
    const [data, setData] = useState(null)
    const [deleted, setDeleted] = useState(null)
    const [price, setPrice] = useState("")
    useEffect(() => {
        fetch(action)
            .then(res => res.json())
            .then(data => {
                const newData = data.map((item) => ({
                    ...item,
                    key: item.count || item._id, // Dùng count hoặc id làm key
                }));
                const filteredData = newData.filter(item => item.type !== "");
                setBill(filteredData)
            })
    }, [data, deleted])
    function handdleClick(e) {
        console.log(e.currentTarget)
        const local = `${host}/${qtv}/change-status/${e.currentTarget.value}/${e.currentTarget.title}/thecao`

        fetch(local, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data === "true") {
                    setData("false")
                } else {
                    setData("true")
                }
            })
        location.reload()

    }
    function handdleDelete(e) {
        const local = `${host}/${qtv}/change-delete/${e.currentTarget.value}/${e.currentTarget.title}/thecao`
        fetch(local, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data === "true") {
                    setDeleted("false")
                }
            })
        location.reload()

    }
    function handdlePrice(e) {
        e.preventDefault()
        console.log(e)
        const local = `${host}/${qtv}/updateprice`
        fetch(local, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(price)
        })
            .then(res => res.json())
            .then(data => {
                if (data === "true") {
                    setDeleted("false")
                }
            })
    }
    function haddanleChange(e) {
        setPrice({
            ...price,
            [e.currentTarget.name]: e.currentTarget.value,
            id: e.currentTarget.id
        })
    }
    const columns = [
        {
            title: 'Id',
            dataIndex: "id",
            key: "id",
            render: (text, record, index) => <a>{index + 1}</a>,
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
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Mã seri',
            dataIndex: 'seri',
            key: 'seri',
        },
        {
            title: 'Mã Số',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Link FaceBook',
            dataIndex: 'link',
            key: 'link',
        },
        {
            title: 'Cập nhật số tiền',
            key: '',
            render: (text, record) => (
                <form action="" onSubmitCapture={handdlePrice}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <Input
                            type="text"
                            name='updatePrice'
                            id={record.account}
                            style={{
                                width: 92
                            }}
                            onChange={haddanleChange}
                            placeholder="Nhập số tiền"
                        />
                        <Button type="primary" htmlType='submit'>Lưu</Button>
                        </div>
                </form>
            ),
        },
        {
            title: 'Trạng Thái',
            key: 'active',
            dataIndex: 'active',
            render: (active, record) => (
                <Button onClick={handdleClick} value={active} title={record._id} type={active ? "primary" : "default"} danger={!active} >
                    {active ? "Đã nhận đơn" : "Chờ nhận đơn"}
                </Button>
            ),
        },
        {
            title: 'Thực Hiện',
            key: 'deleted',
            dataIndex: 'deleted',
            render: (deleted, record) => (
                <Button type={deleted ? "primary" : "default"} value={deleted} onClick={handdleDelete} title={record._id} danger={!deleted}>
                    {deleted ? "Hoàn Thành" : "Chưa Hoàn Thành"}
                </Button>
            ),

        },
    ];
    return <Table columns={columns} dataSource={bill} />;
}

export default TheCao