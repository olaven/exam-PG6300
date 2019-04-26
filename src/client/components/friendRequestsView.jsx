import React from "react";
import { Button } from 'reactstrap';

import { codes } from "../../shared/http"; 


/**
 * Displays friend requests + buttons to accept or deny 
 * Takes an email as props
 */
export class FriendRequestsView extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            friendRequests: [], 
            errorMessage: "" 
        }
    }

    componentDidMount() {

        this.fetchRequests(); 
    }

    fetchRequests = async () => {

    
        const response = await fetch("/api/friendRequests?to=" + this.props.email); 
    
        if (response.status !== codes.OK) {
            
            this.setState({
                errorMessage: "some error occured.. Status: " + response.status 
            }); 
            return; 
        }

        const friendRequests = await response.json(); 
        this.setState({
            friendRequests,
            errorMessage: ""
        }); 
    }

    answerFriendRequest = async (id, accepted) => {
        
        const response = await fetch("/api/friendRequests/" + id, {
            method: "delete", 
            headers: {
                "x-request-accepted": accepted
            }
        }); 

        if (response.code !== codes.NOT_CONTENT) {
            alert("an error occured with friend request."); 
            return; 
        } 
        
        //update displayed requests
        this.fetchRequests(); 
    }

    renderFriendRequests = () => this.state.friendRequests.map(request => 
        <div className="friend-request" key={request.id}>
            <h3>{request.from}</h3>
            <Button className="answer-request-accept" color="primary" onClick={() => {this.answerFriendRequest(request.id, true)}}>Accept</Button>
            <Button className="answer-request-deny" color="secondary" onClick={() => {this.answerFriendRequest(request.id, false)}}>Deny</Button>
        </div>
    )

    render() {

        if (this.state.friendRequests.length === 0) {
            return <div id="no-requests-message">No friend requests right now :-)</div>
        }

        return <div>
            <h2>Friend requests:</h2>
            {this.renderFriendRequests()}
            {this.state.errorMessage}
        </div>
    }
}

