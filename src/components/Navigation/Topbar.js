import React, {Component} from 'react';
import {Link} from "react-router-dom";

/**
 * This is the topbar of the web application. Allows user to access the application and account settings
 */
class Topbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                {/* <!-- Topbar Navbar --> */}
                <ul className="navbar-nav ml-auto">

                    <div className="topbar-divider d-none d-sm-block"/>

                    {/* <!-- Nav Item - User Information --> */}
                    <li className="nav-item dropdown no-arrow">
                        <div className="nav-link dropdown-toggle" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="mr-2 d-none d-lg-inline text-gray-600">User</span>
                            <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" alt="user"/>
                        </div>
                        {/* <!-- Dropdown - User Information --> */}
                        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                            <div className="dropdown-item">
                                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"/>
                                Profile
                            </div>
                            <div className="dropdown-item">
                                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"/>
                                Settings
                            </div>
                            <div className="dropdown-divider"/>
                            <Link className="dropdown-item" to="/index" data-toggle="modal" data-target="#logoutModal">
                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"/>
                                Logout
                            </Link>
                        </div>
                    </li>

                </ul>

            </nav>

        )
    }
}

export default Topbar;
