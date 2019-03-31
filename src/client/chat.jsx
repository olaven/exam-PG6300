import React from "react";

export class Chat extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            input: "",
            messages: []
        }
    }

    onInputChange = (event) => {
        
        this.setState({
            input: event.target.value
        }); 
    }

    sendMessage = (event) => {

    }

    renderMessages = () => 
        this.state.messages.map(message =>
            <p>{message.username} - {message.text}</p>
        ); 


    render() {
        return <div id="chat">
            <h1>Chat</h1>
            <div id="messages">
                {this.renderMessages()}
            </div>
            <textarea onChange={this.onInputChange}/>
            <button onClick={this.sendMessage}>Send</button>
        </div>
    }
}

