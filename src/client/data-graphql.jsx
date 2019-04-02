/**
 * NOTE: This file is partially copied from:
 * https://github.com/arcuri82/web_development_and_api_design/blob/4504c5ed2c05ce9543ab70c0bb4d1099e524f7dd/les11/forum/src/client/user.jsx
 */

import React from "react";
import { Link } from "react-router-dom";

export class DataGQL extends React.Component {

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

        const query = encodeURIComponent(`
            {
                getData {
                    id,
                    message,
                    checked
                }
            }
        `)

        const url = "/graphql?query=" + query;

        let response;
        let payload;

        try {
            
            response = await fetch(url);
            payload = await response.json();
        } catch (err) {
            
            this.setState({
                errorMessage: "ERROR when retrieving user info: " + err,
                data: []
            });
            return;
        }

        if (response.status === 200) {

            if (payload.errors || !payload.data) {
                
                this.setState({
                    errorMessage: "ERROR in request", 
                    data: []
                });
            } else {
                
                this.setState({
                    errorMessage: null, 
                    data: payload.data.getData
                });
            }

        } else {
            
            this.setState({
                errormessage: "Issue with HTTP connection: status code " + response.status,
                data: []
            });
        }
    }

    renderRows = () =>
        
        this.state.data.map(item =>
            <tr key={item.id} className="dataTableRow">
                <td>{item.id}</td>
                <td>{item.message}</td>
                <td>{(item.checked ? "checked" : "not checked")}</td>
            </tr>
        );

    render() {

        if (this.state.errorMessage !== null) {

            return <div>
                <h2>Error:</h2>
                <p>{this.state.errorMessage}</p>              
            </div>
        }

        return <div id="data">
            <h2>This data is fetched from server</h2>
            <table>
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
            </table>
            <Link to={"/data"}>Go to rest version</Link>
        </div>
    }
}
