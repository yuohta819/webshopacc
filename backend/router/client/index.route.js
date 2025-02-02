const MainRoute = require("../../router/client/trangchu.route")
module.exports = (app) => {
    app.use("https://webshopacc-12.onrender.com/", MainRoute)
}