import React, { useEffect, useState } from "react";
import { Modal, Image, Button, Card, Row, Col, Typography, Tag } from "antd";
import "../../../../public/css/accountlienquan.css"
const { Title, Text } = Typography;
import { GiftOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function LienQuanAccount() {
    const [data, setData] = useState([])
    const host = import.meta.env.VITE_API_URL_BACKEND
    const admin = import.meta.env.VITE_ADMIN
    const locationn = location.pathname
    const action = `${host}${locationn}`
    const [check, setCheck] = useState(false)
    const [test, setTest] = useState(false)
    const [heros, setHeroes] = useState(false)
    const [ngoc, setNgoc] = useState(false)
    const token = sessionStorage.getItem("token-account")
    const navigate = useNavigate()
    useEffect(() => {
        fetch(action)
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
    }, [])
    function handdleButton(e) {
        if (!token) {
            navigate("/dangnhap")
        } else {
            fetch(`${host}/${admin}/updatebill/${e.currentTarget.value}/${e.currentTarget.name}/Lienquan`, {
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
    function handdleHero() {
        if (!heros) {
            setHeroes(true)
        } else {
            setHeroes(false)
        }
    }
    function handdleNgoc() {
        if (!ngoc) {
            setNgoc(true)
        } else {
            setNgoc(false)
        }
    }
    function handleClick() {
        if (!check) {
            setCheck(true)
        } else {
            setCheck(false)
        }
    }
    function handleTest() {
        if (!test) {
            setTest(true)
        } else {
            setTest(false)
        }
    }
    return (
        <>
            <div className="selection-2">
                {data.map((item, index) => (
                    <Card
                        key={index + 1}
                        style={{
                            maxWidth: 600,
                            margin: "20px auto",
                            padding: 20,
                            borderRadius: 12,
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <Row gutter={[16, 16]} align="middle">
                            {/* Ảnh bên trái */}
                            <Col span={8}>
                                <img
                                    key={index + 1}
                                    src={item.img_1[0]}// Thay đường dẫn này bằng URL ảnh của bạn
                                    alt="Liên Quân Account"
                                    style={{
                                        width: "100%",
                                        borderRadius: 12,
                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                    }}
                                />
                            </Col>

                            {/* Thông tin bên phải */}
                            <Col span={8}>
                                <Title level={4} style={{ textAlign: "center" }}>
                                    LIÊN QUÂN #{item.id}
                                </Title>
                                <Text>Mã: #{item.id}</Text>
                                <br />
                                <Text>Game: Liên Quân</Text>
                                <br />
                                <Text>
                                    Tình trạng: <Tag color="green">#{item.status}</Tag>
                                </Text>
                                <br />
                                <Text>Tướng: <b>{item.tuong}</b> </Text>
                                <Text>Skin: <b>{item.skin}</b></Text>
                                <br />
                                <Text>Ngọc III: <b>{item.ngoc}</b> </Text>
                                <Text>Rank mùa trước: <b>{item.rank}</b></Text>
                                <br />
                                <Text>Tỉ lệ thắng: <b>{item.win}</b> </Text>
                                <Text>Thẻ đổi tên: <b>{item.name}</b></Text>
                                <br />
                                <Text>Số trận: <b>{item.digit}</b> </Text>
                                <Text>Uy tín: <b>{item.rep}</b></Text>
                                <br />
                            </Col>
                            <Col span={8}>
                                <div className="box">
                                    <Card
                                        type="inner"
                                        title={
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <GiftOutlined style={{ marginRight: 8, color: "#d32029" }} />
                                                <Text strong>Lưu ý trước khi mua</Text>
                                            </div>
                                        }
                                        style={{ border: "1px solid #d32029", backgroundColor: "#fff5f5" }}
                                    >
                                        <div style={{ padding: "16px", color: "#595959" }}>
                                            <Text strong style={{ color: "#d32029" }}>
                                                GIAO DỊCH DUY NHẤT
                                            </Text>
                                            <ul>
                                                <li>
                                                    <Text>+ MB Bank (MB).</Text>
                                                </li>
                                                <li>
                                                    <Text>+ STK: 1235978496</Text>
                                                </li>
                                                <li>
                                                    <Text>+ Tên chủ: yuohta</Text>
                                                </li>
                                            </ul>

                                            <ul style={{ marginTop: 16 }}>
                                                <li>
                                                    Miễn phí thay đổi thông tin khi mua acc. Liên hệ shop để được hỗ trợ.
                                                </li>
                                                <li>Không phát sinh thêm chi phí. Bán đúng giá đã ghi trên shop.</li>
                                                <li>Không giao dịch qua Facebook để tránh lừa đảo.</li>
                                                <li>
                                                    Cọc giữ acc từ 30%-50% giá trị acc cần cọc (liên hệ zalo shop để hỗ
                                                    trợ chi tiết hơn).
                                                </li>
                                                <li>
                                                    Mua góp đưa trước từ 50%-70% (góp đủ tiền mới giao acc nhé).
                                                </li>
                                                <li>
                                                    Lưu ý: Cọc giữ acc và mua góp áp dụng cho acc từ giá 500K trở lên.
                                                </li>
                                            </ul>
                                        </div>
                                    </Card>
                                </div>
                            </Col>
                        </Row>


                        {/* Các nút chức năng */}
                        <Row gutter={[8, 8]} style={{ marginTop: 20 }}>
                            <Col span={6}>
                                <Button type="primary" block onClick={handleClick}>
                                    XEM TÚI ĐỒ
                                </Button>
                                {check ? (
                                    <div>
                                        <Modal
                                            style={{ textAlign: "center" }}
                                            title={<Text strong style={{ margin: "20px 0" }}>CHI TIẾT TÚI ĐỒ</Text>}
                                            open={check}
                                            onCancel={handleClick}
                                            footer={null}
                                            width={800}
                                        >
                                            <div style={{ textAlign: "center" }}>
                                                <Image
                                                    src={item.img_1[1]}
                                                    alt="Hình ảnh túi đồ 1"
                                                    style={{ marginBottom: "16px" }}
                                                />
                                                <Text>Liên Quân #{item.id} - Hình ảnh túi đồ</Text>
                                                <br />
                                                <Image
                                                    src={item.img_1[2]}
                                                    alt="Hình ảnh túi đồ 2"
                                                    style={{ marginTop: "16px", marginBottom: "16px" }}
                                                />
                                                <Text>Liên Quân #{item.id} - Hình ảnh túi đồ</Text>
                                            </div>
                                        </Modal>
                                    </div>
                                ) : null}
                            </Col>
                            <Col span={6}>
                                <Button type="primary" block onClick={handleTest}>
                                    XEM SKIN
                                </Button>
                                {test ? (
                                    <div>
                                        <Modal
                                            title={<Text strong>CHI TIẾT TRANG PHỤC</Text>}
                                            style={{ textAlign: "center" }}
                                            open={test}
                                            onCancel={handleTest}
                                            footer={null}
                                            width={800}
                                        >
                                            <div style={{ textAlign: "center" }}>
                                                <Image
                                                    src={item.img_1[3]}
                                                    alt="Hình ảnh trang phục 3"
                                                    style={{ marginBottom: "16px" }}
                                                />
                                                <Text>Liên Quân #{item.id} - Hình ảnh trang phục</Text>
                                                <br />
                                                <Image
                                                    src={item.img_1[4]}
                                                    alt="Hình ảnh trang phục 4"
                                                    style={{ marginTop: "16px", marginBottom: "16px" }}
                                                />
                                                <Text>Liên Quân #{item.id} - Hình ảnh trang phục</Text>
                                                <Image
                                                    src={item.img_1[5]}
                                                    alt="Hình ảnh trang phục 5"
                                                    style={{ marginTop: "16px", marginBottom: "16px" }}
                                                />
                                                <Text>Liên Quân #{item.id} - Hình ảnh trang phục</Text>
                                                <Image
                                                    src={item.img_1[6]}
                                                    alt="Hình ảnh trang phục 6"
                                                    style={{ marginTop: "16px", marginBottom: "16px" }}
                                                />
                                                <Text>Liên Quân #{item.id} - Hình ảnh trang phục</Text>
                                                <Image
                                                    src={item.img_1[7]}
                                                    alt="Hình ảnh trang phục 7"
                                                    style={{ marginTop: "16px", marginBottom: "16px" }}
                                                />
                                                <Text>Liên Quân #{item.id} - Hình ảnh trang phục</Text>
                                            </div>
                                        </Modal>
                                    </div>
                                ) : null}
                            </Col>
                            <Col span={6}>
                                <Button type="primary" block onClick={handdleHero}>
                                    XEM TƯỚNG
                                </Button>
                                {heros ? (
                                    <div>
                                        <Modal
                                            title={<Text strong>CHI TIẾT TRANG PHỤC</Text>}
                                            style={{ textAlign: "center" }}
                                            open={heros}
                                            onCancel={handdleHero}
                                            footer={null}
                                            width={800}
                                        >
                                            <div style={{ textAlign: "center" }}>
                                                <br />
                                                <Image
                                                    src={item.img_1[9]}
                                                    alt="Hình ảnh tướng 4"
                                                    style={{ marginTop: "16px", marginBottom: "16px" }}
                                                />
                                                <Text>Liên Quân #{item.id} - Hình ảnh tướng</Text>
                                                <Image
                                                    src={item.img_1[10]}
                                                    alt="Hình ảnh tướng 5"
                                                    style={{ marginTop: "16px", marginBottom: "16px" }}
                                                />
                                                <Text>Liên Quân #{item.id} - Hình ảnh tướng</Text>

                                            </div>
                                        </Modal>
                                    </div>
                                ) : null}
                            </Col>
                            <Col span={6}>
                                <Button type="primary" block onClick={handdleNgoc}>
                                    XEM NGỌC
                                </Button>
                                {ngoc ? (
                                    <div>
                                        <Modal
                                            title={<Text strong>CHI TIẾT TRANG PHỤC</Text>}
                                            style={{ textAlign: "center" }}
                                            open={ngoc}
                                            onCancel={handdleNgoc}
                                            footer={null}
                                            width={800}
                                        >
                                            <div style={{ textAlign: "center" }}>
                                                <Image
                                                    src={item.img_1[11]}
                                                    alt="Hình ảnh ngọc"
                                                    style={{ marginBottom: "16px" }}
                                                />
                                                <Text>Liên Quân #{item.id} - Hình ảnh ngọc</Text>
                                            </div>
                                        </Modal>
                                    </div>
                                ) : null}
                            </Col>
                        </Row>

                        {/* Giá và nút mua */}
                        <div style={{ textAlign: "center", marginTop: 30 }}>
                            <Title level={3} style={{ color: "#d32f2f" }}>
                                {item.price}đ
                            </Title>
                            <Text delete>616,000đ</Text>
                            <Tag color="red" style={{ marginLeft: 8 }}>
                                -53%
                            </Tag>
                            <div style={{ marginTop: 20 }}>
                                <Button type="primary" size="large" style={{ background: "#d32f2f", border: "none" }} name={item.id} value={item.price} onClick={handdleButton}>
                                    MUA & NHẬN ACC (Giao dịch tự động)
                                </Button>
                            </div>
                            <div style={{ marginTop: 20 }}>
                                <Button size="large" type="dashed">
                                    Zalo: 0931 881 502
                                </Button>
                            </div>
                        </div>
                        <Card type="inner" title="Lưu ý trước khi mua">
                            <ul>
                                <li>Miễn phí thay đổi thông tin khi mua acc.</li>
                                <li>Không phát sinh thêm chi phí. Bán đúng giá đã ghi trên shop.</li>
                                <li>Không giao dịch qua Facebook để tránh lừa đảo.</li>
                                <li>
                                    Cọc giữ acc từ 30%-50% giá trị acc cần cọc (liên hệ shop để hỗ trợ
                                    chi tiết hơn).
                                </li>
                                <li>
                                    Mua góp đưa trước từ 50%-70% (góp đủ tiền mới giao acc nhé).
                                </li>
                            </ul>
                        </Card>
                    </Card>
                ))}
            </div>
            <ToastContainer />
        </>
    );
}

export default LienQuanAccount;
