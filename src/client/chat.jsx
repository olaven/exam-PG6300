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

        this.socket = new WebSocket("ws://" + window.location.host);
        this.socket.onmessage = (event => {

            const messageList = JSON.parse(event.data);
            this.setState(
                previous => {
                    return (previous.messages === null ? 
                        {messages: messageList}: 
                        {messages: [...previous.messages, ...messageList]}) 
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
            username: this.props.username, 
            text: this.state.input 
        });

        this.socket.send(payload);
        this.setState({input: ""});
    }

    renderMessages = () => 
        this.state.messages.map(message =>
            <p>{message.username} - {message.text}</p>
        ); 


    render() {

        const loggedIn = this.props.username !== null;

        if (loggedIn) {

            return <div id="chat">
                <h1>Chat</h1>
                <div id="messages">
                    {this.renderMessages()}
                </div>
                <input type="text" onChange={this.onInputChange} />
                <button onClick={this.sendMessage}>Send</button>
            </div>
        } else {

            return <div>

                You must <Link to={"/login"}>log in</Link> to use chat.
            </div>
        }
        
    }
}

