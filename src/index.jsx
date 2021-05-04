import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';

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
                <App />
            </React.Suspense>
        </ Provider>
    </BrowserRouter>,
    document.getElementById('root'),
)