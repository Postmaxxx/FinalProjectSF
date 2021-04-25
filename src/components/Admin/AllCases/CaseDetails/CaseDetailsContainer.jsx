import React, { Component } from 'react';
import './CaseDetails.css';
import CaseDetails from './CaseDetails.jsx';
import axios from 'axios';
import { changeInputStyle, checkContentType } from '../../../Common/processors.js'
import Preloader from '../../../Common/Preloader.jsx';


class CaseDetailsContainer extends Component {

    onCloseDetailsButtonClick = () => { //Нажатие кнопки Закрыть
        this.closeDetails();
    }


    closeDetails = () => { //Закрытие детализации
        this.props.casesActions.setShowCaseDetails(false);
    }


    openConfirmation = () => {
        this.props.confirmationActions.setShowConfirmation(true);
    }
    
    
    closeConfirmation = () => {
        this.props.confirmationActions.setShowConfirmation(false);
    }


    onApplyDetailsButtonClick = () => { //Нажатие кнопки Сохранить изменения
        this.props.confirmationActions.setConfirmationMainText('Вы уверены, что хотите применить изменения?')
        this.props.confirmationActions.setConfirmationLeftButtonText('Отмена');
        this.props.confirmationActions.setConfirmationRightButtonText('Применить');
        this.props.confirmationActions.setConfirmationLeftButtonAction(() => this.closeConfirmation());
        this.props.confirmationActions.setConfirmationRightButtonAction(() => this.checkAndSendDetailsForm(false));
        this.props.confirmationActions.setShouldCloseOnOverlayClick(true);
        this.props.confirmationActions.setShouldCloseOnEsc(true);
        this.openConfirmation();
    }


    checkInputsCorrection = () => { //Проверка корректности ввода
        let errorsArray = []; //массив ошибок
        let { date, ownerFullName, bikeType, color, licenseNumber, officer, description, resolution, status, hasOfficer} = this.props.store.case;
        let approved = false; // по умолчанию сотрудник не одобрен
        let officerExist = this.props.store.employees.employeesArray.isExist(officer);
        if (officerExist) {
            approved = this.props.store.employees.employeesArray.findById(officer).approved;
        }

        if (date === '') {
            errorsArray.push('Не указана дата кражи велосипеда');
            changeInputStyle('#case-details-container__input-date', 'add', 'input_uncorrected');
        }
        
        if (ownerFullName.length < 6) {
            errorsArray.push('ФИО владельца велосипеда слишком короткое');
            changeInputStyle('#case-details-container__input-ownerFullName', 'add', 'input_uncorrected');
        }
        if (!checkContentType(ownerFullName, 'text')) {
            errorsArray.push('ФИО владельца введено некорректно');
            changeInputStyle('#case-details-container__input-ownerFullName', 'add', 'input_uncorrected');
        }

        if (bikeType === '') {
            errorsArray.push('Не выбран тип велосипеда');
            changeInputStyle('#case-details-container__input-bikeType', 'add', 'input_uncorrected');
        }
        
        if (color.length < 3) {
            errorsArray.push('Поле "цвет велосипеда" слишком короткое');
            changeInputStyle('#case-details-container__input-color', 'add', 'input_uncorrected')
        }
        if (!checkContentType(color, 'text')) {
            errorsArray.push('Поле "цвет велосипеда" введено некорректно');
            changeInputStyle('#case-details-container__input-color', 'add', 'input_uncorrected')
        }

        if (licenseNumber.length < 3) {
            errorsArray.push('Не указан номер велосипеда');
            changeInputStyle('#case-details-container__input-licenseNumber', 'add', 'input_uncorrected');
        }
        if (!checkContentType(licenseNumber, 'text+number')) {
            errorsArray.push('Номер велосипеда указан неверно (разрешены только цифры и буквы)');
            changeInputStyle('#case-details-container__input-licenseNumber', 'add', 'input_uncorrected');
        }
        
        if ( (hasOfficer === true) && (officer === undefined) ) {
            errorsArray.push('Не указано ответственное лицо');
            changeInputStyle('#case-details-container__input-officer', 'add', 'input_uncorrected');
        }
        if ( (officerExist) && (!approved) ) {
            errorsArray.push('Ответственное лицо не одобрено');
            changeInputStyle('#case-details-container__input-officer', 'add', 'input_uncorrected');
        }

        if (description.length < 20) {
            errorsArray.push('Описание обстоятельст кражи и особых примет слишком короткое');
            changeInputStyle('#case-details-container__input-description', 'add', 'input_uncorrected');
        }
        if ( (status === 'done') && (resolution.length < 20) ) {
            errorsArray.push('Описание заключения слишком короткое');
            changeInputStyle('#case-details-container__input-resolution', 'add', 'input_uncorrected');
        }

        return errorsArray.length === 0 ? 'None' : (errorsArray.join(", ") + '. ')
    }


    checkAndSendDetailsForm = (shouldExit)  => { //shouldExit=true - выход после сохранения
        this.closeConfirmation();
        let errorsList = this.checkInputsCorrection();
        errorsList === 'None' ? 
            this.applyDetails(shouldExit) : 
            alert('Обнаружены следующие ошибки при заполнении: ' + errorsList + 'Исправьте введенные даннные и попробуйте снова.');
    }


    onApplyDetailsAndCloseButtonClick = () => { //Нажатие кнопки Сохранить и выйти
        this.props.confirmationActions.setConfirmationMainText('Вы уверены, что хотите применить изменения и выйти?')
        this.props.confirmationActions.setConfirmationLeftButtonText('Отмена');
        this.props.confirmationActions.setConfirmationRightButtonText('Принять');
        this.props.confirmationActions.setConfirmationLeftButtonAction(() => this.closeConfirmation());
        this.props.confirmationActions.setConfirmationRightButtonAction(() => this.checkAndSendDetailsForm(true));
        this.props.confirmationActions.setShouldCloseOnOverlayClick(true);
        this.props.confirmationActions.setShouldCloseOnEsc(true);
        this.openConfirmation();
    }


    onDeleteCaseButtonClick = () => { //Нажатие кнопки удалить
        this.props.confirmationActions.setConfirmationMainText('Вы уверены, что хотите удалить данное дело?')
        this.props.confirmationActions.setConfirmationLeftButtonText('Отмена');
        this.props.confirmationActions.setConfirmationRightButtonText('Удалить');
        this.props.confirmationActions.setConfirmationLeftButtonAction(() => this.closeConfirmation());
        this.props.confirmationActions.setConfirmationRightButtonAction(() => this.deleteCase());
        this.props.confirmationActions.setShouldCloseOnOverlayClick(true);
        this.props.confirmationActions.setShouldCloseOnEsc(true);
        this.openConfirmation();
    }


    applyChangesToArray = (currentId, caseCorrected) => { // неопримизированный вариант, дело все-равно сначала ищется в базе, и только если нет - добавляется. Но зато универсальный      
        let itemInArray = false;   //флаг, что дело с данным currentId уже в базе
        let newCasesArray = this.props.store.cases.casesArray.map(item => { //Поиск дела в базе по _id и коррекция дела, если оно есть
            if (item._id === currentId) { 
                itemInArray = true; 
                return ({ //добавляем поле _id к caseCorrected
                    _id: item._id,
                    ...caseCorrected
                })
            } else return item;
        });
        if (!itemInArray) {  //если дела с таким ID нет
            let newCase = { //добавляем поле _id к caseCorrected
                _id: currentId,
                ...caseCorrected
            }
            newCasesArray = [...this.props.store.cases.casesArray, newCase] //добавление нового дела к базе
        } 
        this.props.casesActions.setCasesArray(newCasesArray);
    }


    deleteCaseFromArray = (currentId) => { //удаление дела с ID=currentId из массива дел
        let itemIndex = this.props.store.cases.casesArray.findIndex((item) => {
            return currentId===item._id
        })
        let newCasesArray = this.props.store.cases.casesArray;
        newCasesArray.splice(itemIndex, 1);
        this.props.casesActions.setCasesArray(newCasesArray);
    }

    
    applyDetails = (shouldExit) => { //Применение изменений
        let _id = this.props.store.cases.detailedCaseId;
        let token = this.props.store.main.token;
        let current_date = new Date().toISOString().split('T')[0];

        let caseCorrected = { //измененное дело
            ...this.props.store.case,
            updateAt: current_date,
            type: this.props.store.case.bikeType,
        };
        delete caseCorrected.bikeType; //эти данные не нужны при отправке, вместо bikeType -> type
        delete caseCorrected.hasOfficer; //эти данные не нужны при отправке

        if (_id) {
           this.props.mainActions.setFetching('start', 'updateCase');
            axios.put(`http://84.201.129.203:8888/api/cases/${_id}`, caseCorrected, {headers: {'Authorization': `Bearer ${token}`}})
            .then(response => {
                if (response.status === 200) {
                    this.props.mainActions.setFetching('success', 'updateCase', 'Редактирование дела успешно завершено!');
                    this.applyChangesToArray(_id, caseCorrected);
                    if (!this.props.store.case.hasOfficer && this.props.store.case.officer) { //если назначенного сотрудника не было, но мы при редактировании назначили
                        this.props.caseActions.setHasOfficer(true);
                    }
                    if (shouldExit) {
                        this.closeDetails();
                    }
                }
            })
            .catch(error => {
                this.props.mainActions.setFetching('error', 'updateCase', `Произошла ошибка при редактировании дела: ${error.response.status} ( ${error.message} )`);
                alert(error.response);
            })
        } else {
            this.props.mainActions.setFetching('start', 'createCase');
            axios.post('http://84.201.129.203:8888/api/cases', caseCorrected, {headers: {'Authorization': `Bearer ${token}`}})
            .then(response => {
                if (response.status===200) {
                    this.props.mainActions.setFetching('success', 'createCase', 'Создание дела успешно завершено!');
                    let currentId = response.data._id;
                    this.props.casesActions.setDetailedCaseId(_id);
                    this.applyChangesToArray(currentId, caseCorrected);
                    if (this.props.store.case.officer) { //если офицера указали при добавлении дела
                        this.props.caseActions.setHasOfficer(true); 
                    }

                    if (shouldExit) {
                        this.closeDetails();
                    }
                }
            })
            .catch(error => {
                this.props.mainActions.setFetching('error', 'createCase', `Произошла ошибка при создании дела: ${error.response.status} ( ${error.message} )`);
                alert(error.response);
            });
        };
    }


    deleteCase = () => { //удаление дела
        let _id = this.props.store.cases.detailedCaseId;
        if (_id) {
            let token = this.props.store.main.token;
            this.deleteCaseFromArray(_id);
            this.props.mainActions.setFetching('start', 'deleteCase');
            axios.delete(`http://84.201.129.203:8888/api/cases/${_id}`, {headers: {'Authorization': `Bearer ${token}`}})
            .then(response => {
                if (response.status === 200) {
                    this.props.mainActions.setFetching('success', 'deleteCase', 'Удаление дела успешно завершено...');
                    this.deleteCaseFromArray(_id);
                    this.closeDetails();
                }
            })
            .catch(error => {
                this.props.mainActions.setFetching('error', 'deleteCase', `Произошла ошибка при удалении дела: ${error.response.status} ( ${error.message} )`);
                alert(`Произошла ошибка: ${error.status} ( ${error.message} )`);
            });
        }     
        this.closeConfirmation();
    }
    

    render() {
        let fetchingCreateCase = this.props.store.main.fetching.createCase.isFetching;
        let fetchingUpdateCase = this.props.store.main.fetching.updateCase.isFetching;
        let fetchingDeleteCase = this.props.store.main.fetching.deleteCase.isFetching;
        return (
            <>
                {fetchingCreateCase && <Preloader {...this.props} preloaderText='Создание делa...' marginTop='200px' marginLeft='auto'/> }
                {fetchingUpdateCase && <Preloader {...this.props} preloaderText='Редактирование делa...' marginTop='200px' marginLeft='auto'/> }
                {fetchingDeleteCase && <Preloader {...this.props} preloaderText='Удаление делa...' marginTop='200px' marginLeft='auto'/> }
                
                {fetchingCreateCase || fetchingUpdateCase || fetchingDeleteCase || // если нет никаких preloaders
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
