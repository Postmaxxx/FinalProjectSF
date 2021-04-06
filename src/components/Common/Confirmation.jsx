import React, { Component } from 'react';
import './Confirmation.css';
import { connect } from 'react-redux';


const Confirmation = (props) => {
    //console.log('Confirmation');
    return (
        <div className='confirmation-container'>
            <p className='confirmation-container__text'>{props.store.confirmation.confirmationMainText}</p>
            <div className='confirmation-container__buttons-container'>
                <button className='confirmation-container__button confirmation-container__buttons-container__button-left' onClick={props.store.confirmation.confirmationLeftButtonAction}>{props.store.confirmation.confirmationLeftButtonText}</button>
                <button className='confirmation-container__button confirmation-container__buttons-container__button-right' onClick={props.store.confirmation.confirmationRightButtonAction}>{props.store.confirmation.confirmationRightButtonText}</button>
            </div>
        </div>
    )
}






export default Confirmation;