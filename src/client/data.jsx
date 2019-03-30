import React from "react";

export default class Data extends React.Component {

    constructor(props) {
        
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount = () => {
        this.updateData(); 
    }

    updateData = async () => {

        const response = await fetch("/api/data"); 
        const data = await response.json(); 

        this.setState({
            data: data
        }); 
    }

    renderRows = () => 
        this.state.data.map(item => 
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.message}</td>
                <td>{(item.checked ? "checked" : "not checked")}</td>
            </tr>    
        ); 

    render() {
        return <div>
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
        </div>
    }
}

