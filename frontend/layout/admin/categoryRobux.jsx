import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import {Button} from 'antd';
import { use } from 'react';
function CategoryRobux() {
  const host = import.meta.env.VITE_API_URL_BACKEND;
  const admin = import.meta.env.VITE_ADMIN;
  const [bill, setBill] = useState([])
  const action = `${host}/${admin}/findcategory`
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

  function handdleDelete(e) {
    const local = `${host}/${admin}/deletecategorybloxfruit/${e.currentTarget.title}`
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
     
 }
  const columns = [
    {
      title: 'Id',
      dataIndex: 'count',
      key: 'count',
      render: (text, record, index) => <a>{index+1}</a>,
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Thành Tiền',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Xóa',
      key: 'deleted',
      dataIndex: 'deleted',
      render: (deleted,  record) => (
        <Button type={deleted ? "primary" : "default"} value={deleted} onClick={handdleDelete} title={record._id} danger={!deleted}>
          Xóa
        </Button>
      ),
  
    },
  ];
  return <Table columns={columns} dataSource={bill} style={{marginTop: "50px"}}/>;
}

export default CategoryRobux;