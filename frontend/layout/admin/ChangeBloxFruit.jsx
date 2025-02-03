
import React, { useEffect } from 'react';
import { Flex, Input, Form } from 'antd';
const { TextArea } = Input;
import { Col, Row } from 'antd';
import { Select } from 'antd';
import { useState } from 'react';

function ChangeBloxfruit() {
    const [data, setData] = useState([])
    const [change, setChange] = useState("")
    const [click, setClick] = useState("")
    const host = import.meta.env.VITE_API_URL_BACKEND
    const admin = import.meta.env.VITE_ADMIN
    const action = `${host}/${admin}/findcategory`
    const local = `${host}/${admin}/changecategory`
    useEffect(() => {
        fetch(action)
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
    }, [])
    function handdleSubmit(e) {
        e.preventDefault()
        const local = `${host}/${admin}/changecategory/${change.price}/${click}`
        fetch(local, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
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
        setChange({
            ...change,
            [name]: value.target.value
        })
    }
    function handdleClick(e) {
        setClick(e)
    }
    return (
        <><Col span={8} >
            <Form onSubmitCapture={handdleSubmit} >
                <p>Cập Nhật Giá Sản Phẩm</p>
                <Flex vertical gap={32}>
                    <Select
                        showSearch
                        placeholder="--Lựa chọn danh mục--"
                        optionFilterProp="label"
                        onChange={handdleClick}
                        options={data.map((item) => ({
                            value: item.type,
                            label: item.type + " " + item.price + "đ",
                        }))}
                    />
                    <TextArea showCount maxLength={100} onChange={(value) => handdleChange('price', value)} placeholder="Nhập giá mới" />
                    <TextArea
                        showCount
                        maxLength={100}
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

        </>
    )
}
export default ChangeBloxfruit