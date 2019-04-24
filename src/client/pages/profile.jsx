import React from "react";import { UserDetailsView } from "../components/userDetails";
import { ToLogIn } from "../components/toLogIn";
import { Timeline } from "../components/timeline";
 "react-router-dom";


export class Profile extends React.Component {

    constructor(props) {
        
        super(props); 
    }
    

    render() {

        const loggedIn = this.props.user; 
        if (!loggedIn) {
            return <ToLogIn />
        }

        return <div>
            ADD ADDING OF POSTS 
            ADD EDITING OF OWN DETAILS
            <UserDetailsView user={this.props.user} />
            <h2>Personal timeline</h2>
            <Timeline merged={false} user={this.props.user}/>
        </div>
    }
}

