import React from "react";
import { Link } from "react-router-dom";
const { getWebSocket } = require("../client-utils");


/**
 * Takes one common socket as props: 
 * This way, user only connects to chat once. 
 * 
 * Props: 
 * socket: WS
 * author: String (email)
 * participants: String[] (emails, including author)
 */
export class Chat extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            input: "",
            messages: []
        }
    }

    componentDidMount() {

        this.props.socket.onmessage = (event => {

            const data = JSON.parse(event.data);
            this.setState(
                previous => {
                    return (previous.messages === null ? 
                        {messages: data.messages}: 
                        {messages: [...previous.messages, ...data.messages]}) 
                }
            );
        });
        this.props.socket.onerror = error => {
            
            console.log("some websocket error occured."); 
        }
    }

    onInputChange = event => {
        
        const input = event.target.value; 
        this.setState({input}); 
    }

    sendMessage = () => {
        
        const payload = JSON.stringify({ 
            author: this.props.author,
            participants: this.props.participants,
            text: this.state.input 
        });

        this.props.socket.send(payload);
        this.setState({input: ""});
    }

    renderMessages = () => 
        this.state.messages.map((message, index) =>
            <p key={index}>{message.author} - {message.text}</p>
        ); 


    render() {

        const loggedIn = this.props.user !== null;

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

