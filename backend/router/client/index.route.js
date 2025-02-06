
const MainRoute = require("../../router/client/trangchu.route")
const SecondRoute = require("../../router/client/bloxdruit.route")
module.exports = (app) => {
    app.use("/", MainRoute)
    app.use("/", SecondRoute )
}