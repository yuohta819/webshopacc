import React, { useEffect, useState } from 'react';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { Space, Typography } from 'antd';

const InforQTV = () => {
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const { Text, Link } = Typography;
  const navigate = useNavigate()
  const token = sessionStorage.getItem("token-Accountqtv")
  const host = import.meta.env.VITE_API_URL_BACKEND;
  const qtv = import.meta.env.VITE_QTV;
  const admin = import.meta.env.VITE_ADMIN
  const action = `${host}/${qtv}/accountqtv`
  const [data, setData] = useState([])
  const [account, setAccount] = useState([])
  try {
    fetch(action, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data == "error") {
          navigate(`/${qtv}/login`)

          console.log("test")
        } else {
          setData(data)
        }
      })
  } catch (error) {
    console.log("error")
  }
  return (
    <>
      {data.map((item, index) => (
        <Form
          key={index+1}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          initialValues={{
            size: componentSize,
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item label="Tên tài khoản" name="size">
            <Radio.Group>
              <Radio.Button value="default">{item.account}</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Tổng đơn">
          <Text type="secondary">{item.count}</Text>
          </Form.Item>
          <Form.Item label="Tổng tiền">
          <Text type="secondary">{item.total}đ</Text>
          </Form.Item>
          
        </Form>
      ))}
    </>
  );
};
export default InforQTV