/**
 * 
 * NOTE: This file is partially copied from:
 * https://github.com/arcuri82/web_development_and_api_design/blob/master/les08/authentication/src/client/headerbar.jsx
 */
import React from "react";
import { Link } from 'react-router-dom';

import { codes } from "../../shared/http";

export default class Header extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            userCount: 0
        }
    }

    componentDidMount() {

        this.userSocket = new WebSocket("ws://" + window.location.host + "/usercount");
        this.userSocket.onmessage = event => {
        
            const userCount = JSON.parse(event.data).userCount;
            this.setState({
                userCount
            });
        }
        this.userSocket.onerror = error => {
            console.error("Websocket error: ", error)
        }
    }

    logout = async () => {
        const url = "/api/logout";

        let response;

        try {
            response = await fetch(url, { method: "post" });
        } catch (err) {
            alert("Failed to connect to server: " + err);
            return;
        }

        if (response.status !== codes.NO_CONTENT) {
            alert("Error when connecting to server: status code " + response.status);
            return;
        }

        this.props.updateLoggedInUser(null);
        //TODO: history is not passed down.
        this.props.history.push("/");
    };

    render() {

        const loggedIn = this.props.username !== null;
        //TODO: different butons based on logged in. Fotter as well.

        return loggedIn ? <div id="header">
            <Link to={"/"}>Go home</Link>
            <button onClick={this.logout}>Logout</button>
        </div>:
            <div id="header">
            <Link to={"/"}>Go home</Link>
            <Link to={"/login"}>Login</Link>
            <Link to={"/signup"}>Sign up</Link>
            <div>
                Users online: {this.state.userCount}
            </div>
        </div>
    }
}
