import React from "react";

export default class Layout extends React.Component {

    render() {

        const loggedIn = this.props.username !== null;

        return <div style={style}>
            <h1>This is the footer</h1>
            <p>
                Thanks for using this site, {loggedIn? 
                    this.props.username:
                    "you great person"
                }
            </p>
        </div>
    }
}

const style = {
    "position": "absolute",
    "width": "100vw",
    "textAlign": "center",
    "bottom": "0"
}
