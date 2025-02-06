
import { Link } from "react-router-dom"
import "../../public/css/Hearder.css"
function Result() {
    const link = import.meta.env.VITE_FACEBOOK_LOC
    return (
        <>
           <div className="selection-end">
                <p>© Copyright 2023 - Privacy Policy - Terms of Service</p>
                <p>Operated by Lộc Trầm Cảm, All Rights Reserved</p>
                <Link to={`${link}`}>FACEBOOK QTV LỘC TRẦM CẢM</Link>
                <br />
            </div>
        </>
    )
}
export default Result