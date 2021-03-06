/**
 * 
 * NOTE: This file is partially copied from:
 * https://github.com/arcuri82/web_development_and_api_design/blob/master/les08/authentication/src/client/headerbar.jsx
 */
import React from "react";
import { Link } from 'react-router-dom';
import { Button, NavLink,  Nav, Navbar, NavItem, NavbarBrand } from "reactstrap";

import { getWebSocket } from "../client-utils";
import { codes } from "../../shared/http";

export class Header extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            userCount: 0
        }
    }

    componentDidMount() {

        this.socket = getWebSocket("/usercount");
        this.socket.onmessage = event => {
        
            const userCount = JSON.parse(event.data).userCount;
            this.setState({
                userCount, 
                errorMEssage: null 
            });
        }
        this.socket.onerror = event => {

            this.setState({
                errorMessage: event.data
            }); 
        }
    }

    componentWillUnmount() {

        this.socket.close();
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

    renderLoggedIn = () => <div>
        <Link id="header-link-loggedout-home" to={"/"}>Go home</Link>
        <Button
            id="header-button-logout"
            color="warning"
            onClick={this.logout}>
            Logout
        </Button>
    </div>

    renderLoggedOut = () => <div>
        <Link id="header-link-home" to={"/"}>Go home</Link>
        <Link id="header-link-login" to={"/login"}>Login</Link>
        <Link id="header-link-signup" to={"/signup"}>Sign up</Link>
    </div>

    render() {

        const loggedIn = this.props.user !== null;

        return <Navbar id="header">
            <NavbarBrand>SocialSite</NavbarBrand>
            {loggedIn ? this.renderLoggedIn(): this.renderLoggedOut()}

            <NavItem>
                Page visitors: {this.state.userCount} {this.state.errorMessage ? "(error getting)": ""}
            </NavItem>
        </Navbar>
    }
}
