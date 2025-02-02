
const express = require('express')
const route = express.Router();
const Text = require("../../controllers/client/text")
route.get("/users", Text.Test)
module.exports = route