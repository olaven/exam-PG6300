import React from "react";
import { Link } from "react-router-dom"; 
import { Button } from "reactstrap"; 
import { ToLogIn } from "../components/toLogIn";
import { Timeline } from "../components/timeline";

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
                    <Link to={"/chat"}>
                        <Button color="secondary">Go to chat</Button>
                    </Link>
                    <Link to={"/profile"}>
                        <Button color="secondary">Go to your profile</Button>
                    </Link>
                    <hr/>
                    <Timeline merged={true} email={this.props.user.email}/>
                </div>:
                <ToLogIn className="homeMessage" />}
        </div>
    }
}

