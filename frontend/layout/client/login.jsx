import "../../public/css/Login.css"
import "../../public/css/Hearder.css"
import { Link, Outlet } from "react-router-dom"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { RiMessengerFill } from "react-icons/ri";
function Login() {
    const [data, setData] = useState("")
    const [result, setResult] = useState("success")
    const host = import.meta.env.VITE_API_URL_BACKEND;
    const action = `${host}/login`
    const link = import.meta.env.VITE_FACEBOOK
    const navigate = useNavigate()
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
                if (data == "fail") {
                    toast.warning("Thất bại! Vui lòng nhập lại", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                } else if (data == "error") {
                    toast.warning("Thất bại! Sai Tài Khoản hoặc Mật Khẩu", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
                else {
                    sessionStorage.setItem("token-account", data)
                    setTimeout(() => {
                        window.location.reload()

                    }, 1000)
                    navigate(`/`)

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
            <div className="selection-1-login">
                <div className="selection-2-login">
                    <div className="container">
                        <div className="row">
                            <div className="col-6 img">
                                <img src="https://inkythuatso.com/uploads/thumbnails/800/2022/04/hinh-anh-anime-ngau-loi-16-29-15-02-33.jpg" alt="" />
                            </div>
                            <div className="col-6 loggin">
                                <h2>ĐĂNG NHẬP</h2>
                                <Form onSubmitCapture={handdleSubmit}
                                    name="login"
                                    initialValues={{ remember: true }}
                                >
                                    <Form.Item
                                        name="username"
                                        rules={[{ required: true, message: 'Please input your Username!' }]}
                                    >
                                        <Input prefix={<UserOutlined />} onChange={handdleChange} name="account" placeholder="Username" />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        rules={[{ required: true, message: 'Please input your Password!' }]}
                                    >
                                        <Input prefix={<LockOutlined />} onChange={handdleChange} name="pass" type="password" placeholder="Password" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Flex justify="space-between" align="center">
                                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                                <Checkbox>Ghi nhớ mật khẩu</Checkbox>
                                            </Form.Item>
                                            <a href="/quenmatkhau">Quên mật khẩu</a>
                                        </Flex>
                                    </Form.Item>

                                    <Form.Item>
                                        <Button block type="primary" htmlType="submit">
                                           Đăng Nhập
                                        </Button>
                                        or <a href="/dangki">Đăng Kí</a>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Link to={`${link}`}>
                <div className="selection-5" >
                    <RiMessengerFill />
                </div>
            </Link>
            <div className="selection-end">
                <p>© Copyright 2023 - Privacy Policy - Terms of Service</p>
                <p>Operated by Loc Tram Cam, All Rights Reserved</p>
            </div>
            <ToastContainer />
        </>
    )
}
export default Login