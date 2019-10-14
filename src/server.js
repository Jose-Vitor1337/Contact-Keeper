"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("./config/database");
var common_1 = require("./common/common");
var cors_1 = require("cors");
var express = require("express");
var app = express();
app.get('/', function (req, res) { return res.json({ msg: "Welcome to the Contact Keeper API, in the BackEnd" }); });
// Connect Database MongoDB
database_1.default();
// Init Middleware
app.use(express.json());
app.use(cors_1.default());
// Define our Router from de Contexts Api from this aplication
app.use('/api/users', require('./router/users'));
app.use('/api/authentication', require('./router/authentication'));
app.use('/api/contacts', require('./router/contacts'));
// Creating a local server
app.listen(common_1.default.port, function () { return console.log("The Server start on the port " + common_1.default.port); });
