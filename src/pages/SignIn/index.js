import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {signin} from "../../services/omgServer";


class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    componentWillMount() {
        document.getElementById('body').className = 'bg-gradient-primary'
    }

    toSignUp = async () => {
        await this.setSignMethod('up');
    }

    handleSignIn = async () => {
        if (this.state.email !== "" || this.state.password !== ""){
            let res = await signin(this.state.email, this.state.password);
            await this.setApiKey(res.token);
            return <Redirect to="/"/>;
        }
        else{

        }
    };

    setEmail = (event) => this.setState({email: event.target.value});
    setPassword = (event) => this.setState({password: event.target.value});

    render() {
        return (
            <div>
                <div id="wrapper d-flex flex-column">
                    <div className="row ml-4 mt-4 d-flex flex-row align-items-center">
                        <i className="fas fa-chart-area fa-4x text-white mb-1"/>
                        <div className="ml-3 h1 mb-0 text-white font-weight-bold">OMG</div>
                    </div>
                    {/* <!-- Outer Row --> */}
                    <div className="row justify-content-center">
                        <div className="card o-hidden border-0 shadow-lg my-5" style={{width: "20rem"}}>
                            <div className="card-body">
                                {/* <!-- Nested Row within Card Body --> */}
                                <div className="p-3">
                                    <div className="row justify-content-center flex-column">
                                        <h1 className="h3 text-gray-900 mb-4">Sign in</h1>
                                        <div className="user">
                                            <div className="form-group">
                                                <input type="email" className="form-control form-control-user"
                                                       id="exampleInputEmail" aria-describedby="emailHelp"
                                                       placeholder="Email"
                                                       onChange={this.setEmail}/>
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-user"
                                                       id="exampleInputPassword" placeholder="Password"
                                                       onChange={this.setPassword}/>
                                            </div>
                                            <button className="btn btn-primary btn-user btn-block"
                                                    onClick={this.handleSignIn}>
                                                Login
                                            </button>
                                        </div>
                                    </div>
                                    <hr className="mt-4"/>
                                    <div className="row justify-content-center flex-column">
                                        <div className="text-center">
                                            <a className="small">Forgot Password?</a>
                                        </div>
                                        <div className="text-center">
                                            <a className="small" onClick={this.toSignUp}>Create an Account!</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    async setApiKey(apiKey) {
        await this.props.dispatch({type: 'SETKEY', value: apiKey});
    }

    async setSignMethod(method) {
        await this.props.dispatch({type: 'SETMETHOD', value: method});
    }

}

const mapStateToProps = (state) => {
    return {
        apiKey: state.storeApiKey.apiKey,
        method: state.storeSignMethod.method
    }
}

export default connect(mapStateToProps)(SignIn);
