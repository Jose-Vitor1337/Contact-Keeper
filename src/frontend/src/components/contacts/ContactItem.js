"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var prop_types_1 = require("prop-types");
var ContactItem = function (props) {
    var _a = props.contact, name = _a.name, email = _a.email, phone = _a.phone, type = _a.type;
    return (<div className="card bg-light">
            <h3 className="text-primary text-left">
                {name}{' '} 
                <span style={{ float: 'right' }} className={'badge ' +
        (type === 'professional' ? 'badge-success' : 'badge-primary')}>
                    {type.charAt(0).toUpperCase() + type.slice(1) /* Make the First Letter UpperCase */}
                </span>
            </h3>

            <ul className="list"> 
                
                {email && (<li>
                        <i className="fas fa-envelope-open"></i> {email}
                    </li>)}
                
                {phone && (<li>
                        <i className="fas fa-phone"></i> {phone}
                    </li>)}
            </ul>

            <p>
                <button className="btn btn-dark btn-sm">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
            </p>
        </div>);
};
ContactItem.propTypes = {
    contact: prop_types_1.default.object.isRequired,
};
exports.default = ContactItem;
