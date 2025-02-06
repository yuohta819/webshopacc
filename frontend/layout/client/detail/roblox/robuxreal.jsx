import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const RobuxReal = () => {
  const handlePurchase = (id) => {
    console.log(`Mua gói Robux ID: ${id}`);
  };
  const host = import.meta.env.VITE_API_URL_BACKEND
  const action = `${host}/roblox/robuxreal`
  const [products, setProducts] = useState([])
  const token = sessionStorage.getItem("token-account")
  const navigate = useNavigate()
  const [totalPrice, setTotalPrice] = useState(0);
  function handdleButton(e) {
    e.preventDefault()
    if (!token) {
      navigate("/dangnhap")
    } else {
      fetch(`${host}/updatebillcaythue/${totalPrice}/RobuxReal`, {
        method: "POST",
        headers: {
          Authorization: `${token}`,
          "Content-type": "application/json"
        },
        body: JSON.stringify(products)
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
  useEffect(() => {
    fetch(action)
      .then(res => res.json())
      .then(data => {
        setProducts(data)
      })
  }, [])
  function handdleClick(e) {
    setTotalPrice(parseInt(e.currentTarget.title))
  }
  return (
    <>
      <form action="" onSubmit={handdleButton}>
        <div style={{ padding: "20px 180px"}}>
          <Row gutter={[16, 16]}>
            {products.map((product) => (
              <Col key={product._id} xs={24} sm={12} md={8} lg={6} xl={6} >
                {product.imgRobuxReal.map((item, index) => (
                  <Card
                    hoverable
                    style={{ borderRadius: "12px", overflow: "hidden",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"  }}
                    cover={
                      <img
                        src={item}
                        alt={product.name}
                        style={{ height: "150px", objectFit: "cover", padding: "17px", borderRadius: "25px" }}
                      />
                    }
                  >
                    <Card.Meta
                      title={<span style={{ fontWeight: "bold" }}>{product.name}</span>}
                      description={<span style={{ color: "#1890ff" }}>{product.price}đ</span>}
                    />
                    <Button color="pink" variant="solid" htmlType="submit" onClick={handdleClick} title={product.price} style={{ marginTop: 20 }}>
                      Mua Ngay
                    </Button>
                  </Card>
                ))}
              </Col>
            ))}
          </Row>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default RobuxReal;
