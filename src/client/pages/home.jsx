import React from "react";
import { Link } from "react-router-dom"; 
import { Button } from "reactstrap"; 
import { ToLogIn } from "../components/toLogIn";

export class Home extends React.Component {

    constructor(props) {
        
        super(props);
    }

    render() {

        const loggedIn = this.props.user !== null;

        return <div id="home">
            <h1>Welcome to SocialSite!</h1>
            {loggedIn ? 
                <div>
                    <Link to={"/timeline"}>
                        <Button className="homeMessage" color="primary">See your timeline</Button>
                    </Link>
                    <Link to={"/chat"}>
                        <Button color="secondary">Go to chat</Button>
                    </Link>
                </div>:
                <ToLogIn className="homeMessage" />}
        </div>
    }
}

