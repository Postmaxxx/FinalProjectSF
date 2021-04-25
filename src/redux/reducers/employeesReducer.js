import { IndexedEmployeeArray } from '../../components/Common/processors.js';


const initialState = {
    employeesArray: new IndexedEmployeeArray([]),
    showEmployeeDetails: false,
    detailedEmployeeId: '',
    detailedEmployeeHeaderText: '',
    employeesObject: {}
};

let newEmployeesArray;


function employeesReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_EMPLOYEES_ARRAY':
            return {
                ...state,
                employeesArray: action.employeesArray
            };
        case 'DELETE_EMPLOYEE_BY_ID':
            newEmployeesArray = new IndexedEmployeeArray(state.employeesArray); //.map(item => item)
            newEmployeesArray.deleteEmployee(action.employeeId); 
            return {
                ...state,
                employeesArray: newEmployeesArray
            };
        case 'EDIT_EMPLOYEE':
            newEmployeesArray = new IndexedEmployeeArray(state.employeesArray); //.map(item => item)
            newEmployeesArray.edit(action.changedEmployee);
            return {
                ...state,
                employeesArray: newEmployeesArray
            };
        case 'ADD_EMPLOYEE_TO_END':
            newEmployeesArray = new IndexedEmployeeArray(state.employeesArray); //.map(item => item)
            newEmployeesArray.addToEnd(action.newEmployee);
            return {
                ...state,
                employeesArray: newEmployeesArray
            };
        case 'CHANGE_SHOW_EMPLOYEE_DETAILS':
            return {
                ...state,
                showEmployeeDetails: action.showEmployeeDetails
            };
        case 'CHANGE_DETAILED_EMPLOYEE_ID':
            return {
                ...state,
                detailedEmployeeId: action.detailedEmployeeId
            };
        case 'CHANGE_DETAILED_EMPLOYEE_HEADER_TEXT':
            return {
                ...state,
                detailedEmployeeHeaderText: action.detailedEmployeeHeaderText
            };
        case 'CHANGE_EMPLOYEES_OBJECT':
            return {
                ...state,
                employeesObject: action.employeesObject
            };

        default: return state;
    }
}


export default employeesReducer;