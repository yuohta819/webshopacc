import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
function LoginQTV() {
    const [data, setData] = useState("")
    const host = import.meta.env.VITE_API_URL_BACKEND
    const qtv = import.meta.env.VITE_QTV
    const navigate = useNavigate()
    const action = `${host}/${qtv}/login`
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
                if (data == "fail") {
                    toast.warning("Nạp thẻ thất bại! ", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                } else if (data == "error") {
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
                    sessionStorage.setItem("token-Accountqtv", data)
                    setTimeout(() => {
                        navigate(`/${qtv}`)
                    }, 1000)
                }
            })
    }
    function handdleChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <h2 style={{
                textAlign: 'center',
                paddingTop: 100,
                paddingBottom: 45,
                margin: 0
            }}>Trang Đăng Nhập</h2>
            <div className="box" style={{
                display: "flex",
                justifyContent: "center"
            }} >
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
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input onChange={handdleChange} name="account" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password onChange={handdleChange} name="paswword" />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" label={null}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div >
            <ToastContainer />
        </>
    )
}
export default LoginQTV;