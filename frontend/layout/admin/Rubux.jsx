import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Button, Cascader, InputNumber, Select, Space, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

function Robux() {
    const [data, setData] = useState([])
    const host = import.meta.env.VITE_API_URL_BACKEND
    const admin = import.meta.env.VITE_ADMIN
    const action = `${host}/${admin}/bloxfruit`
    function handdleSubmit(e) {
        e.preventDefault()
        fetch(action, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data == "Error") {
                    toast.warning("Đăng nhập thất bại! ", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
                else {
                    toast.success("Đăng nhập thành công", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
            })
    }
    function handdleChange(name, value) {
        setData({
            ...data,
            [name]: value
        })
    }
    return (
        <>
            <Form onSubmitCapture={handdleSubmit}>
                <h2>Cập nhật giá Robux</h2>
                <Space direction="vertical">
                    <InputNumber addonBefore="+" addonAfter="$" placeholder='Giá Robux' onChange={(value) => handdleChange('robux', value)} />
                    <button type="submit" className="btn btn-primary">Cập Nhật</button>
                </Space>
            </Form>
        </>
    )
}
export default Robux