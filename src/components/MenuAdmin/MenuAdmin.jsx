import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import './MenuAdmin.css';


export class MenuAdmin extends Component {
    render() {
        return (
            <div class='menu-admin'>
                <NavLink class='menu-admin__item' to="/admin/authorization" activeClassName="menu-admin__item_is-active">Авторизция</NavLink>
                <NavLink class='menu-admin__item' to="/admin/registration" activeClassName="menu-admin__item_is-active">Регистрация</NavLink>
                <NavLink class='menu-admin__item' to="/admin/stolen-bicycles" activeClassName="menu-admin__item_is-active">Украденные велосипеды</NavLink>
                <NavLink class='menu-admin__item' to="/admin/new-case" activeClassName="menu-admin__item_is-active">Новый случай</NavLink>
                <NavLink class='menu-admin__item' to="/admin/employees" activeClassName="menu-admin__item_is-active">Работники</NavLink>

            </div>
        )

    }
}