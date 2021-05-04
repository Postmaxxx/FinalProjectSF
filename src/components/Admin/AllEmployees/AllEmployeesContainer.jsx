import React, { Component } from 'react';
import './AllEmployees.css'
import Preloader from '../../Common/Preloader.jsx';
import AllEmployees from './AllEmployees.jsx';
import EmployeeDetailsContainer from './EmployeeDetails/EmployeeDetailsContainer.jsx'
import axios from 'axios';
import Modal from 'react-modal';


class AllEmployeesContainer extends Component {

    componentDidMount() {
        this.props.receiveCasesEmployees({ cases: false, employees: true });
        Modal.setAppElement('body');
    }


    receiveEmployeeIdDetailsData = () => {
        let token = this.props.store.main.token;
        let _id = this.props.store.employees.detailedEmployeeId;
        this.props.mainActions.setFetching('start', 'getDetailedEmployee');
        axios.get(`http://84.201.129.203:8888/api/officers/${_id}`, {headers: {'Authorization': `Bearer ${token}`}})
        .then(response => {
            if (response.status === 200) {
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


    tableClickProcessor = async(e) => { //обработка кликов по таблице
        if (e.target.nodeName === 'TD') { //если кликнули по ячейке с инфой
            let employeeId = e.target.parentElement.attributes._id.nodeValue; //employeeId = значение атрибута _id строки этой ячейки, задаваемого принудительно при отрисовке
            await this.props.employeesActions.setDetailedEmployeeId(employeeId); //если не ждать, то при получении ошибка, т.к. employeeId не успевает записываться в store
            this.props.employeesActions.setDetailedEmployeeHeaderText('Подробная информация о выбранном сотруднике'); //установка заголовка окна редактирования
            this.receiveEmployeeIdDetailsData(); //получение детальнои информации о сотруднике
            this.props.employeesActions.setShowEmployeeDetails(true); //показывать окно редактирования
        }
    };


    closeModal = () => {
        this.props.employeesActions.setShowEmployeeDetails(false);
    }


    onAddEmployeeButtonClick = () => { //клик на кнопку добавление сотрудника
        this.props.employeeActions.setEmail('');
        this.props.employeeActions.setFirstName('');
        this.props.employeeActions.setLastName('');
        this.props.employeeActions.setPassword('');
        this.props.employeeActions.setRePassword('');
        this.props.employeeActions.setApproved(false);
        this.props.employeeActions.setClientId('');
        this.props.employeesActions.setDetailedEmployeeId(''); //у нового сотрудника нет id
        this.props.employeesActions.setDetailedEmployeeHeaderText('Создание нового сотрудника');
        this.props.employeesActions.setShowEmployeeDetails(true);
    }


    render() {
        return (
            <div className='all-employees-container'>
                <h1 className='all-employees-container__header'>Информация о сотрудниках</h1>
                <p className='all-employees-container__subheader'>Список всех сотрудников</p>
                <button className='all-employees-container__add-button' onClick={this.onAddEmployeeButtonClick} />

                {this.props.store.main.fetching.receiveEmployees.isFetching ? 
                    <Preloader {...this.props} preloaderText='Загрузка списка сотрудников...'/> :
                    <AllEmployees {...this.props} onTableClick={this.tableClickProcessor} />
                }
            
                <Modal
                    isOpen={this.props.store.employees.showEmployeeDetails}
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                    onRequestClose={this.closeModal}
                    className='.'
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)'
                        },
                        content: {
                            outline: 'none' // иначе вокруг окна будет рамка
                        }
                    }}
                >
                    {this.props.store.main.fetching.getDetailedEmployee.isFetching ? 
                        <Preloader {...this.props} preloaderText='Загрузка сотрудника...' marginTop='200px' marginLeft='auto'/> :
                        <EmployeeDetailsContainer {...this.props} />
                    }
                </Modal>

            </div>
        )
    } 
}


export default AllEmployeesContainer;