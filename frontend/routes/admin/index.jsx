
import { Route, Routes, BrowserRouter } from "react-router-dom"
import Adminn from "../../layout/admin"
import Tongquan from "../../layout/admin/tongquan"
import CreateQTV from "../../layout/admin/createQTV"
import LoginAdmin from "../../layout/admin/loginadmin"
import CreateAdmin from "../../layout/admin/createAdmin"
import CheckAdmin from "../../models/admin/index.model"
import Robux from "../../layout/admin/Rubux"
import Bloxfruit from "../../layout/admin/Bloxfruit"
import AccountUser from "../../layout/admin/accountuser"
function Admin() {
    const ADMIN = import.meta.env.VITE_ADMIN
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/"  >
                        <Route path={`${ADMIN}`} element={<CheckAdmin><LoginAdmin/></CheckAdmin>}>
                            <Route path="login" element={<LoginAdmin />} />
                            <Route path="tongquan" element={<Tongquan />} />
                            <Route path="createqtv" element={<CreateQTV />} />
                            <Route path="createadmin" element={<CreateAdmin/>} />
                            <Route path="changerobux" element={<Robux/>} />
                            <Route path="bloxfruit" element={<Bloxfruit/>} />
                            <Route path="accountusers" element={<AccountUser/>} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Admin