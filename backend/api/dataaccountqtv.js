require('dotenv').config();
const mongoose = require("mongoose");
const database = process.env.DATABASEPRODUCT
mongoose.connect(database)

const accountqtvShema = new mongoose.Schema({
    account: String,
    password: String,
    total: {
        type: Number,
        default: 0
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



const Accountqtv = mongoose.model("accountqtv", accountqtvShema, "accountqtv")
module.exports = Accountqtv;