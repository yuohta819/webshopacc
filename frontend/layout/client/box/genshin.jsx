import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Pagination, Spin } from "antd";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion

function  BoxGenshin() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const host = import.meta.env.VITE_API_URL_BACKEND;

    useEffect(() => {
        fetch(`${host}/allgame`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    const check = data.filter((item) => item.name === "genshin");
                    setItems(check);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Lỗi khi fetch dữ liệu:", error);
                setLoading(false);
            });
    }, []);
    const paginatedItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <>
            <div className="img">
                <img src="https://shopsheep.net/assets/frontend/theme_5/image/png/acc-game.png" alt="" />
                <h3>Game Genshin Impact: </h3>
            </div>

            {loading ? (
                <Spin size="large" />
            ) : (
                <>
                    <Link to="/gamepass">
                        <div style={{ padding: "30px 130px" }}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                >
                                    <Row gutter={[16, 16]}>
                                        {paginatedItems.map((item, index) => (
                                            <Col key={index} xs={24} sm={12} md={8} lg={6}>
                                                <Card
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
                                            </Col>
                                        ))}
                                    </Row>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </Link>

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

export default BoxGenshin;
