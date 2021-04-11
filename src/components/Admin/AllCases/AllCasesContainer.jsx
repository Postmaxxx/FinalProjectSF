import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
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
        let cases_table = document.querySelector('.cases-table');
        cases_table.addEventListener('click',((e) => {this.tableClickProcessor(e)}) )
        Modal.setAppElement('body');
    };


    receiveCaseIdDetailsData = () => {
        //console.log('Starting get ID Case data...');
        let token = this.props.store.main.token;
        let _id = this.props.store.cases.detailedCaseId;
        //console.log('receive id: ', _id);

        axios.get(`http://84.201.129.203:8888/api/cases/${_id}`, {headers: {'Authorization': `Bearer ${token}`}})
        .then(response => {
            if (response.status === 200) {
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
            alert(error.response);
        })

    };




    tableClickProcessor = (e) => {
        //console.log('Table click', e.path[1].attributes._id.value);
        if (e.target.nodeName === 'TD') {
            let case_id = e.path[1].attributes._id.value; 
            this.props.casesActions.setDetailedCaseId(case_id);
            this.props.casesActions.setDetailedCaseHeaderText('Подробная информация о выбранном случае');
            this.receiveCaseIdDetailsData();
            this.props.casesActions.setShowCaseDetails(true);
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
        this.props.mainActions.setFetching('start');
        console.log('main = ', this.props.store.main);
    }


    render() {
        return (
            <div className='all-cases-container'>
                <h1 className='all-cases-container__header'>Информация о кражах велосипедов</h1>
                <p className='all-cases-container__subheader'>Список всех зарегистрированных случаев кражи велосипедов</p>
                <button onClick={this.preloaderTest}>Preloader</button>
                <button className='all-cases-container__add-button' onClick={this.onAddCaseButtonClick} />

                {this.props.store.main.isFetching ? <Preloader {...this.props} preloaderText='Загрузка...'/>
                : <AllCases {...this.props} />}

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
                        }
                    }}
                    >
                    <CaseDetailsContainer 
                        {...this.props} 
                    />
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