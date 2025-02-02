const Test = require("../client/test")
const MainRoute = require("../../router/client/trangchu.route")
module.exports = (app) => {
    app.use("/", MainRoute)
    app.use("/", Test);
}