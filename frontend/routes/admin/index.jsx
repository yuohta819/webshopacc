
import { Route, Routes, BrowserRouter } from "react-router-dom"
import Adminn from "../../layout/admin"
import Tongquan from "../../layout/admin/tongquan"
import CreateQTV from "../../layout/admin/account/createQTV"
import CreateAdmin from "../../layout/admin/account/createAdmin"
import LoginAdmin from "../../layout/admin/loginadmin"
import CheckAdmin from "../../models/admin/index.model"
import Bloxfruit from "../../layout/admin/products/Roblox/Bloxfruit"
import AccountUser from "../../layout/admin/account/accountuser"
import Lienquan from "../../layout/admin/products/lienquan"
import Freefire from "../../layout/admin/products/freefire"
import CreateCategory from "../../layout/admin/category/createCategory"
import EditCategory from "../../layout/admin/category/Editcategory"
import LienMinh from "../../layout/admin/products/LienMinh/lienminh"
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
                            <Route path="bloxfruit" element={<Bloxfruit/>} />
                            <Route path="accountusers" element={<AccountUser/>} />
                            <Route path="lienquan" element={<Lienquan/>} />
                            <Route path="lienminhhuyenthoai" element={<LienMinh/>} />
                            <Route path="freefire" element={<Freefire />} />
                            <Route path="createcategory" element={<CreateCategory/>} />
                            <Route path="editcategory" element={<EditCategory/>} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Admin