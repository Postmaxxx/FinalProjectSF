import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { MenuAdmin } from '../../components/MenuAdmin/MenuAdmin.jsx';
import './Admin.css';


export class Admin extends Component {
    render() {
        return (
            <div class='admin-page'>
                <MenuAdmin />
                Admin Site description bla-bla-bla
            </div>
        )

    }
}