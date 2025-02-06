
const express = require('express')
const route = express.Router();
const Controller = require("../../controllers/client/index.controllers")
// [GET] Signup
route.post("/signup/:id", Controller.Singup)
// End Signup

// [GET] Login
route.post("/login", Controller.Login)
// End Login

// [GET] Users
route.get("/users", Controller.Users)
// End Users

// [POST] Nap the
route.post("/napthe/:link", Controller.Napthe)
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

// [GET] Users
route.get("/robux", Controller.Robux)
// End Users

// [GET] Users
route.get("/allgame", Controller.Allgame)
// End Users

// [GET] Account Lien Quan
route.get("/account/:id", Controller.Account)
// End Account Lien Quan

// [GET] Account  Free Fire
route.get("/freefire/:id", Controller.FreeFire)
// End Account  Free Fire


module.exports = route