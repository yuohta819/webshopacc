
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
const ForgotPass = () => {
    const [data, setData] = useState("")
    const [result, setResult] = useState("success")
    const host = import.meta.env.VITE_API_URL_BACKEND;
    const action = `${host}/password`
    const link = import.meta.env.VITE_FACEBOOK
    const navigate = useNavigate()
    function handdleSubmit(e) {
        e.preventDefault()
        console.log(e)
        fetch(action, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data == "error") {
                    toast.warning("Tài khoản không tồn tại!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                } else if (data == "success") {
                    toast.success("Khôi phục mật khẩu thành công!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    sessionStorage.setItem("token-account", data)
                    setTimeout(() => {
                        window.location.reload()

                    }, 3000)
                    navigate(`/dangnhap`)
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
                                <h2>Khôi Phục Mật Khẩu</h2>
                                <Form onSubmitCapture={handdleSubmit}
                                    name="login"
                                    initialValues={{ remember: true }}
                                    style={{ maxWidth: 360, marginLeft: 160 }}
                                >
                                    <Form.Item
                                        name="username"
                                        rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản!' }]}
                                    >
                                        <Input prefix={<UserOutlined />} onChange={handdleChange} name="account" placeholder="Nhập tên tài khoản" />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
                                    >
                                        <Input prefix={<LockOutlined />} onChange={handdleChange} name="pass" type="password" placeholder="Nhập mật khẩu mới" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Flex justify="space-between" align="center">
                                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                                <Checkbox>Ghi nhớ mật khẩu</Checkbox>
                                            </Form.Item>
                                            <a href="/quenmatkhau">Đăng Nhập</a>
                                        </Flex>
                                    </Form.Item>

                                    <Form.Item>
                                        <Button block type="primary" htmlType="submit">
                                            Cập Nhật
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
    );
};
export default ForgotPass;