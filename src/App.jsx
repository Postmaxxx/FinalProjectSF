import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Switch, Route, NavLink, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import { bindActionCreators } from 'redux';


import MenuContainer from './components/Menu/MenuContainer.jsx';
import Footer from './components/Footer/Footer.jsx';

import AdminContainer from './components/Admin/AdminContainer.jsx';
import PublicContainer from './components/Public/PublicContainer.jsx';

import * as mainActions from './redux/actionCreators/mainActions.js';
import * as casesActions from './redux/actionCreators/casesActions.js';
import * as caseActions from './redux/actionCreators/caseActions.js';
import * as employeesActions from './redux/actionCreators/employeesActions.js';
import * as employeeActions from './redux/actionCreators/employeeActions.js';
import * as confirmationActions from './redux/actionCreators/confirmationActions.js';



class App extends Component {


    componentDidMount() {
        console.log('this ', this);
        //console.log(this.props.caseActions);
        let token = JSON.parse(localStorage.getItem('token'));
        this.props.mainActions.setToken(token);
        if (token) {
            this.props.mainActions.setAutorized(true);
            console.log('You have been autorized!'); 
        }
    }


    render() {
        return (
            <div className='app'>
                <Route path='/'  exact >
                    <Redirect to="/public/mainpage" />
                </ Route>

                <MenuContainer {...this.props}/>

                
                <div className='main-container'>
                    <Switch>
                        <Route path='/public' render={() => <PublicContainer {...this.props}/>} />
                        <Route path='/admin' render={() => <AdminContainer {...this.props}/>} />
                    </Switch>
                </div>
                
                
                
                <Footer  {...this.props}/>

            </div>
        );
    }
}

function stateToProps(state) {
    return {
        store: state
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        mainActions: bindActionCreators(mainActions, dispatch),
        casesActions: bindActionCreators(casesActions, dispatch),
        caseActions: bindActionCreators(caseActions, dispatch),
        employeesActions: bindActionCreators(employeesActions, dispatch),
        employeeActions: bindActionCreators(employeeActions, dispatch),
        confirmationActions: bindActionCreators(confirmationActions, dispatch),
    }
  }


const withRouterApp = withRouter(App);

export default connect(
    stateToProps,
    mapDispatchToProps
)(withRouterApp);