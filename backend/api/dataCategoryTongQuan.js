require('dotenv').config();
const mongoose = require("mongoose");
const database = process.env.DATABASEPRODUCT
mongoose.connect(database)

const categorytongquanShema = new mongoose.Schema({
    img: String,
    category: String,
    name: String,
    stock: {
        type: Number,
        default: 0
    },
    first: {
        type: String,
        default: "0"
    },
    node: {
        type: String,
        default: ""
    },
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



const Categorytongquan = mongoose.model("categorytongquan", categorytongquanShema, "categorytongquan")
module.exports = Categorytongquan;