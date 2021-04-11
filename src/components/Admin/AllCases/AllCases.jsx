import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink, withRouter } from 'react-router-dom';
//import './MainPage.css';
import store from '../../../redux/store';
import { connect } from 'react-redux';


const AllCases = (props) => {

    let cases_array = props.store.cases.casesArray;
    let cases_list = cases_array.map((item) => {
        
        let firstName = undefined;
        let lastName = undefined; 

            if(props.store.employees.employeesObject[item.officer]) {
                firstName = props.store.employees.employeesObject[item.officer].firstName;
                lastName = props.store.employees.employeesObject[item.officer].lastName;
            }

        return (
            <tr className='cases-table__data' _id={item._id} key={item._id}>
                <td>{item.createdAt.slice(0,10)}</td>
                <td>{item.updateAt.slice(0,10)}</td>
                <td>{item.date.slice(0,10)}</td>
                <td>{item.ownerFullName}</td>
                
                {item.bikeType==='general' ? (<td>Обычный</td>) : null }
                {item.bikeType==='sport' ? (<td>Спортивный</td>) : null }
                
                <td>{item.color}</td>
                <td>{item.licenseNumber}</td>




                <td>{item.officer === undefined ? 'Не назначен'
                : firstName === undefined ? 'Нет в базе'
                : `${firstName} ${lastName}`
                }</td>




                {item.description.length > 40 ? (<td>{item.description.slice(0,40)+'...'}</td>) : (<td>{item.description}</td>)}
                
                {item.status==='new' ? (<td>Новое</td>) : null }
                {item.status==='in_progress' ? (<td>В работе</td>) : null }
                {item.status==='done' ? (<td>Закрыто</td>) : null }
                
                {item.status === 'done' ? (
                item.resolution.length > 20 ? (<td>{item.resolution.slice(0,20)+'...'}</td>) : (<td>{item.resolution}</td>)
                ) : <td></td> }
            </tr>
        )
    })

   


    return (
        <div className='all-cases-container__table-container'>
            <table className='cases-table'>
                <thead>
                    <tr className='cases-table__header'>
                        <th className='cases-table__col-1'>
                            <div className='table-header-cell-container'>
                                Дата создания заявки
                            </div>
                        </th>
                        <th className='cases-table__col-2'>
                            <div className='table-header-cell-container'>
                                Дата обновления заявки
                            </div>
                        </th>
                        <th className='cases-table__col-3'>
                            <div className='table-header-cell-container'>
                                Дата кражи
                            </div>
                        </th>
                        <th className='cases-table__col-4'>
                            <div className='table-header-cell-container'>
                                ФИО владельца
                            </div>
                        </th>
                        <th className='cases-table__col-5'>
                            <div className='table-header-cell-container'>
                                Тип
                            </div>
                        </th>
                        <th className='cases-table__col-6'>
                            <div className='table-header-cell-container'>
                                Цвет
                            </div>
                        </th>
                        <th className='cases-table__col-7'>
                            <div className='table-header-cell-container'>
                                Номер
                            </div>
                        </th>
                        <th className='cases-table__col-8'>
                            <div className='table-header-cell-container'>
                                Сотрудник
                            </div>
                        </th>
                        <th className='cases-table__col-9'>
                            <div className='table-header-cell-container'>
                                Описание
                            </div>
                        </th>
                        <th className='cases-table__col-10'>
                            <div className='table-header-cell-container'>
                                Статус
                            </div>
                        </th>
                        <th className='cases-table__col-11'>
                            <div className='table-header-cell-container'>
                                Результат
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {cases_list}
                </tbody>

            </table>
        </div>
    )





}


export default AllCases;