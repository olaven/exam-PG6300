import React from "react";
import { Link } from "react-router-dom";
import { ToLogIn } from "../components/toLogIn";
const { getWebSocket } = require("../client-utils");


//TODO: UPDATE ME TO BE BETWEEN TWO USERS 
export class Conversations extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            friends: []
        }
    }

    componentDidMount() {

        this.fetchFriends()
    }

    fetchFriends = async () => {

        try {
            
            const response = await fetch("/api/users")
            const friends = await response.json();
            this.setState({
                friends, 
                errorMessage: null 
            }); 
        } catch (error) {

            this.setState({
                errorMessage: "an error occured when fetching users"
            })
        }
    }

    renderConversations = () => this.state.friends.map(friend =>
        <h4>Talk to {friend.givenName}</h4>
    ); 

    render() {

        if (!this.props.user) {
            return <ToLogIn /> 
        }
        
        return <div>
            <h1>These are your conversations:</h1>
            {this.state.errorMessage?
                this.state.errorMessage: 
                this.renderConversations()}
        </div>
    }
}

