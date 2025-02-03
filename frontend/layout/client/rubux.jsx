import React, { useEffect, useState } from "react";
import { Input, Card, Button, Typography, Row, Col } from "antd";
import "../../public/css/Hearder.css"
import { ToastContainer, toast } from "react-toastify";
import { RiMessengerFill } from "react-icons/ri";
import { Link,useNavigate } from "react-router-dom";
import SideBar from "./siderbar";
const { Title, Text } = Typography;
const RobuxGamepass = () => {
    const [amount, setAmount] = useState(10000);
    const exchangeRate = import.meta.env.VITE_RUBUX
    const host = import.meta.env.VITE_API_URL_BACKEND;
    const robuxPrice = (amount / 1000) * exchangeRate;
    const link = import.meta.env.VITE_FACEBOOK
    const [data, setData] = useState("")
    const navigate = useNavigate()
    const token = sessionStorage.getItem("token-account")
    function handdleSubmit(e) {
        e.preventDefault()
        const action = `${host}/thanhtoan/Robux/${robuxPrice}`
        console.log(action)
        fetch(action, {
            method: "POST",
            headers: {
                Authorization: `${token}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data === "success") {
                    toast.success("Thanh Toán Thành Công! Chờ duyệt", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    setTimeout(() => {
                        navigate("/")
                    }, 2000)
                } else {
                    toast.success("Số tiền trong tài khoản không đủ! Vui lòng nạp thêm", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
            })
    }
    function handdleChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value

        })
        setAmount(parseInt(data.price))
    }
    return (
        <>
            <form action="" onSubmit={handdleSubmit}>
                <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
                    <Title level={2}>Robux 120h Gamepass</Title>
                    {/* Form chọn số tiền */}
                    <Card style={{ marginBottom: 20 }}>
                        <Title level={4}>Vui lòng chọn thông tin</Title>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Text>Nhập số tiền cần mua:</Text>
                                <Input
                                    name="price"
                                    type="number"
                                    onChange={handdleChange}
                                    suffix="đ"
                                    required
                                />
                                <Text type="secondary">
                                    Số tiền thanh toán phải từ <b>10,000đ</b> đến <b>500,000đ</b>
                                </Text>
                            </Col>
                            <Col span={12}>
                                <Text>Hệ số:</Text>
                                <Input value="75" disabled />
                            </Col>
                        </Row>
                    </Card>

                    {/* Form nhập tên người dùng */}
                    <Card style={{ marginBottom: 20 }}>
                        <Title level={4}>Thông tin người dùng</Title>
                        <Text>Tên đăng nhập Roblox</Text>
                        <Input placeholder="Tên đăng nhập Roblox" name="title" onChange={handdleChange} required />
                        <Text>Link Facebook: </Text>
                        <Input placeholder="Link Facebook" name="connect" onChange={handdleChange} required />
                    </Card>

                    {/* Báo giá và thanh toán */}
                    <Card style={{ textAlign: "right" }} onChange={handdleChange}>
                        <Text style={{ fontSize: "16px" }}>
                            Báo giá: <span style={{ color: "red", fontWeight: "bold" }} >{robuxPrice} Robux</span>
                        </Text>
                        <div style={{ marginTop: 10 }}>
                            <Button htmlType="submit">Thanh Toán</Button>
                        </div>
                    </Card>
                </div>
            </form>
            <Link to={`${link}`}>
                <div className="selection-5" >
                    <RiMessengerFill />
                </div>
            </Link>
            <SideBar />
            <div className="selection-end">
                <p>© Copyright 2023 - Privacy Policy - Terms of Service</p>
                <p>Operated by Lộc Trầm Cảm & Phạm Khải, All Rights Reserved</p>
            </div>
            <ToastContainer />
        </>

    );
};

export default RobuxGamepass;
