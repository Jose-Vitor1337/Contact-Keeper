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
const express_validator_1 = require("express-validator");
const authentication_1 = require("./../middleware/authentication");
const Contacts_1 = require("./../model/Contacts");
const router = express.Router();
// @route           GET api/contacts
// @description     Get all contacts from the user
// @access          Private 
router.get('/', authentication_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const contacts = yield Contacts_1.Contact.find({ user: req.user.id });
        res.json(contacts);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}));
// @route           POST api/contacts
// @description     Add a new contact for the user
// @access          Private
router.post('/', authentication_1.default, [
    express_validator_1.check('name', "Name is required").not().isEmpty()
], (req, res) => __awaiter(this, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
        // Add a contact with the basic fields and the ID user.
        const newContact = new Contacts_1.Contact({ name, email, phone, type, user: req.user.id });
        const contact = yield newContact.save();
        res.json(contact);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server Error" });
    }
}));
// @route           PUT api/contacts
// @description     Get all contacts from the user
// @access          Private
router.put('/:id', authentication_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () {
    // The new data for the contact update...
    const { name, email, phone, type } = req.body;
    //  This is the new contact value after Update
    let contactField = {};
    if (name)
        contactField.name = name;
    if (email)
        contactField.email = email;
    if (phone)
        contactField.phone = phone;
    if (type)
        contactField.type = type;
    try {
        let contact = yield Contacts_1.Contact.findById(req.params.id);
        if (!contact)
            return res.status(404).json({ msg: "Contact not found" });
        // Make sure that the User have the contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" });
        }
        contact = yield Contacts_1.Contact.findByIdAndUpdate(req.params.id, { $set: contactField }, { new: true });
        res.json(contact);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server Error " });
    }
}));
// @route           DELETE api/contacts
// @description     Delete a contact
// @access          Private
router.delete('/:id', authentication_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let contact = yield Contacts_1.Contact.findById(req.params.id);
        if (!contact)
            return res.status(404).json({ msg: "Contact not found" });
        // Make sure that the User have the contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" });
        }
        yield Contacts_1.Contact.findByIdAndRemove(req.params.id);
        res.json({ msg: "Contact Remove" });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server Error" });
    }
}));
module.exports = router;
