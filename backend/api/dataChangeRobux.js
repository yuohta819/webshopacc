require('dotenv').config();
const mongoose = require("mongoose");
const database = process.env.DATABASEPRODUCT
mongoose.connect(database)

const changerobuxShema = new mongoose.Schema({
    robux: Number,
    mar: String,
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



const Changerobux = mongoose.model("changerobux", changerobuxShema, "changerobux")
module.exports = Changerobux;