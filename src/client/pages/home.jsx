import React from "react";
import { Link } from "react-router-dom"; 
import { Button } from "reactstrap"; 
import { ToLogIn } from "../components/toLogIn";
import { Timeline } from "../components/timeline";
import { FriendRequestsView } from "../components/friendRequestsView";

export class Home extends React.Component {

    constructor(props) {
        
        super(props);
    }

    render() {

        const loggedIn = this.props.user !== null;

        return <div id="home">
            <h1>Welcome to SocialSite!</h1>
            {loggedIn ? 
                <div id="homeMessage">
                    <Link to={"/chat"} id="linkToChat">
                        <Button color="secondary">Go to chat</Button>
                    </Link>
                    <Link to={"/profile"}>
                        <Button color="secondary" id="linkToProfile">Go to your profile</Button>
                    </Link>
                    <Link to={"/search"}>
                        <Button color="secondary" id="linkToProfile">Search for users</Button>
                    </Link>
                    <hr/>
                    <FriendRequestsView email={this.props.user.email} /> 
                    <Timeline merged={true} email={this.props.user.email}/>
                </div>:
                <ToLogIn className="toLogIn"/>}
        </div>
    }
}

