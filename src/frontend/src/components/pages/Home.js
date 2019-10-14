"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Contacts_1 = require("./../contacts/Contacts");
var ContactForm_1 = require("./../contacts/ContactForm");
var Home = function () {
    return (<div className='grid-2'>
            <div>
               <ContactForm_1.default />
            </div>
            <div>
                <Contacts_1.default />
            </div>
        </div>);
};
exports.default = Home;
