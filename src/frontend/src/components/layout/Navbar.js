"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Navbar = function (props) {
    return (<div className="navbar bg-primary">   
            <h1>
                <i className={props.icon}/> {props.title}
            </h1>
            <ul>
                <li><react_router_dom_1.Link to='/'>Home</react_router_dom_1.Link></li>
                <li><react_router_dom_1.Link to='/about'>About</react_router_dom_1.Link></li>
            </ul>
        </div>);
};
Navbar.defaultProps = {
    title: 'Contack Keeper',
    icon: 'fas fa-id-card-alt'
};
exports.default = Navbar;
