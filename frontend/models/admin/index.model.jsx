import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Adminn from "../../layout/admin"
import LoginAdmin from "../../layout/admin/loginadmin"
import Tongquan from "../../layout/admin/tongquan"
function CheckAdmin() {
    const admin = import.meta.env.VITE_ADMIN
    const token = sessionStorage.getItem("token-Accountadmin")
    const navigate = useNavigate()
    console.log(token)
    useEffect(() => {
        if (!token) {
            navigate(`/${admin}/login`)
            console.log("Di qua day")
        } 
    }, [navigate])
    return (
        <>
            {!token ? (
                <LoginAdmin  />
            ) : (
                <Adminn />
            )}


        </>
    )
}
export default CheckAdmin