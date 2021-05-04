import React, { Component } from 'react';
import './LoginRegistrationPage.css';
import axios from 'axios';
import Preloader from '../../Common/Preloader.jsx';
import LoginPage from './LoginPage.jsx'
import RegistrationPage from './RegistrationPage.jsx'


class LoginRegistrationPageContainer extends Component {

    componentDidMount() {
        this.changeButtonStyles();
    }

    
    changeButtonStyles() { //Задание стиля кнопок Вход и Регистрация
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
        this.props.mainActions.setShowLoginForm(true);
        this.props.mainActions.setShowRegistrationForm(false);
        let loginButton=document.querySelector('.log-reg-page-container__switchers-area__button-login');
        let registraionButton=document.querySelector('.log-reg-page-container__switchers-area__button-registration');
        loginButton.classList.add('log-reg-page-container__switchers-area__button_selected')
        registraionButton.classList.remove('log-reg-page-container__switchers-area__button_selected')
    }


    onRegistrationButtonClick = ()  => {
        this.props.mainActions.setShowLoginForm(false);
        this.props.mainActions.setShowRegistrationForm(true);
        let loginButton=document.querySelector('.log-reg-page-container__switchers-area__button-login');
        let registraionButton=document.querySelector('.log-reg-page-container__switchers-area__button-registration');
        loginButton.classList.remove('log-reg-page-container__switchers-area__button_selected')
        registraionButton.classList.add('log-reg-page-container__switchers-area__button_selected');
    }


    onEnterButtonClick = () => { //Нажитие на кнопку Войти
        let logginUser = {
            email: this.props.store.main.email,
            password: this.props.store.main.password
        }
        this.props.mainActions.setFetching('start', 'logginIn', 'Загрузка...');
        axios.post('http://84.201.129.203:8888/api/auth/sign_in', logginUser)
        .then(response => {
            this.props.mainActions.setFetching('success', 'logginIn',  'Logged in successfully.');
            localStorage.clear();
            localStorage.setItem('token', JSON.stringify(response.data.token));
            localStorage.setItem('clientId', JSON.stringify(response.data.clientId));
            this.props.mainActions.setToken(response.data.token);
            this.props.mainActions.setClientId(response.data.clientId);
            this.props.mainActions.setAutorized(true);
            this.props.history.push('/admin/all_cases'); // Если уже авторизованы - переход на эту страницу
        })
        .catch(error => {
            this.props.mainActions.setFetching('error', 'logginIn', `Произошла ошибка при входе: ${error.response.status} ( ${error.message} )`);
            alert('Ошибка при входе!');
        })

    };


    onRegisterButtonClick = () => { //Нажитие на кнопку Зарегистрироваться
        let registerUser = {
            email: this.props.store.main.email,
            password: this.props.store.main.password,
            firstName: this.props.store.firstName,
            lastName: this.props.store.lastName,
            clientId: this.props.store.clientId
        }
        this.props.mainActions.setFetching('start', 'register', 'Регистрация...');
        axios.post('http://84.201.129.203:8888/api/auth/sign_up', registerUser)
        .then(response => {
            this.props.mainActions.setFetching('success', 'register',  'Registered successfully.');
            localStorage.clear();
            localStorage.setItem('token', JSON.stringify(response.data.token));
            localStorage.setItem('clientId', JSON.stringify(response.data.clientId));
            this.props.mainActions.setToken(response.data.token);
            this.props.mainActions.setClientId(response.data.clientId);
            this.props.mainActions.setAutorized(true);
            this.props.history.push('/admin/all_cases'); // Если успешно авторизованы - переход на эту страницу
        })
        .catch(error => {
            this.props.mainActions.setFetching('error', 'register', `Произошла ошибка при регистрации: ${error.response.status} ( ${error.message} )`);
            alert(error);
        })
    }


    render() {
        return (
            <>
                {this.props.store.main.fetching.logginIn.isFetching ? 
                    <Preloader {...this.props} preloaderText='Вход...' marginTop='200px'/> 
                    : <div className='log-reg-page-container'>
                        <div className='log-reg-page-container__switchers-area'>
                            <button className='log-reg-page-container__switchers-area__button-log-reg log-reg-page-container__switchers-area__button-login' onClick={this.onLoginButtonClick}>Вход</button>
                            <button className='log-reg-page-container__switchers-area__button-log-reg log-reg-page-container__switchers-area__button-registration' onClick={this.onRegistrationButtonClick}>Регистрация</button>
                        </div>

                        {this.props.store.main.showLoginForm && <LoginPage {...this.props} />}
                        {this.props.store.main.showRegistrationForm && <RegistrationPage {...this.props} />}
                    
                        <div className='log-reg-page-container__buttons-area'>
                            {this.props.store.main.showLoginForm && <button className='log-reg-page-container__form-area__buttons_area__button-log-reg' onClick={this.onEnterButtonClick}>Войти</button>}
                            {this.props.store.main.showRegistrationForm && <button className='log-reg-page-container__form-area__buttons_area__button-log-reg' onClick={this.onRegisterButtonClick}>Зарегистрироваться</button>}
                        </div>
                    </div> 
                } 
            </>      
        )
    }
}


export default LoginRegistrationPageContainer;
