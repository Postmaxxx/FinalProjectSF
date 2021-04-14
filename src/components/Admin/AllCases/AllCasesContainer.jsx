import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import './AllCases.css'
import Preloader from '../../Common/Preloader.jsx';
import { connect } from 'react-redux';
import AllCases from './AllCases.jsx';
import CaseDetailsContainer from './CaseDetails/CaseDetailsContainer.jsx'
import axios from 'axios';

import Modal from 'react-modal';



class AllCasesContainer extends Component {

    componentDidMount() {
        this.props.receiveCasesEmployees({ cases: true, employees: true });
        //if (!this.props.store.main.fetching.receiveCases.isFetching) {
           /* let cases_table = document.querySelector('.cases-table');
            console.log('cases_table = ', cases_table);
            cases_table.addEventListener('click', ((e) => {this.tableClickProcessor(e)}))*/
            Modal.setAppElement('body');
            //console.log('listener');
        //}
    };




    receiveCaseIdDetailsData = () => {
        //console.log('Starting get ID Case data...');
        let token = this.props.store.main.token;
        let _id = this.props.store.cases.detailedCaseId;
        //console.log('receive id: ', _id);
        this.props.mainActions.setFetching('start', 'getDetailedCase', 'Загрузка дела...');
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
                if (response.data.officer) {
                    this.props.caseActions.setHasOfficer(true)
                } else this.props.caseActions.setHasOfficer(false);
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




    tableClickProcessor = async(e) => {
        if (e.target.nodeName === 'TD') {
            //let case_id = e.path[1].attributes._id.value; 
            let case_id = e.target.parentElement.attributes._id.nodeValue;
            await this.props.casesActions.setDetailedCaseId(case_id);
            this.receiveCaseIdDetailsData();
            this.props.casesActions.setShowCaseDetails(true);
            this.props.casesActions.setDetailedCaseHeaderText('Подробная информация о выбранном случае');
        }
    };


    closeModal = () => {
        this.props.casesActions.setShowCaseDetails(false);
    }



    onAddCaseButtonClick = () => {
        let current_date = new Date().toISOString().split('T')[0];
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
        this.props.casesActions.setDetailedCaseId('');
        this.props.casesActions.setDetailedCaseHeaderText('Создание нового случая');
        this.props.casesActions.setShowCaseDetails(true);
    }

    preloaderTest = () => {
        this.props.mainActions.setFetching('start', 'receiveCases', 'nothing');
        console.log('main = ', this.props.store.main);
    }


    render() {
        return (
            <div className='all-cases-container'>
                <h1 className='all-cases-container__header'>Информация о кражах велосипедов</h1>
                <p className='all-cases-container__subheader'>Список всех зарегистрированных случаев кражи велосипедов</p>
                <button onClick={this.preloaderTest}>Preloader</button>
                <button className='all-cases-container__add-button' onClick={this.onAddCaseButtonClick} />

                {this.props.store.main.fetching.receiveCases.isFetching ? <Preloader {...this.props} preloaderText='Загрузка списка дел...'/>
                : <AllCases {...this.props} onTableClick={this.tableClickProcessor}/>}

                <Modal
                    isOpen={this.props.store.cases.showCaseDetails}
                    //contentLabel="Minimal Modal Example"
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
                    {this.props.store.main.fetching.getDetailedCase.isFetching ? <Preloader {...this.props} preloaderText='Загрузка делa...' marginTop='200px' marginLeft='auto'/> 
                    : <CaseDetailsContainer {...this.props} />
                    }
                </Modal>

            </div>

        )
    }
}


/*


*/
/*
style={{
              overlay: {
                backgroundColor: 'papayawhip'
              },
              content: {
                color: 'lightsteelblue'
              }
            }}

                    className="Modal"
                    overlayClassName="Overlay"
*/



export default AllCasesContainer;


/*
                <ReactModal 
                    isOpen={this.props.store.cases.showCaseDetails}
                    contentLabel="Inline Styles Modal Example"
                    style={{
                        overlay: {
                            backgroundColor: 'papayawhip'
                        },
                        content: {
                            color: 'lightsteelblue'
                        }
                    }}
                >
                    <p>DETEILED INFO</p>
                </ReactModal>
                */