import React, {Component} from 'react';

class Topbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

            {/* <!-- Topbar Navbar --> */}
            <ul className="navbar-nav ml-auto">

              <div className="topbar-divider d-none d-sm-block"/>

              {/* <!-- Nav Item - User Information --> */}
              <li className="nav-item dropdown no-arrow">
                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="mr-2 d-none d-lg-inline text-gray-600">User</span>
                  <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60"  alt="user picture"/>
                </a>
                {/* <!-- Dropdown - User Information --> */}
                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"/>
                    Profile
                      </a>
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"/>
                    Settings
                      </a>
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"/>
                    Activity Log
                      </a>
                  <div className="dropdown-divider"/>
                  <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"/>
                    Logout
                      </a>
                </div>
              </li>

            </ul>

          </nav>

        )
    }
}

export default Topbar;
