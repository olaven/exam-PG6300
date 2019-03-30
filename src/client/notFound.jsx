import React from "react";
import { Link } from "react-router-dom";
import Layout from "./layout/layout";

export default class NotFound extends React.Component {

    render() {
        return <div>
            <h1>This page was not found..</h1>
            <Link to={"/"}>
                <h2>Go home.</h2>
            </Link>
        </div>
    }
}
