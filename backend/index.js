require('dotenv').config();
const cors = require('cors')
const express = require('express')
const app = express()
const path = require('path');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 10000
const URL = process.env.URL_FRONTEND
const routeClient = require("../backend/router/client/index.route")
const routeAdmin = require("../backend/router/admin/index.route")
const routeQTV = require("../backend/router/QTV/index.route")
// const routeGoogle = require("../backend/router/Google/index.route")
const methodOverride = require('method-override');

app.use(cookieParser());
app.use(express.static("public"));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
const corsOptions = {
  origin: `${URL}`, // Đảm bảo đây là URL frontend 
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true,  // Cho phép gửi cookie
};
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: true }))


routeClient(app)
routeAdmin(app)
routeQTV(app)
// routeGoogle(app)
app.listen(PORT , () => {
  console.log(`Example app listening on port ${PORT}`)
})