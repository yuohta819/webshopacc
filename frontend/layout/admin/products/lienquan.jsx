import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { Card, Typography, Tag, Divider } from "antd";
import { PhoneOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
function Lienquan() {
    const [data, setData] = useState([])
    const [input, setInput] = useState([])
    const host = import.meta.env.VITE_API_URL_BACKEND
    const admin = import.meta.env.VITE_ADMIN
    const action = `${host}/${admin}/lienquan`
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
                    label={<span style={{fontSize: "14px", width: "128px"}}>Tình Trạng acc: </span>}
                    name="status"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input onChange={handdleInput} name='status'/>
                </Form.Item>
                <Form.Item
                    label={<span style={{fontSize: "14px", width: "128px"}}>Tướng: </span>}
                    name="tuong"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input onChange={handdleInput} name='tuong'/>
                </Form.Item>
                <Form.Item
                    label={<span style={{fontSize: "14px", width: "128px"}}>Skin: </span>}
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
                    label={<span style={{fontSize: "14px", width: "128px"}}>Ngọc: </span>}
                    name="ngoc"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input onChange={handdleInput} name='ngoc'/>
                </Form.Item>
                <Form.Item
                    label={<span style={{fontSize: "14px", width: "128px"}}>Rank mùa trước: </span>}
                    name="rank"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input onChange={handdleInput} name='rank'/>
                </Form.Item>
                <Form.Item
                    label={<span style={{fontSize: "14px", width: "128px"}}>Tỉ lệ thắng: </span>}
                    name="win"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input onChange={handdleInput} name='win'/>
                </Form.Item>
                <Form.Item
                    label={<span style={{fontSize: "14px", width: "128px"}}>Thẻ đổi tên: </span>}
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
                    label={<span style={{fontSize: "14px", width: "128px"}}>Số trận: </span>}
                    name="digit"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input onChange={handdleInput} name='digit'/>
                </Form.Item>
                <Form.Item
                    label={<span style={{fontSize: "14px", width: "128px"}}>Uy tín: </span>}
                    name="rep"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input onChange={handdleInput} name='rep'/>
                </Form.Item>
                <Form.Item
                    label={<span style={{fontSize: "14px", width: "128px"}}>Giá tiền: </span>}
                    name="price"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input onChange={handdleInput} name='price'/>
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

export default Lienquan;