import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { Card, Typography, Tag, Divider } from "antd";
import { PhoneOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
function Freefire() {
    const [data, setData] = useState([])
    const [input, setInput] = useState([])
    const host = import.meta.env.VITE_API_URL_BACKEND
    const admin = import.meta.env.VITE_ADMIN
    const action = `${host}/${admin}/freefire`
    function handdleUpload(e) {
        console.log(e)
        e.preventDefault()
        const formData = new FormData()
        for (const key in input) {
            formData.append(key, input[key]);
        }
        data.forEach((file) => {
            formData.append("image", file)
        })
        fetch(action, {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }
    function handdleChange(e) {
        console.log(e)
        setData(e.fileList.map((item) => item.originFileObj))
    }
    function handdleInput(e) {
        setInput({
            ...input,
            [e.currentTarget.name]: e.currentTarget.value
        })

    }
    return (
        <>
            <Form onSubmitCapture={handdleUpload}
                name="wrap"
                labelCol={{
                    flex: '110px',
                }}
                labelAlign="left"
                labelWrap
                wrapperCol={{
                    flex: 1,
                }}
                colon={false}
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item
                    label={<span style={{fontSize: "14px", width: "128px"}}>Tên tài khoản: </span>}
                    name="name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input onChange={handdleInput} name='name'/>
                </Form.Item>
                <Form.Item
                    label={<span style={{fontSize: "14px", width: "128px"}}>Giá ATM: </span>}
                    name="ATM"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input onChange={handdleInput} name='ATM'/>
                </Form.Item>
                <Form.Item
                    label={<span style={{fontSize: "14px", width: "128px"}}>Giá Card: </span>}
                    name="card"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input onChange={handdleInput} name='card'/>
                </Form.Item>
                <Form.Item
                    label={<span style={{fontSize: "14px", width: "128px"}}>Đăng kí: </span>}
                    name="signin"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input onChange={handdleInput} name='signin'/>
                </Form.Item>
                <Form.Item
                    label={<span style={{fontSize: "14px", width: "128px"}}>Skin súng: </span>}
                    name="skin"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input onChange={handdleInput} name='skin'/>
                </Form.Item>
                <Form.Item
                    label={<span style={{fontSize: "14px", width: "128px"}}>Thẻ vô cực: </span>}
                    name="vocuc"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input onChange={handdleInput} name='vocuc'/>
                </Form.Item>
                <Form.Item
                    label={<span style={{fontSize: "14px", width: "128px"}}>Giá cũ: </span>}
                    name="price"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input onChange={handdleInput} name='price'/>
                </Form.Item>
                <Form.Item
                    label={<span style={{fontSize: "14px", width: "128px"}}>Rank: </span>}
                    name="rank"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input onChange={handdleInput} name='rank'/>
                </Form.Item>
                <Upload
                    onChange={handdleChange}
                    name='image'
                    listType="picture"
                    beforeUpload={() => false}
                >
                    <Button type="primary" name='image' icon={<UploadOutlined />} style={{ marginLeft: "153px" }} >
                        Upload
                    </Button>
                </Upload>
                <Form.Item label=" ">
                    <Button color="purple" variant="solid" htmlType='submit' style={{ marginTop: "50px", marginLeft:  "40px"}}>
                        Cập Nhật
                    </Button>
                </Form.Item>
            </Form>

        </>
    )
}

export default Freefire;