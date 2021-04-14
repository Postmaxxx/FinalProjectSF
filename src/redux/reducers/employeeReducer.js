const initialState = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    rePassword: '',
    clientId: '',
    approved: false
};

function employeeReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_EMPLOYEE_EMAIL':
            return {
                ...state,
                email: action.email
        };
        case 'CHANGE_EMPLOYEE_FIRST_NAME':
            return {
                ...state,
                firstName: action.firstName
        };
        case 'CHANGE_EMPLOYEE_LAST_NAME':
            return {
                ...state,
                lastName: action.lastName
        };
        case 'CHANGE_EMPLOYEE_PASSWORD':
            return {
                ...state,
                password: action.password
        };
        case 'CHANGE_EMPLOYEE_REPASSWORD':
            return {
                ...state,
                rePassword: action.rePassword
        };
        case 'CHANGE_EMPLOYEE_CLIENT_ID':
            return {
                ...state,
                clientId: action.clientId
        };
        case 'CHANGE_EMPLOYEE_APPROVED':
            return {
                ...state,
                approved: action.approved
        };


        default: return state;
    }
}

export default employeeReducer;