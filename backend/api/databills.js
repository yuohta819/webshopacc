require('dotenv').config();
const mongoose = require("mongoose");
const database = process.env.DATABASEPRODUCT
mongoose.connect(database)

const billShema = new mongoose.Schema({
    name: String,
    account: String,
    taikhoan: String,
    price: String,
    total: String,
    token: String,
    count: Number,
    work: String,
    connect: String,
    content: [],
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



const Bill = mongoose.model("bills", billShema, "bills")
module.exports = Bill;