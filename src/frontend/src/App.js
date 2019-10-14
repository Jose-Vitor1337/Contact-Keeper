"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Navbar_1 = require("./components/layout/Navbar");
var Home_1 = require("./components/pages/Home");
var About_1 = require("./components/pages/About");
var ContactState_1 = require("./context/contact/ContactState");
require("./App.css");
var App = function () {
    return (<ContactState_1.default>
        <react_router_dom_1.BrowserRouter>
            <react_1.Fragment>
                  <Navbar_1.default />
                  <div className="container">
                      <react_router_dom_1.Switch>
                          <react_router_dom_1.Route exact path='/' component={Home_1.default}/>
                          <react_router_dom_1.Route exact path='/about' component={About_1.default}/>
                      </react_router_dom_1.Switch>
                  </div>  
            </react_1.Fragment>
        </react_router_dom_1.BrowserRouter>
    </ContactState_1.default>);
};
exports.default = App;
