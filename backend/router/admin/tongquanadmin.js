const express = require('express')
const route = express.Router();
const Controller = require("../../controllers/admin/index.controllers")
const middlewave = require("../../middlewave/admin")
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
  // Cấu hình Multer để upload ảnh lên Cloudinary
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "uploads", // Tên folder trong Cloudinary
      format: async (req, file) => "png", // Định dạng file
      public_id: (req, file) => file.originalname.split(".")[0], // Tên file
    },
  });
  
  const upload = multer({ storage: storage });
  
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


// [POST] Imange Lien Quan
route.post("/upload", upload.single("image"), Controller.ImageLienQuan);
// End Imange Lien Quan
module.exports = route