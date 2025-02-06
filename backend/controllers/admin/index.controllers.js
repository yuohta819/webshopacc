require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Bill = require("../../api/databills")
const AccountQTV = require("../../api/dataaccountqtv")
const AccountADMIN = require("../../api/dataaccountadmin")
const Account = require("../../api/dataproducts")
const Bloxfruit = require("../../api/dataCategory")
const Changerobux = require("../../api/dataChangeRobux")
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier')
const Lienquan = require("../../api/dataLienquan")
const CreateTongQuan = require("../../api/dataCategoryTongQuan")
const Freefire = require("../../api/dataFreefire")
const Lienminh = require("../../api/dataLienMinh")
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
const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'uploads' }, // Tên thư mục trên Cloudinary
            (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url); // URL ảnh sau khi tải lên Cloudinary
            }
        );
        streamifier.createReadStream(buffer).pipe(stream);
    });
};
module.exports.ImageLienQuan = async (req, res) => {
    try {
        const files = req.files;
        const uploadPromises = files.map(file => uploadToCloudinary(file.buffer));
        const urls = await Promise.all(uploadPromises);
        const data = await Lienquan({
            title: req.params.title,
            img_1: urls
        })
        data.save()
        //   res.json({ message: 'Upload thành công', urls });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi tải lên ảnh' });
    }
};

// End Imange Lien Quan

// [POST] Create Tong Quan
module.exports.CreateTongQuan = async (req, res) => {
    try {
        const upload = await uploadToCloudinary(req.file.buffer)
        const urls = await Promise.all(upload);
        const data = await CreateTongQuan({
            img: upload,
            category: req.params.category,
            name: req.params.title
        })
        data.save()
    } catch (error) {
        res.json("Error")
    }
}
// End Create Tong Quan

// [POST] Lien Quan
module.exports.Lienquan = async (req, res) => {
    try {
        const files = req.files
        const count = await Lienquan.countDocuments()
        const uploadPromises = files.map(file => uploadToCloudinary(file.buffer))
        const urls = await Promise.all(uploadPromises)
        const data = await Lienquan({
            ...req.body,
            id: count + 1,
            img_1: urls
        })
        data.save()
        //   res.json({ message: 'Upload thành công', urls });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi tải lên ảnh' });
    }
}
// End Lien quan

module.exports.Freefire = async (req, res) => {
    try {
        const files = req.files
        const count = await Freefire.countDocuments()
        const uploadPromises = files.map(file => uploadToCloudinary(file.buffer))
        const urls = await Promise.all(uploadPromises)
        const data = await Freefire({
            ...req.body,
            id: count + 1,
            img_1: urls
        })
        data.save()
        //   res.json({ message: 'Upload thành công', urls });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi tải lên ảnh' });
    }
}
// End Lien quan

// [POST] Update Bills
module.exports.UpdateBills = async (req, res) => {
    try {
        let data, total;
        if (req.params.total.length < 6) {
            total = Math.round(parseFloat(req.params.total))*1000
        } else {
            total = Math.round(parseFloat(req.params.total))*1000000
        }
        if (req.params.work == "Lienquan") {
            data = await Lienquan.find({
                id: parseInt(req.params.id)
            })
        } else if (req.params.work == "freefire") {
            data = await Freefire.find({
                id: parseInt(req.params.id)
            })
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
            price: data[0].price,
            token: req.headers.authorization,
            work: req.params.work,

        })
        bill.save()
        res.json("success")
    } catch (error) {
        res.json("Error")
    }
}
// End Update Bills

// [POST] Update Anime Defenders
module.exports.AnimeDefenders = async (req, res) => {
    try {
        const files = req.files
        const uploadPromises = files.map(file => uploadToCloudinary(file.buffer))
        const urls = await Promise.all(uploadPromises)
        const data = await Bloxfruit({
            ...req.body,
            img: urls
        })
        
        data.save()
        //   res.json({ message: 'Upload thành công', urls });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi tải lên ảnh' });
    }
}
// End Update Anime Defenders

// [POST] Update Robux VNG
module.exports.RobuxReal = async (req, res) => {
    try {
        const uploadPromises = files.map(file => uploadToCloudinary(file.buffer))
        const urls = await Promise.all(uploadPromises)
        const data = await Bloxfruit({
            ...req.body,
            img: urls
        })
        data.save()
        //   res.json({ message: 'Upload thành công', urls });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi tải lên ảnh' });
    }
}
// End Update Robux VNG

// [POST] Fruit
module.exports.Fruit = async (req, res) => {
    try {
        const files = req.files
        const uploadPromises = files.map(file => uploadToCloudinary(file.buffer))
        const urls = await Promise.all(uploadPromises)
        const data = await Bloxfruit({
            ...req.body,
            imgFruit: urls
        })
        
        data.save()
        //   res.json({ message: 'Upload thành công', urls });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi tải lên ảnh' });
    }
}
// End Fruit

// [POST] Fruit
module.exports.Toilet = async (req, res) => {
    try {
        const files = req.files
        const uploadPromises = files.map(file => uploadToCloudinary(file.buffer))
        const urls = await Promise.all(uploadPromises)
        const data = await Bloxfruit({
            ...req.body,
            imgToilet: urls
        })
        
        data.save()
        //   res.json({ message: 'Upload thành công', urls });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi tải lên ảnh' });
    }
}
// End Fruit

// [POST] Do Thi
module.exports.Dothi = async (req, res) => {
    try {
        let object =[]
        const data = await CreateTongQuan.find({
            name: "Roblox"
        })
        let stock=0
        data.forEach((item) => {
            stock = stock + parseInt(item.stock)
        })
        const data1 = await CreateTongQuan.find({
            name: "freefire"
        })
        let stock1=0
        data1.forEach((item) => {
            stock1 = stock1 + parseInt(item.stock)
        })

        const data2 = await CreateTongQuan.find({
            name: "Liqi"
        })
        let stock2=0
        data2.forEach((item) => {
            stock2 = stock2 + parseInt(item.stock)
        })


        object.push({
            Roblox: stock,
            FreeFire: stock1,
            Lienquan: stock2
        })
       res.json(object)
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi tải lên ảnh' });
    }
}
