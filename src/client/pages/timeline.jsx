import React from "react";
import { Link } from "react-router-dom";
import { ToLogIn } from "../components/toLogIn";

import { PostView } from "../components/postView"; 
import http from "../../shared/http"; 

export class Timeline extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            posts: [], 
            errorMessage: null
        }
    }

    componentDidMount() {
        
        this.fetchPosts(); 
    }

    fetchPosts = async () => {

        const response = await fetch("/api/posts"); 
        if (response.status !== http.codes.OK) {
            
            this.setState({
                errorMessage: "An error occured. Please try to log out and then log back in."
            })
        } else {

            const posts = await response.json();
            this.setState({
                posts, 
                errorMessage: null
            });
        }
    }

    renderPosts = () => 
        this.state.posts
        //this.state.posts.map(post => <PostView post={post} key={post.id}/>)

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

