import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './Footer.css';



const Footer = (props) => {

    let current_page = props.history.location.pathname;
    let autorized = props.store.main.autorized;

    let mainpage_style = 'footer__navigation__item__button footer__navigation__item__button__mainpage';
    let mainpage_selected_style = 'footer__navigation__item__button footer__navigation__item__button__mainpage button_selected';
    let theft_report_style = 'footer__navigation__item__button footer__navigation__item__button__theft-report';
    let theft_report_selected_style = 'footer__navigation__item__button footer__navigation__item__button__theft-report button_selected';
    let login_style = 'footer__navigation__item__button footer__navigation__item__button__login';
    let login_selected_style = 'footer__navigation__item__button footer__navigation__item__button__login button_selected';

    let all_cases_style = 'footer__navigation__item__button footer__navigation__item__button__all-cases';
    let all_cases_selected_style = 'footer__navigation__item__button footer__navigation__item__button__all-cases button_selected';
    let all_employees_style = 'footer__navigation__item__button footer__navigation__item__button__all_employees';
    let all_employees_selected_style = 'footer__navigation__item__button footer__navigation__item__button__all_employees button_selected';
    let logoff_style = 'footer__navigation__item__button footer__navigation__item__button__logoff';

    const logoff = () => {
        let response = confirm('Вы уверены, что хотите выйти?')
        if (response) {
            props.mainActions.setAutorized(false);
            props.mainActions.setToken('');
            JSON.stringify(localStorage.clear());
            props.history.push('/public/mainpage')
            console.log('You have been unauthorized!');
        }
        console.log('You have been unauthorized!');
    }


    const footer_public = () => {
        return(
            <>
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
            </>
        )
    }


    const footer_admin = () => {
        return(
            <>
                <button 
                    className={current_page==='/admin/all_cases' ? all_cases_selected_style : all_cases_style}
                    onClick={() => props.history.push('/admin/all_cases')} 
                />              
                <button 
                    className={current_page==='/admin/all_employees' ? all_employees_selected_style : all_employees_style}
                    onClick={() =>  props.history.push('/admin/all_employees')} 
                />
                <button 
                    className={logoff_style}
                    onClick={logoff} 
                />
            </>
        )
    }


    return (
        <div className='footer'>
            <div className='footer__logo-info'>
                <p>© PostMaxxx</p>
            </div>
            <div className='footer__navigation'>
                {autorized ? footer_admin() : footer_public()}
            </div> 
            <div className='footer__date'>
                <p>2021</p>
            </div>
        </div>
    )
}



export default Footer;
