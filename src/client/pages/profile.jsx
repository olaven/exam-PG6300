import React from "react";

import { UserDetailsView } from "../components/userDetailsView";
import { ToLogIn } from "../components/toLogIn";
import { Timeline } from "../components/timeline";


export class Profile extends React.Component {

    constructor(props) {
        
        super(props); 
    }
    

    render() {

        const loggedIn = this.props.user; 
        if (!loggedIn) {
            return <ToLogIn />
        }

        // making classname, as the component is reused
        return <div className="profile-page">
            <UserDetailsView user={this.props.user} />
            <h2>Personal timeline</h2>
            <Timeline merged={false} email={this.props.user.email} viewingFriend={this.props.viewingFriend}/>
        </div>
    }
}

