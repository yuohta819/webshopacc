const MainRoute = require("../QTV/qtv.route")
const qtv = process.env.QTV
module.exports = (app) => {
    app.use(`/${qtv}`, MainRoute)
}