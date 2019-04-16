import React from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";

import { codes } from "../../shared/http";

export class Data extends React.Component {

    constructor(props) {
        
        super(props)
        this.state = {
            data: [], 
            errorMessage: null 
        }
    }

    componentDidMount = () => {
        
        this.updateData(); 
    }

    updateData = async () => {


        const response = await fetch("/api/data"); 

        if (response.status !== codes.OK) {
            this.setState ({
                errorMessage: "An error occured: " + response.status
            });
            return; 
        }

        const data = await response.json();
        this.setState({
            data, 
            errorMessage: null
        }); 
    };

    renderRows = () => 
        this.state.data.map(item => 
            <tr key={item.id} className="dataTableRow">
                <td>{item.id}</td>
                <td>{item.message}</td>
                <td>{(item.checked ? "checked" : "not checked")}</td>
            </tr>    
        ); 

    render() {

        const loggedIn = this.props.username !== null; 

        if (!loggedIn) {
            
            return <div id="data-error">
                You must <Link to={"/login"}>log in</Link>
            </div>
        }

        const error = this.state.errorMessage !== null 
        if (error) {

            return <div>
                An error occured fetching from the server. <br/>
                {this.state.errorMessage}
            </div>
        }

        return <div id="data">
            <h2>This data is fetched from server</h2>
            <Table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>message</th>
                        <th>checked</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </Table>
            <Link to={"/data-graphql"}>Go to graphQL version.</Link>
        </div>
    }
}

