import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink, withRouter } from 'react-router-dom';
import './CaseDetails.css';
import { connect } from 'react-redux';
import CaseDetails from './CaseDetails.jsx';
import axios from 'axios';
import { changeInputStyle } from '../../../Common/processors.js'
import Preloader from '../../../Common/Preloader.jsx';

class CaseDetailsContainer extends Component {


    onCloseDetailsButtonClick = () => {
        this.closeDetails();
    }

    closeDetails = () => {
        //setTimeout(() => this.props.receiveAllCasesData(), 1000); //ХЗ зачем здесь пауза, но иначе таблица Cases при выходе обновляется не всегда, или обновляется на прошлое состояние. Видимо, сервак тормозит с ответом
        this.props.casesActions.setShowCaseDetails(false);
    }

    openConfirmation = () => {
        this.props.confirmationActions.setShowConfirmation(true);
    }
    
    closeConfirmation = () => {
        this.props.confirmationActions.setShowConfirmation(false);
    }


    onApplyDetailsButtonClick = () => {
        this.props.confirmationActions.setConfirmationMainText('Вы уверены, что хотите применить изменения?')
        this.props.confirmationActions.setConfirmationLeftButtonText('Отмена');
        this.props.confirmationActions.setConfirmationRightButtonText('Применить');
        this.props.confirmationActions.setConfirmationLeftButtonAction(() => this.closeConfirmation());
        this.props.confirmationActions.setConfirmationRightButtonAction(() => this.checkAndSendDetailsForm(false));
        this.props.confirmationActions.setShouldCloseOnOverlayClick(true);
        this.props.confirmationActions.setShouldCloseOnEsc(true);
        this.openConfirmation();
    }


    checkInputsCorrection = () => {
        let errorsArray = [];
        let { date, ownerFullName, bikeType, color, licenseNumber, officer, description, resolution, status, hasOfficer} = this.props.store.case;
        let approved = 'employee not chosen';
        if (this.props.store.employees.employeesObject[officer]) {
            approved = this.props.store.employees.employeesObject[officer].approved;
        }
        if (date === '') {
            errorsArray.push('Не указана дата кражи велосипеда');
            changeInputStyle('#case-details-container__input-date', 'add', 'input_uncorrected');
        }
        if (ownerFullName.length < 6) {
            errorsArray.push('ФИО владельца велосипеда слишком короткое');
            changeInputStyle('#case-details-container__input-ownerFullName', 'add', 'input_uncorrected');
        }
        if (bikeType === '') {
            errorsArray.push('Не выбран тип велосипеда');
            changeInputStyle('#case-details-container__input-bikeType', 'add', 'input_uncorrected');
        }
        if (color.length < 3) {
            errorsArray.push('Не указан цвет велосипеда');
            changeInputStyle('#case-details-container__input-color', 'add', 'input_uncorrected')
        }
        if (licenseNumber.length < 3) {
            errorsArray.push('Не указан номер велосипеда');
            changeInputStyle('#case-details-container__input-licenseNumber', 'add', 'input_uncorrected');
        }
        if ( (hasOfficer === true) && (officer === undefined) ) {
            errorsArray.push('Не указано ответственное лицо');
            changeInputStyle('#case-details-container__input-officer', 'add', 'input_uncorrected');
        }
        if ( (hasOfficer === true) && (!approved) ) {
            errorsArray.push('Ответственное лицо не одобрено');
            changeInputStyle('#case-details-container__input-officer', 'add', 'input_uncorrected');
        }
        if (description.length < 20) {
            errorsArray.push('Описание обстоятельст кражи и особых примет слишком короткое');
            changeInputStyle('#case-details-container__input-description', 'add', 'input_uncorrected');
        }
        if ((status === 'done')&&(resolution.length < 20)) {
            errorsArray.push('Описание заключения слишком короткое');
            changeInputStyle('#case-details-container__input-resolution', 'add', 'input_uncorrected');
        }
        if (errorsArray.length === 0) {
            return 'None';
        } else { 
            return (errorsArray.join(", ") + '. ') 
        }
    }


    checkAndSendDetailsForm = (shouldExit)  => {
        this.closeConfirmation();
        let errorsList = this.checkInputsCorrection();
        if (errorsList === 'None') {
            this.applyDetails(shouldExit);
        } else {
            alert('Обнаружены следующие ошибки при заполнении: ' + errorsList + 'Исправьте введенные даннные и попробуйте снова.');
        }
    }



    onApplyDetailsAndCloseButtonClick = () => {
        this.props.confirmationActions.setConfirmationMainText('Вы уверены, что хотите применить изменения и выйти?')
        this.props.confirmationActions.setConfirmationLeftButtonText('Отмена');
        this.props.confirmationActions.setConfirmationRightButtonText('Принять');
        this.props.confirmationActions.setConfirmationLeftButtonAction(() => this.closeConfirmation());
        this.props.confirmationActions.setConfirmationRightButtonAction(() => this.checkAndSendDetailsForm(true));
        this.props.confirmationActions.setShouldCloseOnOverlayClick(true);
        this.props.confirmationActions.setShouldCloseOnEsc(true);
        this.openConfirmation();
    }




    onDeleteCaseButtonClick = () => {
        this.props.confirmationActions.setConfirmationMainText('Вы уверены, что хотите удалить данное дело?')
        this.props.confirmationActions.setConfirmationLeftButtonText('Отмена');
        this.props.confirmationActions.setConfirmationRightButtonText('Удалить');
        this.props.confirmationActions.setConfirmationLeftButtonAction(() => this.closeConfirmation());
        this.props.confirmationActions.setConfirmationRightButtonAction(() => this.deleteCase());
        this.props.confirmationActions.setShouldCloseOnOverlayClick(true);
        this.props.confirmationActions.setShouldCloseOnEsc(true);
        this.openConfirmation();
    }


    applyChangesToArray = (current_id, case_corrected) => { // неопримизированный вариант, дело все-равно сначала ищется в базе, и только если нет - добавляется. Но зато универсальнее        let itemInArray = false; //флаг, что дело с данным current_id уже в базе
        let itemInArray = false; 
        let new_cases_array = this.props.store.cases.casesArray.map(item => { //Поиск дела в базе по _id и коррекция дела, если оно есть
            if (item._id === current_id) { 
                itemInArray = true; 
                return ({ //добавляем поле _id к case_corrected
                    _id: item._id,
                    ...case_corrected
                })
            } else return item;
        });
        if (!itemInArray) { 
            let newCase = { //добавляем поле _id к case_corrected
                _id: current_id,
                ...case_corrected
            }
            new_cases_array = [...this.props.store.cases.casesArray, newCase] //добавление нового дела к базе
        } 
        this.props.casesActions.setCasesArray(new_cases_array);
    }


    deleteCaseFromArray = (current_id) => {
        let itemIndex = this.props.store.cases.casesArray.findIndex((item, index) => {
            return current_id===item._id
        })

        let new_cases_array = this.props.store.cases.casesArray;
        new_cases_array.splice(itemIndex, 1);
        this.props.casesActions.setCasesArray(new_cases_array);
    }


    applyDetails = (shouldExit) => { 
        //this.closeConfirmation();
        let _id = this.props.store.cases.detailedCaseId;
        let token = this.props.store.main.token;
        let current_date = new Date().toISOString().split('T')[0];
        let case_corrected = {
            status: this.props.store.case.status,
            date: this.props.store.case.date,
            licenseNumber: this.props.store.case.licenseNumber,
            color: this.props.store.case.color,
            type: this.props.store.case.bikeType,
            ownerFullName: this.props.store.case.ownerFullName,
            officer: this.props.store.case.officer,
            createdAt: this.props.store.case.createdAt,
            updateAt: current_date,
            clientId: this.props.store.main.clientId,
            description: this.props.store.case.description,
            resolution: this.props.store.case.resolution
        }
        if (_id) {
            this.props.mainActions.setFetching('start', 'updateCase', 'Редактирование дела...');
            axios.put(`http://84.201.129.203:8888/api/cases/${_id}`, case_corrected, {headers: {'Authorization': `Bearer ${token}`}})
            .then(response => {
                if (response.status === 200) {
                    this.props.mainActions.setFetching('success', 'updateCase', 'Редактирование дела успешно завершено!');
                    console.log('Case has been changed sucessfully!');
                    this.applyChangesToArray(_id, case_corrected);
                    if (response.data.officer !== undefined) {
                        this.props.caseActions.setHasOfficer(true);
                    }
                    if (shouldExit) {
                        this.closeDetails();
                    }
                }
            })
            .catch(error => {
                this.props.mainActions.setFetching('error', 'updateCase', `Произошла ошибка при редактировании дела: ${error.response.status} ( ${error.message} )`);
                //alert(error.response);
            })
        } else {
            this.props.mainActions.setFetching('start', 'createCase', 'Созднание дела...');
            axios.post('http://84.201.129.203:8888/api/cases', case_corrected, {headers: {'Authorization': `Bearer ${token}`}})
            .then(response => {
                if (response.status===200) {
                    this.props.mainActions.setFetching('success', 'createCase', 'Создание дела успешно завершено!');
                    let current_id = response.data._id;
                    console.log('Case has been added sucessfully!');
                    this.props.casesActions.setDetailedCaseId(_id);
                    this.applyChangesToArray(current_id, case_corrected);
                    if (response.data.officer !== undefined) {
                        this.props.caseActions.setHasOfficer(true);
                    }
                    if (shouldExit) {
                        this.closeDetails();
                    }
                }
            })
            .catch(error => {
                this.props.mainActions.setFetching('error', 'createCase', `Произошла ошибка при создании дела: ${error.response.status} ( ${error.message} )`);
                //alert(error.response);
            });
        };
    }




    deleteCase = () => {
        let _id = this.props.store.cases.detailedCaseId;
        if (_id) {
            let token = this.props.store.main.token;
            this.deleteCaseFromArray(_id);

            this.props.mainActions.setFetching('start', 'deleteCase', 'Удаление дела...');
            axios.delete(`http://84.201.129.203:8888/api/cases/${_id}`, {headers: {'Authorization': `Bearer ${token}`}})
            .then(response => {
                if (response.status === 200) {
                    this.props.mainActions.setFetching('success', 'deleteCase', 'Удаление дела успешно завершено...');
                    //alert('Case has been deleted sucessfully!')
                    //this.props.receiveCasesEmployees({ cases: true, employees: false });
                    this.deleteCaseFromArray(_id);
                    this.closeDetails();
                }
            })
            .catch(error => {
                this.props.mainActions.setFetching('error', 'deleteCase', `Произошла ошибка при удалении дела: ${error.response.status} ( ${error.message} )`);
                //alert(`Произошла ошибка: ${error.status} ( ${error.message} )`);
            });
        }     
        this.closeConfirmation();
    }
    


    render() {
        let create_fetching = this.props.store.main.fetching.createCase.isFetching;
        let update_fetching = this.props.store.main.fetching.updateCase.isFetching;
        let delete_fetching = this.props.store.main.fetching.deleteCase.isFetching;
        //console.log(delete_fetching);
        return (
                <>
                {create_fetching && <Preloader {...this.props} preloaderText='Создание делa...' marginTop='200px' marginLeft='auto'/> }
                {update_fetching && <Preloader {...this.props} preloaderText='Редактирование делa...' marginTop='200px' marginLeft='auto'/> }
                {delete_fetching && <Preloader {...this.props} preloaderText='Удаление делa...' marginTop='200px' marginLeft='auto'/> }
                {create_fetching || update_fetching || delete_fetching ||
                <CaseDetails 
                    {...this.props} 
                    onApplyDetailsButtonClick={this.onApplyDetailsButtonClick}
                    onApplyDetailsAndCloseButtonClick={this.onApplyDetailsAndCloseButtonClick}
                    onCloseDetailsButtonClick={this.onCloseDetailsButtonClick} 
                    onDeleteCaseButtonClick={this.onDeleteCaseButtonClick}
                    closeConfirmation={this.closeConfirmation}
                />
                }
                </>
        )
    }



}

export default CaseDetailsContainer;
