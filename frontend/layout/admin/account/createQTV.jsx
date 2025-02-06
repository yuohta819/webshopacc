import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
function CreateQTV() {
    const admin = import.meta.env.VITE_ADMIN
    const [data, setData] = useState("")
    const [check, setCheck] = useState(null)
    const host = import.meta.env.VITE_API_URL_BACKEND;
    const action = `${host}/${admin}/createqtv`

    function handdleSubmit(e) {
        e.preventDefault()
        fetch(action, {
            method: "POST",
            headers: {
                // Authorization: `${token}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data == "fail") {
                    toast.warning("Tạo tài khoản thất bại! ", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
                else {
                    localStorage.setItem("token-qtv", data)
                    toast.success("Tạo tài khoản thành công!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    setTimeout(() => {
                        navigate("/dangnhap")
                    }, 5000)
                }
            })
    }
    function handdleChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    function handdleCheck() {
        if (check) {
            setCheck(false)
        } else {
            setCheck(true)
        }
    }
    return (
        <>
            <Form onSubmitCapture={handdleSubmit}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            ><h2 style={{
                marginLeft: 211
            }}>Đăng kí tài khoản QTV</h2>
                <Form.Item
                    label="Tài Khoản"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}

                >
                    <Input
                        onChange={handdleChange}
                        name='account'
                    />
                </Form.Item>

                <Form.Item
                    label="Mật Khẩu"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}

                >
                    <Input.Password
                        onChange={handdleChange}
                        name='password'
                    />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit" onClick={handdleCheck}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <ToastContainer />
        </>
    )
}



export default CreateQTV;