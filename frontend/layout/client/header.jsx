
import "../../public/css/Hearder.css"
import { CiMenuBurger } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { IoPeopleSharp } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TiHomeOutline } from "react-icons/ti";
import { FaRegAddressCard } from "react-icons/fa";
import { IoIdCardOutline } from "react-icons/io5";
import { BsShopWindow } from "react-icons/bs";
import { AiOutlineShop } from "react-icons/ai";
import { RiBillLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import TrangChu from "./Trangchu";
import React from 'react';
import { Col, Divider, Row } from 'antd';
function Header() {
    const navigate = useNavigate()
    const [data, setData] = useState("")
    const [check, setCheck] = useState(true)
    const [click, setClick] = useState(false)
    const host = import.meta.env.VITE_API_URL_BACKEND;
    function handdleLogin() {
        navigate(`/dangnhap`)
    }
    const token = sessionStorage.getItem("token-account")
    useEffect(() => {
        const action = `${host}/users`
        try {
            fetch(action, {
                method: "GET",
                headers: {
                    Authorization: `${token}`,
                    "Content-type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data == "error") {
                        sessionStorage.clear()
                    } else {
                        setData(data)
                    }
                })
        } catch (error) {
            console.log("error")
        }
    }, [])
    useEffect(() => {
        if (token) {
            setCheck(false)
        }
    }, [check])
    function handdleClick() {
        setClick(true)
    }
    function handdleLeave() {
        setClick(false)
    }
    function handdleLogout() {
        sessionStorage.clear()
        window.location.reload()
    }
    function handdleCheck() {
        if (!token) {
            navigate("/dangnhap")
        } else {
            navigate("/napatm")
        }

    }
    return (
        <>
            <div className="selection-1" style={{ background: 'white' }}>
                <div className="container">
                    <div className="row">
                        <div className="inner-wrap">
                            <div className="col-1">
                                <div className="logo">
                                    <img src="https://e7.pngegg.com/pngimages/779/61/png-clipart-logo-idea-cute-eagle-leaf-logo-thumbnail.png" alt="" />
                                </div>
                            </div>
                            <div className="col-2 position">
                                <div className="category" onMouseEnter={handdleClick} >
                                    <div className="icon">
                                        <button><CiMenuBurger /></button>
                                    </div>
                                    <p>Danh mục</p>
                                </div>
                            </div>
                            {click ? (
                                <div className="inner-box" onMouseLeave={handdleLeave} >
                                    <div className="box" style={{borderRadius: '0 0 10px 10px'}}>
                                        <button>
                                            <Link to="/">
                                                <div className="content-1">
                                                    <div className="icon"><TiHomeOutline /></div>
                                                    <span>Trang Chủ</span>
                                                </div>
                                            </Link>
                                        </button>
                                        <button>
                                            <Link to="/napthe">
                                                <div className="content-1">
                                                    <div className="icon"><FaRegAddressCard /></div>
                                                    <span>Nạp thẻ</span>
                                                </div>
                                            </Link>
                                        </button>
                                        <button>
                                            <Link to="/napatm">
                                                <div className="content-1">
                                                    <div className="icon"><IoIdCardOutline /></div>
                                                    <span>Nạp ATM</span>
                                                </div>
                                            </Link>
                                        </button>
                                        <button>
                                            <div className="content-1">
                                                <div className="icon"><BsShopWindow /></div>
                                                <span>Mua ACC</span>
                                            </div>
                                        </button>
                                        <button>
                                            <div className="content-1">
                                                <div className="icon"><AiOutlineShop /></div>
                                                <span>Dịch vụ</span>
                                            </div>
                                        </button>
                                        <button style={{padding: '20'}}>
                                            <div className="content-1">
                                                <div className="icon"><RiBillLine /></div>
                                                <span>Tin tức</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            ) : null}
                            <div className="col-5">
                                <div className="search">
                                    <input type="text" placeholder="Tìm kiếm........." />
                                    <button type="button" className="btn btn-primary"><IoSearch /></button>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="money">
                                    <button type="button" className="btn btn-primary" onClick={handdleCheck}>Nạp tiền</button>
                                </div>
                            </div>
                            <div className="col-1" style={{width: 50}}>
                                <div className="beel Carts" >
                                    <button><CiBellOn /></button>
                                </div>
                            </div>
                            <div className="col-1" style={{width: 50}}>
                                <div className="beel Carts" >
                                    <button><PiShoppingCartSimpleBold /></button>
                                </div>
                            </div>
                            {check ? (
                                <div className="col-1">
                                    <div className="beel">
                                        <button onClick={handdleLogin}><IoPeopleSharp /></button>
                                    </div>
                                </div>
                            ) : (
                                Array.isArray(data) && data.map((item, index) => (
                                    <div className="col-2" key={index}>
                                        <div className="beel" style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <div className="box-1">
                                                <span>{item.nickname}</span>
                                                <p style={{
                                                    margin: 0,
                                                    textAlign: 'center'
                                                }}
                                                >{item.totalprice}đ</p></div>
                                            <div className="box-2">
                                                <Link to='/detail'><button ><IoPeopleSharp /></button></Link>
                                                <span className="logout" onClick={handdleLogout}>Đăng xuất</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div >
            <Outlet />

        </>
    )
}
export default Header