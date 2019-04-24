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
    }

    componentWillUnmount() {

        if (this.postsSocket) {
            this.postsSocket.close(); 
        }
    }

    getToken = async () => {

        try {
            const response = await fetch("/api/token");
            const payload = await response.json();
            const token = payload.token; 

            this.setState({
                token, 
                errorMessage: null 
            }, () => { 
                // cb to make sure state is set 
                this.onReceiveToken(); 
            }); 
        } catch (error) {
            
            this.setState({
                errorMessage: "some error occured when getting posts"
            }); 
        }
    }

    onReceiveToken = () => {

        console.log("received a token: ", this.state.token); 
        this.postsSocket = getWebSocket("/posts");
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

