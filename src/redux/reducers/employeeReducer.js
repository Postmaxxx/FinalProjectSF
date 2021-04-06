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
        case 'CHANGE_EMAIL':
            return {
                ...state,
                email: action.email
        };
        case 'CHANGE_FIRST_NAME':
            return {
                ...state,
                firstName: action.firstName
        };
        case 'CHANGE_LAST_NAME':
            return {
                ...state,
                lastName: action.lastName
        };
        case 'CHANGE_PASSWORD':
            return {
                ...state,
                password: action.password
        };
        case 'CHANGE_REPASSWORD':
            return {
                ...state,
                rePassword: action.rePassword
        };
        case 'CHANGE_CLIENT_ID':
            return {
                ...state,
                clientId: action.clientId
        };
        case 'CHANGE_APPROVED':
            return {
                ...state,
                approved: action.approved
        };


        default: return state;
    }
}

export default employeeReducer;