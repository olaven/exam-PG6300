import React from "react";
import { Link } from "react-router-dom";

export class Chat extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            input: "",
            messages: [],
            userCount: 0
        }
    }

    componentDidMount() {

        this.socket = new WebSocket("ws://" + window.location.host);
        this.socket.onmessage = (event => {

            const data = JSON.parse(event.data);
            this.setState(
                previous => {
                    return (previous.messages === null ? 
                        {messages: data.messages}: 
                        {messages: [...previous.messages, ...data.messages]}) 
                }
            );

            this.setState({
                userCount: data.userCount
            });
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

        const loggedIn = this.props.username !== null;

        if (loggedIn) {

            return <div id="chat">
                <h1>Chat - {this.state.userCount} users online.</h1>
                <div id="messages">
                    {this.renderMessages()}
                </div>
                <input type="text" onChange={this.onInputChange} value={this.state.input} />
                <button onClick={this.sendMessage}>Send</button>
            </div>
        } else {

            return <div>

                You must <Link to={"/login"}>log in</Link> to use chat.
            </div>
        }
        
    }
}

