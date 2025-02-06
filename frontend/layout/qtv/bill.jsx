import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { Button } from 'antd';
import { use } from 'react';
function Bill() {
  const host = import.meta.env.VITE_API_URL_BACKEND;
  const qtv = import.meta.env.VITE_QTV;
  const [bill, setBill] = useState([])
  const action = `${host}/${qtv}/bill/Robux`
  const [data, setData] = useState(null)
  const [deleted, setDeleted] = useState(null)
  const token = sessionStorage.getItem("token-Accountqtv")
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
  function handdleClick(e) {
    const local = `${host}/${qtv}/change-status/${e.currentTarget.value}/${e.currentTarget.title}/Robux`
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
        }
      })
    location.reload()
  }
  function handdleDelete(e) {
    const local = `${host}/${qtv}/change-delete/${e.currentTarget.value}/${e.currentTarget.title}/Robux`
    console.log(e.currentTarget)
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
    handdleCount(e)

  }
  function handdleCount(e) {
    const local = `${host}/${qtv}/countqtv/${e.currentTarget.slot}`
    fetch(local, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data === "true") {
          setDeleted("false")
        }
      })

  }
  const columns = [
    {
      title: 'Id',
      dataIndex: 'count',
      key: 'count',
      render: (text, record, index) => <a>{index + 1}</a>,
    },
    {
      title: 'Thành Tiền',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Công Việc',
      dataIndex: 'work',
      key: 'work',
    },
    {
      title: 'Link FaceBook',
      dataIndex: 'connect',
      key: 'connect',
    },
    {
      title: 'Họ và Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tài Khoản',
      dataIndex: 'taikhoan',
      key: 'taikhoan',
    },
    {
      title: 'Tổng Rubux',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Trạng Thái',
      key: 'active',
      dataIndex: 'active',
      render: (active, record) => (
        <Button onClick={handdleClick} value={active} title={record._id} type={active ? "primary" : "default"} danger={!active} >
          {active ? `${record.name} đã nhận` : "Chờ nhận đơn"}
        </Button>
      ),
    },
    {
      title: 'Thực Hiện',
      key: 'deleted',
      dataIndex: 'deleted',
      render: (deleted, record) => (
        <Button type={deleted ? "primary" : "default"} value={deleted} slot={record.price} onClick={handdleDelete} title={record._id} danger={!deleted}>
          {deleted ? `${record.name} đã hoàn thành` : "Chưa Hoàn Thành"}
        </Button>
      ),

    },
  ];
  return <Table columns={columns} dataSource={bill} />;
}

export default Bill