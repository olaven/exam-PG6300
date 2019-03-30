import React from "react";
import { Link } from "react-router-dom"; 

export default class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        console.log(this.props)

        const loggedIn = this.props.username !== null;

        return <div>
            <h1>This is home</h1>
            {loggedIn ? 
                <Link to={"/data"}>
                    go to data page
                </Link>:
                <p>You must log in.</p>}
        </div>
    }
}

