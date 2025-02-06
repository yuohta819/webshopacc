require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AccountQTV = require("../../api/dataaccountqtv")
const SECRETKEY = process.env.SECRETKEY
const Bill = require("../../api/databills")
const Money = require("../../api/datamoney");
const AccountUser = require("../../api/dataproducts")

// Ma hoa mat khau 
const hashPassword = async (password) => {
    const saltRounds = 10; // Độ mạnh của mã hóa
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword
};
// End ma hoa mat khau

// [POST] Login QTV
module.exports.Login = async (req, res) => {
    const id = req.body.account
    const pass = req.body.paswword
    const data = await AccountQTV.find({
        account: id
    })
    if (data.length == 0) {
        return res.json("error")
    }
    const password = data[0].password
    const token = await jwt.sign({ account: id, password: pass }, SECRETKEY, { expiresIn: "1h" })
    const decoded = await bcrypt.compare(pass, password)
    if (decoded) {
        res.json(token)
    } else {
        res.json("fail")
    }
}
// End Login QTV

// [GET] Tong quan
module.exports.Tongquan = async (req, res) => {
    try {
        let data
        if (req.params.id == "Robux") {
            data = await Bill.find({
                work: req.params.id
            })
        } else if (req.params.id == "Lienquan") {
            data = await Bill.find({
                work: req.params.id
            })
        } else if (req.params.id == "caythubloxfruit") {
            data = await Bill.find({
                work: req.params.id
            })
        }
        else if (req.params.id == "freefire") {
            data = await Bill.find({
                work: req.params.id
            })
        }
        res.json(data)
    } catch (error) {
        res.json({
            code: 400,
            message: "Error"
        })
    }
}
// End Tong quan

// [GET] Change-status
module.exports.ChangeStatus = async (req, res) => {
    try {
        if (req.params.status == 'false') {
            req.params.status = 'true'
        }
        if (req.params.type === "Robux") {
            await Bill.updateOne({
                _id: req.params.id
            }, {
                active: req.params.status,
                first: "1"
            })
            return res.json("true")
        } else if (req.params.type === "thecao") {
            await Money.updateOne({
                _id: req.params.id
            }, {
                active: req.params.status
            })
            return res.json("true")
        } else if (req.params.type === "atm") {
            await Money.updateOne({
                _id: req.params.id
            }, {
                active: req.params.status
            })
            return res.json("true")
        }
    } catch (error) {
        res.json("Error")
    }

}
// End Change-status

// [GET] Change-status
module.exports.ChangeDelete = async (req, res) => {

    try {
        if (req.params.status == 'false') {
            req.params.status = 'true'
        }
        if (req.params.type === "Robux") {
            await Bill.updateOne({
                _id: req.params.id
            }, {
                deleted: req.params.status,
                first: "2"
            })
            return res.json("true")
        } else if (req.params.type === "thecao") {
            await Money.updateOne({
                _id: req.params.id
            }, {
                deleted: req.params.status
            })
            return res.json("true")
        } else if (req.params.type === "atm") {
            await Money.updateOne({
                _id: req.params.id
            }, {
                deleted: req.params.status
            })
            return res.json("true")
        }
    } catch (error) {
        res.json("Error")
    }
}
// End Change-status

// [GET] Find Money
module.exports.TheCao = async (req, res) => {
    try {
        const data = await Money.find({})
        res.json(data)
    } catch (error) {
        res.json("Error")
    }
}
// End Find Money

// [GET] Find Money ATM
module.exports.ATM = async (req, res) => {
    try {
        const data = await Money.find({})
        res.json(data)
    } catch (error) {
        res.json("Error")
    }
}
// End Find Money ATM

// [POST] Update Price
module.exports.UpdatePrice = async (req, res) => {
    try {
        const update = req.body.updatePrice
        const data = await AccountUser.find({
            account: req.body.id
        })
        const price = parseInt(update) + data[0].totalprice
        await AccountUser.updateOne({
            account: req.body.id,
        }, {
            totalprice: price
        })
        res.json("success")
    } catch (error) {
        res.json("Error")
    }
}
// End Update Price

// [POST] Find Account QTV
module.exports.AccountQTV = async (req, res) => {
    try {
        const decoded = jwt.verify(req.headers.authorization, SECRETKEY)
        const data = await AccountQTV.find({
            account: decoded.account
        })
        res.json(data)
    } catch (error) {
        res.json("error")
    }
}
// End Account QTV

// [POST] Update count QTV
module.exports.CountQTV = async (req, res) => {
    const decoded = jwt.verify(req.headers.authorization, SECRETKEY)
    const price = parseInt(req.params.price)
    const data = await AccountQTV.find({
        account: decoded.account
    })
    const total = price + data[0].total
    const count = data[0].count + 1
    await AccountQTV.updateOne({
        account: decoded.account
    }, {
        total: total,
        count: count
    })
}
// End Update count QTV