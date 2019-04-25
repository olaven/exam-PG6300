import React from "react"; import { UserDetailsView } from "../components/userDetails";
import { Button } from "reactstrap"; 

import http from "../../shared/http"; 

"react-router-dom";


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
                from: this.props.user.email, 
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
            <p>{this.props.user.givenName} {this.props.user.familyName}</p>
            <Button onClick={() => {this.sendRequestTo(this.props.user.email)}}>Send friend request</Button>
            {this.state.errorMessage? this.state.errorMessage: ""}
        </div>
    }
}

