const express = require('express')
const route = express.Router();
const Controllers = require("../../controllers/client/bloxfruit.controllers")
// [GET] Cay Thue 
route.get("/roblox/caythue", Controllers.CayThue)
// End Cay Thue

// [POST] Update Bill
route.post("/updatebillcaythue/:total/:work", Controllers.UpdateBill)
// End Update Bill

// [GET] Anime Defenders
route.get("/roblox/animedefenders", Controllers.AnimeDefenders)
// End Anime Defenders

// [GET] Fruit
route.get("/roblox/Fruit", Controllers.Fruit)
// End Fruit

// [GET] Fruit
route.get("/roblox/robuxreal", Controllers.Robuxreal)
// End Fruit

// [GET] Toilet
route.get("/roblox/toilet", Controllers.Toilet)
// End Toilet
module.exports = route