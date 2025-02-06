import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { Card, Typography, Tag, Divider } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import { Select, Space } from 'antd';
const { Title, Text } = Typography;
function LienMinh() {
    const [data, setData] = useState([])
    const [input, setInput] = useState([])
    const [item, setItems] = useState([])
    const [id, setId] = useState("")
    const host = import.meta.env.VITE_API_URL_BACKEND
    const admin = import.meta.env.VITE_ADMIN
    const action = `${host}/${admin}/lienminh/${id}`
    function handdleUpload(e) {
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
    useEffect(() => {
        fetch(`${host}/allgame`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    const check = data.filter((item) => item.name === "lienminh");
                    setItems(check);
                }
            })
    }, []);
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
    function handdleClick(e) {
        setId(e)
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
                    label={<span style={{ fontSize: "14px", width: "128px" }}>Loại: </span>}
                    name="category"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >

                    <Select
                        label="name"
                        onChange={handdleClick}
                        style={{ width: 300 }}
                        options={
                            item.map((element) => ({
                                value: element.category,
                                label: element.category
                            }

                            ))
                        }
                    />


                </Form.Item>

                <Form.Item
                    label={<span style={{ fontSize: "14px", width: "128px" }}>Giá: </span>}
                    name="price"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input onChange={handdleInput} name='price' />
                </Form.Item>
                <Form.Item
                    label={<span style={{ fontSize: "14px", width: "128px" }}>Tài Khoản: </span>}
                    name="account"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input onChange={handdleInput} name='account' />
                </Form.Item>
                <Form.Item
                    label={<span style={{ fontSize: "14px", width: "128px" }}>Mật Khẩu: </span>}
                    name="password"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input onChange={handdleInput} name='password' />
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
                    <Button color="purple" variant="solid" htmlType='submit' style={{ marginTop: "50px", marginLeft: "40px" }}>
                        Cập Nhật
                    </Button>
                </Form.Item>
            </Form>

        </>
    )
}

export default LienMinh;