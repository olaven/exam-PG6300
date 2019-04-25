import React from "react";
import { Button } from "reactstrap";

import { Profile } from "../pages/profile"; 

export class FriendProfile extends React.Component {

    constructor(props) {
        
        super(props); 
        this.state = {
            hidden: false
        }
    }

    toggleHidden = () => {

        this.setState(previous => {
            return {
                hidden: !previous.hidden
            }
        }); 
    }

    render() {
        console.log(this.props); 
        return <div>
            <h3>{this.props.friend.givenName}</h3>
            <Button onClick={this.toggleHidden} color="primary">Toggle details</Button>
            {this.state.hidden?
                <Profile user={this.props.friend}/>:
                ""
            }
        </div>
    }
}

