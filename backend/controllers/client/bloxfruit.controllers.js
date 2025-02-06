require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRETKEY = process.env.SECRETKEY
const Bloxfruit = require("../../api/dataCategory")
const Bill = require("../../api/databills")
const Account = require("../../api/dataproducts")
// [GET] Cay Thue
module.exports.CayThue = async (req, res) => {
    const data = await Bloxfruit.find({})
    let object = [
    ]
    data.forEach(item => {
        if (item.price.length == 3) {
            object.push(item)
        }
    })
    res.json(object)
}
// End Cay Thue

// [POST] Update Bill Cay Thue
module.exports.UpdateBill = async (req, res) => {
    try {
        let total;
        if (req.params.total.length < 6) {
            total = Math.round(parseFloat(req.params.total)) * 1000
        }
        const decoded = jwt.verify(req.headers.authorization, SECRETKEY)
        const users = await Account.find({
            account: decoded.account
        })
        if (users[0].totalprice < parseInt(total)) {
            return res.json("Noprice")
        } else if (users[0].totalprice >= parseInt(total)) {
            const pricetmp = (users[0].totalprice - parseInt(total))
            await Account.updateOne({
                account: decoded.account
            }, {
                totalprice: pricetmp
            })
        }
        const bill = await Bill({
            name: users[0].name,
            taikhoan: users[0].account,
            price: total,
            token: req.headers.authorization,
            work: req.params.work,

        })
        bill.save()
        res.json("success")
    } catch (error) {
        res.json("Error")
    }
}
// End Update Bill Cay Thue

// [GET] Anime Defenders
module.exports.AnimeDefenders = async (req, res) => {
    try {
        const data = await Bloxfruit.find({})
        let object = []
        data.forEach(item => {
            if (item.img.length != 0) {
                object.push(item)
            }
        })
        res.json(object)
    } catch (error) {
        res.json("Error")
    }
}
// End Anime Defenders

// [GET] Fruit
module.exports.Fruit = async (req, res) => {
    try {
        const data = await Bloxfruit.find({})
        let object = []
        data.forEach(item => {
            if (item.imgFruit.length != 0) {
                object.push(item)
            }
        })
        res.json(object)
    } catch (error) {
        res.json("Error")
    }
}
// End Fruit

// [GET] Fruit
module.exports.Robuxreal = async (req, res) => {
    try {
        const data = await Bloxfruit.find({})
        let object = []
        data.forEach(item => {
            if (item.imgRobuxReal.length != 0) {
                object.push(item)
            }
        })
        res.json(object)
    } catch (error) {
        res.json("Error")
    }
}
// End Fruit

// [GET] Toilet
module.exports.Toilet = async (req, res) => {
    try {
        const data = await Bloxfruit.find({})
        let object = []
        data.forEach(item => {
            if (item.imgToilet.length != 0) {
                object.push(item)
            }
        })
        res.json(object)
    } catch (error) {
        res.json("Error")
    }
}
// End Toilet