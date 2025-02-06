require('dotenv').config();
const mongoose = require("mongoose");
const database = process.env.DATABASEPRODUCT
mongoose.connect(database)

const lienminhShema = new mongoose.Schema({
    name: {
        type: String,
        default: "",
    },
    type: String,
    img: [],
    account: String,
    password: String,
    stock: {
        type: Number,
        default: 0
    },
    price: {
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



const Lienminh = mongoose.model("lienminh", lienminhShema, "lienminh")
module.exports = Lienminh;