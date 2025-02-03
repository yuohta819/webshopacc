import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';

function Box() {
    const items = [
        {
            title: 'Robux 120h Gamepass',
            transactions: '0',
            imgSrc: 'https://cdn3.upanh.info/upload/server-sw3/images/T%E1%BA%BFt/D%E1%BB%8Bch%20v%E1%BB%A5/Robux%20120h%20Gamepass.png',
        },
        {
            title: 'Toilet Tower Defense',
            transactions: '0',
            imgSrc: 'https://cdn3.upanh.info/upload/server-sw3/images/T%E1%BA%BFt/D%E1%BB%8Bch%20v%E1%BB%A5/Ban%20Unot%20Skipidi%20tower%20Defense.png',
        },
        {
            title: 'Bán Trái Ác Quỷ Rương',
            transactions: '0',
            imgSrc: 'https://cdn3.upanh.info/upload/server-sw3/images/T%E1%BA%BFt/D%E1%BB%8Bch%20v%E1%BB%A5/Ban%20Trai%20Ac%20Qu%E1%BB%B7%20Ruong.png',
        },
        {
            title: 'Bán Robux Chính Hãng',
            transactions: '0',
            imgSrc: 'https://cdn3.upanh.info/upload/server-sw3/images/T%E1%BA%BFt/D%E1%BB%8Bch%20v%E1%BB%A5/Ban%20Robux%20Chinh%20Hang.png',
        },
        {
            title: 'Game Anime Defenders',
            transactions: '0',
            imgSrc: 'https://cdn3.upanh.info/upload/server-sw3/images/T%E1%BA%BFt/D%E1%BB%8Bch%20v%E1%BB%A5/Ban%20Item%20Anime%20Defenders.png',
        },
    ];
    
    return (
        <>
            <div className="img">
                <img src="https://shopsheep.net/assets/frontend/theme_5/image/png/acc-game.png" alt="" />
                <h3>Dịch vụ game: </h3>
            </div>
            <Link to="/gamepass">
                <div style={{ padding: '30px 130px' }}>
                    <Row gutter={[16, 16]}>
                        {items.map((item, index) => (
                            <Col key={index} xs={24} sm={12} md={8} lg={6}>
                                <Card
                                    hoverable
                                    cover={<img alt={item.title} src={item.imgSrc} />}
                                    style={{
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        textAlign: 'center',
                                    }}
                                >
                                    <h3>{item.title}</h3>
                                    <p>Giao dịch: {item.transactions}</p>
                                    <Button type="primary" style={{ marginTop: '10px' }}>
                                        Mua Ngay
                                    </Button>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Link>
        </>
    )
}
export default Box