import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
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