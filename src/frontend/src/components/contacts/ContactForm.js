"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ContactContext_1 = require("./../../context/contact/ContactContext");
var ContactForm = function () {
    var contactContext = react_1.useContext(ContactContext_1.default);
    var _a = react_1.useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    }), contact = _a[0], setContact = _a[1];
    // Destructing
    var name = contact.name, email = contact.email, phone = contact.phone, type = contact.type;
    // Change the state value of each input field that have
    var onChange = function (event) {
        var _a;
        setContact(__assign({}, contact, (_a = {}, _a[event.target.name] = event.target.value, _a)));
    };
    var onSubmit = function (event) {
        event.preventDefault();
        contactContext.addContact(contact);
        setContact({ name: '', email: '', phone: '', type: 'personal' });
    };
    return (<form onSubmit={onSubmit}>
            <h2 className="text-primary">Add Contact</h2>
            <input type="text" placeholder="Name" name="name" value={name} onChange={onChange}/>
            <input type="email" placeholder="Email" name="email" value={email} onChange={onChange}/>
            <input type="text" placeholder="Phone number" name="phone" value={phone} onChange={onChange}/>

            <h4>Contact Type</h4>
            <input type="radio" name="type" value="personal" onChange={onChange} checked={type === 'personal'}/>Personal{' '}
            <input type="radio" name="type" value="professional" onChange={onChange} checked={type === 'professional'}/>Professional{' '}

            <div>
                <input type="submit" value="Add Contact" className="btn btn-primary btn-block"/>
            </div>
        </form>);
};
exports.default = ContactForm;
