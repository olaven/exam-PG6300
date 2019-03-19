import React from "react";
import { Link } from 'react-router-dom';

export default class Layout extends React.Component {

    render() {
        return <div style={style}>
            <h1>This is the footer</h1>
            <Link to={"/home"} />
        </div>
    }
}

const style = {
    "position": "absolute",
    "width": "100vw",
    "textAlign": "center",
    "bottom": "0"
}
