import React from "react";
import { ToLogIn } from "../components/toLogIn";
import { Chat } from "../components/chat";
const { getWebSocket } = require("../client-utils");


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
        <div className="friend-conversations" key={friend.email}>
            <h1>Talk to {friend.givenName}</h1>
            {/* Treating participants as an array makes it easier for group solutions at some later point */}
            <Chat author={this.props.user.email} participants={[friend.email, this.props.user.email]}/>
        </div>
    ); 

    render() {

        if (!this.props.user) {
            return <ToLogIn /> 
        }
        
        return <div id="conversations-page">
            <h1>These are your conversations:</h1>
            {this.state.errorMessage?
                this.state.errorMessage: 
                this.renderConversations()}
        </div>
    }
}

