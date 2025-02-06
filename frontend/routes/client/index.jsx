
import { Route, Routes, BrowserRouter } from "react-router-dom"
import Header from "../../layout/client/header"
import Login from "../../layout/client/login"
import Singup from "../../layout/client/singup"
import Napthe from "../../layout/client/napthe"
import NapATM from "../../layout/client/napatm"
import All from "../../layout/client/all"
import RobuxGamepass from "../../layout/client/detail/roblox/rubux"
import ForgotPass from "../../layout/client/forgotpassword"
import Detail from "../../layout/client/detailusers"
import Historic from "../../layout/client/histocricusers"
import HistoricNapThe from "../../layout/client/lichsunapthe"
import HistoricATM from "../../layout/client/lichsunapatm"
import Status from "../../layout/client/status"
import InforUser from "../../layout/client/inforUserClient"
import ServicePage from "../../layout/client/detail/roblox/caythue"
import Deatil from "../../layout/client/detailusers"
import LienQuanAccount from "../../layout/client/detail/lienquan/acc"
import FreeFireAccount from "../../layout/client/detail/freefire/accFreefire"
import ScrollToTop from "../../layout/client/function/scroll"
import AnimeDefents from "../../layout/client/detail/roblox/animedefenders"
import RobuxReal from "../../layout/client/detail/roblox/robuxreal"
import Fruit from "../../layout/client/detail/roblox/Fruit"
import Toilet from "../../layout/client/detail/roblox/toilet"
import Lienminh from "../../layout/client/detail/lienminh/lienminh"
function TrangChu() {
    return (
        <>
            <BrowserRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Header />} >
                        <Route path="/" element={<All />} />
                        <Route path="dangnhap" element={<Login />} />
                        <Route path="dangki" element={<Singup />} />
                        <Route path="napthe" element={<Napthe />} />
                        <Route path="napatm" element={<NapATM />} />
                        <Route path="roblox/67a216b0c43e68e24b9bcaf8" element={<RobuxGamepass />} />
                        <Route path="quenmatkhau" element={<ForgotPass />} />
                        <Route path="caythue" element={<ForgotPass />} />
                        <Route path="account/:id" element={<LienQuanAccount />} />
                        <Route path="freefire/:id" element={<FreeFireAccount />} />
                        <Route path="lienminh/:id" element={<Lienminh />} />
                        <Route path="roblox/67a21616c43e68e24b9bcaf6" element={<ServicePage />} />
                        <Route path="roblox/67a216d2c43e68e24b9bcafa" element={<AnimeDefents />} />
                        <Route path="roblox/67a21701c43e68e24b9bcafc" element={<RobuxReal />} />
                        <Route path="roblox/67a21711c43e68e24b9bcafe" element={<Fruit />} />
                        <Route path="roblox/67a2178dc43e68e24b9bcb02" element={<Toilet />} />
                        <Route path="detail" element={<Deatil />}>
                            <Route path="lichsu" element={<Historic />} />
                            <Route path="napthe" element={<HistoricNapThe />} />
                            <Route path="napatm" element={<HistoricATM />} />
                            <Route path="trangthai" element={<Status />} />
                            <Route path="thongtin" element={<InforUser />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default TrangChu