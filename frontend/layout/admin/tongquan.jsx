import React, { useState, useEffect } from "react";
import { Card, Col, Row, Spin } from "antd";
import { Line } from "@ant-design/plots";

const Tongquan = () => {
  const host = import.meta.env.VITE_API_URL_BACKEND;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const admin = import.meta.env.VITE_ADMIN;

  useEffect(() => {
    fetch(`${host}/${admin}/dothi`)
      .then((res) => res.json())
      .then((data) => {
        // Chuyển đổi dữ liệu thành mảng các đối tượng thích hợp cho đồ thị
        const chartData = Object.entries(data[0]).map(([key, value]) => ({
          month: key, // Tên game
          value: value, // Giá trị của game
        }));
        setData(chartData);
        setLoading(false); // Dừng loading khi có dữ liệu
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu:", error);
        setLoading(false); // Dừng loading nếu có lỗi
      });
  }, [host, admin]);

  // Cấu hình đồ thị
  const config = {
    data,
    xField: "month", // Sử dụng tên game làm trục x
    yField: "value", // Sử dụng giá trị làm trục y
    label: {},
    point: {
      size: 5,
      shape: "diamond",
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: "#000",
          fill: "red",
        },
      },
    },
    interactions: [{ type: "marker-active" }],
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      <h1 style={{ color: "black", textAlign: "center", marginBottom: "20px" }}>
        Đồ Thị Game
      </h1>

      {/* Hiển thị Spinner khi đang tải */}
      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
      ) : (
        <Row gutter={[16, 16]} justify="center" style={{ marginBottom: "40px" }}>
          <Col span={24}>
            <Line {...config} />
          </Col>
        </Row>
      )}

      <Row gutter={[16, 16]} justify="center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card
            hoverable
            style={{ borderRadius: "12px", backgroundColor: "#1e1e1e", color: "white", textAlign: "center" }}
          >
            <Card.Meta style={{ color: "white" }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Tongquan;
