import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink, withRouter } from 'react-router-dom';
import './EmployeeDetails.css';
import { connect } from 'react-redux';
import EmployeeDetails from './EmployeeDetails.jsx';
import axios from 'axios';
import { changeInputStyle } from '../../../Common/processors.js'
import Preloader from '../../../Common/Preloader.jsx';
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
        this.props.confirmationActions.setConfirmationLeftButtonText('Нет');
        this.props.confirmationActions.setConfirmationRightButtonText('Да');
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


/*
    applyChangesToArray = (current_id, employee_corrected) => { // неопримизированный вариант, дело все-равно сначала ищется в базе, и только если нет - добавляется. Но зато универсальнее        let itemInArray = false; //флаг, что дело с данным current_id уже в базе
        let employeeInArray = this.props.store.employees.employeesArray.exist(current_id'fdsgf');
        if (employeeInArray) {
            
        } else {
            this.props.store.employees.employeesArray.addToEnd(employee_corrected);
        }
        /*let itemInArray = false; 
        let new_employees_array = this.props.store.employees.employeesArray.map(item => { //Поиск сотрудника в базе по _id и коррекция дела, если оно есть
            if (item._id === current_id) { 
                itemInArray = true; 
                return ({ //добавляем поле _id к employee_corrected
                    ...employee_corrected,
                    _id: current_id,
                })
            } else return item;
        });
        if (!itemInArray) { 
            let newEmployee = { //добавляем поле _id к employee_corrected
                ...employee_corrected,
                _id: current_id,
            }
            console.log('newEmployee', newEmployee);
            new_employees_array = [...this.props.store.employees.employeesArray, newEmployee] //добавление нового дела к базе
        } 
        console.log(new_employees_array);
        this.props.employeesActions.setEmployeesArray(new_employees_array);
    }*/






    applyDetails = (shouldExit) => {
        this.closeConfirmation();
        let _id = this.props.store.employees.detailedEmployeeId;
        let token = this.props.store.main.token;
        let employee_corrected = { //Здесь добавлять _id нельзя, иначе добавление нового сотрудника крашится, оно должно быть без ID
            email: this.props.store.employee.email,
            firstName: this.props.store.employee.firstName,
            lastName: this.props.store.employee.lastName,
            password: this.props.store.employee.password,
            clientId: this.props.store.main.clientId,
            approved: this.props.store.employee.approved 
        }
        //console.log(employee_corrected);
        if (_id) {
            this.props.mainActions.setFetching('start', 'updateEmployee', 'Редактирование сотрудника...');
            axios.put(`http://84.201.129.203:8888/api/officers/${_id}`, employee_corrected, {headers: {'Authorization': `Bearer ${token}`}})
            .then(response => {
                if (response.status === 200) {
                    /*swal({
                        title: "Выполнено!",
                        text: "Вы успешно изменили данные сотрудника.",
                        icon: "success",
                      });*/
                    this.props.mainActions.setFetching('success', 'updateEmployee', 'Редактирование сотрудника успешно завершено!');
                    //this.applyChangesToArray(_id, employee_corrected);
                    employee_corrected._id = _id; //добавляем поле _id
                    this.props.employeesActions.setEditEmployee(employee_corrected);

                    console.log('Employee has been changed sucessfully!');
                    if (shouldExit) {
                        this.closeDetails();
                    }
                }
            })
            .catch(error => {
                console.log(error);
                this.props.mainActions.setFetching('error', 'updateEmployee', `Произошла ошибка при редактировании сотрудника: ${error.response.status} ( ${error.message} )`);
                alert(`Произошла ошибка: ${error.response.status} ( ${error.message} ). Попробуйте изменить данные (возможно, данный email занят)`);
                /*swal({
                    title: "Ошибка!",
                    text: `Сервер сообщил об ошибке ${error.response.status} ( ${error.message} ). Попробуйте изменить данные (возможно, данный email занят)`,
                    icon: "error",
                  });*/
            })
        } else {
            console.log('employee_corrected', employee_corrected);
            this.props.mainActions.setFetching('start', 'createEmployee', 'Созднание сотрудника...');
            axios.post('http://84.201.129.203:8888/api/officers', employee_corrected, {headers: {'Authorization': `Bearer ${token}`}})
            .then(response => {
                if (response.status===200) {
                    let _id = response.data._id;
                    this.props.employeesActions.setDetailedEmployeeId(_id);
                    this.props.mainActions.setFetching('success', 'createEmployee', 'Создание сотрудника успешно завершено!');
                    /*swal({
                        title: "Выполнено!",
                        text: "Вы успешно добавили сотрудника.",
                        icon: "success",
                      });*/
                    //***this.applyChangesToArray(_id, employee_corrected);
                    employee_corrected._id = _id; //добавляем поле _id
                    this.props.employeesActions.setAddEmployeeToEnd(employee_corrected);
                    console.log('New Employee has been created!', response.data );
                    if (shouldExit) {
                        this.closeDetails();
                    }
                }
            })
            .catch(error => {
                this.props.mainActions.setFetching('error', 'createEmployee', `Произошла ошибка при создании сотрудника: ${error.response.status} ( ${error.message} )`);
                alert(`Произошла ошибка: ${error.response.status} ( ${error.message} ). Попробуйте изменить данные (возможно, данный email занят)`);
            });
        };
    }

/*
    deleteEmployeeFromArray = (current_id) => {
        let itemIndex = this.props.store.employees.employeesArray.findIndex((item, index) => {
            console.log(current_id);
            return current_id===item._id
        })
        let new_employees_array = this.props.store.employees.employeesArray;
        new_employees_array.splice(itemIndex, 1);
        this.props.employeesActions.setEmployeesArray(new_employees_array);
    }
*/

    deleteEmployee = () => {
        let _id = this.props.store.employees.detailedEmployeeId;

        if (_id) {
            //************ */
            //console.log('BASE: ', this.props.store.employees.employeesArray);
            //this.props.store.employees.employeesArray.del(_id);
            //console.log('_id, DELETE: ', _id, this.props.store.employees);
            //**************** */

            //this.props.employeesActions.setDeleteEmployeeById(_id);

            let token = this.props.store.main.token;
            this.props.mainActions.setFetching('start', 'deleteEmployee', 'Удаление сотрудника...');
            axios.delete(`http://84.201.129.203:8888/api/officers/${_id}`, {headers: {'Authorization': `Bearer ${token}`}})
            .then(response => {
                if (response.status === 200) {
                    this.props.mainActions.setFetching('success', 'deleteEmployee', 'Удаление сотрудника успешно завершено...');
                    //alert('Employee has been deleted sucessfully!');
                    //this.props.receiveCasesEmployees({ cases: false, employees: true });
                    //this.deleteEmployeeFromArray(_id);
                    this.props.employeesActions.setDeleteEmployeeById(_id);
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
        //console.log(delete_fetching);
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
