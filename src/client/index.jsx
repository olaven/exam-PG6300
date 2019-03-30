/**
 *
 * NOTE: This file is partially copied from:
 * https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/src/client/index.jsx
 */

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from "./home.jsx";
import Data from "./data.jsx";
import NotFound from "./notFound.jsx"
import Signup from "./authentication/signup.jsx";
import Login from "./authentication/login.jsx";
import Layout from "./layout/layout.jsx";


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: null,
            userCount: 1
        };
    }

    updateLoggedInUser = (username) => {

        this.setState({
            username: username
        });
    }

    renderRouteWithUser = (path, Component) => {

        return <Route exact path={path}
            render={ props => 
                <Component {...props }
                    username={ this.state.username }
                    updateLoggedInUser={ this.updateLoggedInUser } 
                />
            }
        />
    }


    render() {

        return <BrowserRouter>
            <Layout
                username={this.state.username}
                updateLoggedInUser={this.updateLoggedInUser}>
 
                    <Switch>
                        {this.renderRouteWithUser("/", Home)}
                        {this.renderRouteWithUser("/data", Data)}
                        {this.renderRouteWithUser("/signup", Signup)}
                        {this.renderRouteWithUser("/login", Login)}
                        <Route component={NotFound} />
                    </Switch>
            </Layout>
        </BrowserRouter>
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));
