import React from "react";
import { Row, Col } from "reactstrap";

export default class Layout extends React.Component {

    render() {

        const loggedIn = this.props.username !== null;

        return <Row className="fixed-bottom bg-info clearfix">
            <Col sm="12" md="12" lg="12">
                <h4 className="align-self-center">
                    Thanks for using this site, {loggedIn ?
                        this.props.username :
                        "you great person"
                    }
                </h4>
            </Col>
        </Row>

        return <div>
            <h1>This is the footer</h1>
            <p>
                Thanks for using this site, {loggedIn? 
                    this.props.username:
                    "you great person"
                }
            </p>
        </div>
    }
}
