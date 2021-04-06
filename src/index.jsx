import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import { Provider, connect } from 'react-redux';

import store from './redux/store';

import App from './App.jsx';




ReactDom.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </ Provider>
    </BrowserRouter>,
    document.getElementById('root'),
)