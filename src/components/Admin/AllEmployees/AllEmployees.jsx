import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink, withRouter } from 'react-router-dom';
//import './MainPage.css';
import store from '../../../redux/store';
import { connect } from 'react-redux';


const AllEmployees = (props) => {

    let employees_array = props.store.employees.employeesArray;

    let employees_list = employees_array.map((item) => {
        let approved = item.approved;
        return (
            <tr className={approved ? 'employees-table__data' : 'employees-table__data not-approved'} _id={item._id} key={item._id}>
                <td>{approved ? null : '*'}{item.email}</td>
                <td>{approved ? null : '*'}{item.firstName}</td>
                <td>{approved ? null : '*'}{item.lastName}</td>
                <td>{approved ? null : '*'}{item._id}</td>
                {item.approved === true ? (<td>Да</td>) : (<td>Нет</td>) }
            </tr>
        )
    })

   


    return (
        <div className='all-employees-container__table-container'>
            <table className='employees-table' onClick={(e) => props.onTableClick(e)}>
                <thead>
                    <tr className='employees-table__header'>
                        <th className='employees-table__col-1'>
                            <div className='table-header-cell-container'>
                                Email
                            </div>
                        </th>
                        <th className='employees-table__col-2'>
                            <div className='table-header-cell-container'>
                                Имя
                            </div>
                        </th>
                        <th className='employees-table__col-3'>
                            <div className='table-header-cell-container'>
                                Фамилия
                            </div>
                        </th>
                        <th className='employees-table__col-4'>
                            <div className='table-header-cell-container'>
                                ID
                            </div>
                        </th>
                        <th className='employees-table__col-5'>
                            <div className='table-header-cell-container'>
                                Одобрен
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {employees_list}
                </tbody>

            </table>
        </div>
    )





}


export default AllEmployees;