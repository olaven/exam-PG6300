/**
 *
 * NOTE: This file is partially copied from:
 * https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/src/client/index.jsx
 */

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./home";
import Ar from "./ar";


class App extends React.Component {

    //TODO I believe user-state should be passed down
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            userCount: 1
        };
    }


    render() {
        return <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/ar" component={Ar}/>              
                </Switch>
            </div>
        </BrowserRouter>
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));
