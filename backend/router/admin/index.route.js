const MainRoute = require("../../router/admin/tongquanadmin")
module.exports = (app) => {
    app.use("/admin", MainRoute)
}