require('dotenv').config();
const mongoose = require("mongoose");
const database = process.env.DATABASEPRODUCT
mongoose.connect(database)

const freefireShema = new mongoose.Schema({
    id: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
        default: ""
    },
    ATM: {
        type: String,
        default: ""
    },
    card: {
        type: String,
        default: ""
    },
    signin: {
        type: String,
        default: ""
    },
    skin: {
        type: String,
        default: ""
    },
    vocuc: {
        type: String,
        default: ""
    },
    rank: {
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



const Freefire = mongoose.model("freefire", freefireShema, "freefire")
module.exports = Freefire;