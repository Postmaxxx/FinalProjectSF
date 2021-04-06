import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import AllCasesContainer from './AllCases/AllCasesContainer.jsx';
import AllEmployeesContainer from './AllEmployees/AllEmployeesContainer.jsx';


class AdminContainer extends Component {

    receiveCasesEmployees = ( should_receive ) => {
        let token = this.props.store.main.token;
        if (token) {
            if ( should_receive.cases === true ) {
                axios.get('http://84.201.129.203:8888/api/cases', {headers: {'Authorization': `Bearer ${token}`}})
                .then(response => {
                    if (response.status === 200) {
                        this.props.casesActions.setCasesArray(response.data);
                        console.log('All cases data received!');
                    }
                })
                .catch(error => {
                    alert(`Произошла ошибка при загрузке сулчаев кражи: ${error.response.status} ( ${error.message} )`);
    
                });
            };
            if ( should_receive.employees === true ) {
                axios.get('http://84.201.129.203:8888/api/officers ', {headers: {'Authorization': `Bearer ${token}`}})
                .then(response => {
                    if (response.status === 200) {
                        this.props.employeesActions.setEmployeesArray(response.data);
                        console.log('All employees data received!');

                        let employeesObject = {};
                        this.props.store.employees.employeesArray.map((item) => {
                            employeesObject[item._id] = `${item.firstName} ${item.lastName}`
                        } );
                        this.props.employeesActions.setEmployeesObject(employeesObject);
                    }
                })
                .catch(error => {
                    alert(`Произошла ошибка при загрузке сотрудников: ${error.response.status} ( ${error.message} )`);
                })
            };
        }
    }



    render() {
        return (
            <>
            {!this.props.store.main.autorized ? 'You are not authorized!' :
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


