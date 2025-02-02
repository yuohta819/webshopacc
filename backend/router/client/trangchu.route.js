
const express = require('express')
const route = express.Router();
const Controller = require("../../controllers/client/index.controllers")
// [GET] Signup
route.post("/signup", Controller.Singup)
// End Signup

// [GET] Login
route.post("/login", Controller.Login)
// End Login

// [GET] Users
route.get("/users", Controller.Users)
// End Users

// [POST] Nap the
route.post("/napthe", Controller.Napthe)
// End Nap The

// [POST] Nap atm
route.post("/napatm", Controller.Napatm)
// End Nap atm

// [POST] Thanh Toan
route.post("/thanhtoan/:work/:total", Controller.Thanhtoan)
// End Thanh Toan

// [POST] Forget Password
route.post("/password", Controller.ForgotPass)
// End Forgot Password

// [GET] Find Users
route.get("/detail/lichsu", Controller.LichSu)
// End Find Users

// [GET] Find Money
route.get("/detail/naptien", Controller.LichSuNapTien)
// End Find Money

// [GET] Bills
route.get("/bills",Controller.Bills )
// End Bills

// [GET] Users
route.post("/detail/infor", Controller.InforUsers)
// End Users
module.exports = route