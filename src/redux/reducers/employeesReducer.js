const initialState = {
    employeesArray: [],
    showEmployeeDetails: false,
    detailedEmployeeId: '',
    detailedEmployeeHeaderText: '',
    employeesMap: '',
    employeesObject: {}
};

function employeesReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_EMPLOYEES_ARRAY':
            return {
                ...state,
                employeesArray: action.employeesArray
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

        case 'CHANGE_EMPLOYEES_MAP':
            return {
                ...state,
                employeesMap: action.employeesMap
        };
        default: return state;
    }
}

export default employeesReducer;