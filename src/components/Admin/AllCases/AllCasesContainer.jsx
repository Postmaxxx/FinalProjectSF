import React, { Component } from 'react';
import './AllCases.css'
import Preloader from '../../Common/Preloader.jsx';
import AllCases from './AllCases.jsx';
import CaseDetailsContainer from './CaseDetails/CaseDetailsContainer.jsx'
import axios from 'axios';
import Modal from 'react-modal';


class AllCasesContainer extends Component {
    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this);  //Сделано специально потренироваться
    }


    componentDidMount() {
        this.props.receiveCasesEmployees({ cases: true, employees: true });
        Modal.setAppElement('body');
    };


    receiveCaseIdDetailsData = () => { //Получение детальных данных дела
        let token = this.props.store.main.token;
        let _id = this.props.store.cases.detailedCaseId;
        this.props.mainActions.setFetching('start', 'getDetailedCase');
        axios.get(`http://84.201.129.203:8888/api/cases/${_id}`, {headers: {'Authorization': `Bearer ${token}`}})
        .then(response => {
            if (response.status === 200) {
                this.props.mainActions.setFetching('success', 'getDetailedCase', 'Case detailes has been received!');
                this.props.caseActions.setStatus(response.data.status);
                this.props.caseActions.setDate(response.data.date);
                this.props.caseActions.setLicenseNumber(response.data.licenseNumber);
                this.props.caseActions.setColor(response.data.color);
                this.props.caseActions.setType(response.data.type);
                this.props.caseActions.setOwnerFullName(response.data.ownerFullName);
                this.props.caseActions.setOfficer(response.data.officer);
                response.data.officer ? this.props.caseActions.setHasOfficer(true) : this.props.caseActions.setHasOfficer(false);
                this.props.caseActions.setCreatedAt(response.data.createdAt);
                this.props.caseActions.setUpdateAt(response.data.updateAt);
                this.props.caseActions.setClientId(response.data.clientId);
                this.props.caseActions.setDescription(response.data.description);
                this.props.caseActions.setResolution(response.data.resolution);
            }
        })
        .catch(error => {
            this.props.mainActions.setFetching('error', 'getDetailedCase', `Произошла ошибка при загрузке дела: ${error.response.status} ( ${error.message} )`);
            alert(error.response);
        })

    };


    tableClickProcessor = async(e) => { //обработчик кликов по таблице
        if (e.target.nodeName === 'TD') { //если кликнули по ячейке с инфой
            let caseId = e.target.parentElement.attributes._id.nodeValue; //caseId = значение атрибута _id строки этой ячейки, задаваемого принудительно при отрисовке
            await this.props.casesActions.setDetailedCaseId(caseId); //если не ждать, то при получении ошибка, т.к. caseId не успевает записываться в store
            this.props.casesActions.setDetailedCaseHeaderText('Подробная информация о выбранном случае'); //установка заголовка окна редактирования
            this.receiveCaseIdDetailsData(); //получение детальнои информации о сотруднике
            this.props.casesActions.setShowCaseDetails(true); //показывать окно редактирования
        }
    };


    closeModal() {
        this.props.casesActions.setShowCaseDetails(false);
    }


    onAddCaseButtonClick = () => { //нажатие на кнопку Добавлене дела
        let current_date = new Date().toLocaleDateString();
        this.props.caseActions.setStatus('new');
        this.props.caseActions.setDate('');
        this.props.caseActions.setLicenseNumber('');
        this.props.caseActions.setColor('');
        this.props.caseActions.setType('general');
        this.props.caseActions.setOwnerFullName('');
        this.props.caseActions.setOfficer(undefined);
        this.props.caseActions.setHasOfficer(false);
        this.props.caseActions.setCreatedAt(current_date);
        this.props.caseActions.setUpdateAt(current_date);
        this.props.caseActions.setClientId(this.props.store.main.clientId);
        this.props.caseActions.setDescription('');
        this.props.caseActions.setResolution('');
        this.props.casesActions.setDetailedCaseId(''); //у нового дела нет id
        this.props.casesActions.setDetailedCaseHeaderText('Создание нового случая'); //установка заголовка окна редактирования
        this.props.casesActions.setShowCaseDetails(true); //показывать окно редактирования
    }


    render() {
        return (
            <div className='all-cases-container'>
                <h1 className='all-cases-container__header'>Информация о кражах велосипедов</h1>
                <p className='all-cases-container__subheader'>Список всех зарегистрированных случаев кражи велосипедов</p>
                <div className='all-cases-container__add-button-container'>
                    <button className='all-cases-container__add-button' onClick={this.onAddCaseButtonClick} />
                </div>

                {this.props.store.main.fetching.receiveCases.isFetching ? 
                    <Preloader {...this.props} preloaderText='Загрузка списка дел...'/> :
                    <AllCases {...this.props} onTableClick={this.tableClickProcessor}/>
                }

                <Modal
                    isOpen={this.props.store.cases.showCaseDetails}
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                    onRequestClose={this.closeModal}
                    className='.'
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)'
                        },
                        content: {
                            outline: 'none'
                        }
                    }}
                >
                    {this.props.store.main.fetching.getDetailedCase.isFetching ? //если идет загрузка - показывать preloader вместо детальной инфы
                        <Preloader {...this.props} preloaderText='Загрузка делa...' marginTop='200px' marginLeft='auto'/> :
                        <CaseDetailsContainer {...this.props} />
                    }
                </Modal>
            </div>
        )
    }
}


export default AllCasesContainer;