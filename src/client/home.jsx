import React from "react";
import { Link } from "react-router-dom"; 

import Layout from "./layout/layout.jsx"; 

export default class Home extends React.Component {

    render() {
        return <Layout>
            <h1>This is home</h1>
            <Link to={"/data"}>
                go to data page
            </Link>
        </Layout>
    }
}

