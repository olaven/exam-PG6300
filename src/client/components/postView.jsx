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
        console.log("render is called"); 
        return <div>
            <Card>
                <CardHeader tag="h3">{this.props.post.title}</CardHeader>
                <CardBody>
                    <CardText>{this.props.post.content}</CardText>
                </CardBody>
                <CardFooter className="text-muted">Author: {this.props.post.authorEmail}</CardFooter>
            </Card>
        </div>
    }
}

