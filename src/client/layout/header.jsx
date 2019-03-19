import React from "react";
import { Link } from 'react-router-dom';

export default class Header extends React.Component {

    render() {
        return <div>
            <h1>This is the header</h1>
            <Link to={"/"}>Go home</Link>
        </div>
    }
}

