import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
//import './TheftReport.css';
import store from '../../../redux/store';
import { connect } from 'react-redux';
import './TheftReportPage.css';
import Confirmation from '../../Common/Confirmation.jsx';
import Modal from 'react-modal';
import { changeInputStyle } from '../../Common/processors.js';



const TheftReport = (props) => {

    const onChangeDate = e => {
        let date = e.target.value;
        props.caseActions.setDate(date);
        changeInputStyle('#theft-report-page__input-date', 'remove', 'input_uncorrected');
    };

    const onChangeLicenseNumber = e => {
        let licenseNumber = e.target.value;
        props.caseActions.setLicenseNumber(licenseNumber);
        changeInputStyle('#theft-report-page__input-licenceNumber', 'remove', 'input_uncorrected');
    };

    const onChangeColor = e => {
        let color = e.target.value;
        props.caseActions.setColor(color);
        changeInputStyle('#theft-report-page__input-color', 'remove', 'input_uncorrected');
    };

    const onChangeType = (e) => {
        let value = e.target.value;
        props.caseActions.setType(value);
        changeInputStyle('#theft-report-page__input-bikeType', 'remove', 'input_uncorrected');
    };


    const onChangeOwnerFullName = e => {
        let ownerFullName = e.target.value;
        props.caseActions.setOwnerFullName(ownerFullName);
        changeInputStyle('#theft-report-page__input-ownerFullName', 'remove', 'input_uncorrected');
    };

    const onChangeDescription = e => {
        let description = e.target.value;
        props.caseActions.setDescription(description);
        changeInputStyle('#theft-report-page__input-description', 'remove', 'input_uncorrected');
    };


    return (
        <div className='theft-report-page'>
            <h1 className='theft-report-page__header'>Вы можете отправить сообщение о краже, заполнив форму ниже</h1>
            <div className='theft-report-page__inputs-area'>
                <div className='theft-report-page__inputs-area__left-side'>
                    <div className='theft-report-page__inputs-area__left-side__input-item'>
                        <label className='theft-report-page__inputs-area__left-side__input-item__label'>Дата кражи</label>
                        <input 
                            className='theft-report-page__inputs-area__left-side__input-item__input'
                            id='theft-report-page__input-date'
                            placeholder=''
                            type='date'
                            value={props.store.case.date} 
                            onChange={onChangeDate}
                        />
                    </div>
                    <div className='theft-report-page__inputs-area__left-side__input-item'>
                        <label className='theft-report-page__inputs-area__left-side__input-item__label'>Номер велосипеда</label>
                        <input 
                            className='theft-report-page__inputs-area__left-side__input-item__input'
                            id='theft-report-page__input-licenceNumber'
                            placeholder=''
                            type='text'
                            value={props.store.case.licenseNumber}
                            onChange={onChangeLicenseNumber}
                        />
                    </div>
                    <div className='theft-report-page__inputs-area__left-side__input-item'>
                        <label className='theft-report-page__inputs-area__left-side__input-item__label'>Цвет велосипеда</label>
                        <input 
                            className='theft-report-page__inputs-area__left-side__input-item__input'
                            id='theft-report-page__input-color'
                            placeholder=''
                            type='text'
                            value={props.store.case.color}
                            onChange={onChangeColor}
                        />
                    </div>

                    <div className='theft-report-page__inputs-area__left-side__input-item'>
                        <label className='theft-report-page__inputs-area__left-side__input-item__label'>Тип велосипеда</label>
                        <select 
                            className='theft-report-page__inputs-area__left-side__input-item__input' 
                            id='theft-report-page__input-bikeType'
                            onChange={onChangeType} 
                            value={props.store.case.bikeType}>
                                <option value=''></option>    
                                <option value='general'>Обычный</option>    
                                <option value='sport'>Спорт</option>    
                        </select>
                    </div>

                    <div className='theft-report-page__inputs-area__left-side__input-item'>
                        <label className='theft-report-page__inputs-area__left-side__input-item__label'>ФИО владельца</label>
                        <input 
                            className='theft-report-page__inputs-area__left-side__input-item__input'
                            id='theft-report-page__input-ownerFullName'
                            placeholder=''
                            type='text'
                            value={props.store.case.ownerFullName}
                            onChange={onChangeOwnerFullName}
                        />
                    </div>
                </div>

                <div className='theft-report-page__inputs-area__right-side'>
                    <p className='theft-report-page__inputs-area__right-side__label'>Опишите обстоятельства кражи и особые приметы велосипеда, которые могли бы помочь при его поиске</p>
                    <textarea 
                        className='theft-report-page__inputs-area__right-side__textarea' 
                        id='theft-report-page__input-description'
                        onChange={onChangeDescription} 
                        value={props.store.case.description} />
                </div>
            </div>

            <div className='theft-report-page__buttons-area'>
                <button className='theft-report-page__button-clear' onClick={props.onClearFormButtonClick}>Очистить форму</button>
                <button className='theft-report-page__button-send' onClick={props.onSubmitFormButtonClick}>Отправить данные</button>
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


export default TheftReport;

