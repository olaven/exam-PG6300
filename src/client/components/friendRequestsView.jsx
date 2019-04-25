import React from "react";
import { Button } from 'reactstrap';

import http from "../../shared/http"; 


/**
 * Displays friend requests + buttons to accept or deny 
 * Takes an email as props
 */
export class FriendRequestsView extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            friendRequests: [], 
            errorMessage: null 
        }
    }

    componentDidMount() {

        this.fetchRequests(); 
    }

    fetchRequests = async () => {

        const response = await fetch("/api/friendRequests?to=" + this.props.email); 
        if (response.status !== http.codes.OK) {
            this.setState({
                errorMessage: "some error occured.. Status: " + status 
            }); 
            return; 
        }

        const friendRequests = await response.json(); 
        this.setState({
            friendRequests,
            errorMessage: null
        }); 
    }

    answerFriendRequest = async (id, accepted) => {
        
        const response = await fetch("/api/friendRequests/" + id, {
            method: "delete", 
            headers: {
                accepted
            }
        }); 

        console.log(response); 
    }

    renderFriendRequests = () => this.state.friendRequests.map(request => 
        <div>
            <h3>{request.from}</h3>
            <Button color="primary" onClick={() => {this.answerFriendRequest(request.id, true)}}>Accept</Button>
            <Button color="secondary" onClick={() => {this.answerFriendRequest(request.id, false)}}>Deny</Button>
        </div>
    )

    render() {

        if (this.state.friendRequests.length === 0) {
            return <div>No friend requests yet :-)</div>
        }

        return <div>
            <h2>Friend requests:</h2>
            {this.renderFriendRequests()}
            {this.state.errorMessage ? this.state.errorMessage : ""}
        </div>
    }
}

