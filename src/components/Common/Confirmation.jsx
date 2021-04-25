import React from 'react';
import './Confirmation.css';


const Confirmation = (props) => { //Получает текст, названия левой и правой кнопки и действия для левой и правой кнопки
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