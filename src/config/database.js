"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const common_1 = require("./../common/common");
// const database = config.get('mongoURI') 
// import * as config from 'config'
const createConnection = () => {
    console.log("Connecting...");
    mongoose.connect(common_1.default.url, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("MongoDB Connected: " + common_1.default.url);
    }).catch((error) => {
        console.error("Failed Connection: " + error);
    });
};
// Vai funcionar apenas em casa por causa do proxy
/* const connectDatabase = () => {
    console.log("Connecting...")
    mongoose.connect(database, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then(() => {
        console.log("MongoDB Connected: " + database)
    }).catch( error => {
        console.error("Failed Connection: " + error)
        process.exit(1)
    });
} */
exports.default = createConnection;
