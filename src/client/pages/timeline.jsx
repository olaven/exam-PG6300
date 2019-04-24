import React from "react";
import { Link } from "react-router-dom";
import { ToLogIn } from "../components/toLogIn";

import { PostView } from "../components/postView"; 
import { getWebSocket } from "../client-utils"; 
import http from "../../shared/http"; 

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

        this.postsSocket = getWebSocket("/posts");
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

            this.setState({
                errorMessage: null, 
                posts: dto.posts
            }); 

            const data = dto.data;
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

        console.log("received a token: ", token); 
        const payload = {
            token, 
            topic: "login"
        }

        //payloadi nneholder token. 
        //sender med send  

        console.log(this.postsSocket); 
        this.postsSocket.send(JSON.stringify(payload));    
    }

    renderPosts = () => 
        this.state.posts.map(post => <PostView post={post} key={post.id}/>)

    render() {

        const loggedIn = this.props.user !== null;

        if (!loggedIn) {
            return <ToLogIn /> 
        }

        if(this.state.errorMessage) {
            return <h1>{this.state.errorMessage}</h1>
        }

        return <div id="home">
            <h1>Timeline:</h1>
            {loggedIn ?
                this.renderPosts():
                <p className="homeMessage">You must log in.</p>}
        </div>
    }
}

