import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import './MenuAdmin.css';
import { connect } from 'react-redux';



const MenuAdmin = (props) => {

    const onButtonExitClick = () => {
        //console.log(props);
        props.mainActions.setAutorized(false);
        props.history.push('/')
        console.log('You have been unautorized!');
        
    }



    return (
        <div className='menu-admin'>
            <div className='menu-admin__nav'>
                <div className='menu-admin__item'>
                    <NavLink to="/admin/all_cases" activeClassName="menu-admin__item_is-active">Украденные велосипеды</NavLink>
                </div>
                <div className='menu-admin__item'>
                    <NavLink to="/admin/all_employees" activeClassName="menu-admin__item_is-active">Сотрудники</NavLink>
                </div>
            </div>
            <div className='menu-admin__exit'>
                <button className='menu-admin__item__button' onClick={onButtonExitClick} />
            </div>

        </div>
    )

    
}
/*
                <div className='menu-admin__item'>
                    <NavLink to="/admin/add_new_case" activeClassName="menu-admin__item_is-active">Новый случай</NavLink>
                </div>

*/


export default MenuAdmin;

