"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./config/database");
const common_1 = require("./common/common");
const cors_1 = require("cors");
const express = require("express");
const app = express();
app.get('/', (req, res) => res.json({ msg: "Welcome to the Contact Keeper API, in the BackEnd" }));
app.use(cors_1());
// Connect Database MongoDB
database_1.default();
// Init Middleware
app.use(express.json());
// Define our Router from de Contexts Api from this aplication
app.use('/api/users', require('./router/users'));
app.use('/api/authentication', require('./router/authentication'));
app.use('/api/contacts', require('./router/contacts'));
// Creating a local server
app.listen(common_1.default.port, () => console.log(`The Server start on the port ${common_1.default.port}`));
