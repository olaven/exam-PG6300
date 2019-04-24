import React from "react";
import { Link } from "react-router-dom";
import { ToLogIn } from "../components/toLogIn";

export class Timeline extends React.Component {

    constructor(props) {

        super(props);
    }

    render() {

        const loggedIn = this.props.user !== null;

        if (!loggedIn) {
            return <ToLogIn /> 
        }

        return <div id="home">
            <h1>Timeline:</h1>
            {loggedIn ?
                <div>
                    <Link to={"/data"}>
                        <p className="homeMessage">Go to data page</p>
                    </Link>
                    <Link to={"/chat"}>
                        Chat
                    </Link>
                </div> :
                <p className="homeMessage">You must log in.</p>}
        </div>
    }
}

