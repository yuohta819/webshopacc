import React from 'react';
import { Col, Row } from 'antd';
import "../../public/css/sidebar.css"
function SideBar() {
    return (
        <div
            className="sidebar-container"
            style={{ backgroundColor: "#f4f6fa", padding: "65px 124px" }}
        >
            <div className="sidebar-end">
                <Row gutter={16} style={{ justifyContent: 'space-around' }}>
                    {/* Logo và thông tin */}
                    <Col span={6} style={{ background: 'white', padding: '20px', borderRadius: "30px" }} >
                        <div style={{ textAlign: "center" }}>
                            <img
                                src="https://e7.pngegg.com/pngimages/779/61/png-clipart-logo-idea-cute-eagle-leaf-logo-thumbnail.png"
                                alt="Logo"
                                style={{ marginBottom: "10px", width: '50px' }}
                            />
                            <p style={{ fontSize: "14px", color: "#555" }}>
                                ShopgameChipChip.net - shop chính thức của Lộc Trầm Cảm & Phạm Khải là website nạp robux chính
                                hãng, robux 120h uy tín, tự động. Bán acc Roblox all game (blox
                                fruit, shindo life,...), lỗi 1 đổi 1 hoàn tiền 100%. Cày thuê nhanh
                                chóng, an toàn. Uy tín với 100k giao dịch thành công mỗi ngày.
                            </p>
                        </div>
                    </Col>

                    {/* Thông tin chung */}
                    <Col span={6} style={{ background: 'white', padding: '20px', borderRadius: "30px" }} >
                        <h3 style={{ fontWeight: "bold" }}>THÔNG TIN CHUNG</h3>
                        <ul style={{ listStyle: "disc", paddingLeft: "20px" }}>
                            <li>Về chúng tôi</li>
                            <li>Chính sách bảo mật</li>
                            <li>Điều khoản sử dụng</li>
                            <li>Chính sách bán hàng</li>
                            <li>Chính sách đổi trả</li>
                            <li>Hướng dẫn nạp tiền vào web</li>
                        </ul>
                    </Col>

                    {/* Sản phẩm */}
                    <Col span={6} style={{ background: 'white', padding: '20px', borderRadius: "30px" }} >
                        <h3 style={{ fontWeight: "bold" }}>SẢN PHẨM</h3>
                        <ul style={{ listStyle: "disc", paddingLeft: "20px" }}>
                            <li>Robux chính hãng</li>
                            <li>Robux 5 ngày (120h)</li>
                            <li>Mua Gamepass Blox Fruit</li>
                            <li>Cày thuê Blox Fruit</li>
                            <li>Acc Roblox giá rẻ</li>
                            <li>Vòng quay robux</li>
                            <li>Shop acc Valorant shoprito.com</li>
                        </ul>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default SideBar;