const MainRoute = require("../../router/client/trangchu.route")
module.exports = (app) => {
    app.use("https://webshopacc.vercel.app", MainRoute)
}