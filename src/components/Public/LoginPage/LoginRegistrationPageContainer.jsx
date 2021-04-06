import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
//import './MainPage.css';
import store from '../../../redux/store';
import { connect } from 'react-redux';
import './LoginRegistrationPage.css';


import LoginPage from './LoginPage.jsx'
import RegistrationPage from './RegistrationPage.jsx'


class LoginRegistrationPageContainer extends Component {

    componentDidMount() {
        this.changeButtonStyles();
    }

    changeButtonStyles() {
        let loginButton=document.querySelector('.log-reg-page-container__switchers-area__button-login');
        let registraionButton=document.querySelector('.log-reg-page-container__switchers-area__button-registration');
        let showLoginForm = this.props.store.main.showLoginForm;
        let showRegistrationForm = this.props.store.main.showRegistrationForm;
        if (showLoginForm) {
            loginButton.classList.add('log-reg-page-container__switchers-area__button_selected')
            registraionButton.classList.remove('log-reg-page-container__switchers-area__button_selected')
        };
        if (showRegistrationForm) {
            loginButton.classList.remove('log-reg-page-container__switchers-area__button_selected')
            registraionButton.classList.add('log-reg-page-container__switchers-area__button_selected')
        };
    }


    onLoginButtonClick = ()  => {
        //console.log('on login clicked ', this.props);
        this.props.mainActions.setShowLoginForm(true);
        this.props.mainActions.setShowRegistrationForm(false);
        let loginButton=document.querySelector('.log-reg-page-container__switchers-area__button-login');
        let registraionButton=document.querySelector('.log-reg-page-container__switchers-area__button-registration');
        loginButton.classList.add('log-reg-page-container__switchers-area__button_selected')
        registraionButton.classList.remove('log-reg-page-container__switchers-area__button_selected')
    }

    onRegistrationButtonClick = ()  => {
       // console.log('on reg btn clicked ', this.props);
        this.props.mainActions.setShowLoginForm(false);
        this.props.mainActions.setShowRegistrationForm(true);
        let loginButton=document.querySelector('.log-reg-page-container__switchers-area__button-login');
        let registraionButton=document.querySelector('.log-reg-page-container__switchers-area__button-registration');
        loginButton.classList.remove('log-reg-page-container__switchers-area__button_selected')
        registraionButton.classList.add('log-reg-page-container__switchers-area__button_selected');
    }



    onEnterButtonClick = () => {
        console.log('Starting login fetch...');
        let logginUser = {
            email: this.props.store.main.email,
            password: this.props.store.main.password
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
            //console.log('data loggin in: ', data);
            localStorage.clear();
            localStorage.setItem('token', JSON.stringify(data.token));
            this.props.mainActions.setToken(data.token);
            this.props.mainActions.setClientId(data.clientId);
            if (this.props.store.main.token) {
                this.props.mainActions.setAutorized(true);
                this.props.history.push('/admin/all_cases')
                console.log('You have been autorized!');
            }
        })
        .catch((error) => {
            alert(error);
        })

    };




    onRegisterButtonClick = () => {
        console.log('onRegistrationEnterButtonClick');
    }


    onAdminButtonClick = () => {
        this.props.mainActions.setAutorized(true);
        this.props.mainActions.setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHByb3ZlZCI6dHJ1ZSwiX2lkIjoiNjAzZTU4ZmMwYmQ3NTkwMDExZjNhYjMzIiwiZW1haWwiOiJzZWNyZXRfbWFpbEBtYWlsLnJ1IiwiZmlyc3ROYW1lIjoiTWF4IiwibGFzdE5hbWUiOiJQb3N0bmlrb3YiLCJjbGllbnRJZCI6ImJtbHVZUzV3YjNOMGJtbHJiM1poT0RkQWVXRnVaR1Y0TG5KMSIsIl9fdiI6MCwiaWF0IjoxNjE3NDYzOTAyfQ.e5HGLFICj8TKOiTy3oii0wAssydD0sa8WB-ogTWxOB0');
        console.log('You have been autorized!'); 
        this.props.history.push('/admin/all_cases');
    }


    render() {
        return (
            <div className='log-reg-page-container'>
                <div className='log-reg-page-container__switchers-area'>
                    <button className='log-reg-page-container__switchers-area__button-log-reg log-reg-page-container__switchers-area__button-login' onClick={this.onLoginButtonClick}>Вход</button>
                    <button className='log-reg-page-container__switchers-area__button-log-reg log-reg-page-container__switchers-area__button-registration' onClick={this.onRegistrationButtonClick}>Регистрация</button>
                </div>

                {this.props.store.main.showLoginForm ? <LoginPage {...this.props} /> : null }
                {this.props.store.main.showRegistrationForm ? <RegistrationPage {...this.props} /> : null }
                
                <div className='log-reg-page-container__buttons-area'>
                    {this.props.store.main.showLoginForm ? (<button className='log-reg-page-container__form-area__buttons_area__button-log-reg' onClick={this.onEnterButtonClick}>Войти</button>) : null }
                    {this.props.store.main.showRegistrationForm ? (<button className='log-reg-page-container__form-area__buttons_area__button-log-reg' onClick={this.onRegisterButtonClick}>Зарегистрироваться</button>) : null }
                </div>

                <button onClick={this.onAdminButtonClick}>ENTER</button>
                
            </div>

        )
    }
}



export default LoginRegistrationPageContainer;
