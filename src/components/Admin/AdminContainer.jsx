import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import AllCasesContainer from './AllCases/AllCasesContainer.jsx';
import AllEmployeesContainer from './AllEmployees/AllEmployeesContainer.jsx';
import './AdminContainer.css';
import { IndexedEmployeeArray } from '../Common/processors.js';


class AdminContainer extends Component {

    receiveCasesEmployees = ( shouldReceive ) => { //should_receive объект, cases - получать дела, employees - получать сотрудников
        let token = this.props.store.main.token;

        if ( shouldReceive.cases === true ) {
            this.props.mainActions.setFetching('start', 'receiveCases');
            axios.get('http://84.201.129.203:8888/api/cases', {headers: {'Authorization': `Bearer ${token}`}})
            .then(response => {
                if (response.status === 200) {
                    this.props.casesActions.setCasesArray(response.data);
                    this.props.mainActions.setFetching('success', 'receiveCases', 'All cases has been received.');
                }
            })
            .catch(error => {
                alert(`Произошла ошибка при загрузке случаев кражи: ${error.response.status} ( ${error.message} )`);
                this.props.mainActions.setFetching('error', 'receiveCases', `Произошла ошибка при загрузке случаев кражи: ${error.response.status} ( ${error.message} )`);
            });
        };

        if ( shouldReceive.employees === true ) {
            this.props.mainActions.setFetching('start', 'receiveEmployees');
            axios.get('http://84.201.129.203:8888/api/officers ', {headers: {'Authorization': `Bearer ${token}`}})
            .then(response => {
                if (response.status === 200) {
                    let newEmployeesArray = new IndexedEmployeeArray(response.data)
                    this.props.employeesActions.setEmployeesArray(newEmployeesArray);

                     this.props.mainActions.setFetching('success', 'receiveEmployees', 'All employees has been received.');
                }
            })
            .catch(error => {
                alert(`Произошла ошибка при загрузке сотрудников: ${error.response.status} ( ${error.message} )`);
                this.props.mainActions.setFetching('error', 'receiveEmployees', `Произошла ошибка при загрузке сотрудников: ${error.response.status} ( ${error.message} )`);

            })
        };
    }


    notAutorized = () => { //заглушка, показываемая если мы не авторизованы. Например, при переходе назад в браузере после разлогинивания
        return (
            <div className='not_autorized__container'>
                <div className='not_autorized__image'></div>
                <p className='not_autorized__text'>Вы не авторизованы!</p>
            </div>
        )
    }


    render() {
        let autorized = this.props.store.main.autorized;
        return (
            <>
            {!autorized ? 
                this.notAutorized() :
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


