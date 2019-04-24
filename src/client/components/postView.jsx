import React from "react";
import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText
} from 'reactstrap';

export class PostView extends React.Component {

    constructor(props) {

        super(props);
    }

    render() {
        return <div>
            <Card>
                <CardHeader tag="h3">POST TITLE</CardHeader>
                <CardBody>
                    <CardText>{this.props.post.content}</CardText>
                    <Button>LIKE!</Button>
                </CardBody>
                <CardFooter className="text-muted">Author: {this.props.post.authorEmail}</CardFooter>
            </Card>
        </div>
    }
}

