import React from "react";
import { Button } from "reactstrap"; 
import { ToLogIn } from "../components/toLogIn";
import { Chat } from "../components/chat";
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
        this.socket = getWebSocket("/chat");
    }

    componentWillUnmount() {

        this.socket.close();
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
        <div>
            <h1>Talk to {friend.givenName}</h1>
            {/* Treating participants as an array makes it easier for group solutions at some later point */}
            <Chat socket={this.socket} author={this.props.user.email} participants={[friend.email, this.props.user.email]}/>
        </div>
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

