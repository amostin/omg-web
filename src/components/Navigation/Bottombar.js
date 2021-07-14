import React, {Component} from 'react';
import {Nav, NavItem} from "reactstrap";
import {NavLink} from "react-router-dom";

class Bottombar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabs: [{
                route: "/tagshistory",
                icon: "fa-history",
                label: "History"
            },{
                route: "/tagactivation",
                icon: "fa-plus-circle",
                label: "Activate"
            },{
                route: "/tagsmanager",
                icon: "fa-wrench",
                label: "Manage"
            }]
        }
    }

    render() {
        return (
            <nav className="navbar-nav bg-primary navbar-expand navbar-dark fixed-bottom" role="navigation">
                <Nav className="w-100 mt-2">
                    <div className=" d-flex flex-row justify-content-around w-100">
                        {
                            this.state.tabs.map((tab, index) =>(
                                <NavItem className={"nav-item"} key={`tab-${index}`}>
                                    <NavLink activeStyle={{fontWeight: "bold", color: "white"}} style={{color: "#dddfeb"}} to={tab.route} className="nav-link" activeClassName="active">
                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                            <i className={"fas fa-lg fa-fw " + tab.icon}/>
                                            <div className={"small mt-1"}>{tab.label}</div>
                                        </div>
                                    </NavLink>
                                </NavItem>
                            ))
                        }
                    </div>
                </Nav>
            </nav>
        );
    }

}

export default Bottombar;
