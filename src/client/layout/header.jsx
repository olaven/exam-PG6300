/**
 * 
 * NOTE: This file is partially copied from:
 * https://github.com/arcuri82/web_development_and_api_design/blob/master/les08/authentication/src/client/headerbar.jsx
 */
import React from "react";
import { Link } from 'react-router-dom';

export default class Header extends React.Component {

    constructor(props) {

        super(props);
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

        if (response.status !== 204) {
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

        return loggedIn ? <div>
            <Link to={"/"}>Go home</Link>
            <button onClick={this.logout}>Logout</button>
        </div>:
        <div>
            <Link to={"/"}>Go home</Link>
            <Link to={"/login"}>Login</Link>
            <Link to={"/signup"}>Sign up</Link>
        </div>
    }
}

const style = {
    "width": "100vw", 
    "textAlign": "center", 
    "top": "0"
}
