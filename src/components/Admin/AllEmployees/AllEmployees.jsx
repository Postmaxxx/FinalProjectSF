import React from 'react';


const AllEmployees = (props) => {
    let { employeesArray } = props.store.employees;

    let employeesList = employeesArray.map((item) => {
        let approved = item.approved; //добавление *, если сотрудник не одобрен
        return ( //добавление атрибута _id={item._id} к каждой строке
            <tr className={approved ? 'employees-table__data' : 'employees-table__data not-approved'} _id={item._id} key={item._id}>
                <td>{!approved && '*'}{item.email}</td> 
                <td>{!approved && '*'}{item.firstName}</td>
                <td>{!approved && '*'}{item.lastName}</td>
                <td>{!approved && '*'}{item._id}</td>
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

                    {employeesList}

                </tbody>
            </table>
        </div>
    )
}


export default AllEmployees;