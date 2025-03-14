
import { Route, Routes, BrowserRouter } from "react-router-dom"
import Adminn from "../../layout/admin"
import Qtv from "../../layout/qtv"
import LoginQTV from "../../layout/qtv/loginqtv"
import CheckQTV from "../../models/QTV/index.model"
import TheCao from "../../layout/qtv/thecao"
import Dashboard from "../../layout/qtv"
import Bill from "../../layout/qtv/bill"
import ATM from "../../layout/qtv/atm"
import AccoutQTV from "../../layout/qtv/accountqtv"
import InforQTV from "../../layout/qtv/inforQTV"
import BloxFruit from "../../layout/qtv/bloxfruit"
import CayThue from "../../layout/qtv/caythue"
import LienQuan from "../../layout/qtv/lienquan"
import FreeFire from "../../layout/qtv/freefire"
function QTV() {
    const QTV = import.meta.env.VITE_QTV
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/"  >
                        <Route path={`${QTV}`} element={<CheckQTV><Dashboard/></CheckQTV>} >
                            <Route path="login" element={<LoginQTV/>} />
                            <Route path="rubux" element={<Bill />} />
                            <Route path="thecao" element={<TheCao />} />
                            <Route path="atm" element={<ATM />} />
                            <Route path="account" element={<InforQTV />} />
                            <Route path="caythue" element={<BloxFruit />} />
                            <Route path="lienquan" element={<LienQuan />} />
                            <Route path="freefire" element={<FreeFire />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default QTV