import React, {Component} from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import Sidebar from "./components/Navigation/Sidebar/sidebar";
import Topbar from "./components/Navigation/Topbar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

//Pages
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import Upload from "./pages/Upload/upload";
import ChartsByTag from "./pages/ChartsByTag";

class Routes extends Component {
    rndr() {
        if (this.props.apiKey === ''){
            if (this.props.method === 'in'){
                return <SignIn/>
            }
            if (this.props.method === 'up'){
                return  <SignUp/>
            }
        }
        else {
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

                                <div className="row">

                                    <Switch>
                                        <Redirect from='/dashboard?' to='/'/>
                                        <Route exact path="/" component={Index}/>
                                        <Route path="/index" component={Index}/>
                                        <Route path="/fileupload" component={Upload}/>
                                        <Route path="/chartsbytag" component={ChartsByTag}/>
                                        <Route path="*" component={NotFound}/>
                                    </Switch>

                                </div>

                            </div>
                            {/* <!-- End of Main Content --> */}

                            {/* <!-- Footer --> */}
                            <footer className="row sticky-footer bg-white">
                                <div className="container my-auto">
                                    <div className="copyright text-center my-auto">
                                        <span>Copyright &copy; OMGWeb 2021</span>
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

const mapStateToProps = (state) => {
    return {
        apiKey: state.storeApiKey.apiKey,
        method: state.storeSignMethod.method
    }
}

export default connect(mapStateToProps)(Routes);
