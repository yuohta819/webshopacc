
import { useState } from "react"
import "../../public/css/nap.css"
import "../../public/css/Hearder.css"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import { RiMessengerFill } from "react-icons/ri";
function NapATM() {
    const [check, setCheck] = useState(true)
    const [data, setData] = useState("")
    const host = import.meta.env.VITE_API_URL_BACKEND;
    const action = `${host}/napatm`
    const link = import.meta.env.VITE_FACEBOOK
    const navigate = useNavigate()
    const token = sessionStorage.getItem("token-account")
    function handdleSubmit(e) {
        e.preventDefault()
        fetch(action, {
            method: "POST",
            headers: {
                Authorization: `${token}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data == "fail") {
                    toast.warning("Nạp thẻ thất bại! ", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
                else if (data === "success") {
                    toast.success("Nạp thẻ thành công! Đang chờ xử lí", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    setTimeout(() => {
                        navigate("/")
                    }, 5000)
                }
            })
    }
    function handdleChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    function handdleCheck() {
        if (check) {
            setCheck(false)
        } else {
            setCheck(true)
        }
    }
    return (
        <>
            <div className="selection-nap">
                <h2>Nạp Thẻ Qua ATM</h2>
                <div className="inner-wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-4">
                                <div className="box-1">
                                    <div className="inner-box-1"><button><div className="stk" onClick={handdleCheck}>Qua Số Tài Khoản</div></button></div>
                                    <div className="inner-box-2"><button><div className="qr" onClick={handdleCheck}>Qua mã QR</div></button></div>
                                </div>
                            </div>
                        </div>
                        <form action="" onSubmit={handdleSubmit}>
                            {check ? (
                                <div className="row">
                                    <div className="col-4 new">
                                        <div className="content-1 content">
                                            <p>Loại ngân hàng:
                                                <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-VietinBank-CTG-Ori.png" alt="" />
                                            </p>
                                            <p>VietinBank</p>
                                        </div>
                                        <div className="content-2 content">
                                            <p>Số tài khoản:</p>
                                            <p>105879241100</p>
                                        </div>
                                        <div className="content-2 content" >
                                            <p style={{ marginBottom: 0 }}>Số tiền:</p>
                                            <input type="text" onChange={handdleChange} name="price" placeholder="Số tiền" />
                                        </div>
                                        <div className="content-2 content">
                                            <p>Nội dung chuyển khoản:</p>
                                            <p>Tên tài khoản + Số tiền + Ngân Hàng</p>
                                        </div>
                                        <div className="content-2 content">
                                            <textarea style={{ width: '100%', padding: 20 }} name="node" id="" placeholder="Vui lòng nhập nội dung chuyển khoản vào đây" onChange={handdleChange} required></textarea>
                                        </div>
                                        <div className="content-2 content">
                                            <p>Tên tài khoản: </p>
                                            <p>LE TAN LOC</p>
                                        </div>
                                        <div className="content-2 content">
                                            <p style={{ marginBottom: 0 }}>Link Facebook: </p>
                                            <input type="text" onChange={handdleChange} name="link" required />
                                        </div>
                                        <div className="warning"><p>Lưu ý:</p></div>
                                        <div className="content-3 content">
                                            <ul>
                                                <li>Khi chuyển xong nhấn nút đã chuyển bên dưới</li>
                                                <li>Không chấp nhận chuyển sai tài khoản</li>
                                                <li>Nếu có thắc mắc liên hệ facebook hoặc zalo dưới góc phải</li>
                                            </ul>
                                        </div>
                                        <div className="content-4">
                                            <button type="submit" className="btn btn-success">Đã Chuyển</button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="row">
                                    <div className="col-4 new">
                                        <div className="content-1 content">
                                            <p>Loại ngân hàng:
                                                <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-VietinBank-CTG-Ori.png" alt="" />
                                            </p>
                                            <p>VietinBank</p>
                                        </div>
                                        <div className="content-2 content img">
                                            <img src="/img/z6274174826872_381560d28e9c3f9340fd3d44b50a4a42.jpg" alt="" />
                                        </div>
                                        <div className="content-2 content">
                                            <p>Tên tài khoản: </p>
                                            <p>LE TAN LOC</p>
                                        </div>
                                        <div className="content-2 content" >
                                            <p style={{ marginBottom: 0 }}>Số tiền:</p>
                                            <input type="text" onChange={handdleChange} name="price" placeholder="Số tiền" />
                                        </div>
                                        <div className="content-2 content">
                                            <p>Nội dung chuyển khoản:</p>
                                            <p>Tên tài khoản + Số tiền + Ngân Hàng</p>
                                        </div>
                                        <div className="content-2 content">
                                            <textarea required style={{ width: '100%', padding: 20 }} name="node" id="" placeholder="Vui lòng nhập nội dung chuyển khoản vào đây" onChange={handdleChange}></textarea>
                                        </div>
                                        <div className="content-2 content">
                                            <p style={{ marginBottom: 0 }}>Link Facebook: </p>
                                            <input type="text" onChange={handdleChange} name="link" required style={{ marginLeft: 20 }} />
                                        </div>
                                        <div className="warning"><p>Lưu ý:</p></div>
                                        <div className="content-3 content">

                                            <ul>
                                                <li>Khi chuyển xong nhấn nút đã chuyển bên dưới</li>
                                                <li>Không chấp nhận chuyển sai tài khoản</li>
                                                <li>Nếu có thắc mắc liên hệ facebook hoặc zalo dưới góc phải</li>
                                            </ul>
                                        </div>
                                        <div className="content-4">
                                            <button type="submit" className="btn btn-success">Đã Chuyển</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </form>

                    </div>
                </div>
            </div>
            <Link to={`${link}`}>
                <div className="selection-5" >
                    <RiMessengerFill />
                </div>
            </Link>
            <div className="selection-end">
                <p>© Copyright 2023 - Privacy Policy - Terms of Service</p>
                <p>Operated by Loc Tram Cam, All Rights Reserved</p>
            </div>
            <ToastContainer />
        </>
    )
}
export default NapATM