import React from "react";
import {
    Card, Button, CardHeader, 
    CardFooter, CardBody, Table
} from 'reactstrap';

import { codes } from "../../shared/http"; 

/**
 *  Can pass either email (if other user) 
 *  or User (if the active user)
 */
export class UserDetailsView extends React.Component {

    constructor(props) {

        super(props); 
        this.state = {
            user: null,
            errorMessage: null 
        }
    }

    componentDidMount() {

        //NOTE: user is viewing itself, there is no need to fetch the information
        if (this.props.user) {
            this.setState({
                user: this.props.user 
            }); 
        } else {
            this.fetchUser(); 
        }
    }

    fetchUser = async () => {

        const response = await fetch("/api/users/" + this.props.email); 

        if (response.status === codes.OK) {
            const user = await response.json();

            this.setState({
                user, 
                errorMessage: null 
            }); 
            return; 
        }

        if (response.status === codes.FORBIDDEN) {
            this.setState({
                errorMessage: "You must befriend this user to view their profile."
            }); 
            return; 
        }

        this.setState({
            errorMessage: "Some error occured communicating with server."
        }); 
    }

    calculateAge = () => {
        //modified version of: https://stackoverflow.com/questions/8152426/how-can-i-calculate-the-number-of-years-betwen-two-dates
        const ageDifMs = Date.now() - new Date(this.state.user.dateOfBirth); 
        const ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    

    render() {

        if(this.state.errorMessage) {
            return <div>
                <h3>Some error occured</h3>
                <p>{this.state.errorMessage}</p>
            </div>
        }


        const user = this.state.user; 

        if(!user) {
            return <div>Loading data...</div>
        }

        return <div>
            <Card>
                <CardHeader tag="h3">{user.givenName} {user.familyName}</CardHeader>
                <CardBody>
                    <Table>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Location</th>
                                <th>Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{user.email}</td>
                                <td>{user.location}</td>
                                <td>{this.calculateAge()}</td>
                            </tr>
                        </tbody>
                    </Table>
                </CardBody>
                <CardFooter>
                    <Button >SOMe button wow</Button>    
                </CardFooter>
            </Card>
        </div>
    }
}

