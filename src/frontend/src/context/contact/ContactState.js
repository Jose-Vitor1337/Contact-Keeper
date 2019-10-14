"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var uuid_1 = require("uuid");
var ContactContext_1 = require("./ContactContext");
var ContactReducer_1 = require("./ContactReducer");
var types_1 = require("./types");
var ContactState = function (props) {
    var initialState = {
        contacts: [
            {
                id: 1,
                name: "Vitor",
                email: 'Vitor@gmail.com',
                phone: "9943-2342",
                type: "professional"
            },
            {
                id: 2,
                name: "Jose",
                email: 'Jose@gmail.com',
                phone: "3242-4213",
                type: "personal"
            },
            {
                id: 3,
                name: "Maria",
                email: 'Maria@gmail.com',
                phone: "4323-1232",
                type: "professional"
            }
        ]
    };
    // Pass the states and the dispatch (that is each funcion will have is a action in the ContactReducer)
    var _a = react_1.useReducer(ContactReducer_1.default, initialState), state = _a[0], dispatch = _a[1];
    // Add Contact
    var addContact = function (contact) {
        contact.id = uuid_1.default.v4();
        dispatch({ type: types_1.ADD_CONTACT, payload: contact });
    };
    // Delete Contact
    // Set Current Contact
    // Clear Current Contact
    // Update Contact
    // Filter Contacts
    // Clear Filter
    return (<ContactContext_1.default.Provider value={{
        contacts: state.contacts,
        addContact: addContact
    }}>
            {props.children}
        </ContactContext_1.default.Provider>);
};
exports.default = ContactState;
