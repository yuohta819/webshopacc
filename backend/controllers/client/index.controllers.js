require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Account = require("../../api/dataproducts")
const Money = require("../../api/datamoney")
const SECRETKEY = process.env.SECRETKEY
const Bill = require("../../api/databills")
const Changerobux = require("../../api/dataChangeRobux")

// Ma hoa mat khau 
const hashPassword = async (password) => {
    const saltRounds = 10; // Độ mạnh của mã hóa
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword
};
// End ma hoa mat khau


// [POST] Signup
module.exports.Singup = async (req, res) => {

    try {
        const id = req.body.account
        const pass = req.body.pass
        const account = await Account.find({
            account: id
        })
        if (account.length != 0) {
            return res.json("Ton tai")
        }

        const token = jwt.sign({ account: id, password: pass }, SECRETKEY, { expiresIn: "1h" })
        const password = await hashPassword(pass)
        const data = await Account({
            name: req.body.name,
            nickname: req.body.nickname,
            account: req.body.account,
            password: password,
            token: token
        })
        data.save()
        res.json("success")
    } catch (error) {
        res.json({
            code: 400,
            message: "Error"
        })
    }
}
// End Signup

// [POTS] Login
module.exports.Login = async (req, res) => {
    try {
        const id = req.body.account
        const pass = req.body.pass
        const data = await Account.find({
            account: id
        })
        if (data.length == 0) {
            return res.json("error")
        }
        const token = jwt.sign({ account: id, password: pass }, SECRETKEY, { expiresIn: "1h" })
        const isMatch = await bcrypt.compare(pass, data[0].password)
        if (isMatch) {
            res.json(token)
        } else {
            res.json("fail")
        }
    } catch (error) {
        res.json({
            code: 400,
            message: "Error"
        })
    }
}
// [GET] Login

// [GET] Users
module.exports.Users = async (req, res) => {
    try {
        const token = req.headers.authorization
        const decoded = jwt.verify(token, SECRETKEY)
        
        if (decoded.exp < Math.floor(Date.now() / 1000)) {
            return res.json("error")
        }
        const data = await Account.find({
            account: decoded.account
        })
        res.json(data)
    } catch (error) {
        res.json("loi cai user")
    }
}
// End Users

// [POST] Napthe
module.exports.Napthe = async (req, res) => {
    try {
        const decoded = jwt.verify(req.headers.authorization, SECRETKEY)
        const data = await Money({
            account: decoded.account,
            type: req.body.type,
            seri: req.body.seri,
            code: req.body.code,
            price: req.body.price,
            link: req.params.link,
            token: req.headers.authorization
        })
        data.save()
        res.json("success")
    } catch (error) {
        res.json({
            code: 400,
            message: "Error"
        })
    }
}
// End Napthe

// [POST] Nap atm
module.exports.Napatm = async (req, res) => {
    try {
        const decoded = jwt.verify(req.headers.authorization, SECRETKEY)
        const data = await Money({
            account: decoded.account,
            bank: req.body.bank,
            price: req.body.price,
            node: req.body.node,
            link: req.body.link,
            token: req.headers.authorization
        })
        data.save()
        res.json("success")
    } catch (error) {
        res.json({
            code: 400,
            message: "Error"
        })
    }
}
// End Nap atm

// [POST] Thanh Toan
module.exports.Thanhtoan = async (req, res) => {
    try {
        const id = req.body.title
        const price = req.body.price
        const total = Math.floor(parseInt(req.params.total))
        const token = req.headers.authorization
        const decode = jwt.verify(token, SECRETKEY)
        const allprice = await Account.find({
            account: decode.account
        })
        if (allprice[0].totalprice < parseInt(price)) {
            return res.json("Noprice")
        } else if (allprice[0].totalprice >= parseInt(price)) {
            const pricetmp = allprice[0].totalprice - parseInt(price)
            await Account.updateOne({
                account: decode.account
            },{
                totalprice: pricetmp
            })
        }
        const count = await Bill.countDocuments()
        const data = await Bill({
            name: decode.account,
            taikhoan: id,
            price: price,
            total: total,
            token: token,
            work: req.params.work,
            connect: req.body.connect,
            count: count + 1
        })
        data.save()
        res.json("success")
    } catch (error) {
        res.json({
            code: 400,
            message: "Error"
        })
    }
}
// End Thanh Toan

// [POST] Forgot Password
module.exports.ForgotPass = async (req, res) => {
    try {
        const account = req.body.account
        const pass = req.body.pass
        const data = await Account.find({
            account: account
        })
        if (data.length == 0) {
            return res.json("error")
        }
        const password = await hashPassword(pass)
        const token = await jwt.sign({ account: account, password: pass }, SECRETKEY, { expiresIn: "1h" })
        await Account.updateOne({
            account: account
        }, {
            password: password,
            token: token
        })
        res.json("success")
    } catch (error) {
        res.json("Error")
    }
}
// End Forgot Password

// [GET] Historic
module.exports.LichSu = async (req, res) => {
    try {
        const decoded = jwt.verify(req.headers.authorization, SECRETKEY)
        const data = await Bill.find({
            name: decoded.account
        })
        res.json(data)
    } catch (error) {
        res.json("Error")
    }
}
// End Historic

// [GET] Historic NapTien
module.exports.LichSuNapTien = async (req, res) => {
    try {
        const decoded = jwt.verify(req.headers.authorization, SECRETKEY)
        const data = await Money.find({
            account: decoded.account
        })
        res.json(data)
    } catch (error) {
        res.json("error")
    }
}
// End Historic NapTien

// [GET] Bills
module.exports.Bills = async (req, res) => {
    try {
        const decoded = jwt.verify(req.headers.authorization, SECRETKEY)
        const data = await Bill.find({
            name: decoded.account
        })
        res.json(data)
    } catch (error) {
        res.json("error")
    }
}
// End Bills

// [GET] Users
module.exports.InforUsers = async (req, res) => {
    try {
        const token = req.headers.authorization
        const decoded = jwt.verify(token, SECRETKEY)
        const count = await Bill.countDocuments({
            name: decoded.account
        })
        await Account.updateOne({
            account: decoded.account
        },{
            totalbill: parseInt(count)
        })
        if (decoded.exp < Math.floor(Date.now() / 1000)) {
            return res.json("error")
        }
        const data = await Account.find({
            account: decoded.account
        })
        res.json(data)
    } catch (error) {
        res.json("Error")
    }
}
// End Users

// [GET] Robux
module.exports.Robux = async (req, res) => {
    const data = await Changerobux.find({})
    res.json(data)
}
// End Robux