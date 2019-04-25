import React from "react";
import { Link } from "react-router-dom";

import http from "../../shared/http";
import { PostView } from "./postView"; 
import { getWebSocket } from "../client-utils"; 
import { AddPost } from "./addPost";

/**
 * Renders a timeline. 
 * Takes the following props: 
 * 1: merged: Bool (specify wether the timeline is merged or solo)
 * 2: email: The author of new posts
 */
export class Timeline extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            posts: [], 
            errorMessage: null, 
            token: null 
        }
    }

    componentDidMount() {
        
        this.getToken(); 

        //const endpoint = (this.props.merged? "/mergedTimeline": "/soloTimeline")
        this.postsSocket = getWebSocket("/timeline");
        this.postsSocket.onmessage = (event => {

            
            const dto = JSON.parse(event.data); 

            if (dto === null || dto === undefined) {
                this.setState({ errorMessage: "Invalid response from server." });
                return;
            }

            if (dto.error !== null && dto.error !== undefined) {
                this.setState({ errorMessage: dto.error });
                return;
            }

            let posts; 
            if (dto.singlePost) {

                posts = this.state.posts.concat(dto.singlePost); 
            } else if (dto.posts) {

                posts = dto.posts; 
            }

            posts = posts.sort((first, second) => {
                return (first.timestamp >= second.timestamp? 1: -1); 
            }); 
            this.setState({
                posts, 
                errorMessage: null
            }); 
        });
    }

    componentWillUnmount() {

        this.postsSocket.close(); 
    }

    getToken = async () => {

        try {
            const response = await fetch("/api/token", { method: "post" });
            const payload = await response.json();
            const token = payload.token; 

            this.onReceiveToken(token); 
            this.setState({
                errorMessage: null 
            }); 
        } catch (error) {
            
            this.setState({
                errorMessage: "some error occured when getting posts"
            }); 
        }
    }

    onReceiveToken = token => {

        const merged = this.props.merged //TODO: replace old support for merged with some logic here
        const payload = {
            token, 
            merged, 
            topic: "login"
        }; 

        this.postsSocket.send(JSON.stringify(payload));    
    }

    renderPosts = () =>  
            this.state.posts.map(post => <PostView post={post} key={post.id}/>); 

    render() {

        if(this.state.errorMessage) {
            return <h1>{this.state.errorMessage}</h1>
        }

        return <div id="home">
            <h1>Timeline:</h1>
            <h2>Add a new post:</h2>
            <AddPost author={this.props.email} socket={this.postsSocket} />
            {this.renderPosts()}
        </div>
    }
}

