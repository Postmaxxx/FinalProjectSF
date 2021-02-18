import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import { Menu } from './components/Menu/Menu.jsx';
import { MainPage } from './components/MainPage/MainPage.jsx';
import { TheftReport } from './components/TheftReport/TheftReport.jsx';
import { Admin } from './components/Admin/Admin.jsx';

import { UsersList } from './components/UsersList/UsersList.jsx';
import { UserCreate } from './components/UserCreate/UserCreate.jsx';



export class App extends Component {
    render() {
        return (
            <div>
                <Menu /> 

                <Switch>
                <Route path='/mainpage' component={MainPage} exact="true" />
                <Route path='/theft-report' component={TheftReport} exact="true" />
                <Route path='/admin' component={Admin} exact="true" />

                </Switch>
            </div>
        );
    }
}

ReactDom.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root'),
)