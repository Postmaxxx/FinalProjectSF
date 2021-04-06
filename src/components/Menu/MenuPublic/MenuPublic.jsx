import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import './MenuPublic.css';
import { connect } from 'react-redux';







class MenuPublic extends Component {
    render() {
        return (
            <div className='menu-public'>
                <div className='menu-public__item'>
                    <NavLink to="/public/mainpage" activeClassName="menu-public__item_is-active">Главная</NavLink>
                </div>
                <div className='menu-public__item'>
                    <NavLink to="/public/theft-report" activeClassName="menu-public__item_is-active">Сообщить о краже</NavLink>
                </div>
                <div className='menu-public__item'>
                    <NavLink to="/public/login" activeClassName="menu-public__item_is-active">Войти</NavLink>
                </div>
            </div>
        )

    }
}



export default MenuPublic;