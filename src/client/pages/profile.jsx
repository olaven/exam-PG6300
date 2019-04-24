import React from "react";import { UserDetailsView } from "../components/userDetails";
import { ToLogIn } from "../components/toLogIn";
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
            <UserDetailsView user={this.props.user} />
            ADD ADDING OF POSTS 
            ADD TIMELINE WITH JUST ME 
            ADD EDITING OF OWN DETAILS
        </div>
    }
}

