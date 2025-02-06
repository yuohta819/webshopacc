import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Pagination, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion

function BoxLienminh() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const host = import.meta.env.VITE_API_URL_BACKEND;
    const navigate = useNavigate()
    useEffect(() => {
        fetch(`${host}/allgame`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    const check = data.filter((item) => item.name === "lienminh");
                    setItems(check);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Lỗi khi fetch dữ liệu:", error);
                setLoading(false);
            });
    }, []);
    function handdleClick(value, option) {
        navigate(`/lienminh/${value}`)
    }
    return (
        <>
            <div className="img">
                <img src="https://shopsheep.net/assets/frontend/theme_5/image/png/acc-game.png" alt="" />
                <h3>Game Liên Minh Huyền Thoại: </h3>
            </div>

            {loading ? (
                <Spin size="large" />
            ) : (
                <>
                        <div style={{ padding: "30px 130px" }}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                >
                                    <Row gutter={[16, 16]}>
                                        {items.map((item, index) => (
                                            <Col key={index} xs={24} sm={12} md={8} lg={6}>
                                                <button title={item.id} onClick={() => handdleClick(item._id)} style={{ border: 'white', background: 'white' }}><Card
                                                    hoverable
                                                    cover={<img alt={item.title} src={item.img} />}
                                                    style={{
                                                        borderRadius: "8px",
                                                        overflow: "hidden",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    <h3>{item.category}</h3>
                                                    <p>Giao dịch: {item.stock}</p>
                                                    <Button type="primary" style={{ marginTop: "10px" }}>
                                                        Mua Ngay
                                                    </Button>
                                                </Card>
                                                </button>
                                            </Col>
                                        ))}
                                    </Row>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                    <Pagination
                        current={currentPage}
                        total={items.length}
                        pageSize={itemsPerPage}
                        onChange={(page) => setCurrentPage(page)}
                        style={{ textAlign: "center", marginTop: "20px", display: "none" }}
                    />
                </>
            )}
        </>
    );
}

export default BoxLienminh;
