/**
 * NOTE: this file is partially copied from:
 * https://github.com/arcuri82/web_development_and_api_design/blob/master/les08/authentication/src/client/login.jsx
 */

import React from "react";

import Layout from "../layout/layout"

export default class Login extends React.Component {

    constructor(props) {
        
        super(props);
        this.state = {
            username: "",
            password: "",
            serverErrorMessage: null
        }
    }

    usernameChanged = (event) => {

        this.setState({
            username: event.target.value
        });
    }

    passwordChanged = (event) => {

        this.setState({
            password: event.target.value 
        });
    }

    login = async () => {
        
        const { username, password } = this.state;
        const url = "/api/login";

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
            this.setState({ serverErrorMessage: "Failed to connect to server: " + err });
            return;
        }

        if (response.status === 401) {
            this.setState({ serverErrorMessage: "Invalid username/password" });
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
        this.props.updateLoggedInUser(username);
        this.props.history.push("/");
    }

    render() {

        let errorMessage = <div/>
        if (this.state.serverErrorMessage !== null) {
            errorMessage = <div>
                {this.state.serverErrorMessage}
            </div>
        }

        return <Layout>
            <h1>login</h1>
            
            <p>Username</p>
            <input 
                type="text"
                value={this.state.username}
                onChange={this.usernameChanged}/>

            <p>Password</p>
            <input
                type="password"
                value={this.state.password}
                onChange={this.passwordChanged} />

            <button onClick={this.login}>Login</button>
            {errorMessage}

            {this.props.username + "Her er jeg "}
        </Layout>
    }
}

