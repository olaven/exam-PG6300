import React from "react"; import { UserDetailsView } from "../components/userDetails";
import { Button } from "reactstrap"; 

"react-router-dom";


export class UserSearchResult extends React.Component {

    constructor(props) {

        super(props);
    }


    render() {

        return <div>
            <p>{this.props.user.givenName} {this.props.user.familyName}</p>
            <Button>Add Friend</Button>
        </div>
    }
}

