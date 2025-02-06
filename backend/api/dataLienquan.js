require('dotenv').config();
const mongoose = require("mongoose");
const database = process.env.DATABASEPRODUCT
mongoose.connect(database)

const lienquanShema = new mongoose.Schema({
    id: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: ""
    },
    tuong: {
        type: String,
        default: ""
    },
    skin: {
        type: String,
        default: ""
    },
    ngoc: {
        type: String,
        default: ""
    },
    rank: {
        type: String,
        default: ""
    },
    win: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        default: ""
    },
    digit: {
        type: String,
        default: ""
    },
    rep: {
        type: String,
        default: ""
    },
    price: {
        type: String,
        default: ""
    },
    img_1: [
        
    ],
    active: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})



const Lienquan = mongoose.model("lienquan", lienquanShema, "lienquan")
module.exports = Lienquan;