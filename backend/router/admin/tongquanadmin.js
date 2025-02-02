const express = require('express')
const route = express.Router();
const Controller = require("../../controllers/admin/index.controllers")
const middlewave = require("../../middlewave/admin")

// [GET] Gamepass
route.get("/bill", middlewave.ADMIN ,Controller.Tongquan)
// End Gamepass


// [GET] Change-status
route.get("/change-status/:status/:id", Controller.ChangeStatus)
// End Change-Status

// [GET] Change-status
route.get("/change-delete/:status/:id", Controller.ChangeDelete)
// End Change-Status

// [POST] Create QTV
route.post("/createqtv", Controller.CreateQTV)
// End Create QTV

// [POST] Create Admin
route.post("/createadmin", Controller.CreateAdmin)
// End Create Admin

// [POST] Login Admin
route.post("/login", Controller.LoginAdmin)
// End Login Admin


module.exports = route