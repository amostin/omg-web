import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {clickMenuOpen} from '../../../redux/actions';

class Sidebar extends Component {
    // componentDidMount() {
    //   document.getElementById('body').className = 'page-top';
    // }
    // state = {
    //   sidebarToggled: false,
    // }

    // handleSideBarToggle() {
    //   if (this.sidebarToogled === true) {
    //     this.setState({ sidebarToggled: !this.state.sidebarToggled });
    //     document.getElementById('body').className = 'page-top sidebar-toggled';
    //   } else {
    //     this.setState({ sidebarToggled: !this.state.sidebarToggled });
    //     document.getElementById('body').className = 'page-top';
    //   }

    // }

    render() {
        const {clickMenuOpen, toggled} = this.props;
        return (
            <ul className={toggled ? 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled' : 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion'}
                id="accordionSidebar">

                {/* <!-- Sidebar - Brand --> */}
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/index">
                    <div className="sidebar-brand-icon">
                        <i className="fas fa-chart-area"/>
                    </div>
                    <div className="sidebar-brand-text mx-3">OMG WEB</div>
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

                {/* <!-- Sidebar Toggler (Sidebar) --> */}
                <div className="text-center d-none d-md-inline">
                    <button onClick={() => {
                        clickMenuOpen()
                    }} className="rounded-circle border-0" id="sidebarToggle"/>
                </div>

            </ul>)
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({clickMenuOpen}, dispatch);

const mapStateToProps = store => ({
    toggled: store.menuState.menuOpen
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
