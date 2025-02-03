import { useEffect, useState } from "react"
import "../../public/css/nap.css"
import "../../public/css/Hearder.css"
import { Link, useNavigate } from "react-router-dom"
import { RiMessengerFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import React from 'react';
import { Button, Flex, Form, Input, Select } from 'antd';
import { InputNumber } from 'antd';
import SideBar from "./siderbar";
function Napthe() {
    const [check, setCheck] = useState(true)
    const [data, setData] = useState("")
    const host = import.meta.env.VITE_API_URL_BACKEND;
    const action = `${host}/napthe`
    const link = import.meta.env.VITE_FACEBOOK
    const token = sessionStorage.getItem("token-account")
    const nav = useNavigate()
    function handdleSubmit(e) {
        e.preventDefault()
        if (!token) {
            nav("/dangnhap")
        }
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
                if (data == "fail") {
                    toast.warning("Nạp thẻ thất bại! ", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
                else if (data === "success") {
                    toast.success("Nạp thẻ thành công! Đang chờ xử lí", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    setTimeout(() => {
                        navigate("/")
                    }, 5000)
                }
            })
    }
    function handdleChange(value, option) {
        setData({
            ...data,
            [option.name]: value
        })
    }
    console.log(data)
    function handdleCheck() {
        if (check) {
            setCheck(false)
        } else {
            setCheck(true)
        }
    }
    const [form] = Form.useForm();

    return (
        <>


            <Form
                onSubmitCapture={handdleSubmit}
                form={form}
                scrollToFirstError={{ behavior: 'instant', block: 'end', focus: true }}
                style={{ paddingBlock: 32 }}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
            >
                <h3 style={{ textAlign: 'center' }}>Qua Thẻ Cào</h3>
                <Form.Item label="Loại Thẻ:" rules={[{ required: true }]}>
                    <Select
                        name="type"
                        defaultValue="--Loại Thẻ--"
                        style={{ width: 120 }}
                        onChange={(value) => handdleChange(value, { name: "type" })}
                        options={[
                            { value: "Mobifone", label: '--Mobine--' },
                            { value: 'Viettel', label: '--Viettel--' },
                            { value: 'Vinaphone', label: '--Vinaphone--' },
                            { value: 'Garena', label: '--Garena--' },
                        ]}
                    />
                </Form.Item>

                <Form.Item label="Số tiền" name="price">
                    <Select

                        defaultValue="--Số tiền--"
                        style={{ width: 120 }}
                        onChange={(value) => handdleChange(value, { name: "price" })}
                        options={[
                            { value: '10.000đ', label: '--10.000đ--' },
                            { value: '20.000đ', label: '--20.000đ--' },
                            { value: '50.000đ', label: '--50.000đ--' },
                            { value: '100.000đ', label: '--100.000đ--' },
                            { value: '200.000đ', label: '--200.000đ--' },
                            { value: '500.000đ', label: '--500.000đ--' },
                        ]}
                    />
                </Form.Item>
                <Form.Item name="seri" label="Số seri:" rules={[{ required: true }]}>
                    <InputNumber
                        style={{ width: 200 }}
                        min="0"
                        onChange={(value) => handdleChange(value, { name: "seri" })}
                        stringMode
                    />
                </Form.Item>
                <Form.Item name="code" label="Mã thẻ:" rules={[{ required: true }]}>
                    <InputNumber
                        style={{ width: 200 }}
                        min="0"
                        onChange={(value) => handdleChange(value, { name: "code" })}
                        stringMode
                    />
                </Form.Item>
                <Form.Item name="link" label="Link Facebook:" >
                    <Input.TextArea rows={6} style={{ height: 34 }} onChange={(value) => handdleChange(value, { name: "link" })} />
                </Form.Item>
                <Form.Item name="link" label="Lưu ý:" >
                    <ul>
                        <li>Nạp qua thẻ cào sẽ bị chiết khấu ví dụ 10k = 8k vào tài khoản. Chiết khấu sẽ tùy vào bên thứ 3</li>
                        <li>Khi nhập xong nhấn nút đã nạp bên dưới</li>
                        <li>Không chấp nhận nhập sai mệnh giá thẻ </li>
                        <li>Nếu có thắc mắc liên hệ facebook hoặc zalo dưới góc phải</li>
                    </ul>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6 }}>
                    <Flex gap="small">
                        <Button type="primary" htmlType="submit">
                            Nạp tiền
                        </Button>
                    </Flex>
                </Form.Item>
            </Form>

            <Link to={`${link}`}>
                <div className="selection-5" >
                    <RiMessengerFill />
                </div>
            </Link>
            <SideBar />
            <div className="selection-end">
                <p>© Copyright 2023 - Privacy Policy - Terms of Service</p>
                <p>Operated by Loc Tram Cam, All Rights Reserved</p>
            </div>
            <ToastContainer />
        </>
    )
}
export default Napthe