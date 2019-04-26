/**
 *
 * NOTE: This file is partially copied from:
 * https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/src/client/index.jsx
 */

import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Home } from "./pages/home.jsx";
import { NotFound } from "./pages/notFound.jsx"
import { Signup } from "./authentication/signup.jsx";
import { Login } from "./authentication/login.jsx";
import { Layout } from "./layout/layout.jsx";
import { Profile } from "./pages/profile.jsx";
import { Search } from "./pages/search";
import { Conversations } from "./pages/conversations.jsx";
import { Friends } from "./pages/friends.jsx";

export class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            userCount: 1
        };
    }


    // Updating user if session is set. 
    componentDidMount() {

        this.fetchAndUpdateUserInfo();
    }

    fetchAndUpdateUserInfo = async () => {

        const url = "/api/user";

        let response;

        try {
            response = await fetch(url, {
                method: "get"
            });
        } catch (err) {
            this.setState({ errorMsg: "Failed to connect to server: " + err });
            return;
        }

        if (response.status === 401) {
            //that is ok
            this.updateLoggedInUser(null);
            return;
        }

        if (response.status !== 200) {
            console.log("Error when fetching user. Not logged in?")
        } else {
            const user = await response.json();
            this.updateLoggedInUser(user);
        }
    };

    // I do not want to fetch for user info when user is (for instance) logged out 
    updateLoggedInUser = async (doFetch) => {

        let user = null; 
        if (doFetch) {

            const response = await fetch("/api/user");
            const user = await response.json();
            
            this.setState({
                user
            }); 
        } else {
            this.setState({
                user: null
            });
        }
    }

    renderRouteWithUser = (path, Component) => {

        return <Route exact path={path}
            render={props =>
                <Component {...props}
                    user={this.state.user}
                    updateLoggedInUser={this.updateLoggedInUser}
                />
            }
        />
    }


    render() {

        return <BrowserRouter>
            <Layout
                user={this.state.user}
                updateLoggedInUser={this.updateLoggedInUser}>

                <Switch>
                    {this.renderRouteWithUser("/", Home)}
                    {this.renderRouteWithUser("/conversations", Conversations)}
                    {this.renderRouteWithUser("/profile", Profile)}
                    {this.renderRouteWithUser("/search", Search)}
                    {this.renderRouteWithUser("/friends", Friends)}
                    {this.renderRouteWithUser("/signup", Signup)}
                    {this.renderRouteWithUser("/login", Login)}
                    <Route component={NotFound} />
                </Switch>
            </Layout>
        </BrowserRouter>
    }
}
