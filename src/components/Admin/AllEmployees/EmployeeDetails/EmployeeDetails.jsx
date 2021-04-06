import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink, withRouter } from 'react-router-dom';
//import './MainPage.css';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Confirmation from '../../../Common/Confirmation.jsx';
import { changeInputStyle, transformInputValue } from '../../../Common/processors.js';


const EmployeeDetails = (props) => {

    const onChangeEmail = e => {
        let email = e.target.value;
        props.employeeActions.setEmail(email);
        changeInputStyle('#employee-details-container__input-email', 'remove', 'input_uncorrected');
    };

    const onChangeFirstName = e => {
        let firstName = e.target.value;
        props.employeeActions.setFirstName(firstName);
        changeInputStyle('#employee-details-container__input-first-name', 'remove', 'input_uncorrected');
    };

    const onChangeLastName = e => {
        let lastName = e.target.value;
        props.employeeActions.setLastName(lastName);
        changeInputStyle('#employee-details-container__input-last-name', 'remove', 'input_uncorrected');
    };

    const onChangePassword = e => {
        let password = e.target.value;
        props.employeeActions.setPassword(password);
        changeInputStyle('#employee-details-container__input-password', 'remove', 'input_uncorrected');
    };

    const onChangeRePassword = e => {
        let re_password = e.target.value;
        props.employeeActions.setRePassword(re_password);
        changeInputStyle('#employee-details-container__input-repassword', 'remove', 'input_uncorrected');
    };

    const onChangeApproved = e => {
        let approved = e.target.value;
        props.employeeActions.setApproved(transformInputValue(approved));
    };


    return (
        <div className='employee-details-container'>
            <div className='employee-details-container__header-container'>
                <button className='employee-details-container__header-container__delete-button' onClick={props.onDeleteEmployeeButtonClick} />
                <h1 className='employee-details-container__header'>{props.store.employees.detailedEmployeeHeaderText}</h1>
                <button className='employee-details-container__header__close-button' onClick={props.onCloseDetailsButtonClick} />
            </div>

            <div className='employee-details-container__inputs-area'>
                <div className='employee-details-container__inputs-area__item'>
                    <label className='employee-details-container__inputs-area__item__label'>Email</label>
                    <input 
                        className='employee-details-container__inputs-area__item__input' 
                        id='employee-details-container__input-email'
                        placeholder=''
                        type='email'
                        value={props.store.employee.email} 
                        onChange={onChangeEmail}
                    />
                </div>

                <div className='employee-details-container__inputs-area__item'>
                    <label className='employee-details-container__inputs-area__item__label'>Имя сотрудника</label>
                    <input 
                        className='employee-details-container__inputs-area__item__input' 
                        id='employee-details-container__input-first-name'
                        placeholder=''
                        type='text'
                        value={props.store.employee.firstName}
                        onChange={onChangeFirstName}
                    />
                </div>

                
                <div className='employee-details-container__inputs-area__item'>
                    <label className='employee-details-container__inputs-area__item__label'>Фамилия сотрудника</label>
                    <input 
                        className='employee-details-container__inputs-area__item__input' 
                        id='employee-details-container__input-last-name'
                        placeholder=''
                        type='text'
                        value={props.store.employee.lastName}
                        onChange={onChangeLastName}
                    />
                </div>

                <div className='employee-details-container__inputs-area__item'>
                    <label className='employee-details-container__inputs-area__item__label'>Пароль</label>
                    <input 
                        className='employee-details-container__inputs-area__item__input' 
                        id='employee-details-container__input-password'
                        placeholder=''
                        type='password'
                    value={props.store.employee.password}
                    onChange={onChangePassword}
                    />
                </div>


                <div className='employee-details-container__inputs-area__item'>
                    <label className='employee-details-container__inputs-area__item__label'>Повтор пароля</label>
                    <input 
                        className='employee-details-container__inputs-area__item__input' 
                        id='employee-details-container__input-repassword'
                        placeholder=''
                        type='password'
                        value={props.store.employee.rePassword}
                        onChange={onChangeRePassword}
                    />
                </div>



                <div className='employee-details-container__inputs-area__item'>
                    <label className='employee-details-container__inputs-area__item__label'>Одобрен</label>
                    <select className='employee-details-container__inputs-area__item__input' 
                        value={transformInputValue(props.store.employee.approved)}
                        onChange={onChangeApproved} 
                    >
                        <option value={'No'}>Нет</option>    
                        <option value={'Yes'}>Да</option>    
                    </select>
                </div>
                


            </div>



            <div className='employee-details-container__buttons-area'>
                <button className='employee-details-container__buttons-area__button employee-details-container__buttons-area__button-save' onClick={props.onApplyDetailsButtonClick}>Сохранить изменения</button>
                <button className='employee-details-container__buttons-area__button employee-details-container__buttons-area__button-save-close' onClick={props.onApplyDetailsAndCloseButtonClick}>Сохранить и выйти</button>
            </div>

            <Modal
                    isOpen={props.store.confirmation.showConfirmation}
                    //contentLabel="Minimal Modal Example"
                    shouldCloseOnOverlayClick={props.store.confirmation.shouldCloseOnOverlayClick}
                    shouldCloseOnEsc={props.store.confirmation.shouldCloseOnEsc}
                    onRequestClose={props.closeConfirmation}
                    className='.'
                    style={{
                        overlay: {backgroundColor: 'rgba(255, 255, 255, 0.7)'}
                    }}
                    >
                    <Confirmation 
                        {...props} 
                    />
            </Modal>


        </div>
    )


}




export default EmployeeDetails;


/*
                <div className='employee-details-container__inputs-area__item'>
                    <label className='employee-details-container__inputs-area__item__label'>Client ID</label>
                    <input 
                        className='employee-details-container__inputs-area__item__input' 
                        id='employee-details-container__input-client-id'
                        placeholder=''
                        type='text'
                        value={props.store.employee.clientId}
                        onChange={onChangeClientId}
                    />
                </div>
*/