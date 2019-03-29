import React from "react";

import Layout from "../layout/layout"

export default class Login extends React.Component {

    constructor(props) {
        
        super(props);
        this.state = {
            username: "",
            password: ""
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

    login = () => {
        alert("implement login on frontend")
    }

    render() {

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
        </Layout>
    }
}

