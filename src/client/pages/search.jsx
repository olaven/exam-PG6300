import React from "react"; 
import { Input } from "reactstrap"; 

import { codes } from "../../shared/http";
import { ToLogIn } from "../components/toLogIn";
import { UserDetailsView } from "../components/userDetailsView";
import { UserSearchResult } from "../components/userSearchResult";


export class Search extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            searchQuery: "", 
            results: [], 
            errorMessage: null
        }
    }

    handleInput = event => {

        const input = event.target.value; 
        this.setState({
            searchQuery: input 
        }, () => {
            
            if (input.length >= 1) {
                this.fetchUsers();
            }
        }); 
    }

    fetchUsers = async () => {
        
        const query = this.state.searchQuery; 
        const response = await fetch("api/search/" + query); 
        
        if (response.status !== codes.OK) {
            
            this.setState({
                errorMessage: "something went wrong" 
            }); 
            return;
        } 
 
        const json = await response.json(); // NOTE: not displaying the logged in user in results
        const results = json.results.filter(user => user.email !== this.props.user.email); 
        
        this.setState({
            results
        });
    }

    renderResults = () => this.state.results.map(user => 
        <UserSearchResult className="user-search-result" displayedUser={user} loggedInUser={this.props.user} key={user.email}/>
    )


    render() {

        const loggedIn = this.props.user;
        if (!loggedIn) {
            return <ToLogIn />
        }

        return <div>
            <h1>Search for users: </h1>
            {this.state.errorMessage?<p>{this.state.errorMessage}</p>: ""}
            <Input id="search-input" type="text" value={this.state.searchQuery} onChange={this.handleInput} placeholder="enter name"/>
            {this.renderResults()}
        </div>
    }
}

