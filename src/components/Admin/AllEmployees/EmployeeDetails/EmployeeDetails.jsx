import React from 'react';
import Modal from 'react-modal';
import Confirmation from '../../../Common/Confirmation.jsx';
import { changeInputStyle, transformInputValue, toggleElementAttribute, comparePasswords } from '../../../Common/processors.js';

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
        comparePasswords(password, props.store.employee.rePassword, ['#employee-details-container__input-repassword', '#employee-details-container__input-password']);
    };


    const onChangeRePassword = e => {
        let rePassword = e.target.value;
        props.employeeActions.setRePassword(rePassword);
        changeInputStyle('#employee-details-container__input-repassword', 'remove', 'input_uncorrected');
        comparePasswords(props.store.employee.password, rePassword, ['#employee-details-container__input-repassword', '#employee-details-container__input-password']);
    };


    const onChangeApproved = e => {
        let approved = e.target.value;
        props.employeeActions.setApproved(transformInputValue(approved));
    };

    
    const onShowPasswordClick = () => { //при клике показывать пароль
        changeInputStyle('.show-passwords-employee-icon', 'toggle', 'visiblePassword');
        toggleElementAttribute('#employee-details-container__input-password', 'type', 'text', 'password');
        toggleElementAttribute('#employee-details-container__input-repassword','type',  'text', 'password');
    }


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
                        <option value='No'>Нет</option>    
                        <option value='Yes'>Да</option>    
                    </select>
                </div>
            </div>

            <div className='show-passwords-employee-container'>
                    <div className='show-passwords-employee-icon' onClick={onShowPasswordClick}></div>
            </div>

            <div className='employee-details-container__buttons-area'>
                <button className='employee-details-container__buttons-area__button employee-details-container__buttons-area__button-save' onClick={props.onApplyDetailsButtonClick}>Сохранить изменения</button>
                <button className='employee-details-container__buttons-area__button employee-details-container__buttons-area__button-save-close' onClick={props.onApplyDetailsAndCloseButtonClick}>Сохранить и выйти</button>
            </div>

            <Modal
                isOpen={props.store.confirmation.showConfirmation}
                shouldCloseOnOverlayClick={props.store.confirmation.shouldCloseOnOverlayClick}
                shouldCloseOnEsc={props.store.confirmation.shouldCloseOnEsc}
                onRequestClose={props.closeConfirmation}
                className='.'
                style={{
                    overlay: {backgroundColor: 'rgba(255, 255, 255, 0.7)'}
                }}
            >
                <Confirmation {...props} />
            </Modal>
        </div>
    )
}


export default EmployeeDetails;