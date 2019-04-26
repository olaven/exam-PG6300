import React from "react"; import { UserDetailsView } from "../components/userDetails";

import { codes } from "../../shared/http";
import { ToLogIn } from "../components/toLogIn";
import { FriendProfile } from "../components/friendProfile"; 
"react-router-dom";


export class Friends extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            friends: [], 
            errorMessage: null 
        }
    }

    componentDidMount() {

        this.fetchFriends(); 
    }

    fetchFriends = async () => {

        try {
            
            const response = await fetch("/api/users"); 
            if (response.status !== codes.OK) {
                this.setState({
                    errorMessage: "You may not be authenticated. " + response.status
                }); 
                return; 
            }

            const friends = await response.json();  
            this.setState({
                friends: friends, 
                errorMessage: null 
            }); 

        } catch(error) {

            this.setState({
                errorMessage: "Some unknown error occured. " + error.message
            }); 
        }
    }

    renderFriends = () => this.state.friends.map(friend => <FriendProfile className="friend-profile" key={friend.email} friend={friend}/>)

    

    render() {

        this.state.errorMessage//?
        const loggedIn = this.props.user !== null; 
        if (!loggedIn) {
            return <ToLogIn />
        }

        if (this.state.errorMessage) {
            return <div>
                Some error occured. Try again later. 
                {this.state.errorMessage}
            </div>
        }


        return <div>
            <h1>Your friends:</h1>
            {this.state.friends.length === 0?
                <p>No friends loaded. Send some friend requests!</p>: 
                this.renderFriends() 
            }
        </div>
    }
}

