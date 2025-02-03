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

// [GET] Change Bloxfruit
route.get("/useraccount", Controller.Useraccount)
// End Change Bloxfruit

// [POST] Change Bloxfruit
route.post("/bloxfruit", Controller.Bloxfruit)
// End Change Bloxfruit

// [GET] Find Category Bloxfruit
route.get("/findcategory", Controller.CategoryBloxfruit)
// End Find Category Bloxfruit

// [GET] Change Price Category
route.get("/changecategory/:price/:type", Controller.ChangeCategory)
// End Change Price Category
module.exports = route