import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink, withRouter } from 'react-router-dom';
import './EmployeeDetails.css';
import { connect } from 'react-redux';
import EmployeeDetails from './EmployeeDetails.jsx';
import axios from 'axios';
import { changeInputStyle } from '../../../Common/processors.js'
/*import swal from 'sweetalert';*/

class EmployeeDetailsContainer extends Component {


    onCloseDetailsButtonClick = () => {
        this.closeDetails();
    }

    closeDetails = () => {
        //setTimeout(() => this.props.receiveAllEmployeesData(), 1000); //ХЗ зачем здесь пауза, но иначе таблица Employees при выходе обновляется не всегда, или обновляется на прошлое состояние. Видимо, сервак тормозит с ответом
        this.props.employeesActions.setShowEmployeeDetails(false);
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
        let { email, firstName, lastName, password, rePassword, clientId, approved } = this.props.store.employee;
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
        /*
        if (clientId === '') {
            errorsArray.push('Не указан ID сотрудника');
            changeInputStyle('#employee-details-container__input-client-id', 'add', 'input_uncorrected');
        }
        */
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




    onDeleteEmployeeButtonClick = () => {
        this.props.confirmationActions.setConfirmationMainText('Вы уверены, что хотите удалить данного сотрудника?')
        this.props.confirmationActions.setConfirmationLeftButtonText('Отмена');
        this.props.confirmationActions.setConfirmationRightButtonText('Удалить');
        this.props.confirmationActions.setConfirmationLeftButtonAction(() => this.closeConfirmation());
        this.props.confirmationActions.setConfirmationRightButtonAction(() => this.deleteEmployee());
        this.props.confirmationActions.setShouldCloseOnOverlayClick(true);
        this.props.confirmationActions.setShouldCloseOnEsc(true);
        this.openConfirmation();
    }



    applyChangesToArray = (current_id, employee_corrected) => { // неопримизированный вариант, дело все-равно сначала ищется в базе, и только если нет - добавляется. Но зато универсальнее        let itemInArray = false; //флаг, что дело с данным current_id уже в базе
        let itemInArray = false; 
        let new_employees_array = this.props.store.employees.employeesArray.map(item => { //Поиск дела в базе по _id и коррекция дела, если оно есть
            if (item._id === current_id) { 
                itemInArray = true; 
                return ({ //добавляем поле _id к case_corrected
                    ...employee_corrected,
                    _id: current_id,
                })
            } else return item;
        });
        if (!itemInArray) { 
            let newEmployee = { //добавляем поле _id к case_corrected
                ...employee_corrected,
                _id: current_id,
            }
            console.log('newEmployee', newEmployee);
            new_employees_array = [...this.props.store.employees.employeesArray, newEmployee] //добавление нового дела к базе
        } 
        console.log(new_employees_array);
        this.props.employeesActions.setEmployeesArray(new_employees_array);
    }



    applyDetails = (shouldExit) => {
        this.closeConfirmation();
        let _id = this.props.store.employees.detailedEmployeeId;
        let token = this.props.store.main.token;
        let employee_corrected = {
            email: this.props.store.employee.email,
            firstName: this.props.store.employee.firstName,
            lastName: this.props.store.employee.lastName,
            password: this.props.store.employee.password,
            //rePassword: this.props.store.employee.rePassword,
            clientId: this.props.store.main.clientId,
            approved: this.props.store.employee.approved,
        }
        //console.log(employee_corrected);
        if (_id) {
            axios.put(`http://84.201.129.203:8888/api/officers/${_id}`, employee_corrected, {headers: {'Authorization': `Bearer ${token}`}})
            .then(response => {
                if (response.status === 200) {
                    /*swal({
                        title: "Выполнено!",
                        text: "Вы успешно изменили данные сотрудника.",
                        icon: "success",
                      });*/
                    this.applyChangesToArray(_id, employee_corrected);
                    console.log('Employee has been changed sucessfully!');
                    if (shouldExit) {
                        this.closeDetails();
                    }
                }
            })
            .catch(error => {
                alert(`Произошла ошибка: ${error.response.status} ( ${error.message} ). Попробуйте изменить данные (возможно, данный email занят)`);
                /*swal({
                    title: "Ошибка!",
                    text: `Сервер сообщил об ошибке ${error.response.status} ( ${error.message} ). Попробуйте изменить данные (возможно, данный email занят)`,
                    icon: "error",
                  });*/
            })
        } else {
            axios.post('http://84.201.129.203:8888/api/officers', employee_corrected, {headers: {'Authorization': `Bearer ${token}`}})
            .then(response => {
                if (response.status===200) {
                    let _id = response.data._id;
                    this.props.employeesActions.setDetailedEmployeeId(_id);
                    /*swal({
                        title: "Выполнено!",
                        text: "Вы успешно добавили сотрудника.",
                        icon: "success",
                      });*/
                    this.applyChangesToArray(_id, employee_corrected);
                    console.log('New Employee has been created!');
                    if (shouldExit) {
                        this.closeDetails();
                    }
                }
            })
            .catch(error => {
                alert(`Произошла ошибка: ${error.response.status} ( ${error.message} ). Попробуйте изменить данные (возможно, данный email занят)`);
            });
        };
    }




    deleteEmployee = () => {
        let _id = this.props.store.employees.detailedEmployeeId;
        if (_id) {
            let token = this.props.store.main.token;
            axios.delete(`http://84.201.129.203:8888/api/officers/${_id}`, {headers: {'Authorization': `Bearer ${token}`}})
            .then(response => {
                if (response.status === 200) {
                    alert('Employee has been deleted sucessfully!');
                    this.props.receiveCasesEmployees({ cases: false, employees: true });
                }
            })
            .catch(error => {
                alert(`Произошла ошибка: ${error.status} ( ${error.message} )`);
            });
        }
        this.closeConfirmation();
        this.closeDetails();
    }


    render() {
        return (
                <EmployeeDetails 
                    {...this.props} 
                    onApplyDetailsButtonClick={this.onApplyDetailsButtonClick}
                    onApplyDetailsAndCloseButtonClick={this.onApplyDetailsAndCloseButtonClick}
                    onCloseDetailsButtonClick={this.onCloseDetailsButtonClick} 
                    onDeleteEmployeeButtonClick={this.onDeleteEmployeeButtonClick}
                    closeConfirmation={this.closeConfirmation}
                />
        )
    }



}

export default EmployeeDetailsContainer;
