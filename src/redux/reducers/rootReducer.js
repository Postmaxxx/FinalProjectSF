import { combineReducers } from 'redux';
import mainReducer from './mainReducer';
import caseReducer from './caseReducer';
import casesReducer from './casesReducer';
import confirmationReducer from './confirmationReducer';
import employeesReducer from './employeesReducer';
import employeeReducer from './employeeReducer';


export default combineReducers({
    main: mainReducer, //общие данные + модальные окна
    case: caseReducer, //данные по конкретному (выбранному) делу
    cases: casesReducer, // данные о все делах (массив дел)
    confirmation: confirmationReducer, //данные окна подтверждения действий
    employees: employeesReducer, //данные по конкретному (выбранному) сотруднику
    employee: employeeReducer // данные о все сотрудниках (массив сотрудников)
});
