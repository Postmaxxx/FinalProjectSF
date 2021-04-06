import React, { Component } from 'react';

import { Link } from 'react-router-dom';


export class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }


    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            this.setState({ users });
        });
    }


    render() {
        const { users } = this.state;
        return (
            <>
                <Link to="/create">Create new user</Link>
                <ul>
                    {users.map(user => <li key='user.id'>{user.name}</li>)}
                </ul>

            </>
        )   
        
    }


}