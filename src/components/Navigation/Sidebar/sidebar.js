import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Sidebar extends Component {
    render() {
        return (
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/* <!-- Sidebar - Brand --> */}
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/index">
                    <div className="sidebar-brand-icon">
                        <i className="fas fa-chart-area"/>
                    </div>
                    <div className="sidebar-brand-text mx-3">OMG</div>
                </Link>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider my-0"/>

                {/* <!-- Nav Item - Index --> */}
                <li className="nav-item">
                    <Link className="nav-link" to="/index">
                        <i className="fas fa-fw fa-home"/>
                        <span>Home</span></Link>
                </li>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider"/>

                {/* <!-- Heading --> */}
                <div className="sidebar-heading">
                    Charts
                </div>

                {/* <!-- Nav Item - Index --> */}
                <li className="nav-item">
                    <Link className="nav-link" to="/chartsbytag">
                        <i className="fas fa-fw fa-tag"/>
                        <span>By Tag</span></Link>
                </li>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider"/>

                {/* <!-- Heading --> */}
                <div className="sidebar-heading">
                    Tools
                </div>

                {/* <!-- Nav Item - upload data --> */}
                <li className="nav-item">
                    <Link className="nav-link" to="/fileupload">
                        <i className="fas fa-fw fa-file-upload"/>
                        <span>Upload data</span></Link>
                </li>

                {/* <!-- Nav Item - tags manager --> */}
                <li className="nav-item">
                    <Link className="nav-link" to="/index">
                        <i className="fas fa-fw fa-tags"/>
                        <span>Tags manager</span></Link>
                </li>

            </ul>)
    }
}

export default Sidebar;
