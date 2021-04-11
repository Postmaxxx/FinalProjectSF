import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
//import './TheftReport.css';
import { connect } from 'react-redux';
import TheftReportPage from './TheftReportPage.jsx';
import axios from 'axios';
import Modal from 'react-modal';
import { changeInputStyle } from '../../Common/processors.js';
import Preloader from '../../Common/Preloader.jsx';



class TheftReportPageContainer extends Component {
    constructor(props) {
        super(props);
        this.clearForm = this.clearForm.bind(this);
    }


    componentDidMount() {
        Modal.setAppElement('body');
     }   


    openConfirmation = () => {
        this.props.confirmationActions.setShowConfirmation(true);
    }
    
    closeConfirmation = () => {
        this.props.confirmationActions.setShowConfirmation(false);
    }

    onClearFormButtonClick = () => {
        this.props.confirmationActions.setConfirmationMainText('Вы уверены, что хотите очистить форму?')
        this.props.confirmationActions.setConfirmationLeftButtonText('Отмена');
        this.props.confirmationActions.setConfirmationRightButtonText('Очистить');
        this.props.confirmationActions.setConfirmationLeftButtonAction(() => this.closeConfirmation());
        this.props.confirmationActions.setConfirmationRightButtonAction(() => this.clearForm());
        this.props.confirmationActions.setShouldCloseOnOverlayClick(false);
        this.props.confirmationActions.setShouldCloseOnEsc(true);     
        this.openConfirmation();
    }


    clearForm() {  
        this.props.caseActions.setDate('');
        this.props.caseActions.setLicenseNumber('');
        this.props.caseActions.setColor('');
        this.props.caseActions.setType('');
        this.props.caseActions.setOwnerFullName('');
        this.props.caseActions.setDescription('');
        changeInputStyle('#theft-report-page__input-date', 'remove', 'input_uncorrected');
        changeInputStyle('#theft-report-page__input-licenceNumber', 'remove', 'input_uncorrected');
        changeInputStyle('#theft-report-page__input-color', 'remove', 'input_uncorrected');
        changeInputStyle('#theft-report-page__input-ownerFullName', 'remove', 'input_uncorrected');
        changeInputStyle('#theft-report-page__input-description', 'remove', 'input_uncorrected');
        changeInputStyle('#theft-report-page__input-bikeType', 'remove', 'input_uncorrected');
        console.log('Form has been cleared!');
        this.closeConfirmation();
    }

    
    onSubmitFormButtonClick = () => {
        this.props.confirmationActions.setConfirmationMainText('Вы уверены, что хотите отправить сообщение?')
        this.props.confirmationActions.setConfirmationLeftButtonText('Отмена');
        this.props.confirmationActions.setConfirmationRightButtonText('Отправить');
        this.props.confirmationActions.setConfirmationLeftButtonAction(() => this.closeConfirmation())
        this.props.confirmationActions.setConfirmationRightButtonAction(() => this.checkAndSendSubmitForm());
        this.props.confirmationActions.setShouldCloseOnOverlayClick(true);
        this.props.confirmationActions.setShouldCloseOnEsc(true);
        this.openConfirmation();
    }
    

    checkInputsCorrection = () => {
        let errorsArray = [];
        let { date, ownerFullName, bikeType, color, licenseNumber, description } = this.props.store.case;
        if (date === '') {
            errorsArray.push('Не указана дата кражи велосипеда');
            changeInputStyle('#theft-report-page__input-date', 'add', 'input_uncorrected');
        }
        if (licenseNumber.length < 3) {
            errorsArray.push('Не указан номер велосипеда');
            changeInputStyle('#theft-report-page__input-licenceNumber', 'add', 'input_uncorrected');
        }
        if (color.length < 3) {
            errorsArray.push('Не указан цвет велосипеда');
            changeInputStyle('#theft-report-page__input-color', 'add', 'input_uncorrected')
        }
        if (bikeType === '') {
            errorsArray.push('Не выбран тип велосипеда');
            changeInputStyle('#theft-report-page__input-bikeType', 'add', 'input_uncorrected');
        }
        if (ownerFullName.length < 6) {
            errorsArray.push('ФИО владельца велосипеда слишком короткое');
            changeInputStyle('#theft-report-page__input-ownerFullName', 'add', 'input_uncorrected');
        }
        if (description.length < 20) {
            errorsArray.push('Описание обстоятельст кражи и особых примет слишком короткое');
            changeInputStyle('#theft-report-page__input-description', 'add', 'input_uncorrected');
        }
        if (errorsArray.length === 0) {
            return 'None';
        } else { 
            return (errorsArray.join(", ") + '. ') 
        }
    }


    checkAndSendSubmitForm = ()  => {
        this.closeConfirmation();
        let errorsList = this.checkInputsCorrection();
        if (errorsList === 'None') {
            this.submitForm();
        } else {
            alert('Обнаружены следующие ошибки при заполнении: ' + errorsList + 'Исправьте введенные даннные и попробуйте снова.');
        }
    }


    submitForm = () => {
        let current_date = new Date().toISOString().split('T')[0];
        let report_data = {
            status: 'new',
            date: this.props.store.case.date,
            licenseNumber: this.props.store.case.licenseNumber,
            color: this.props.store.case.color,
            type: this.props.store.case.bikeType,
            ownerFullName: this.props.store.case.ownerFullName,
            createdAt: current_date, 
            updateAt: current_date,
            clientId: 'bmluYS5wb3N0bmlrb3ZhODdAeWFuZGV4LnJ1',
            description: this.props.store.case.description,
            resolution: ''
        };
        console.log('Starting axios post... ', report_data);
        this.props.mainActions.setFetching('start', 'reportCase', 'Отправка сообщения...');
        axios.post('http://84.201.129.203:8888/api/public/report', report_data)
        .then(response => {
            if (response.status===200) {
                this.props.mainActions.setFetching('success', 'reportCase', `Данные успешно отправлены!`);
                this.props.caseActions.setDate('');
                this.props.caseActions.setLicenseNumber('');
                this.props.caseActions.setColor('');
                this.props.caseActions.setType('выберете:');
                this.props.caseActions.setOwnerFullName('');
                this.props.caseActions.setDescription(''); 
                alert('Отчет был успешно отправлен!');
            }
        })
        .catch(error => {
            this.props.mainActions.setFetching('error', 'reportCase', `Произошла ошибка при отправке сообщения: ${error.response.status} ( ${error.message} )`);
            alert('Ошибка при отправке отчета!' + error);
        });

    }


    testFetch = () => {
        this.props.mainActions.setFetching('start', 'logginIn' ,'Загрузка...');
        console.log(this.props);
    }
       

    testFetch2 = () => {
        this.props.mainActions.setFetching('start', 'receiveEmployees' ,'Загрузка...');
        console.log(this.props);
    }


    render() {
        return (
            <div className='theft-report-page-container'>
                <button onClick={this.testFetch}>ChangeFetch</button>
                <button onClick={this.testFetch2}>ChangeFetch2</button>
                
                {this.props.store.main.fetching.reportCase.isFetching ? <Preloader {...this.props} preloaderText='Отправка сообщения...' marginTop='0px' marginLeft='auto'/> 
                    :  <TheftReportPage 
                    {...this.props} 
                    onClearFormButtonClick={this.onClearFormButtonClick}
                    onSubmitFormButtonClick={this.onSubmitFormButtonClick}
                    closeConfirmation={this.closeConfirmation}
                    />
                    }

                
               
            </div>
        )

    }
} 




export default TheftReportPageContainer;