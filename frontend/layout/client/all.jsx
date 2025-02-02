import "../../public/css/Hearder.css"
import TrangChu from "./Trangchu";
import React, { useState } from 'react';
import { RiMessengerLine } from "react-icons/ri";
import { RiMessengerFill } from "react-icons/ri";
import Box from "./box";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function All() {
    const link = import.meta.env.VITE_FACEBOOK
    const [check, setCheck] = useState("")
    return (
        <>
            <div className="selection-2">
                <img style={{maxWidth: '100%', height: "auto"}} src="https://cdn3.upanh.info/upload/server-sw3/images/Banner%20Roblox_.jpg" alt="" />
            </div>
            <div className="selection-3">
                <TrangChu />
            </div>
            <div className="selection-4">
                <Box />
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
        </>
    )
}
export default All