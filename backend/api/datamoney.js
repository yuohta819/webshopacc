require('dotenv').config();
const mongoose = require("mongoose");
const database = process.env.DATABASEPRODUCT
mongoose.connect(database)

const moneyShema = new mongoose.Schema({
    account: String,
    bank: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        default: ""
    },
    price: {
        type: String,
        default: ""
    },
    content: {
        type: String,
        default: ""
    },
    updateprice: {
        type: String,
        default: ""
    },
    link: {
        type: String,
        default: ""
    },
    seri: {
        type: String,
        default: ""
    },
    code: {
        type: String,
        default: ""
    },
    token: {
        type: String,
        default: ""
    },
    active: {
        type: Boolean,
        default: false
    },
    node: {
        type: String,
        default: ""
    },
    removed: {
        type: Boolean,
        default: true
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})



const Money = mongoose.model("money", moneyShema, "money")
module.exports = Money;