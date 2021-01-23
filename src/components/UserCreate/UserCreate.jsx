import React, { Component } from 'react';
import './UserCreate.css';


export class UserCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
        }
    }


    handleNameChange(e) {
        const name = e.target.value;
        this.setState({ name })
    }


    handleUserCreate(e) {
        const name = this.state;
        fetch('https://jsonplaceholder.typicode.com/users', { 
            method: 'POST', 
            body: JSON.stringify({ name }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(() => {
            alert('!');
            this.setState({ name: '' });
        });
    }

    render() {
        const { name } = this.state;

        return (
            <div>
                <input type="text" name="name" placeholder="username" value={name} onChange={(e) => this.handleNameChange(e)}/><br/>
                <button class="button-create" disabled={!name.length} onClick={(e) => this.handleUserCreate(e)}>Create</button>
            </div>
        )   
        
    }


}