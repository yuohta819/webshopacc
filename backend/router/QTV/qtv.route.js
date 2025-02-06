require('dotenv').config();
const express = require('express')
const route = express.Router();
const Controller = require("../../controllers/QTV/index.controllers")
const middlewaveQTV = require("../../middlewave/qtv")
// [POST] Login QTV
route.post("/login", middlewaveQTV.QTV,Controller.Login)
// End Login QTV

// [GET] Gamepass
route.get("/bill/:id", Controller.Tongquan)
// End Gamepass


// [GET] Change-status
route.get("/change-status/:status/:id/:type", Controller.ChangeStatus)
// End Change-Status

// [GET] delete-status
route.get("/change-delete/:status/:id/:type", Controller.ChangeDelete)
// End delete-Status

// [GET] Find Money
route.get("/thecao", Controller.TheCao)
// End Find Money

// [GET] Find Money
route.get("/atm", Controller.ATM)
// End Find Money

// [POST] Update Price
route.post("/updateprice", Controller.UpdatePrice)
// End Update Price

// [POST] Find ACccount QTV
route.post("/accountqtv", Controller.AccountQTV)
// End Account QTV

// [POST] Update Count
route.post("/countqtv/:price", Controller.CountQTV)
// End Update Count
module.exports = route