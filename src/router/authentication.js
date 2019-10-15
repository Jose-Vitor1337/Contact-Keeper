"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const common_1 = require("./../common/common");
const User_1 = require("./../model/User");
const express_validator_1 = require("express-validator");
const authentication_1 = require("./../middleware/authentication");
const router = express.Router();
// @route           GET api/authentication
// @description     Get logged in user
// @access          Private
router.get('/', authentication_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = yield (req.user);
        res.json(user);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server Error" });
    }
}));
// @route           POST api/authentication
// @description     Authenticate user and get is token
// @access          Private
router.post('/', [
    express_validator_1.check("email", "Please include a valid email").isEmail(),
    express_validator_1.check("password", "Please write your password").exists()
], (req, res) => __awaiter(this, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Destructing the data form the request.body
    const { email, password } = req.body;
    try {
        let user = yield User_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Email e/or password invalid" });
        }
        // See if the password get in the email is equal to the password pass in the authentication
        const isMatch = yield bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Email e/or password invalid" });
        }
        const payload = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        };
        jwt.sign(payload, common_1.default.jwtSecret, {
            expiresIn: 5 * 60 // 5 minutes to expire
        }, (error, token) => {
            if (error) {
                throw error;
            }
            res.json({ token });
        });
    }
    catch (error) {
        console.log(error.message);
    }
}));
module.exports = router;
