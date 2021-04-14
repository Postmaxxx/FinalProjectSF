import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
//import './MainPage.css';
import store from '../../../redux/store';
import { connect } from 'react-redux';
import { changeInputStyle, toggleElementAttribute } from '../../Common/processors.js';


const LoginPage = (props) => {


    const onShowPasswordClick = () => {
        changeInputStyle('.show-passwords-icon', 'toggle', 'visiblePassword');
        toggleElementAttribute('.password-input', 'type', 'text', 'password');
    }


    const onChangeEmail = e => {
        let email = e.target.value;
        props.mainActions.setEmail(email);
    }

    const onChangePassword = e => {
        let password = e.target.value;
        props.mainActions.setPassword(password);
    }

    return (
        <div className='log-reg-page-container__form-area'>
            <div className='log-reg-page-container__form-area__input_area'>
                <div className='log-reg-page-container__form-area__input_area__input_item'>
                    <label className='log-reg-page-container__form-area__input_area__input_item__label'>Логин</label>
                    <input 
                        className='log-reg-page-container__form-area__input_area__input_item__input'
                        placeholder=''
                        type='email'
                        value={props.store.main.email}
                        onChange={onChangeEmail}
                    />
                </div>
                <div className='log-reg-page-container__form-area__input_area__input_item'>
                    <label className='log-reg-page-container__form-area__input_area__input_item__label'>Пароль</label>
                    <input 
                        className='log-reg-page-container__form-area__input_area__input_item__input password-input'
                        placeholder=''
                        type='password'
                        value={props.store.main.password}
                        onChange={onChangePassword}
                    />
                </div>
                <div className='show-passwords-container'>
                    <div className='show-passwords-icon' onClick={onShowPasswordClick}></div>
                </div>
            </div>
        </div>
    )
}



export default LoginPage;