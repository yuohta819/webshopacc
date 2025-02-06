import "../../public/css/Hearder.css"
import TrangChu from "./Trangchu";
import React, { useState } from 'react';
import { RiMessengerLine } from "react-icons/ri";

import BoxRoblox from "./box/Roblox";
import { Link, Outlet } from "react-router-dom";
import SideBar from "./siderbar";
import BoxLienQuan from "./box/Lienquan";
import BoxFreefire from "./box/freefire";
import ProductCarousel from "./ImgTongquan/Imngpaging";
import BoxGLienminh from "./box/Lienminh";
import BoxGenshin from "./box/genshin";
import Result from "./result";
function All() {
    const link = import.meta.env.VITE_FACEBOOK_LOC
    return (
        <>
            <div className="selection-2">
                <ProductCarousel />
            </div>
            <div className="selection-3">
                <TrangChu />
            </div>
            <div className="selection-4">
                <BoxRoblox />
                <BoxLienQuan />
                <BoxFreefire />
            </div>
            
           
        </>
    )
}
export default All