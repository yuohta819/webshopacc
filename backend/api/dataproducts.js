require('dotenv').config();
const mongoose = require("mongoose");
const database = process.env.DATABASEPRODUCT
mongoose.connect(database)

const AccountShema = new mongoose.Schema({
    name: String,
    nickname: String,
    account: String,
    password: String,
    token: String,
    Link: String,
    totalbill: {
        type: Number,
        default: 0
    },
    totalprice: {
        type: Number,
        default: 0
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



const Account = mongoose.model("Account", AccountShema, "Account")
module.exports = Account;