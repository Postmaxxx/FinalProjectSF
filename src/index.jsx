import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';
import { Context } from './components/Common/context'


const urls = {
    reportCase: {
        url: 'http://84.201.129.203:8888/api/public/report',
        method: 'post'
    }
}


const preloaderApp = 
    <div className="cssload-container">
        <p className="cssload-container__text">Загрузка служебной информации...</p>
        <div className="cssload-loading"><i></i><i></i><i></i><i></i></div>
    </div>


const App = React.lazy(() => import('./App.jsx'))



ReactDom.render(
    <BrowserRouter>
        <Provider store={store}>
            <React.Suspense fallback={preloaderApp}>
                <Context.Provider value={urls}>
                    <App />
                </Context.Provider>
            </React.Suspense>
        </ Provider>
    </BrowserRouter>,
    document.getElementById('root'),
)