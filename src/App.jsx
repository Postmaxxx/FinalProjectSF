import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import { bindActionCreators } from 'redux';
import MenuContainer from './components/Menu/MenuContainer.jsx';
//import Footer from './components/Footer/Footer.jsx';
import ComponentPreloader from './components/Common/componentPreloader.js';
import AdminContainer from './components/Admin/AdminContainer.jsx';
import PublicContainer from './components/Public/PublicContainer.jsx';

import * as mainActions from './redux/actionCreators/mainActions.js';
import * as casesActions from './redux/actionCreators/casesActions.js';
import * as caseActions from './redux/actionCreators/caseActions.js';
import * as employeesActions from './redux/actionCreators/employeesActions.js';
import * as employeeActions from './redux/actionCreators/employeeActions.js';
import * as confirmationActions from './redux/actionCreators/confirmationActions.js';

const Footer = React.lazy(() => import('./components/Footer/Footer.jsx'))


class App extends Component {

    componentDidMount() {
        let token = JSON.parse(localStorage.getItem('token'));
        this.props.mainActions.setToken(token);
        let clientId = JSON.parse(localStorage.getItem('clientId'));
        this.props.mainActions.setClientId(clientId);
        if (token) {
            this.props.mainActions.setAutorized(true);
            this.props.history.push('/admin/all_cases')
            console.log('You have been autorized!'); 
        } else {
            this.props.mainActions.setAutorized(false);
            this.props.history.push('/public/mainpage')
            console.log('You have not been autorized!');  
        }
    }

    render() {
        return (
            <div className='app'>
                <Route path='/' exact >
                    <Redirect to="/public/mainpage" /> 
                </ Route>

                <MenuContainer {...this.props}/>
                
                <div className='main-container'>
                    <Switch>
                        <Route path='/public' render={() => <PublicContainer {...this.props}/>} />
                        <Route path='/admin' render={() => <AdminContainer {...this.props}/>} />
                    </Switch>
                </div> 

                <React.Suspense fallback={<ComponentPreloader />}>
                    <Footer  {...this.props}/>
                </React.Suspense>
            </div>
        );
    }
}


function mapStateToProps(state) { //пробрасываем state в props как store
    return {
        store: state
    }
}


const mapDispatchToProps = (dispatch) => {  //пробрасываем Actions в props
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
    mapStateToProps,
    mapDispatchToProps
)(withRouterApp);