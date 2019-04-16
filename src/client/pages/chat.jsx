import React from "react";
import { Link } from "react-router-dom";


export class Chat extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            input: "",
            messages: []
        }
    }

    componentDidMount() {

        this.socket = new WebSocket("ws://" + window.location.host + "/chat");
        this.socket.onmessage = (event => {

            const data = JSON.parse(event.data);
            this.setState(
                previous => {
                    return (previous.messages === null ? 
                        {messages: data.messages}: 
                        {messages: [...previous.messages, ...data.messages]}) 
                }
            );
        });
    }

    onInputChange = event => {
        
        const input = event.target.value; 
        this.setState({input}); 
    }

    sendMessage = () => {
        
        const payload = JSON.stringify({ 
            message: {
                username: this.props.username,
                text: this.state.input 
            }
        });

        this.socket.send(payload);
        this.setState({input: ""});
    }

    renderMessages = () => 
        this.state.messages.map(message =>
            <p>{message.username} - {message.text}</p>
        ); 


    render() {

        console.log("The username in component: ", this.props.username);
        const loggedIn = this.props.username !== null;

        if (loggedIn) {

            return <div id="chat">
                <h1>Chat</h1>
                <div id="messages">
                    {this.renderMessages()}
                </div>
                <input id="chat-input" type="text" onChange={this.onInputChange} value={this.state.input} />
                <button id="chat-button" onClick={this.sendMessage}>Send</button>
            </div>
        } else {

            return <div>

                You must <Link to={"/login"}>log in</Link> to use chat.
            </div>
        }
        
    }
}

