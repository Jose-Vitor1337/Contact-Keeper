"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enviroment = {
    url: process.env.DB_URL || 'mongodb+srv://jose123:jose123@mycluster-jf4qr.mongodb.net/test?retryWrites=true&w=majority',
    port: process.env.PORT || 5000,
    jwtSecret: "mysecret"
};
exports.default = enviroment;
