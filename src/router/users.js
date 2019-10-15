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
const express_validator_1 = require("express-validator");
const User_1 = require("./../model/User");
const router = express.Router();
// @route           POST api/users
// @description     Register a user
// @access          Public from everybody   
router.post('/', [
    express_validator_1.check("name", "Please enter a name").not().isEmpty(),
    express_validator_1.check("email", "Please include a valid a email").isEmail(),
    express_validator_1.check("password", "Please enter a password with at least 6 characters").isLength({ min: 6 })
], (req, res) => __awaiter(this, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Destructing the data form the request.body
    const { name, email, password } = req.body;
    try {
        let user = yield User_1.User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exist" });
        }
        user = new User_1.User({ name, email, password });
        const salt = yield bcrypt.genSalt(10);
        user.password = yield bcrypt.hash(password, salt);
        yield user.save();
        // the date tha will go with the User when he authentication with the system
        const payload = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        };
        // Creating the jasonWebToken configurations for the user
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
        console.error(error.message);
    }
}));
module.exports = router;
