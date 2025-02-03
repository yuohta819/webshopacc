require('dotenv').config();
const mongoose = require("mongoose");
const database = process.env.DATABASEPRODUCT
mongoose.connect(database)

const bloxfruitShema = new mongoose.Schema({
    name: String,
    category: String,
    priceRobux: String,
    type: String,
    price: String,
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



const Bloxfruit = mongoose.model("bloxfruit", bloxfruitShema, "bloxfruit")
module.exports = Bloxfruit;