export const setFirstName = firstName => {
    return { 
        type: 'CHANGE_USER_FIRST_NAME',
        firstName
    };
};

export const setLastName = lastName => { 
    return { 
        type: 'CHANGE_USER_LAST_NAME',
        lastName
    };
};

export const setEmail = email => {
    return { 
        type: 'CHANGE_USER_EMAIL',
        email
    };
};

export const setPassword = password => {
    return { 
        type: 'CHANGE_USER_PASSWORD',
        password
    };
};

export const setRePassword = rePassword => {
    return { 
        type: 'CHANGE_USER_REPASSWORD',
        rePassword
    };
};

export const setClientId = clientId => {
    return { 
        type: 'CHANGE_USER_CLIENT_ID',
        clientId
    };
};


export const setAutorized = autorized => {
    return { 
        type: 'CHANGE_USER_AUTORIZATION_STATUS',
        autorized
    };
};

export const setToken = token => {
    return { 
        type: 'CHANGE_USER_TOKEN',
        token
    };
};


export const setShowLoginForm = showLoginForm => {
        return {
            type: 'SHOW_USER_LOGIN_FORM',
            showLoginForm
        }
};

export const setShowRegistrationForm = showRegistrationForm => {
        return {
            type: 'SHOW_USER_REGISTRATION_FORM',
            showRegistrationForm
        }
};

/*
export const setCurrentPage = currentPage => {
    return {
        type: 'CHANGE_CURRENT_PAGE',
        currentPage
    }
};
*/


export const setFetching = ( fetchStatus, fetchObject, fetchInfo ) => {
    if (fetchStatus === 'start') {
        return {
            type: 'CHANGE_FETCHING',
            fetchStatus,
            fetchObject
        }
    };
    if (fetchStatus === 'error') {
        return {
            type: 'CHANGE_FETCHING',
            fetchStatus,
            fetchObject,
            fetchErrors: fetchInfo
        }
    };
    if (fetchStatus === 'success') {
        return {
            type: 'CHANGE_FETCHING',
            fetchStatus,
            fetchObject,
            fetchSucess: fetchInfo
        }
    };
    if (fetchStatus === 'clear') {
        return {
            type: 'CHANGE_FETCHING',
            fetchStatus,
            fetchObject
        }
    };
};


