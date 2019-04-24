import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap"; 

export class ToLogIn extends React.Component {

    render() {

        return <div>
            To use this site, <Link to="/signup">
                <Button color="primary">sign up!</Button>
            </Link>
        </div>
    }
}

