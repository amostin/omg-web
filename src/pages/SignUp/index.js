import React, {Component} from 'react';
import {Link, Redirect, useHistory} from 'react-router-dom';
import {connect} from "react-redux";
import Topbar from "../../components/Navigation/Topbar";
import {getAllTagsFromUserId, signin, signup} from "../../services/omgServer";
import * as timers from "timers";


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: '',
            error: '',
        }
    }

    componentWillMount() {
        document.getElementById('body').className = 'bg-gradient-primary'
    }

    handleSignUp = async () => {
        this.setState({'error': ''})
        this.removeDangerInput(['inputFirstName', 'inputLastName', 'inputEmail', 'inputPassword', 'inputConfirmPassword']);
        if (this.state.password !== this.state.confirmPassword) {
            this.dangerInput(['inputPassword', 'inputConfirmPassword']);
            await this.setState({'error': 'Passwords must match'});
        } else {
            if (this.state.password.length < 8) {
                this.dangerInput(['inputPassword', 'inputConfirmPassword']);
                await this.setState({'error': 'Password must be at least 8 characters long'});
            }
        }
        if (!this.isValidEmail(this.state.email)) {
            this.dangerInput(['inputEmail']);
            await this.setState({'error': "Incorrect email"});
        }
        if (!this.isValidName(this.state.firstName)) {
            this.dangerInput(['inputFirstName']);
            await this.setState({'error': "You can't use special characters for names"})
        }
        if (!this.isValidName(this.state.lastName)) {
            this.dangerInput(['inputLastName']);
            await this.setState({'error': "You can't use special characters for names"})
        }
        if (!this.state.error) {
            document.getElementById('smallButtons').classList.add('d-none');
            document.getElementById('btnSignUp').classList.remove('btn-primary');
            document.getElementById('btnSignUp').classList.add('disabled');
            document.getElementById('btnSignUp').classList.add('btn-secondary');
            let response = await signup({
               'firstName': this.state.firstName,
               'lastName': this.state.lastName,
               'email': this.state.email,
               'password': this.state.password
            });
            console.log(response);
            this.showApiResponse(response.status);
        }
    };

    dangerInput(inputs) {
        for (let input of inputs) {
            document.getElementById(input).classList.add('border-danger');
        }
    }

    removeDangerInput(inputs) {
        for (let input of inputs) {
            document.getElementById(input).classList.remove('border-danger');
        }
    }

    showError() {
        let message = '';
        if (this.state.error !== '') {
            document.getElementById('horizLine').classList.remove('mt-4');
            document.getElementById('horizLine').classList.add('mt-0');
            message = (
                <div className="text-danger d-flex justify-content-center mt-3 mb-0">
                    <p>{this.state.error}</p>
                </div>
            );
        }
        return message;
    }

    showApiResponse(response) {
        document.getElementById('btnSignUp').classList.remove('btn-primary');
        document.getElementById('btnSignUp').classList.add('disabled');
        document.getElementById('btnSignUp').classList.add('btn-secondary');
        return (<div className="text-primary d-flex justify-content-center mt-3 mb-0">
                    <p>response</p>
                </div>);
    }

    isValidName(name) {
        let re = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
        return re.test(String(name).toLowerCase());
    }

    isValidEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    setFirstName = (event) => this.setState({firstName: event.target.value});
    setLastName = (event) => this.setState({lastName: event.target.value});
    setEmail = (event) => this.setState({email: event.target.value});
    setPassword = (event) => this.setState({password: event.target.value});
    setConfirmPassword = (event) => this.setState({confirmPassword: event.target.value});
    toSignIn = async () => await this.setSignMethod('in');

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
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body">
                                {/* <!-- Nested Row within Card Body --> */}
                                <div className="p-3">
                                    <div className="row justify-content-center flex-column">
                                        <h1 className="h3 text-gray-900 mb-4">Create an account</h1>
                                        <div className="user justify-content-center">
                                            <div className="form-group d-flex flex-row">
                                                <input type="text" className="form-control form-control-user" id="inputFirstName" aria-describedby="firstName" placeholder="First name" onChange={this.setFirstName}/>
                                                <input type="text" className="form-control form-control-user ml-2" id="inputLastName" aria-describedby="lastName" placeholder="Last name" onChange={this.setLastName}/>
                                            </div>
                                            <div className="form-group">
                                                <input type="email" className="form-control form-control-user" id="inputEmail" aria-describedby="emailHelp" placeholder="Email" onChange={this.setEmail}/>
                                            </div>
                                            <div id="formGroupPassword" className="form-group d-flex flex-row">
                                                <input type="password" className="form-control form-control-user" id="inputPassword" placeholder="Password" onChange={this.setPassword}/>
                                                <input type="password" className="form-control form-control-user ml-2" id="inputConfirmPassword" placeholder="Confirm password" onChange={this.setConfirmPassword}/>
                                            </div>
                                            <button id="btnSignUp" className="btn btn-primary btn-user btn-block" onClick={this.handleSignUp}>
                                                Sign up
                                            </button>
                                            {this.showError()}
                                        </div>
                                    </div>
                                    <hr id="horizLine" className="mt-4"/>
                                    <div id="smallButtons" className="row justify-content-center flex-column">
                                        <div className="text-center">
                                            <button className="btn btn-link">Forgot Password?</button>
                                        </div>
                                        <div className="text-center">
                                            <button className="btn btn-link" onClick={this.toSignIn}>Already an account ? Sign in!</button>
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

export default connect(mapStateToProps)(SignUp);
