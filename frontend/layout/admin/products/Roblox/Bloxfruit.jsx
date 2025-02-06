import React from 'react';
import { Flex, Input, Form } from 'antd';
const { TextArea } = Input;
import { Col, Row } from 'antd';
import { useState } from 'react';
import ChangeBloxfruit from "../ChangeBloxFruit"
import CategoryRobux from "../../categoryRobux"
import Robux from "../Rubux"
import AnimeDenders from './animedefenders';
import RobuxReal from './robuxreal';
import Fruit from './Fruit';
import Toilet from './toilet';
function Bloxfruit() {
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
            [name]: value.currentTarget.value
        })
    }
    return (
        <>
        <Robux />
    <h2 style={{ textAlign: 'center', marginBottom: "20px", marginTop: "24px" }}>Cập nhật Blox Fruit</h2>
    <Row style={{ justifyContent: "space-around" }}>
        <ChangeBloxfruit />
        <Col span={8} >
            <Form onSubmitCapture={handdleSubmit}>
                <p>Thêm sản phẩm mới</p>
                <Flex vertical gap={32}>
                    <Input showCount maxLength={20} placeholder='Nhập tên sản phẩm' onChange={(value) => handdleChange('type', value)} />
                    <TextArea showCount maxLength={100} onChange={(value) => handdleChange('price', value)} placeholder="Nhập giá sản phẩm" />
                    <TextArea
                        showCount
                        maxLength={100}
                        onChange={(value) => handdleChange('type', value)}
                        placeholder="disable resize"
                        style={{
                            height: 120,
                            resize: 'none',
                        }}
                    />
                </Flex>
                <button type="submit" style={{ marginTop: '30px' }} className="btn btn-primary">Cập Nhật</button>

            </Form>
        </Col>
    </Row>
    <CategoryRobux />
    <AnimeDenders />
    <RobuxReal />
    <Fruit />
    <Toilet />
</>
    )
} 
export default Bloxfruit;