require('dotenv').config();
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const PORT = process.env.PORT
const URL_FRONTEND = process.env.URL_FRONTEND
const routeClient = require("../backend/router/client/index.route")
const routeAdmin = require("../backend/router/admin/index.route")
const routeQTV = require("../backend/router/QTV/index.route")
const cors = require('cors')
const methodOverride = require('method-override');

app.use(cookieParser());
app.use(express.static("public"));
app.use(methodOverride('_method'));
const corsOptions = {
  origin: URL_FRONTEND, // Đảm bảo đây là URL frontend 
  credentials: true,  // Cho phép gửi cookie
};
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: true }))

routeClient(app)
routeAdmin(app)
routeQTV(app)
app.listen(PORT , () => {
  console.log(`Example app listening on port ${PORT}`)
})