import React, { useEffect, useState } from "react";
import { Row, Col, Card, Badge, Typography, Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Đảm bảo đã cài thư viện này
const { Meta } = Card;

function AnimeDefents() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const host = import.meta.env.VITE_API_URL_BACKEND;
  const [bill, setBill] = useState([]);
  const token = sessionStorage.getItem("token-account");
  const navigate = useNavigate();
  const action = `${host}/roblox/animedefenders`;

  useEffect(() => {
    fetch(action)
      .then((res) => res.json())
      .then((data) => {
        setBill(data);
      });
  }, []);

  // Xử lý xác nhận mua hàng
  const handleConfirmBuy = (e) => {
    e.preventDefault()
    if (!token) {
      navigate("/dangnhap");
    } else {
      fetch(`${host}/updatebillcaythue/${totalPrice}/animedefenders`, {
        method: "POST",
        headers: {
          Authorization: `${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(selectedCharacter),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if (data === "Error") {
            toast.error("❌ Lỗi!", { position: "top-right", autoClose: 3000 });
          } else if (data === "Noprice") {
            toast.warning("⚠️ Số tiền không đủ. Vui lòng nạp thêm!", {
              position: "top-right",
              autoClose: 3000,
            });
          } else {
            toast.success("✅ Thanh toán thành công!", {
              position: "top-right",
              autoClose: 3000,
            });
            setTimeout(() => {
              navigate(`/`);
            }, 2000);
          }
        });
    }
    setIsModalOpen(false);
  };
  // Mở modal khi nhấn "Mua"
  const showModal = (character) => {
    setTotalPrice(parseInt(character.price))
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  return (
    <form action="" onSubmit={handleConfirmBuy}>
        <div style={{ padding: "24px 206px", backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      <Row gutter={[16, 16]}>
        {bill.map((item) => (
          <Col key={item._id} xs={12} sm={12} md={8} lg={6} >
            <Badge.Ribbon
              text="🔥 Best Seller"
              color="red"
              style={{ display: item.bestValue ? "block" : "none" }}
            >
              {item.img.map((element, index) => (
                <Card
                key={index+1}
                  hoverable
                  cover={<img alt={item.name} src={element} style={{ borderRadius: "10px" }} />}
                  style={{
                    borderRadius: "12px",
                    padding: "20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <Meta title={<span style={{ fontSize: "18px", fontWeight: "bold" }}>{item.name}</span>} />
                  <p style={{ marginTop: "15px", fontSize: "16px", color: "#ff4d4f", fontWeight: "bold" }}>
                    Giá: {item.price.toLocaleString()}đ
                  </p>
                  <Button
                    type="primary"
                    danger
                    htmlType="submit"
                    value={item.price}
                    size="large"
                    style={{
                      width: "100%",
                      fontWeight: "bold",
                      backgroundColor: "#ff4d4f",
                      borderColor: "#ff4d4f",
                      borderRadius: "8px",
                    }}
                    onClick={() => showModal(item)}
                  >
                    🛒 Mua ngay
                  </Button>
                </Card>
              ))}
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>

      {/* Modal xác nhận mua hàng */}
      <Modal
        title="🎯 Xác nhận mua hàng"
        open={isModalOpen}
        onOk={handleConfirmBuy}
        onCancel={() => setIsModalOpen(false)}
        okText="✅ Xác nhận"
        cancelText="❌ Hủy"
        centered
        styles={{ fontSize: "16px", fontWeight: "bold", textAlign: "center" }}
        okButtonProps={{
          style: { backgroundColor: "#52c41a", borderColor: "#52c41a", fontWeight: "bold" },
        }}
        cancelButtonProps={{
          style: { fontWeight: "bold" },
        }}
      >
        {selectedCharacter && (
          <p>
            Bạn có chắc chắn muốn mua <span style={{ color: "#ff4d4f" }}>{selectedCharacter.name}</span> với giá{" "}
            <span style={{ color: "#52c41a" }}>{selectedCharacter.price.toLocaleString()}đ</span> không?
          </p>
        )}
      </Modal>
    </div>
    </form>
  );
}

export default AnimeDefents;
