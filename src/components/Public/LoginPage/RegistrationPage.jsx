import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
//import './MainPage.css';
import store from '../../../redux/store';
import { connect } from 'react-redux';



const RegistrationPage = (props) => {

    const onChangeFirstName = e => {
        let firstName = e.target.value;
        props.mainActions.setFirstName(firstName);
    }

    const onChangeLastName = e => {
        let lastName = e.target.value;
        props.mainActions.setLastName(lastName);
    }


    const onChangeEmail = e => {
        let email = e.target.value;
        props.mainActions.setEmail(email);
    }

    const onChangePassword = e => {
        let password = e.target.value;
        props.mainActions.setPassword(password);
    }

    const onChangeRePassword = e => {
        let rePassword = e.target.value;
        props.mainActions.setRePassword(rePassword);
    }

    const onChangeClientID = e => {
        let clientID = e.target.value;
        props.mainActions.setClientID(clientID);
    }






    return (
        <div className='log-reg-page-container__form-area'>
            <div className='log-reg-page-container__form-area__input_area'>
                <div className='log-reg-page-container__form-area__input_area__input_item'>
                    <label className='log-reg-page-container__form-area__input_area__input_item__label'>Имя</label>
                    <input 
                        className='log-reg-page-container__form-area__input_area__input_item__input'
                        type='text'
                        value={props.store.main.firstName}
                        onChange={onChangeFirstName}
                    />
                </div>
                <div className='log-reg-page-container__form-area__input_area__input_item'>
                    <label className='log-reg-page-container__form-area__input_area__input_item__label'>Фамилия</label>
                    <input 
                        className='log-reg-page-container__form-area__input_area__input_item__input'
                        type='text'
                        value={props.store.main.lastName}
                        onChange={onChangeLastName}
                    />
                </div>
                <div className='log-reg-page-container__form-area__input_area__input_item'>
                    <label className='log-reg-page-container__form-area__input_area__input_item__label'>E-mail</label>
                    <input 
                        className='log-reg-page-container__form-area__input_area__input_item__input'
                        type='email'
                        value={props.store.main.email}
                        onChange={onChangeEmail}
                    />
                </div>
                <div className='log-reg-page-container__form-area__input_area__input_item'>
                    <label className='log-reg-page-container__form-area__input_area__input_item__label'>Пароль</label>
                    <input 
                        className='log-reg-page-container__form-area__input_area__input_item__input'
                        type='password'
                        value={props.store.main.password}
                        onChange={onChangePassword}
                    />
                </div>
                <div className='log-reg-page-container__form-area__input_area__input_item'>
                    <label className='log-reg-page-container__form-area__input_area__input_item__label'>Пароль</label>
                    <input 
                        className='log-reg-page-container__form-area__input_area__input_item__input'
                        type='password'
                        value={props.store.main.rePassword}
                        onChange={onChangeRePassword}
                    />
                </div>
                <div className='log-reg-page-container__form-area__input_area__input_item'>
                    <label className='log-reg-page-container__form-area__input_area__input_item__label'>Client ID</label>
                    <input 
                        className='log-reg-page-container__form-area__input_area__input_item__input'
                        type='text'
                        value={props.store.main.clientID}
                        onChange={onChangeClientID}
                    />
                </div>
            </div>
        </div>
    )
}

//                <button onClick={props.onAdminButtonClick}>Autorize me now!</button>


export default RegistrationPage;