
import { Route, Routes, BrowserRouter } from "react-router-dom"
import Adminn from "../../layout/admin"
import Tongquan from "../../layout/admin/tongquan"
import CreateQTV from "../../layout/admin/createQTV"
import LoginAdmin from "../../layout/admin/loginadmin"
import CreateAdmin from "../../layout/admin/createAdmin"
import CheckAdmin from "../../models/admin/index.model"
function Admin() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/"  >
                        <Route path="admin" element={<CheckAdmin><LoginAdmin/></CheckAdmin>}>
                            <Route path="login" element={<LoginAdmin />} />
                            <Route path="tongquan" element={<Tongquan />} />
                            <Route path="createqtv" element={<CreateQTV />} />
                            <Route path="createadmin" element={<CreateAdmin/>} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Admin