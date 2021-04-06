import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
//import './MainPage.css';
import store from '../../../redux/store';
import { connect } from 'react-redux';
import MainPage from './MainPage.jsx';


class MainPageContainer extends Component {


    componentDidMount() {
    }

    render() {

        const totalCasesInBase = 7;


        return (
            <MainPage 
            {...this.props.store}
            totalCasesInBase={totalCasesInBase}
            />
        )
    }
}



export default MainPageContainer;