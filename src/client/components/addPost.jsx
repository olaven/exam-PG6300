import React from "react";
import { Button, Input } from 'reactstrap';


/**
 * Renders a module for adding posts. 
 * Takes a "socket" and "author" as props. 
 * posts are sent to websocket as { post: ... }
 */
export class AddPost extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            title: "", 
            content: "", 
            validInput: false
        }
    }

    validateInput = () => {

        const title = this.state.title; 
        const content = this.state.content; 
        
        const validInput = (title.length > 0 && content.length > 0) 
        
        this.setState({
            validInput
        }); 
    }

    titleChanged = event => {

        this.setState({
            title: event.target.value
        }, () => {this.validateInput()}); 
    }

    contentChanged = event => {

        this.setState({
            content: event.target.value
        }, () => { this.validateInput() }); 
    }

    add = () => {

        // NOTE: timestamp and ID are added server
        const post = {
            title: this.state.title, 
            authorEmail: this.props.author, 
            content: this.state.content
        }

        try {
            const payload = JSON.stringify({ post });
            this.props.socket.send(payload);
        } catch (error) {
        
            alert("an error occured when sending.."); 
            return; 
        }

        this.setState({
            title: "", 
            content: ""
        }); 
    }



    render() {
        return <div>
            <Input
                type="text"
                value={this.state.title}
                onChange={this.titleChanged}
                placeholder="Title"
                id="titleInput" />
            <Input
                type="textarea"
                value={this.state.content}
                onChange={this.contentChanged}
                placeholder="content"
                id="contentInput" />
            {this.state.validInput?
                <Button
                    color="primary"
                    onClick={this.add}
                    id="addButton">
                    Add
                </Button>: 
                <Button 
                    id="addButton"
                    disabled>
                    Add    
                </Button>}
        </div>
    }
}

