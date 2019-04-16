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
            username: "",
            password: "",
            repeatPassword: "",
            serverErrorMessage: null
        };
    }


    usernameChanged = (event) => {

        this.setState({
            username: event.target.value
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
        
        const { username, password, repeatPassword } = this.state;


        if (repeatPassword !== password) {
            this.setState({ serverErrorMessage: "Passwords do not match" });
            return;
        }

        const url = "/api/signup";
        const payload = { username: username, password: password };

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
            this.setState({ serverErrorMessage: "Invalid username/password" });
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
        this.props.updateLoggedInUser(username);
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
                    value={this.state.username}
                    onChange={this.usernameChanged}
                    placeholder="username"
                    id="usernameInput" />
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

