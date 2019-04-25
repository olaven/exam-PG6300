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
                <CardHeader className="post-view-title" tag="h3">{this.props.post.title}</CardHeader>
                <CardBody>
                    <CardText className="post-view-content">{this.props.post.content}</CardText>
                </CardBody>
                <CardFooter className="text-muted post-view-author">Author: {this.props.post.authorEmail}</CardFooter>
            </Card>
        </div>
    }
}

