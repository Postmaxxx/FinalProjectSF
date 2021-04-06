import { combineReducers } from 'redux';
import mainReducer from './mainReducer';
import caseReducer from './caseReducer';
import casesReducer from './casesReducer';
import confirmationReducer from './confirmationReducer';
import employeesReducer from './employeesReducer';
import employeeReducer from './employeeReducer';


export default combineReducers({
    main: mainReducer,
    case: caseReducer,
    cases: casesReducer,
    confirmation: confirmationReducer,
    employees: employeesReducer,
    employee: employeeReducer
});
