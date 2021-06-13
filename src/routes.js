import React, {Component} from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import Sidebar from "./components/Navigation/Sidebar";
import Topbar from "./components/Navigation/Topbar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

//Pages
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Import from "./pages/Import";
import ChartsByTag from "./pages/ChartsByTag";

/**
 * Routing component. Manage authentification too.
 * @return BrowserRouter
 */
class Routes extends Component {
    rndr() {
        if (this.props.apiKey === ''){  // if user is not authenticated (apiKey not stored on the redux store)
            // returns the appropriate authentication page based on the method registered in the redux store
            if (this.props.method === 'in'){
                return <SignIn/>
            }
            if (this.props.method === 'up'){
                return  <SignUp/>
            }
        }
        else {  // if user is authenticated return the static parts of the website and the switch router
            return (
                <div>
                    {/* <!-- Page Wrapper --> */}
                    <div id="wrapper">
                        {/* <!-- Sidebar --> */}
                        <Sidebar/>
                        {/* <!-- End of Sidebar --> */}
                        {/* <!-- Content Wrapper --> */}
                        <div id="content-wrapper" className="d-flex flex-column">
                            {/* <!-- Main Content --> */}
                            <div id="content">
                                {/* <!-- Topbar --> */}
                                <Topbar/>
                                {/* <!-- End of Topbar --> */}
                                {/* <!-- Router switch --> */}
                                <div className="row">
                                    <Switch>
                                        <Redirect from='/dashboard?' to='/'/>
                                        <Route exact path="/" component={Home}/>
                                        <Route path="/index" component={Home}/>
                                        <Route path="/fileupload" component={Import}/>
                                        <Route path="/chartsbytag" component={ChartsByTag}/>
                                        <Route path="*" component={NotFound}/>
                                    </Switch>
                                </div>
                                {/* <!-- End of Router switch --> */}
                            </div>
                            {/* <!-- End of Main Content --> */}
                            {/* <!-- Footer --> */}
                            <footer className="row sticky-footer bg-white">
                                <div className="container my-auto">
                                    <div className="copyright text-center my-auto">
                                        <span>OMG web 2021</span>
                                    </div>
                                </div>
                            </footer>
                            {/* <!-- End of Footer --> */}
                        </div>
                        {/* <!-- End of Content Wrapper --> */}
                    </div>
                    {/* <!-- End of Page Wrapper --> */}
                    {/* <!-- Scroll to Top Button--> */}
                    <a className="scroll-to-top rounded" href="#page-top">
                        <i className="fas fa-angle-up"/>
                    </a>
                </div>
            );
        }
    }

    render() {
        return (
            <BrowserRouter>
                {this.rndr()}
            </BrowserRouter>
        );
    }
}

/**
 * Function that map apiKey and signMethod states to props
 *
 * @param state
 * @return {{apiKey: (string|*), method}}
 */
const mapStateToProps = (state) => {
    return {
        apiKey: state.storeApiKey.apiKey,
        method: state.storeSignMethod.method
    }
}

export default connect(mapStateToProps)(Routes);
