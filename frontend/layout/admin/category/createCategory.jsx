import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
function CreateCategory() {
    const [data, setData] = useState([])
    const [input, setInput] = useState([])
    const host = import.meta.env.VITE_API_URL_BACKEND
    const admin = import.meta.env.VITE_ADMIN
    const action = `${host}/${admin}/createtongquan/${input.category}/${input.title}`
    function handdleUpload(e) {
        e.preventDefault()
        const formData = new FormData()
        data.forEach((file) => {
            formData.append("imagee", file)
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
                    label={<span style={{fontSize: "13px"}}>Loại danh mục</span>}
                    
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input onChange={handdleInput} name='title'/>
                </Form.Item>
                <Form.Item
                    label={<span style={{fontSize: "13px"}}>Tên danh mục</span>}
                    name="category"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input onChange={handdleInput} name='category'/>
                </Form.Item>
                <Upload
                    onChange={handdleChange}
                    name='imagee'
                    listType="picture"
                    beforeUpload={() => false}
                >
                    <Button type="primary" name='imagee' icon={<UploadOutlined />} style={{ marginLeft: "110px" }} >
                        Upload
                    </Button>
                </Upload>
                <Form.Item label=" ">
                    <Button color="purple" variant="solid" htmlType='submit' style={{ marginTop: "50px" }}>
                        Cập Nhật
                    </Button>
                </Form.Item>
            </Form>

        </>
    )
}

export default CreateCategory;