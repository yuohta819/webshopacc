import React, { useState, useEffect } from "react";
import { Form, Input, Checkbox, Button, Row, Col, Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;
import { ToastContainer, toast } from "react-toastify";
function ServicePage() {
  const [totalPrice, setTotalPrice] = useState(0);
  const host = import.meta.env.VITE_API_URL_BACKEND;
  const [data, setData] = useState("")
  const [bill, setBill] = useState([])
  const token = sessionStorage.getItem("token-account")
  const navigate = useNavigate()
  const action = `${host}/roblox/caythue`
  useEffect(() => {
    fetch(action)
      .then(res => res.json())
      .then(data => {
        setBill(data)
      })
  }, [])
  function handdleButton(e) {
    e.preventDefault()
    if (!token) {
      navigate("/dangnhap")
    } else {
      fetch(`${host}/updatebillcaythue/${totalPrice}/caythubloxfruit`, {
        method: "POST",
        headers: {
          Authorization: `${token}`,
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
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
          } else if (data == "Noprice") {
            toast.warning("Số tiền không đủ. Vui lòng nạp thêm", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          } else {
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
  function handdleChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value

    })
  }

  const handleCheckboxChange = (checkedValues) => {
    setData({
      ...data,
      [checkedValues.target.value._id]: checkedValues.target.value.type
    })
    if (checkedValues.target.checked) {
      setTotalPrice(totalPrice + parseInt(checkedValues.target.value.price));
    } else {
      setTotalPrice(totalPrice - parseInt(checkedValues.target.value.price));
    }
  };

  return (
    <>
      <form action="" onSubmit={handdleButton}>
        <div style={{ padding: "20px 160px" }}>
          <Row gutter={24}>
            {/* Thông tin người dùng */}
            <Col span={12}>
              <Card title="Thông tin người dùng">
                <Form layout="vertical">
                  <Form.Item label="Tài Khoản" name="account">
                    <Input placeholder="Tài Khoản" name="account" onChange={handdleChange} />
                  </Form.Item>
                  <Form.Item label="Mật Khẩu" name="password">
                    <Input.Password placeholder="Mật Khẩu" name="pass" onChange={handdleChange} />
                  </Form.Item>
                  <Form.Item>
                    <Input.TextArea
                      rows={3}
                      placeholder="Vui lòng không vào acc trong thời gian đơn đang thực hiện"
                    />
                  </Form.Item>
                </Form>
              </Card>
            </Col>

            {/* Gói dịch vụ */}
            <Col span={12} style={{

            }}>
              <Card title="Gói dịch vụ" style={{overflowY: "auto", maxHeight: "300px"}}>
                {bill.map((item, index) => (
                  <Checkbox.Group
                    style={{ width: "100%", display: "block" }}

                  >
                    <Row style={{ marginBottom: "8px" }}>
                      <Col span={24}>
                        <Checkbox value={item} onChange={handleCheckboxChange}>
                          {item.type} - <b>{item.price}k</b>
                        </Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                ))}
              </Card>
            </Col>
          </Row>

          <Row gutter={24} style={{ marginTop: "20px" }}>
            {/* Chi tiết dịch vụ */}
            <Col span={12}>
              <Card title="Chi tiết dịch vụ">
                <Text strong style={{ color: "red" }}>
                  LƯU Ý TRƯỚC KHI CÀY THUÊ ĐỂ TRÁNH GIÁN ĐOẠN QUÁ TRÌNH CÀY:
                </Text>
                <ul>
                  <li>Tắt xác minh 2 bước bằng cách thay mail ngẫu nhiên (không verify).</li>
                  <li>Không vào acc quá 3 lần khi admin đang cày.</li>
                  <li>Thời gian hoàn tất dịch vụ từ 1-5 ngày.</li>
                  <li>Vi phạm những điều trên thì shop sẽ dừng dịch vụ và không hoàn tiền.</li>
                </ul>
              </Card>
            </Col>

            {/* Thanh toán */}
            <Col span={12}>
              <Card>
                <Title level={5}>Báo giá: {totalPrice}k</Title>
                <Button type="primary" htmlType="submit" style={{ width: "100%", marginTop: "10px" }}>
                  Thanh Toán
                </Button>
              </Card>
            </Col>
          </Row>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}

export default ServicePage;
