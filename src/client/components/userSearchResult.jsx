import React from "react"; import { UserDetailsView } from "../components/userDetails";
import { Button } from "reactstrap"; 

import http from "../../shared/http"; 

"react-router-dom";

/**
 * Takes to props in order to deal with sending of friend-requests: 
 * displayedUser: The user the component will show (will receive requests)
 * loggedInUser: The user that will (sends requests)
 */
export class UserSearchResult extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            errorMessage: null
        }
    }

    sendRequestTo = async (email) => {

        try {
            
            const payload = {
                from: this.props.loggedInUser.email, 
                to: email 
            }; 
            const response = await fetch("/api/friendRequests", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }); 
            
            if(response.status !== http.codes.CREATED) {
                this.setState({
                    errorMessage: "Could not send requests. Perhaps you already know each other?"
                }); 
                return; 
            } 

            alert("request is sent! :D"); 
            this.setState({
                errorMessage: null
            }); 

        } catch(error) {

            this.setState({
                errorMessage: "An unknow error occured."
            }); 
        }
    }


    render() {

        return <div>
            <p>{this.props.displayedUser.givenName} {this.props.displayedUser.familyName}</p>
            <Button onClick={() => {this.sendRequestTo(this.props.displayedUser.email)}}>Send friend request</Button>
            {this.state.errorMessage? this.state.errorMessage: ""}
        </div>
    }
}

