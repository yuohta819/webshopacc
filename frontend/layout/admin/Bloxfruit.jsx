import React from 'react';
import { Flex, Input, Form } from 'antd';
const { TextArea } = Input;
import { Col, Row } from 'antd';
import { Select } from 'antd';
const onChange = (e) => {
    console.log('Change:', e.target.value);
};
const onSearch = (value) => {
    console.log('search:', value);
};
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
    <h2 style={{ textAlign: 'center', marginBottom: "20px", marginTop: "24px" }}>Cập nhật Blox Fruit</h2>
    <Row style={{ justifyContent: "space-around" }}>
        <Col span={8}>
            <Form>
                <p>Cập Nhật Giá Sản Phẩm</p>
                <Flex vertical gap={32}>
                    <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="label"
                        onChange={onChange}
                        onSearch={onSearch}
                        options={[
                            {
                                value: 'jack',
                                label: 'Jack',
                            },
                            {
                                value: 'lucy',
                                label: 'Lucy',
                            },
                            {
                                value: 'tom',
                                label: 'Tom',
                            },
                        ]}
                    />
                    <TextArea showCount maxLength={100} onChange={onChange} placeholder="can resize" />
                    <TextArea
                        showCount
                        maxLength={100}
                        onChange={onChange}
                        placeholder="disable resize"
                        style={{
                            height: 120,
                            resize: 'none',
                        }}
                    />
                </Flex>
                <button type="button" style={{ marginTop: '30px' }} className="btn btn-primary">Cập Nhật</button>

            </Form>
        </Col>
        <Col span={8} >
            <Form>
                <p>Cập Nhật Sản Phẩm Mới</p>
                <Flex vertical gap={32}>
                    <Input showCount maxLength={20} onChange={onChange} />
                    <TextArea showCount maxLength={100} onChange={onChange} placeholder="can resize" />
                    <TextArea
                        showCount
                        maxLength={100}
                        onChange={onChange}
                        placeholder="disable resize"
                        style={{
                            height: 120,
                            resize: 'none',
                        }}
                    />
                </Flex>
                <button type="button" style={{ marginTop: '30px' }} className="btn btn-primary">Cập Nhật</button>

            </Form>
        </Col>
    </Row>
</>
    )
} 
export default Bloxfruit;