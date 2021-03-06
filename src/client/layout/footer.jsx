import React from "react";
import { Row, Col } from "reactstrap";

export class Footer extends React.Component {

    render() {

        const loggedIn = this.props.user !== null;

        return <Row className="fixed-bottom bg-info clearfix">
            <Col sm="12" md="12" lg="12">
                <h4 className="align-self-center">
                    Thanks for using SocialSite, {loggedIn ?
                        this.props.user.givenName :
                        "you great person"
                    }
                </h4>
            </Col>
        </Row>
    }
}
