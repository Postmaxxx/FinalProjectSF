import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
//import './MainPage.css';
import store from '../../../redux/store';
import { connect } from 'react-redux';
import './MainPage.css';

const MainPage = (props) => {
    return (
    <div className='main-page'>
        <h1 className='main-page__header'>Добро пожаловать на сайт</h1>
        <h2 className='main-page__header-2'>VeloUgona.net</h2>
        <p className='main-page__subheader'>Вот уже более 3 лет мы работаем, чтобы вы могли спать спокойно!</p>
        <p className='main-page__description'>Ежедневно поддерживая базу угнанных, украденных и потерянных веловипедов в актуальном состоянии, мы 
            значительно усложняем процесс повторной реализации этих велосипедов на вторичном рынке. Также мы предоставляем сервис
            по приему заявлений от всех граждан об украденных велосипедах, проверяя и добавляя эту информацию в единую базу.
        </p>

    </div>
    )


}



export default MainPage;