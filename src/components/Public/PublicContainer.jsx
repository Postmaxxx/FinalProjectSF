import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MainPageContainer from './MainPage/MainPageContainer.jsx';
import TheftReportPageContainer from './TheftReportPage/TheftReportPageContainer.jsx';
import LoginRegistrationPageContainer from './LoginPage/LoginRegistrationPageContainer.jsx';


class PublicContainer extends Component {
    render() {
        return (
            <div className='public-page-container'>
                <Route path='/public/mainpage' render={() => <MainPageContainer {...this.props}/>} exact={true} />
                <Route path='/public/theft-report' render={() => <TheftReportPageContainer {...this.props}/>} exact={true} />
                <Route path='/public/login' render={() => <LoginRegistrationPageContainer {...this.props}/>} exact={true} />
            </div>
        )
    }
}


export default PublicContainer;