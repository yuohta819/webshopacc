import "../../public/css/Login.css"
import { Link, Outlet } from "react-router-dom"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdOutlineSubtitles } from "react-icons/md";
import { MdAccountBox } from "react-icons/md";
import { CgPassword } from "react-icons/cg";

function Singup() {
    const [data, setData] = useState("")
    const [result, setResult] = useState("error")
    const host = import.meta.env.VITE_API_URL_BACKEND;
    const action = `https://webshopacc.vercel.app/signup`
    const navigate = useNavigate()
    function handdleSubmit(e) {
        e.preventDefault()
        fetch(action, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data === "success") {
                    toast.success("Tạo tài khoản thành công!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    setTimeout(() => {
                        navigate("/dangnhap")
                    }, 5000)
                } else if (data === "Ton tai") {
                    toast.warning("Tài khoản đã tồn tại! ", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }

            })
        
    }
    function handdleChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <div className="selection-1-login">
                <div className="selection-2-login">
                    <div className="container">
                        <div className="row">
                            <div className="col-6 img">
                                <img src="https://inkythuatso.com/uploads/thumbnails/800/2022/04/hinh-anh-anime-ngau-loi-16-29-15-02-33.jpg" alt="" />
                            </div>
                            <div className="col-6 loggin">
                                <form action="" onSubmit={handdleSubmit}>
                                    <h2>Đăng Kí</h2>
                                    <div className="account">
                                        <MdDriveFileRenameOutline />
                                        <input type="text" placeholder="Họ Và tên" name="name" onChange={handdleChange} required />
                                    </div>
                                    <div className="account">
                                        <MdOutlineSubtitles />
                                        <input type="text" placeholder="Nickname" name="nickname" onChange={handdleChange} required />
                                    </div>
                                    <div className="account">
                                        <MdAccountBox />
                                        <input type="text" placeholder="Tài khoản" name="account" onChange={handdleChange} required />
                                    </div>
                                    <div className="password">
                                        <CgPassword />
                                        <input type="password" placeholder="Mật Khẩu" name="pass" onChange={handdleChange} required />
                                    </div>
                                    <div className="login">
                                        <button type="submit" className="btn btn-primary">Đăng Kí</button>
                                    </div>
                                    <div className="singup">
                                        <Link to={"/quenmatkhau"}>Quên mật khẩu ?</Link>
                                    </div>
                                    <div className="singup">
                                        <Link to={"/dangnhap"}><button type="button" className="btn btn-secondary">Đăng Nhập</button></Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
export default Singup