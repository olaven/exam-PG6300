/**
 * NOTE: this file is partially copied from:
 * https://github.com/arcuri82/web_development_and_api_design/blob/master/les08/authentication/src/client/signup.jsx
 */

import React from "react";
import { Input, Button } from "reactstrap"

export class Signup extends React.Component {

    constructor(props) {
        
        super(props);
        this.state = {
            email: "",
            givenName: "",
            familyName: "", 
            dateOfBirth: "", 
            location: "", 
            password: "",
            repeatPassword: "",
            serverErrorMessage: null
        };
    }


    emailChanged = (event) => {

        this.setState({
            email: event.target.value
        });
    };

    givenNameChanged = (event) => {

        this.setState({
            givenName: event.target.value
        });
    };


    familyNameChanged = (event) => {

        this.setState({
            familyName: event.target.value
        });
    };


    dateOfBirthChanged = (event) => {

        this.setState({
            dateOfBirth: event.target.value
        });
    };

    locationChanged = (event) => {

        this.setState({
            location: event.target.value
        });
    };

        

    passwordChanged = (event) => {

        this.setState({
            password: event.target.value
        });
    };

    repeatPasswordChanged = (event) => {

        this.setState({
            repeatPassword: event.target.value
        });
    };

    passwordsAreEqual = () => 
        this.state.password === this.state.repeatPassword;

    signup = async () => {
        
        const { email, password, repeatPassword } = this.state;


        if (repeatPassword !== password) {
            this.setState({ serverErrorMessage: "Passwords do not match" });
            return;
        }

        const url = "/api/signup";
        const payload = { email: email, password: password };
        
        let response;

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

        } catch (err) {
            console.log(
                "error connecting to server"
            )
            this.setState({ serverErrorMessage: "Failed to connect to server: " + err });
            return;
        }


        if (response.status === 400) {
            this.setState({ serverErrorMessage: "Invalid email/password" });
            return;
        }

        if (response.status !== 201) {
            this.setState({
                serverErrorMessage:
                    "Error when connecting to server: status code " + response.status
            });
            return;
        }

        this.setState({ serverErrorMessage: null });
        
        const loggedInUser = {
            email: this.state.email,
            givenName: this.state.givenName,
            familyName: this.state.familyName,
            dateOfBirth: this.state.dateOfBirth,
            location: this.state.location
        }; 

        this.props.updateLoggedInUser(loggedInUser);
        this.props.history.push("/");
    };

    render() {

        let passwordErrorMessge = <div />
        if (!this.passwordsAreEqual()) {
            passwordErrorMessge = <div>
                Passwords must match!
            </div>
        }

        let serverError = <div />
        if (!this.state.serverErrorMessage !== null) {
            serverError = <div>
                {this.state.serverErrorMessage}
            </div>
        }

        return <div>
            <h1>Signup</h1>
            <div>
                <Input
                    type="text"
                    value={this.state.email}
                    onChange={this.emailChanged}
                    placeholder="email"
                    id="emailInput" />
                <Input
                    type="text"
                    value={this.state.givenName}
                    onChange={this.givenNameChanged}
                    placeholder="First name"
                    id="givenNameInput" />
                <Input
                    type="text"
                    value={this.state.familyName}
                    onChange={this.familyNameChanged}
                    placeholder="Last name"
                    id="familyNameInput" />
                <Input
                    type="text"
                    value={this.state.dateOfBirth}
                    onChange={this.dateOfBirthChanged}
                    placeholder="Date of birth"
                    id="dateOfBirthInput" />
                <Input
                    type="text"
                    value={this.state.location}
                    onChange={this.locationChanged}
                    placeholder="Location"
                    id="locatonInput" />
                <Input
                    type="password"
                    value={this.state.password}
                    onChange={this.passwordChanged}
                    placeholder="password"
                    id="passwordInput" />
                <Input
                    type="password"
                    value={this.state.repeatPassword}
                    onChange={this.repeatPasswordChanged}
                    placeholder="repeat password"
                    id="repeatPasswordInput" />
                {passwordErrorMessge}

                <Button 
                    color="primary"
                    onClick={this.signup}
                    id="signupButton">
                    Sign up
                </Button>
                    
                {serverError}
            </div>
        </div>
    }
}

