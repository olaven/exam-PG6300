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
            <div key={index}>
                <p>{message.author}</p>
                {this.parseText(message.text)}
            </div>
        );
        
    parseText = text => text.split(" ").map((word, index) => {
        if (this.isLink(word)) {
            
            return <a key={index} href={word}>{word}</a>
        } else {
            
            return <div key={index}>{word}</div>
        }
    }); 

    /**
     * About security: 
     * React automatically escapes content inside tags. However, it does 
     * not escape the values of href-attributes. 
     * 
     * I am veriyfing that the protocol is http/https. This way, doing 
     * xss with (for example) "javascript:"-protocol is not possible through this input. 
     */
    isLink = word => (word.startsWith("http://") || word.startsWith("https://"))


    render() {

        const loggedIn = this.props.user !== null;

        if (loggedIn) {

            return <div id="chat">
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

