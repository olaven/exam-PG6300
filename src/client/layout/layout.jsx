import React from "react";
import Header from "./header.jsx"
import Footer from "./footer.jsx"

export default class Layout extends React.Component {

    render() {
        return <div>
            <Header/>   
                {this.props.children}
            <Footer/> 
        </div>
    }
}
