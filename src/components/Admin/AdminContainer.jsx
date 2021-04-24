import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import AllCasesContainer from './AllCases/AllCasesContainer.jsx';
import AllEmployeesContainer from './AllEmployees/AllEmployeesContainer.jsx';
import './AdminContainer.css';
import { IndexedEmployeeArray } from '../Common/processors.js';


class AdminContainer extends Component {


    receiveCasesEmployees = ( should_receive ) => {
        let token = this.props.store.main.token;
        //if (token) {
            if ( should_receive.cases === true ) {
                this.props.mainActions.setFetching('start', 'receiveCases', 'Загрузка...');
                axios.get('http://84.201.129.203:8888/api/cases', {headers: {'Authorization': `Bearer ${token}`}}, {
                    onDownloadProgress: (progressEvent) => { //видимо, не работает с запросами GET?
                        console.log('progressEvent: ', progressEvent);
                    }
                })
                .then(response => {
                    if (response.status === 200) {
                        this.props.casesActions.setCasesArray(response.data);
                        this.props.mainActions.setFetching('success', 'receiveCases', 'All cases has been received.');
                        //console.log('Your data,sir: ', this.props.store);
                        console.log('All cases data received!');
                    }
                })
                .catch(error => {
                    alert(`Произошла ошибка при загрузке случаев кражи: ${error.response.status} ( ${error.message} )`);
                    this.props.mainActions.setFetching('error', 'receiveCases', `Произошла ошибка при загрузке случаев кражи: ${error.response.status} ( ${error.message} )`);
                });
            };
            if ( should_receive.employees === true ) {
                this.props.mainActions.setFetching('start', 'receiveEmployees', 'Загрузка списка сотрудников...');
                axios.get('http://84.201.129.203:8888/api/officers ', {headers: {'Authorization': `Bearer ${token}`}})
                .then(response => {
                    if (response.status === 200) {

                        //*********
                        let newEmployeesArray = new IndexedEmployeeArray(response.data)
                        this.props.employeesActions.setEmployeesArray(newEmployeesArray);

                        //************* */
                        //this.props.employeesActions.setEmployeesArray(response.data);
                        this.props.mainActions.setFetching('success', 'receiveEmployees', 'All employees has been received.');
                        console.log('All employees data received!');
                        /*
                        let employeesObject = {};
                        this.props.store.employees.employeesArray.forEach((item) => {
                            employeesObject[item._id] = {
                                firstName: item.firstName,
                                lastName: item.lastName,
                                approved: item.approved
                                }
                        } );
                        this.props.employeesActions.setEmployeesObject(employeesObject);
                        */
                    }
                })
                .catch(error => {
                    alert(`Произошла ошибка при загрузке сотрудников: ${error.response.status} ( ${error.message} )`);
                    this.props.mainActions.setFetching('error', 'receiveEmployees', `Произошла ошибка при загрузке сотрудников: ${error.response.status} ( ${error.message} )`);

                })
            };
       // }
    }



    notAutorized = () => {
        return (
            <div className='not_autorized__container'>
                <div className='not_autorized__image'></div>
                <p className='not_autorized__text'>Вы не авторизованы!</p>
            </div>

        )
    }


    render() {
        return (
            <>
            {!this.props.store.main.autorized ? this.notAutorized() :
                    <div className='admin-page-container'>
                        <Route 
                            path='/admin/all_cases' 
                            render={() => <AllCasesContainer receiveCasesEmployees={this.receiveCasesEmployees} {...this.props} />} 
                            exact={true} 
                        />
                        <Route 
                            path='/admin/all_employees' 
                            render={() => <AllEmployeesContainer receiveCasesEmployees={this.receiveCasesEmployees} {...this.props} />} 
                            exact={true} 
                        />
                    </div>
            }
            </>
        )

    }
}



export default AdminContainer;


