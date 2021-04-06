import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import './AllEmployees.css'
 
import { connect } from 'react-redux';
import AllEmployees from './AllEmployees.jsx';
import EmployeeDetailsContainer from './EmployeeDetails/EmployeeDetailsContainer.jsx'
import axios from 'axios';
import Modal from 'react-modal';



class AllEmployeesContainer extends Component {

    componentDidMount() {
        this.props.receiveCasesEmployees({ cases: false, employees: true });
        let employees_table = document.querySelector('.employees-table');
        employees_table.addEventListener('click',((e) => {this.tableClickProcessor(e)}) )
        Modal.setAppElement('body');
    };


    receiveEmployeeIdDetailsData = () => {
        let token = this.props.store.main.token;
        let _id = this.props.store.employees.detailedEmployeeId;

        axios.get(`http://84.201.129.203:8888/api/officers/${_id}`, {headers: {'Authorization': `Bearer ${token}`}})
        .then(response => {
            if (response.status === 200) {
                //console.log('Data for Case ID has been received!: ', response);
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
            alert(error.response);
        })
    }


    tableClickProcessor = (e) => {
        if (e.target.nodeName === 'TD') {
            let employee_id = e.path[1].attributes._id.value; 
            this.props.employeesActions.setDetailedEmployeeId(employee_id);
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
                <h1 className='all-employees-container__header'>Информация о кражах велосипедов</h1>
                <p className='all-employees-container__subheader'>Список всех зарегистрированных случаев кражи велосипедов</p>
                <button className='all-employees-container__add-button' onClick={this.onAddEmployeeButtonClick} />

                <AllEmployees {...this.props} />


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
                    <EmployeeDetailsContainer 
                        {...this.props} 
                        receiveAllEmployeesData={this.receiveAllEmployeesData}
                    />
                </Modal>


            </div>

        )
    } 
}







export default AllEmployeesContainer;