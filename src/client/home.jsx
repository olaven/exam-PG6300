import React from "react";
import { Link } from "react-router-dom"; 
import Layout from "./layout/layout"; 
export default class Home extends React.Component {

    render() {
        return <Layout>
            This is home
            <Link to={"/ar"}>
            ar</Link>
        </Layout>
    }
}

