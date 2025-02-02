import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import LoginQTV from "../../layout/qtv/loginqtv"
import Robux from "../../layout/qtv"
function CheckQTV() {
    const qtv = import.meta.env.VITE_QTV
    const token = sessionStorage.getItem("token-Accountqtv")
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate(`/${qtv}/login`)
        }
    }, [navigate])
    return (
        <>
            {!token ? (
                <LoginQTV />
            ) : (
                <Robux />
            )}


        </>
    )
}
export default CheckQTV