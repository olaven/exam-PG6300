import React from "react";
import { Link } from "react-router-dom";
import Layout from "./layout/layout";

export class NotFound extends React.Component {

    click = () => {

        console.log("clicked");
    }

    render() {
        
        return <div>
            <h1>This page was not found..</h1>
            <Link to={"/"} id="notFound-link" onClick={this.click}>
                <h2>Go home.</h2>
            </Link>
        </div>
    }
}

