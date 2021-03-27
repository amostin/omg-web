import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";


//Pages
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Sidebar from "./components/Navigation/Sidebar";
import Topbar from "./components/Navigation/Topbar";
import Index from "./pages/Index";
import UploadFile from "./pages/Upload";
import ChartsByTag from "./pages/ChartsByTag";

const Routes = () => (
    <BrowserRouter>
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

                        <Switch>
                            <Route exact path="/" component={Dashboard}/>
                            <Route exact path="/dashboard" component={Dashboard}/>
                            <Route path="/signup" component={SignUp}/>
                            <Route path="/index" component={Index}/>
                            <Route path="/fileupload" component={UploadFile}/>
                            <Route path="/chartsbytag" component={ChartsByTag}/>
                            <Route path="*" component={NotFound}/>
                        </Switch>

                    </div>
                    {/* <!-- End of Main Content --> */}

                    {/* <!-- Footer --> */}
                    <footer className="sticky-footer bg-white">
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
    </BrowserRouter>
);

export default Routes;
