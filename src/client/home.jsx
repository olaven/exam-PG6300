import React from "react";
import { Link } from "react-router-dom"; 

export class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const loggedIn = this.props.username !== null;

        return <div id="home">
            <h1>This is home</h1>
            {loggedIn ? 
                <Link to={"/data"}>
                    go to data page
                </Link>:
                <p>You must log in.</p>}
        </div>
    }
}

