import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink, withRouter } from 'react-router-dom';
//import './MainPage.css';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Confirmation from '../../../Common/Confirmation.jsx';
import { changeInputStyle } from '../../../Common/processors.js';

const CaseDetails = (props) => {

    const onChangeStatus = e => {
        let status = e.target.value;
        props.caseActions.setStatus(status);
    };

    const onChangeDate = e => {
        let date = e.target.value;
        props.caseActions.setDate(date);
        changeInputStyle('#case-details-container__input-date', 'remove', 'input_uncorrected');
    };

    const onChangeOwnerFullName = e => {
        let ownerFullName = e.target.value;
        props.caseActions.setOwnerFullName(ownerFullName);
        changeInputStyle('#case-details-container__input-ownerFullName', 'remove', 'input_uncorrected');
    };

    const onChangeType = e => {
        let bikeType = e.target.value;
        props.caseActions.setType(bikeType);
        changeInputStyle('#case-details-container__input-bikeType', 'remove', 'input_uncorrected');
    };

    const onChangeColor = e => {
        let color = e.target.value;
        props.caseActions.setColor(color);
        changeInputStyle('#case-details-container__input-color', 'remove', 'input_uncorrected');
    };


    const onChangeLicenseNumber = e => {
        let licenseNumber = e.target.value;
        props.caseActions.setLicenseNumber(licenseNumber);
        changeInputStyle('#case-details-container__input-licenseNumber', 'remove', 'input_uncorrected');
    };


    const onChangeOfficer = e => {
        let officer_id = e.target.value;
        if (officer_id === 'Не назначен') {
            props.caseActions.setOfficer(undefined)
        } else {
            props.caseActions.setOfficer(officer_id)
        }
        changeInputStyle('#case-details-container__input-officer', 'remove', 'input_uncorrected');
    };


    const onChangeDescription = e => {
        let description = e.target.value;
        props.caseActions.setDescription(description);
        changeInputStyle('#case-details-container__input-description', 'remove', 'input_uncorrected');
};

    const onChangeResolution = e => {
        let resolution = e.target.value;
        props.caseActions.setResolution(resolution);
        changeInputStyle('#case-details-container__input-resolution', 'remove', 'input_uncorrected');
    };

    

    return (
        <div className='case-details-container'>
            <div className='case-details-container__header-container'>
                <button className='case-details-container__header-container__delete-button' onClick={props.onDeleteCaseButtonClick} />
                <h1 className='case-details-container__header'>{props.store.cases.detailedCaseHeaderText}</h1>
                <button className='case-details-container__header__close-button' onClick={props.onCloseDetailsButtonClick} />
            </div>
            <div className='case-details-container__inputs-area'>
                <div className='case-details-container__inputs-area__left-side'>
                    <div className='case-details-container__inputs-area__left-side__item'>
                        <label className='case-details-container__inputs-area__left-side__item__label'>Статус дела</label>
                        <select className='case-details-container__inputs-area__left-side__item__input' 
                            value={props.store.case.status}
                            onChange={onChangeStatus} 
                        >
                            <option value='new'>Новое</option>    
                            <option value='in_progress'>В работе</option>    
                            <option value='done'>Закрыто</option>    
                        </select>
                    </div>

                    <div className='case-details-container__inputs-area__left-side__item'>
                        <label className='case-details-container__inputs-area__left-side__item__label'>Дата кражи</label>
                        <input 
                            className='case-details-container__inputs-area__left-side__item__input' 
                            id='case-details-container__input-date'
                            placeholder=''
                            type='date'
                            value={props.store.case.date.slice(0,10)} 
                            onChange={onChangeDate}
                        />
                    </div>

                    <div className='case-details-container__inputs-area__left-side__item'>
                        <label className='case-details-container__inputs-area__left-side__item__label'>ФИО Владельца</label>
                        <input 
                            className='case-details-container__inputs-area__left-side__item__input' 
                            id='case-details-container__input-ownerFullName'
                            placeholder=''
                            type='text'
                            value={props.store.case.ownerFullName}
                            onChange={onChangeOwnerFullName}
                        />
                    </div>

                    <div className='case-details-container__inputs-area__left-side__item'>
                        <label className='case-details-container__inputs-area__left-side__item__label'>Тип велосипеда</label>
                        <select className='case-details-container__inputs-area__left-side__item__input' 
                            value={props.store.case.bikeType}
                            id='case-details-container__input-bikeType'
                            onChange={onChangeType} 
                        >
                        <option value='general'>Обычный</option>    
                        <option value='sport'>Спорт</option>       
                        </select>
                    </div>
                    
                    <div className='case-details-container__inputs-area__left-side__item'>
                        <label className='case-details-container__inputs-area__left-side__item__label'>Цвет велосипеда</label>
                        <input 
                            className='case-details-container__inputs-area__left-side__item__input' 
                            id='case-details-container__input-color'
                            placeholder=''
                            type='text'
                            value={props.store.case.color}
                            onChange={onChangeColor}
                        />
                    </div>

                    <div className='case-details-container__inputs-area__left-side__item'>
                        <label className='case-details-container__inputs-area__left-side__item__label'>Номер велосипеда</label>
                        <input 
                            className='case-details-container__inputs-area__left-side__item__input' 
                            id='case-details-container__input-licenseNumber'
                            placeholder=''
                            type='text'
                        value={props.store.case.licenseNumber}
                        onChange={onChangeLicenseNumber}
                        />
                    </div>


                    <div className='case-details-container__inputs-area__left-side__item'>
                        <label className='case-details-container__inputs-area__left-side__item__label'>Сотрудник</label>
                        <select 
                            className='case-details-container__inputs-area__left-side__item__input' 
                            id='case-details-container__input-officer'
                            value={props.store.case.officer === undefined ? 'Не назначен' : props.store.case.officer}
                            onChange={onChangeOfficer} 
                            >   
                                <option value={undefined} key='x'>Не назначен</option>
                                {props.store.employees.employeesArray.map((item) => {
                                    return (
                                        <option value={item._id} key={item._id}>{item.lastName} {item.firstName}</option>
                                    )
                                })}

                        </select>
                    </div>



                </div>

                <div className='case-details-container__inputs-area_right-side'>
                    <div className='case-details-container__inputs-area__right-side__item'>
                        <label className='case-details-container__inputs-area__right-side__item__label'>Описание случая</label>
                        <textarea 
                            className='case-details-container__inputs-area__right-side__item__descr' 
                            className={props.store.case.status === 'done' ? 
                                'case-details-container__inputs-area__right-side__item__descr'
                                : 'case-details-container__inputs-area__right-side__item__descr case-details-container__inputs-area__right-side__item__descr_expanded'}
                            id='case-details-container__input-description'
                            onChange={onChangeDescription} 
                            value={props.store.case.description} 
                            />
                    </div>
           
                    
                    <div 
                        className={props.store.case.status === 'done' ? 
                            'case-details-container__inputs-area__right-side__item' :
                            'invisible'}
                        >
                        
                        
                        <label className='case-details-container__inputs-area__right-side__item__label'>Заключение</label>
                        <textarea 
                            className='case-details-container__inputs-area__right-side__item__resolution' 
                            id='case-details-container__input-resolution'
                            onChange={onChangeResolution} 
                            value={props.store.case.resolution} 
                        />
                    </div>
                        
                    
                </div>
            </div>



            <div className='case-details-container__buttons-area'>
                <button className='case-details-container__buttons-area__button case-details-container__buttons-area__button-save' onClick={props.onApplyDetailsButtonClick}>Сохранить изменения</button>
                <button className='case-details-container__buttons-area__button case-details-container__buttons-area__button-save-close' onClick={props.onApplyDetailsAndCloseButtonClick}>Сохранить и выйти</button>
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




export default CaseDetails;

/*
                    <div className='case-details-container__inputs-area__left-side__item'>
                        <label className='case-details-container__inputs-area__left-side__item__label'>ID ответственного</label>
                        <input 
                            className='case-details-container__inputs-area__left-side__item__input' 
                            id='case-details-container__input-officer'
                            placeholder=''
                            type='text'
                            value={props.store.case.officer}
                            onChange={onChangeOfficer}
                        />
                    </div>
*/