require('dotenv').config();
const mongoose = require("mongoose");
const database = process.env.DATABASEPRODUCT
mongoose.connect(database)

const accountadminShema = new mongoose.Schema({
    account: String,
    password: String,
    total: {
        type: String,
        default: true
    },
    token: String,
    count: {
        type: Number,
        default: 0
    },
    authority: {
        type: String,
        default: ""
    },
    active: {
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



const Accountadmin = mongoose.model("accountadmin", accountadminShema, "accountadmin")
module.exports = Accountadmin;