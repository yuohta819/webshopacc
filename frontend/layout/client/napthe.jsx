import { useEffect, useState } from "react"
import "../../public/css/nap.css"
import "../../public/css/Hearder.css"
import { Link } from "react-router-dom"
import { RiMessengerFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
function Napthe() {
    const [check, setCheck] = useState(true)
    const [data, setData] = useState("")
    const host = import.meta.env.VITE_API_URL_BACKEND;
    const action = `${host}/napthe`
    const link = import.meta.env.VITE_FACEBOOK
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
            <form action="" onSubmit={handdleSubmit}>
                <div className="selection-nap">
                    <h2>Nạp Thẻ Cào</h2>
                    <div className="inner-wrap">
                        <div className="container">
                            <div className="row">
                                <div className="col-4">
                                    <div className="box-1">
                                        <div className="inner-box-1"><button><div className="stk" onClick={handdleCheck}>Qua Thẻ Cào</div></button></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4 new">
                                    <div className="content-1 content">
                                        <p>Loại Thẻ:
                                            <select name="type" id="" onChange={handdleChange} required style={{marginLeft: 60}}>
                                                <option value="Loại Thẻ" selected>--Loại Thẻ--</option>
                                                <option value="Mobifone" >--Mobine--</option>
                                                <option value="Viettel">--Vietell--</option>
                                                <option value="Vinaphone">--Vina--</option>
                                            </select>
                                        </p>
                                    </div>
                                    <div className="content-2 content" >
                                        <p>Số tiền:
                                            <select id="" style={{ marginLeft: 71 }} name="price" onChange={handdleChange} selected >
                                                <option value="--Số tiền--" selected >--Số tiền--</option>
                                                <option value="10.000" >--10.000đ--</option>
                                                <option value="20.000" >--20.000đ--</option>
                                                <option value="50.000" >--50.000đ--</option>
                                                <option value="100.000" >--100.000đ--</option>
                                                <option value="200.000" >--200.000đ--</option>
                                                <option value="500.000" >--500.000đ--</option>
                                            </select>
                                        </p>
                                    </div>
                                    <div className="content-2 content">
                                        <p style={{marginBottom: 0}}>Link Facebook: </p>
                                        <input type="text" onChange={handdleChange} name="link" required style={{marginLeft: 19}}/>
                                    </div>
                                    <div className="content-2 content" >
                                        <p>Số seri:</p>
                                        <input type="number" name="seri" onChange={handdleChange} required />
                                    </div>
                                    <div className="content-2 content"  >
                                        <p>Mã thẻ: </p>
                                        <input type="number" name="code" onChange={handdleChange} required />
                                    </div>
                                    <div className="warning"><p>Lưu ý:</p></div>
                                    <div className="content-3 content">
                                        <ul>
                                            <li>Khi nhập xong nhấn nút đã nạp bên dưới</li>
                                            <li>Không chấp nhận nhập sai mệnh giá thẻ </li>
                                            <li>Nếu có thắc mắc liên hệ facebook hoặc zalo dưới góc phải</li>
                                        </ul>
                                    </div>
                                    <div className="content-4">
                                        <button type="submit" className="btn btn-success" >Đã Nạp</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
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
export default Napthe