import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Button, Tag, List } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const { Title, Text } = Typography;

function FreeFireAccount() {
    const [data, setData] = useState([])
    const host = import.meta.env.VITE_API_URL_BACKEND
    const admin = import.meta.env.VITE_ADMIN
    const locationn = location.pathname
    const [mainImage, setMainImage] = useState("");
    const action = `${host}${locationn}`
    const token = sessionStorage.getItem("token-account")
    const navigate = useNavigate()
    useEffect(() => {
        fetch(action)
            .then(res => res.json())
            .then(data => {
                setData(data)
                if (data.length > 0 && data[0].imng_1?.length > 0) {
                    setMainImage(data[0].imng_1[0]);
                }
            })
    }, [])
    function handdleButton(e) {
            if (!token) {
                navigate("/dangnhap")
            } else {
                fetch(`${host}/${admin}/updatebill/${e.currentTarget.value}/${e.currentTarget.name}/freefire`, {
                    method: "POST",
                    headers: {
                        Authorization: `${token}`,
                        "Content-type": "application/json"
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data == "Error") {
                            toast.success("Lỗi!", {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                            });
                        } else if (data=="Noprice") {
                            toast.warning("Số tiền không đủ. Vui lòng nạp thêm", {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                            });
                        }else {
                            toast.success("Thanh toán thành công!", {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                            });
                            setTimeout(() => {
                                navigate(`/`)
                            }, 2000)
                        }
                    })
    
            }
        }
    return (
        <>
        <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
            {data.map((item, index) => (
                <Row gutter={16} style={{ maxWidth: 1200, width: "100%",  }} key={index + 1}>
                     <Col span={6}>
                        <Card>
                            <List
                            style={{
                                overflow: "auto",
                                maxHeight: "400px",
                            }}
                                dataSource={item.img_1 || []} // Đảm bảo thumbnails là mảng
                                renderItem={(thumbnail, thumbnailIndex) => (
                                    <List.Item key={thumbnailIndex}>
                                        <img
                                            src={thumbnail}
                                            alt={`Thumbnail ${thumbnailIndex}`}
                                            onClick={() => setMainImage(thumbnail)} // Sự kiện click thay đổi ảnh lớn
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                                objectFit: "cover",
                                                cursor: "pointer",
                                                border: "1px solid #d9d9d9",
                                                borderRadius: 8,
                                                transition: "transform 0.2s ease", // Hiệu ứng hover
                                            }}
                                            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                                            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>

                    {/* Khu vực hình ảnh chính */}
                    <Col span={10}>
                        <Card>
                            <div style={{ textAlign: "center" }}>
                                <img
                                    src={mainImage || item.img_1[0]} // Hiển thị ảnh lớn
                                    alt="Main Image"
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        borderRadius: 10,
                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                    }}
                                />
                                <div style={{ marginTop: 16 }}>
                                    <Title level={4}>{item.title || "Thẻ Thử Nhân Vật"}</Title>
                                    <Text>
                                        {item.description || "Bạn có thể thử tất cả nhân vật bây giờ."}
                                    </Text>
                                    <div style={{ marginTop: 8 }}>
                                        <Text strong style={{ color: "#1890ff" }}>
                                            {item.duration || "3 ngày"}
                                        </Text>
                                    </div>
                                </div>
                                <div style={{ marginTop: 16 }}>
                                    <Button type="primary" style={{ width: 150 }}>
                                        Đến
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    {/* Khu vực thông tin bên phải */}
                    <Col span={6}>
                        <Card>
                            <Title level={3}>{item.name}</Title>
                            <Text strong>Mã số: #UQ1555587</Text>
                            <div style={{ marginTop: 16 }}>
                                <Row gutter={[16, 16]}>
                                    <Col span={8}>
                                        <Text>Skin Súng:</Text>
                                    </Col>
                                    <Col span={16}>
                                        <Text strong>{item.skin}</Text>
                                    </Col>
                                    <Col span={9}>
                                        <Text>Thẻ Vô Cực:</Text>
                                    </Col>
                                    <Col span={8}>
                                        <Text strong>{item.vocuc}</Text>
                                    </Col>
                                    <Col span={8}>
                                        <Text>Mức Rank:</Text>
                                    </Col>
                                    <Col span={16}>
                                        <Tag color="blue">{item.rank}</Tag>
                                    </Col>
                                </Row>
                            </div>
                            <div style={{ marginTop: 40, textAlign: "center" }}>
                                <Title level={2} style={{ color: "#d32f2f" }}>
                                   {item.ATM}đ
                                </Title>
                                <Text delete>{item.price}đ</Text>
                                <Tag color="red" style={{ marginLeft: 8 }}>
                                    {(parseInt(item.price)/parseInt(item.ATM)).toFixed((2))}%
                                </Tag>
                            </div>
                            <div style={{ marginTop: 20, textAlign: "center" }}>
                                <Button
                                    type="primary"
                                    value={item.ATM}
                                    name={item.id}
                                    onClick={handdleButton}
                                    style={{ backgroundColor: "#d32f2f", borderColor: "#d32f2f", width: "100%", marginTop: 47 }}
                                >
                                    Mua Ngay
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            ))}
        </div>
        <ToastContainer />
        </>
        
    );
}

export default FreeFireAccount;
