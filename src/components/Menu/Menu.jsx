import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import './Menu.css';


export class Menu extends Component {
    render() {
        return (
            <div class='menu'>
                <NavLink class='menu__item' to="/mainpage" activeClassName="menu__item_is-active">Главная</NavLink>
                <NavLink class='menu__item' to="/theft-report" activeClassName="menu__item_is-active">Сообщить о краже</NavLink>
                <NavLink class='menu__item' to="/admin" activeClassName="menu__item_is-active">Админка</NavLink>
            </div>
        )

    }
}