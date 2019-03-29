import React from "react";
import { Link } from 'react-router-dom';

export default class Header extends React.Component {

    render() {
        return <div style={style}>
            <h1>This is the header</h1>
            <Link to={"/"}>Go home</Link>
            <Link to={"/login"}>Login</Link>
            <Link to={"/signup"}>Sign up</Link>
        </div>
    }
}

const style = {
    "width": "100vw", 
    "textAlign": "center", 
    "top": "0"
}
