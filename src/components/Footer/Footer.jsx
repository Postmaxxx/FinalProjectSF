import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './Footer.css';



const Footer = (props) => {

    let current_page = props.history.location.pathname;

    let mainpage_style = 'footer__navigation__item__button footer__navigation__item__button__mainpage';
    let mainpage_selected_style = 'footer__navigation__item__button footer__navigation__item__button__mainpage button_selected';
    let theft_report_style = 'footer__navigation__item__button footer__navigation__item__button__theft-report';
    let theft_report_selected_style = 'footer__navigation__item__button footer__navigation__item__button__theft-report button_selected';
    let login_style = 'footer__navigation__item__button footer__navigation__item__button__login';
    let login_selected_style = 'footer__navigation__item__button footer__navigation__item__button__login button_selected';


    return (
        <div className='footer'>
            <div className='footer__logo-info'>
                <p>© PostMaxxx</p>
            </div>
            <div className='footer__navigation'>
                <button 
                    className={current_page==='/public/mainpage' ? mainpage_selected_style : mainpage_style}
                    onClick={() => props.history.push('/public/mainpage')} 
                />              
                <button 
                    className={current_page==='/public/theft-report' ? theft_report_selected_style : theft_report_style}
                    onClick={() =>  props.history.push('/public/theft-report')} 
                />
                <button 
                    className={current_page==='/public/login' ? login_selected_style : login_style}
                    onClick={() => props.history.push('/public/login')} 
                />
            </div> 
            <div className='footer__date'>
                <p>2021</p>
            </div>
        </div>
    )
}



export default Footer;
