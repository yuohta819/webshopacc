
import { Route, Routes, BrowserRouter } from "react-router-dom"
import Header from "../../layout/client/header"
import Login from "../../layout/client/login"
import Singup from "../../layout/client/singup"
import Napthe from "../../layout/client/napthe"
import NapATM from "../../layout/client/napatm"
import All from "../../layout/client/all"
import RobuxGamepass from "../../layout/client/rubux"
import ForgotPass from "../../layout/client/forgotpassword"
import Detail from "../../layout/client/detailusers"
import Historic from "../../layout/client/histocricusers"
import HistoricNapThe from "../../layout/client/lichsunapthe"
import HistoricATM from "../../layout/client/lichsunapatm"
import Status from "../../layout/client/status"
import InforUser from "../../layout/client/inforUserClient"
function TrangChu() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Header />} >
                        <Route path="/" element={<All />} />
                        {/* <Route path="dangnhap" element={<Login />} /> */}
                        <Route path="dangki" element={<Singup />} />
                        <Route path="napthe" element={<Napthe />} />
                        <Route path="napatm" element={<NapATM />} />
                        <Route path="gamepass" element={<RobuxGamepass  />} />
                        <Route path="quenmatkhau" element={<ForgotPass  />} />
                        <Route path="detail" element={<Detail  />}>
                            <Route path="lichsu" element={<Historic />}  />
                            <Route path="napthe" element={<HistoricNapThe />}  />
                            <Route path="napatm" element={<HistoricATM />}  />
                            <Route path="trangthai" element={<Status />}  />
                            <Route path="thongtin" element={<InforUser />}  />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default TrangChu