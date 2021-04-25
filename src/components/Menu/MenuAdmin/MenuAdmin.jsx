import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './MenuAdmin.css';


const MenuAdmin = (props) => {

    const onButtonExitClick = () => {
        let response = confirm('Вы уверены, что хотите выйти?')
        if (response) {
            props.mainActions.setAutorized(false);
            props.mainActions.setToken('');
            JSON.stringify(localStorage.clear());
            props.history.push('/public/mainpage'); //Переход на главную страницу
        }
    }


    return (
        <div className='menu-admin'>
            <div className='menu-admin__nav'>
                <div className='menu-admin__item'>
                    <NavLink to="/admin/all_cases" activeClassName="menu-admin__item_is-active"/* onClick={changePage}*/>Украденные велосипеды</NavLink>
                </div>
                <div className='menu-admin__item'>
                    <NavLink to="/admin/all_employees" activeClassName="menu-admin__item_is-active"/* onClick={changePage}*/>Сотрудники</NavLink>
                </div>
            </div>
            <div className='menu-admin__exit'>
                <button className='menu-admin__item__button' onClick={onButtonExitClick} />
            </div>
        </div>
    )
  
}


export default MenuAdmin;

