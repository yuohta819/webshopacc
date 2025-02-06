require("dotenv").config();
const express = require('express')
const route = express.Router();
const Controller = require("../../controllers/admin/index.controllers")
const middlewave = require("../../middlewave/admin")
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
  // Cấu hình Multer để upload ảnh lên Cloudinary
  const storage = new multer.memoryStorage();
  const upload = multer({
    storage,
  });
// [POST] Imange Lien Quan
route.post("/uploads/:title", upload.array("image", 10), Controller.ImageLienQuan);
// End Imange Lien Quan

// [POST] Create Category
route.post("/createtongquan/:category/:title", upload.single("imagee"), Controller.CreateTongQuan)
// End Catgory


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

// [POST] Change Price Robux
route.post("/changerobux", Controller.ChangeRobux)
// End Change Price Robux

// [GET] deleted category
route.get("/deletecategorybloxfruit/:id", Controller.DeleteBloxfruit)
// End deleted category

// [POST] Create Lien Quan
route.post("/lienquan", upload.array("image", 20),Controller.Lienquan)
// End Create Lien Quan

// [POST] Create Free Fire
route.post("/freefire", upload.array("image", 40),Controller.Freefire)
// End Create Free Fire


// [POST] Update Bills
route.post("/updatebill/:total/:id/:work", Controller.UpdateBills)
// End Update Bills

// [POST] Update Anime Defenders
route.post("/updateanimedefenders",upload.array("image", 20), Controller.AnimeDefenders)
// End Update Anime Defenders

// [POST] Update Rubux Real
route.post("/updaterobuxreal",upload.array("image", 20), Controller.RobuxReal)
// End Update Rubux Real

// [POST] Update Fruit
route.post("/fruit",upload.array("image", 20), Controller.Fruit)
// End Update Fruit

// [POST] Toilet
route.post("/toilet",upload.array("image", 20), Controller.Toilet)
// End Toilet

// [POST] Do Thi
route.get("/dothi", Controller.Dothi)
// End Do Thi

module.exports = route