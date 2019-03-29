import React from "react";

import Layout from "../layout/layout.jsx";

export default class Signup extends React.Component {

    constructor(props) {
        
        super(props);
        this.state = {
            username: "",
            password: "",
            repeatPassword: ""
        };
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

    repeatPasswordChanged = (event) => {

        this.setState({
            repeatPassword: event.target.value
        });
    }

    passwordsAreEqual = () => 
        this.state.password === this.state.repeatPassword;

    signup = () => {
        alert("implement signup on frontend")
    }

    render() {

        let errorMessage = <div />
        if (!this.passwordsAreEqual()) {
            errorMessage = <div>
                Passwords must match!
            </div>
        }

        console.log(this.passwordsAreEqual(), ' ', this.state.password, ' ' , this.state.repeatPassword)

        return <Layout>
            <h1>Signup</h1>
            <div>
                <p>Username</p>
                <input
                    type="text"
                    value={this.state.username}
                    onChange={this.usernameChanged} />
                <p>Password</p>
                <input
                    type="password"
                    value={this.state.password}
                    onChange={this.passwordChanged} />
                <p>Repeat password</p>
                <input
                    type="password"
                    value={this.state.repeatPassword}
                    onChange={this.repeatPasswordChanged} />
                {errorMessage}

                <button onClick={this.signup}>Sign up</button>
            </div>
        </Layout>
    }
}

