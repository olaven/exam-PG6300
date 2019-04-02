import React from "react";
import Header from "./header.jsx"
import Footer from "./footer.jsx"

export class Layout extends React.Component {

    constructor(props) {

        super(props);
    }

    render() {
        
        return <div>
            <Header
                {...this.props}/>   
                {this.props.children}
            <Footer
                username={this.props.username}/> 
        </div>
    }
}
