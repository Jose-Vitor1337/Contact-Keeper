"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ContactItem_1 = require("./ContactItem");
var ContactContext_1 = require("./../../context/contact/ContactContext");
var Contacts = function () {
    var contactContext = react_1.useContext(ContactContext_1.default);
    // destructoring
    var contacts = contactContext.contacts;
    return (<react_1.Fragment>
            {contacts.map(function (contact) { return (<ContactItem_1.default key={contact.id} contact={contact}/>); })}
        </react_1.Fragment>);
};
exports.default = Contacts;
