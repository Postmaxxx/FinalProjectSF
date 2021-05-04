import React from 'react';
import { changeInputStyle, toggleElementAttribute, comparePasswords } from '../../Common/processors.js';


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
        comparePasswords(password, props.store.main.rePassword, ['#register__input-repassword', '#register__input-password']);
    };


    const onChangeRePassword = e => {
        let rePassword = e.target.value;
        props.mainActions.setRePassword(rePassword);
        comparePasswords(props.store.main.password, rePassword, ['#register__input-repassword', '#register__input-password']);
    };


    const onChangeClientID = e => {
        let clientID = e.target.value;
        props.mainActions.setClientId(clientID);
    }


    const onShowPasswordClick = () => { //Показать пароль
        changeInputStyle('.show-passwords-register-icon', 'toggle', 'visiblePassword'); //Объект, тип действия, класс
        toggleElementAttribute('#register__input-password', 'type', 'text', 'password'); //Объект, тип действия, значение1, значение2
        toggleElementAttribute('#register__input-repassword','type', 'text', 'password');
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
                        id='register__input-password'
                        type='password'
                        value={props.store.main.password}
                        onChange={onChangePassword}
                    />
                </div>
                <div className='log-reg-page-container__form-area__input_area__input_item'>
                    <label className='log-reg-page-container__form-area__input_area__input_item__label'>Пароль</label>
                    <input 
                        className='log-reg-page-container__form-area__input_area__input_item__input'
                        id='register__input-repassword'
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

                <div className='show-passwords-register-container'>
                    <div className='show-passwords-register-icon' onClick={onShowPasswordClick}></div>
                </div>
            </div>
        </div>
    )
}


export default RegistrationPage;