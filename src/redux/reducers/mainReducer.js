class FetchProto { 
    constructor() {
        this.isFetching = '',
        this.success = '',
        this.error = ''
    }
}


function setState(isFetching, fetchErrors, fetchSucess) { // Просто оборачивание в объект
    return {
        isFetching,
        fetchErrors,
        fetchSucess
    }
}


const initialState = {
    totalCasesInBase: 0,
    showLoginForm: true,
    showRegistrationForm: false,
    firstName: '',
    lastName: '',
    clientId: '',//'bmluYS5wb3N0bmlrb3ZhODdAeWFuZGV4LnJ1',
    autorized: false,
    email: 'secret_mail@mail.ru', //просто для удобства
    password: '31415926', //просто для удобства
    rePassword: '',
    passwordsIdentical: false,
    token: '',
    fetching: {
        receiveEmployees: new FetchProto,
        receiveCases: new FetchProto,
        reportCase: new FetchProto,
        logginIn: new FetchProto,
        updateCase: new FetchProto,
        updateEmployee: new FetchProto,
        deleteCase: new FetchProto,
        deleteEmployee: new FetchProto,
        createCase: new FetchProto,
        createEmployee: new FetchProto,
        register: new FetchProto,
        getDetailedCase: new FetchProto,
        getDetailedEmployee: new FetchProto,
    }
};


function mainReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_USER_FIRST_NAME':
            return {
                ...state,
                firstName: action.firstName
            };
        case 'CHANGE_USER_LAST_NAME':
            return {
                ...state,
                lastName: action.lastName
            };
        case 'CHANGE_USER_EMAIL':
            return {
                ...state,
                email: action.email
            };
        case 'CHANGE_USER_PASSWORD':
            return {
                ...state,
                password: action.password
            };
        case 'CHANGE_USER_REPASSWORD':
            return {
                ...state,
                rePassword: action.rePassword
            };
        case 'CHANGE_USER_CLIENT_ID':
            return {
                ...state,
                clientId: action.clientId
            };
        case 'CHANGE_USER_AUTORIZATION_STATUS':
            return {
                ...state,
                autorized: action.autorized
            };
        case 'CHANGE_USER_TOKEN':
            return {
                ...state,
                token: action.token
            };
        case 'SHOW_USER_LOGIN_FORM':
            return {
                ...state,
                showLoginForm: action.showLoginForm
            }
        case 'SHOW_USER_REGISTRATION_FORM':
            return {
                ...state,
                showRegistrationForm: action.showRegistrationForm
            }
        case 'CHANGE_FETCHING':   // setFetching = ( fetchStatus напр. 'start', fetchObject напр. 'receiveEmployees', fetchInfo напр инфо об ошибке или успешно полученные данные )
            let fetchObject = action.fetchObject;
            let fetchStatus = action.fetchStatus;
            let fetching = state.fetching;
            let newFetchState;
            switch (fetchStatus) {
                case 'start':
                    newFetchState  = setState(true, '') //isFetching, fetchErrors, fetchSucess, Просто оборачивание в объект
                    break;
                case 'success':
                    newFetchState  = setState(false, '', action.fetchSucess) //isFetching, fetchErrors, fetchSucess
                    break;
                case 'error':
                    newFetchState  = setState(false, action.fetchErrors, '') //isFetching, fetchErrors, fetchSucess
                    break;
                case 'clear':
                    newFetchState  = setState(false, '', '') //isFetching, fetchErrors, fetchSucess
                    break;
                }
            return {
                ...state,
                fetching: {
                    ...fetching,
                    [fetchObject] : newFetchState //изменился только один объект в fetching
                }
            }

        default: return state;
    }
}


export default mainReducer;