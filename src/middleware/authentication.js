"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const common_1 = require("./../common/common");
const validadeToken = (req, res, next) => {
    // Get token from the header
    const token = req.header('x-auth-token');
    // Check if is not a token
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
    try {
        // decoding the token passed 
        const decodedToken = jwt.verify(token, common_1.default.jwtSecret);
        req.user = decodedToken.user;
        next();
    }
    catch (error) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};
exports.default = validadeToken;
