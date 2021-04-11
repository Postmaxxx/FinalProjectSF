import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import './AllEmployees.css'
import Preloader from '../../Common/Preloader.jsx';
import { connect } from 'react-redux';
import AllEmployees from './AllEmployees.jsx';
import EmployeeDetailsContainer from './EmployeeDetails/EmployeeDetailsContainer.jsx'
import axios from 'axios';
import Modal from 'react-modal';



class AllEmployeesContainer extends Component {

    componentDidMount() {
        this.props.receiveCasesEmployees({ cases: false, employees: true });
        /*if (!this.props.store.main.fetching.receiveEmployees.isFetching) {
            let employees_table = document.querySelector('.employees-table');
            employees_table.addEventListener('click',((e) => {this.tableClickProcessor(e)}) )
        }*/
        Modal.setAppElement('body');
    };


    receiveEmployeeIdDetailsData = () => {
        let token = this.props.store.main.token;
        let _id = this.props.store.employees.detailedEmployeeId;
        this.props.mainActions.setFetching('start', 'getDetailedEmployee', 'Загрузка сотрудника...');
        axios.get(`http://84.201.129.203:8888/api/officers/${_id}`, {headers: {'Authorization': `Bearer ${token}`}})
        .then(response => {
            if (response.status === 200) {
                //console.log('Data for Case ID has been received!: ', response);
                this.props.mainActions.setFetching('success', 'getDetailedEmployee', 'Employee data has been received!');
                this.props.employeeActions.setEmail(response.data.email);
                this.props.employeeActions.setFirstName(response.data.firstName);
                this.props.employeeActions.setLastName(response.data.lastName);
                this.props.employeeActions.setPassword(response.data.password);
                this.props.employeeActions.setRePassword(response.data.password);
                this.props.employeeActions.setClientId(response.data.clientId);
                this.props.employeeActions.setApproved(response.data.approved);
            }
        })
        .catch(error => {
            this.props.mainActions.setFetching('error', 'getDetailedCase', `Произошла ошибка при загрузке сотрудника: ${error.response.status} ( ${error.message} )`);
            alert(error.response);
        })
    }


    tableClickProcessor = async(e) => {
        if (e.target.nodeName === 'TD') {
            let employee_id = e.target.parentElement.attributes._id.nodeValue;
            await this.props.employeesActions.setDetailedEmployeeId(employee_id);
            this.props.employeesActions.setDetailedEmployeeHeaderText('Подробная информация о выбранном сотруднике');
            this.receiveEmployeeIdDetailsData();
            this.props.employeesActions.setShowEmployeeDetails(true);
        }
    };


    closeModal = () => {
        this.props.employeesActions.setShowEmployeeDetails(false);
    }


    onAddEmployeeButtonClick = () => {
        this.props.employeeActions.setEmail('');
        this.props.employeeActions.setFirstName('');
        this.props.employeeActions.setLastName('');
        this.props.employeeActions.setPassword('');
        this.props.employeeActions.setRePassword('');
        this.props.employeeActions.setApproved(false);
        this.props.employeeActions.setClientId('');

        this.props.employeesActions.setDetailedEmployeeId('');
        this.props.employeesActions.setDetailedEmployeeHeaderText('Создание нового сотрудника');
        this.props.employeesActions.setShowEmployeeDetails(true);
    }



    render() {
        return (
            <div className='all-employees-container'>
                <h1 className='all-employees-container__header'>Информация о сотрудниках</h1>
                <p className='all-employees-container__subheader'>Список всех сотрудников</p>
                <button className='all-employees-container__add-button' onClick={this.onAddEmployeeButtonClick} />


                {this.props.store.main.fetching.receiveEmployees.isFetching ? <Preloader {...this.props} preloaderText='Загрузка...'/>
                : <AllEmployees {...this.props} onTableClick={this.tableClickProcessor} />}
            


                <Modal
                     isOpen={this.props.store.employees.showEmployeeDetails}
                    //contentLabel="Minimal Modal Example"
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                    onRequestClose={this.closeModal}
                    className='.'
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)'
                        }
                    }}
                    >
 
                    {this.props.store.main.fetching.getDetailedEmployee.isFetching ? <Preloader {...this.props} preloaderText='Загрузка сотрудника...' marginTop='200px' marginLeft='auto'/> 
                    : <EmployeeDetailsContainer {...this.props} />
                    }



                </Modal>


            </div>

        )
    } 
}







export default AllEmployeesContainer;