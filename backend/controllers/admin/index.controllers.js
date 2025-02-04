require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Bill = require("../../api/databills")
const AccountQTV = require("../../api/dataaccountqtv")
const AccountADMIN = require("../../api/dataaccountadmin")
const Account = require("../../api/dataproducts")
const Bloxfruit = require("../../api/dataCategory")
const Changerobux = require("../../api/dataChangeRobux")
const SECRETKEY = process.env.SECRETKEY
// Ma hoa mat khau 
const hashPassword = async (password) => {
    const saltRounds = 10; // Độ mạnh của mã hóa
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword
};
// End ma hoa mat khau

// [GET] Tong quan
module.exports.Tongquan = async (req, res) => {
    try {
        const data = await Bill.find({})
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
    if (req.params.status == 'false') {
        req.params.status = 'true'
    }

    console.log(req.params.status)
    const data = await Bill.updateOne({
        name: req.params.id
    }, {
        active: req.params.status
    })
    res.json("true")
}
// End Change-status

// [GET] Change-status
module.exports.ChangeDelete = async (req, res) => {
    if (req.params.status == 'false') {
        req.params.status = 'true'
    }
    const data = await Bill.updateOne({
        name: req.params.id
    }, {
        deleted: req.params.status
    })
    res.json("true")
}
// End Change-status

// [POST] Create QTV
module.exports.CreateQTV = async (req, res) => {
    try {
        const id = req.body.account
        const pass = req.body.password
        const account = await AccountQTV.find({
            account: id
        })
        if (account.length != 0) {
            return res.json("Ton tai")
        }

        const token = jwt.sign({ account: id, password: pass }, SECRETKEY, { expiresIn: "1h" })
        const password = await hashPassword(pass)
        const data = await AccountQTV({
            account: id,
            password: password,
            token: token
        })
        data.save()
        res.json(token)
    } catch (error) {
        res.json({
            code: 400,
            message: "Error"
        })
    }
}
// End Create QTV

// [POST] Create QTV
module.exports.CreateAdmin = async (req, res) => {
    try {
        const id = req.body.account
        const pass = req.body.password
        const account = await AccountADMIN.find({
            account: id
        })
        if (account.length != 0) {
            return res.json("Ton tai")
        }

        const token = jwt.sign({ account: id, password: pass }, SECRETKEY, { expiresIn: "48h" })
        const password = await hashPassword(pass)
        const data = await AccountADMIN({
            account: id,
            password: password,
            token: token
        })
        console.log(data)
        data.save()
        res.json(token)
    } catch (error) {
        res.json({
            code: 400,
            message: "Error"
        })
    }
}
// End Create QTV

// [POST] Login Admin
module.exports.LoginAdmin = async (req, res) => {
    try {
        const id = req.body.account
        const pass = req.body.paswword
        const data = await AccountADMIN.find({
            account: id
        })
        const token = data[0].token
        const password = data[0].password
        const decoded = await bcrypt.compare(pass, password)
        if (decoded) {
            res.json(token)
        } else {
            res.json("fail")
        }
    } catch (error) {
        res.json("Error")
    }
}
// End Login Admin

// [POST] Login Admin
module.exports.Useraccount = async (req, res) => {
    try {
        const data = await Account.find({})
        res.json(data)
    } catch (error) {
        res.json("Error")
    }
}
// End Login Admin


// [POST] Change Bloxfruit
module.exports.Bloxfruit = async (req, res) => {
    try {
        const data = await Bloxfruit(req.body)
        data.save()
    } catch (error) {
        res.json("Error")
    }
}
// End Change Bloxfruit

// [GET] Find Category
module.exports.CategoryBloxfruit = async (req, res) => {
    try {
        const data = await Bloxfruit.find({})
        res.json(data)
    } catch (error) {
        res.json("Error")
    }
}
// End Find Category
module.exports.ChangeCategory = async (req, res) => {
    try {
        const type = req.params.type
        const price = req.params.price
        await Bloxfruit.updateOne({
            type: type
        }, {
            price: price
        })
        res.json("success")
    } catch (error) {
        res.json("Error")
    }
}
// [POST] Change Category

// [POST] Change Robux
module.exports.ChangeRobux = async (req, res) => {
    try {
        if (req.body.robux) {
            await Changerobux.updateOne({}, {
                robux: req.body.robux
            })
        } else if (req.body.mar) {
            await Changerobux.updateOne({}, {
                mar: req.body.mar
            })
        }
    } catch (error) {
        res.json("error")
    }
}
// End Change Robux

// [POST] Deleted
module.exports.DeleteBloxfruit = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        await Bloxfruit.deleteOne({
            _id: id
        }, {
            deleted: true
        })
    } catch (error) {
        res.json("error")
    }
}
// End Deleted

// [POST] Imange Lien Quan
module.exports.ImageLienQuan = async (req, res) => {

}
// End Imange Lien Quan