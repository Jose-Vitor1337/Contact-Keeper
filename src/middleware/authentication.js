"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var common_1 = require("./../common/common");
var validadeToken = function (req, res, next) {
    // Get token from the header
    var token = req.header('x-auth-token');
    // Check if is not a token
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
    try {
        // decoding the token passed 
        var decodedToken = jwt.verify(token, common_1.default.jwtSecret);
        req.user = decodedToken.user;
        next();
    }
    catch (error) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};
exports.default = validadeToken;
