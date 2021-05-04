import React, { Component } from 'react';
import './EmployeeDetails.css';
import EmployeeDetails from './EmployeeDetails.jsx';
import axios from 'axios';
import { changeInputStyle } from '../../../Common/processors.js'
import Preloader from '../../../Common/Preloader.jsx';

class EmployeeDetailsContainer extends Component {

    onCloseDetailsButtonClick = () => { //при нажатии кнопки Закрыть детальную информацию
        this.closeDetails();
    }


    closeDetails = () => {
        this.props.employeesActions.setShowEmployeeDetails(false);
    }


    openConfirmation = () => {
        this.props.confirmationActions.setShowConfirmation(true);
    }
    

    closeConfirmation = () => {
        this.props.confirmationActions.setShowConfirmation(false);
    }


    onApplyDetailsButtonClick = () => { //при нажатии кнопки Сохранить изменения
        this.props.confirmationActions.setConfirmationMainText('Вы уверены, что хотите применить изменения?')
        this.props.confirmationActions.setConfirmationLeftButtonText('Нет');
        this.props.confirmationActions.setConfirmationRightButtonText('Да');
        this.props.confirmationActions.setConfirmationLeftButtonAction(() => this.closeConfirmation());
        this.props.confirmationActions.setConfirmationRightButtonAction(() => this.checkAndSendDetailsForm(false));
        this.props.confirmationActions.setShouldCloseOnOverlayClick(true);
        this.props.confirmationActions.setShouldCloseOnEsc(true);
        this.openConfirmation();
    }


    checkInputsCorrection = () => { //проверка корректности введенных данных
        let errorsArray = []; //массив ошибок
        let { email, firstName, lastName, password, rePassword } = this.props.store.employee;
        if (email === '') {
            errorsArray.push('Не указан email');
            changeInputStyle('#employee-details-container__input-email', 'add', 'input_uncorrected');
        }
        if (firstName.length === '') {
            errorsArray.push('Не указано имя сотрудника');
            changeInputStyle('#employee-details-container__input-first-name', 'add', 'input_uncorrected');
        }
        if (lastName === '') {
            errorsArray.push('Не указана фамилия сотрудника');
            changeInputStyle('#employee-details-container__input-last-name', 'add', 'input_uncorrected');
        }
        if (password.length < 6) {
            errorsArray.push('Пароль слишком короткий');
            changeInputStyle('#employee-details-container__input-password', 'add', 'input_uncorrected')
        }
        if (rePassword !== password) {
            errorsArray.push('Пароль и подтверждение не совпадают');
            changeInputStyle('#employee-details-container__input-repassword', 'add', 'input_uncorrected')
        }

        return errorsArray.length === 0 ? 'None' : (errorsArray.join(", ") + '. ')
    }


    checkAndSendDetailsForm = (shouldExit)  => {
        this.closeConfirmation();
        let errorsList = this.checkInputsCorrection();
        errorsList === 'None' ? 
            this.applyDetails(shouldExit) : 
            alert('Обнаружены следующие ошибки при заполнении: ' + errorsList + 'Исправьте введенные даннные и попробуйте снова.');
    }


    onApplyDetailsAndCloseButtonClick = () => { //при нажатии кнопки Сохранить и выйти
        this.props.confirmationActions.setConfirmationMainText('Вы уверены, что хотите применить изменения и выйти?')
        this.props.confirmationActions.setConfirmationLeftButtonText('Отмена');
        this.props.confirmationActions.setConfirmationRightButtonText('Принять');
        this.props.confirmationActions.setConfirmationLeftButtonAction(() => this.closeConfirmation());
        this.props.confirmationActions.setConfirmationRightButtonAction(() => this.checkAndSendDetailsForm(true));
        this.props.confirmationActions.setShouldCloseOnOverlayClick(true);
        this.props.confirmationActions.setShouldCloseOnEsc(true);
        this.openConfirmation();
    }


    onDeleteEmployeeButtonClick = () => { //при нажатии кнопки Удалить
        this.props.confirmationActions.setConfirmationMainText('Вы уверены, что хотите удалить данного сотрудника?')
        this.props.confirmationActions.setConfirmationLeftButtonText('Отмена');
        this.props.confirmationActions.setConfirmationRightButtonText('Удалить');
        this.props.confirmationActions.setConfirmationLeftButtonAction(() => this.closeConfirmation());
        this.props.confirmationActions.setConfirmationRightButtonAction(() => this.deleteEmployee());
        this.props.confirmationActions.setShouldCloseOnOverlayClick(true);
        this.props.confirmationActions.setShouldCloseOnEsc(true);
        this.openConfirmation();
    }


    applyDetails = (shouldExit) => { // shouldExit - при true выход по окончании работы
        this.closeConfirmation();
        let _id = this.props.store.employees.detailedEmployeeId;
        let token = this.props.store.main.token;
        let employeeСorrected = { //Здесь добавлять _id нельзя, иначе добавление нового сотрудника крашится, оно должно быть без ID
            email: this.props.store.employee.email, //не знаю, как такое деструктуризировать
            firstName: this.props.store.employee.firstName,
            lastName: this.props.store.employee.lastName,
            password: this.props.store.employee.password,
            clientId: this.props.store.main.clientId,
            approved: this.props.store.employee.approved
        }
        if (_id) { //если сотрудник уже есть в базе, редактирование
            this.props.mainActions.setFetching('start', 'updateEmployee');
            axios.put(`http://84.201.129.203:8888/api/officers/${_id}`, employeeСorrected, {headers: {'Authorization': `Bearer ${token}`}})
            .then(response => {
                if (response.status === 200) {
                    this.props.mainActions.setFetching('success', 'updateEmployee', 'Редактирование сотрудника успешно завершено!');
                    employeeСorrected._id = _id; //добавляем поле _id
                    this.props.employeesActions.setEditEmployee(employeeСorrected); //обновляем массив сотрудников
                    shouldExit && this.closeDetails();
                }
            })
            .catch(error => {
                this.props.mainActions.setFetching('error', 'updateEmployee', `Произошла ошибка при редактировании сотрудника: ${error.response.status} ( ${error.message} )`);
                alert(`Произошла ошибка: ${error.response.status} ( ${error.message} ). Попробуйте изменить данные (возможно, данный email занят)`);
            })
        } else { //если его нет, создание
            this.props.mainActions.setFetching('start', 'createEmployee');
            axios.post('http://84.201.129.203:8888/api/officers', employeeСorrected, {headers: {'Authorization': `Bearer ${token}`}})
            .then(response => {
                if (response.status===200) {
                    let _id = response.data._id;
                    this.props.employeesActions.setDetailedEmployeeId(_id);
                    this.props.mainActions.setFetching('success', 'createEmployee', 'Создание сотрудника успешно завершено!');
                    employeeСorrected._id = _id; //добавляем поле _id
                    this.props.employeesActions.setAddEmployeeToEnd(employeeСorrected); //обновляем массив сотрудников путем добавления нового сотрудника в конец массива
                    shouldExit && this.closeDetails();
                }
            })
            .catch(error => {
                this.props.mainActions.setFetching('error', 'createEmployee', `Произошла ошибка при создании сотрудника: ${error.response.status} ( ${error.message} )`);
                alert(`Произошла ошибка: ${error.response.status} ( ${error.message} ). Попробуйте изменить данные (возможно, данный email занят)`);
            });
        };
    }


    deleteEmployee = () => { 
        let _id = this.props.store.employees.detailedEmployeeId;

        if (_id) { //если сотрудник есть в базе
            let token = this.props.store.main.token;
            this.props.mainActions.setFetching('start', 'deleteEmployee');
            axios.delete(`http://84.201.129.203:8888/api/officers/${_id}`, {headers: {'Authorization': `Bearer ${token}`}})
            .then(response => {
                if (response.status === 200) {
                    this.props.mainActions.setFetching('success', 'deleteEmployee', 'Удаление сотрудника успешно завершено...');
                    this.props.employeesActions.setDeleteEmployeeById(_id); //удаление из массива
                    this.closeDetails();
                }
            })
            .catch(error => {
                this.props.mainActions.setFetching('error', 'deleteEmployee', `Произошла ошибка при удалении сотрудника: ${error.response.status} ( ${error.message} )`);
                alert(`Произошла ошибка: ${error.status} ( ${error.message} )`);
            });
        }
        this.closeConfirmation();
    }


    render() {
        let create_fetching = this.props.store.main.fetching.createEmployee.isFetching;
        let update_fetching = this.props.store.main.fetching.updateEmployee.isFetching;
        let delete_fetching = this.props.store.main.fetching.deleteEmployee.isFetching;
        return (
            <>
                {create_fetching && <Preloader {...this.props} preloaderText='Создание сотрудника...' marginTop='200px' marginLeft='auto'/> }
                {update_fetching && <Preloader {...this.props} preloaderText='Редактирование сотрудника...' marginTop='200px' marginLeft='auto'/> }
                {delete_fetching && <Preloader {...this.props} preloaderText='Удаление сотрудника...' marginTop='200px' marginLeft='auto'/> }
                {create_fetching || update_fetching || delete_fetching ||
                <EmployeeDetails 
                    {...this.props} 
                    onApplyDetailsButtonClick={this.onApplyDetailsButtonClick}
                    onApplyDetailsAndCloseButtonClick={this.onApplyDetailsAndCloseButtonClick}
                    onCloseDetailsButtonClick={this.onCloseDetailsButtonClick} 
                    onDeleteEmployeeButtonClick={this.onDeleteEmployeeButtonClick}
                    closeConfirmation={this.closeConfirmation}
                />
                }
            </>
        )
    }
}


export default EmployeeDetailsContainer;
