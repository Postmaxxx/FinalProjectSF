const initialState = {
    totalCasesInBase: 0,
    showLoginForm: true,
    showRegistrationForm: false,
    firstName: '',
    lastName: '',
    clientId: '',//'bmluYS5wb3N0bmlrb3ZhODdAeWFuZGV4LnJ1',
    autorized: false,
    email: 'secret_mail@mail.ru',
    password: '31415926',
    rePassword: '',
    passwordsIdentical: false,
    token: '',


    isFetching: false,
    fetchErrors: '',
    fetchSuccess: '',
    //currentPage: '/public/mainpage'
    
};

function mainReducer(state = initialState, action) {
    switch (action.type) {
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
        case 'CHANGE_EMAIL':
            return {
                ...state,
                email: action.email
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

        case 'CHANGE_AUTORIZATION_STATUS':
            return {
                ...state,
                autorized: action.autorized
            };
        case 'CHANGE_TOKEN':
            return {
                ...state,
                token: action.token
            };
        
        case 'SHOW_LOGIN_FORM':
            return {
                ...state,
                showLoginForm: action.showLoginForm
            }
        case 'SHOW_REGISTRATION_FORM':
            return {
                ...state,
                showRegistrationForm: action.showRegistrationForm
            }
   /*     case 'CHANGE_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
*/
        case 'CHANGE_FETCHING':
            if (action.fetchStatus === 'start') {
                return {
                    ...state,
                    isFetching: true,
                    fetchErrors: ''
                }
            }
            if (action.fetchStatus === 'error') {
                return {
                    ...state,
                    isFetching: false,
                    fetchErrors: action.fetchErrors,
                    fetchSucess: ''
                }
            }
            if (action.fetchStatus === 'success') {
                return {
                    ...state,
                    isFetching: false,
                    fetchErrors: '',
                    fetchSucess: action.fetchSucess
                }
            }
            if (action.fetchStatus === 'clear') {
                return {
                    ...state,
                    isFetching: false,
                    fetchErrors: '',
                    fetchSucess: ''
                }
            }


        default: return state;
    }
}

export default mainReducer;