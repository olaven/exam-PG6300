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
                <div>
                    <Link to={"/data"}>
                        <p className="homeMessage">Go to data page</p>
                    </Link>
                    <Link to={"/chat"}>
                        Chat
                    </Link>
                </div>:
                <p className="homeMessage">You must log in.</p>}
        </div>
    }
}

