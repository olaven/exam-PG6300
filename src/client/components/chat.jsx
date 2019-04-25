import React from "react";
import { Link } from "react-router-dom";
const { getWebSocket } = require("../client-utils");


/**
 * Props: 
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

        this.socket = getWebSocket("/chat");
        this.socket.onopen = event => {

            //NOTE: This is where client identifies itself. 
            // It will not receive messages if email does not match passports session. 
            this.socket.send(JSON.stringify({
                topic: "opened", 
                email: this.props.author, 
                participants: this.props.participants
            })); 
        }
        this.socket.onmessage = (event => {

            const data = JSON.parse(event.data);
            if (data.singleMessage) {

                const message = data.singleMessage; 
                const oldMessages = this.state.messages; 
                this.setState({
                    messages: (oldMessages.concat([message]))
                }); 
            } else if (data.messages) {

                this.setState(
                    previous => {
                        return (previous.messages === null ?
                            { messages: data.messages } :
                            { messages: [...previous.messages, ...data.messages] })
                    }
                );
            }
        });
        this.socket.onerror = error => {
            
            console.log("some websocket error occured."); 
        }
    }

    componentWillUnmount() {

        this.socket.close();
    }

    onInputChange = event => {
        
        const input = event.target.value; 
        this.setState({input}); 
    }

    sendMessage = () => {
        
        const payload = JSON.stringify({ 
            topic: "message",
            author: this.props.author,
            participants: this.props.participants,
            text: this.state.input 
        });

        this.socket.send(payload);
        this.setState({input: ""});
    }

    renderMessages = () => 
        this.state.messages.map((message, index) =>
            <div>
                <p key={index}>{message.author}</p>
                <p>{this.parseLinks(message.text)}</p>
            </div>
        ); 

    parseLinks = text => {
        //TODO: FIX ME 
        //unescaped: http(s) ?://([a-z]|[A-Z])*.[a-z]*
        
        const pattern = /http(s)?/
        const words = text.split(" "); 
        words.forEach((word, index) => { 
            if (pattern.test(word)) {
                words[index] = <a href={word}>{word}</a>
            }
        }); 

        const parsed = words.join(" ");  
        return parsed; 
    }


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

