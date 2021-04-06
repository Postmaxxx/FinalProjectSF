import React, { Component } from 'react';
import './Authorization.css';


export class Authorization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'secret_mail@mail.ru',
            firstName: 'Max',
            lastName: 'Postnikov',
            password: '31415926',
            repassword: '31415926',
            clientId: 'bmluYS5wb3N0bmlrb3ZhODdAeWFuZGV4LnJ1'
        }
    }

 
    buttonRegistration(e) {
        const sendData = JSON.stringify(this.state);
        alert(sendData);
        
        fetch('http://84.201.129.203:8888/api/auth/sign_up', { 
            method: 'POST', 
            body: sendData,
            headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            alert(data);
        });

        
    }

    buttonLogin(e) {
        const logginUser = {
            email : this.state.email,
            password: this.state.password
        }
        fetch('http://84.201.129.203:8888/api/auth/sign_in', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(logginUser)
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log('data: ', data);
            localStorage.clear();
            localStorage.setItem('TokenData', JSON.stringify(data));
        });
    
    
    };

    buttonShowToken(e) {
        const tokenData = JSON.parse(localStorage.getItem('TokenData'));
        console.log(tokenData);
    }



    render() {


        return (
            <div>
                <button className='button-register' onClick={(e) => this.buttonRegistration(e)}>Registration</button>
                <button className='button-login' onClick={(e) => this.buttonLogin(e)}>Login</button>
                <button className='button-show' onClick={(e) => this.buttonShowToken(e)}>Show local token</button>
            </div>
        )   
        
    }


}
