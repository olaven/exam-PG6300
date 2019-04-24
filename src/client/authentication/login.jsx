/**
 * NOTE: this file is partially copied from:
 * https://github.com/arcuri82/web_development_and_api_design/blob/master/les08/authentication/src/client/login.jsx
 */

import React from "react";
import { Button, Input } from 'reactstrap';

export class Login extends React.Component {

    constructor(props) {
        
        super(props);
        this.state = {
            email: "",
            password: "",
            serverErrorMessage: null
        }
    }

    emailChanged = (event) => {

        this.setState({
            email: event.target.value
        });
    }

    passwordChanged = (event) => {

        this.setState({
            password: event.target.value 
        });
    }

    login = async () => {
        
        const { email, password } = this.state;
        const url = "/api/login";

        const payload = { 
            email: email, 
            password: password 
        };

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
            this.setState({ serverErrorMessage: "Failed to connect to server: " + err });
            return;
        }

        if (response.status === 401) {
            
            this.setState({ serverErrorMessage: "Invalid email/password" });
            return;
        }

        if (response.status !== 204) {
            this.setState({
                serverErrorMessage:
                    "Error when connecting to server: status code " + response.status
            });
            return;
        }

    

        this.setState({ serverErrorMessage: null });
        this.props.updateLoggedInUser({
            email: this.state.email
        });
        this.props.history.push("/");
    }

    render() {

        let errorMessage = <div/>
        if (this.state.serverErrorMessage !== null) {
            errorMessage = <div>
                {this.state.serverErrorMessage}
            </div>
        }

        return <div>
            <h1>login</h1>
            <Input 
                type="text"
                value={this.state.email}
                onChange={this.emailChanged}
                placeholder="email"
                id="emailInput"/>
            <Input
                type="password"
                value={this.state.password}
                onChange={this.passwordChanged}
                placeholder="password"
                id="passwordInput"/>
            <Button 
                color="primary"
                onClick={this.login}
                id="loginButton">
                Login
            </Button>
            
            {errorMessage}
        </div>
    }
}

