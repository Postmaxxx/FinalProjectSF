export const setFirstName = firstName => {
    return { 
        type: 'CHANGE_FIRST_NAME',
        firstName
    };
};

export const setLastName = lastName => { 
    return { 
        type: 'CHANGE_LAST_NAME',
        lastName
    };
};

export const setEmail = email => {
    return { 
        type: 'CHANGE_EMAIL',
        email
    };
};

export const setPassword = password => {
    return { 
        type: 'CHANGE_PASSWORD',
        password
    };
};

export const setRePassword = rePassword => {
    return { 
        type: 'CHANGE_REPASSWORD',
        rePassword
    };
};

export const setClientId = clientId => {
    return { 
        type: 'CHANGE_CLIENT_ID',
        clientId
    };
};


export const setAutorized = autorized => {
    return { 
        type: 'CHANGE_AUTORIZATION_STATUS',
        autorized
    };
};

export const setToken = token => {
    return { 
        type: 'CHANGE_TOKEN',
        token
    };
};


export const setShowLoginForm = showLoginForm => {
        return {
            type: 'SHOW_LOGIN_FORM',
            showLoginForm
        }
};

export const setShowRegistrationForm = showRegistrationForm => {
        return {
            type: 'SHOW_REGISTRATION_FORM',
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
export const setFetching = ( fetchStatus, fetchInfo ) => {
    if (fetchStatus === 'start') {
        return {
            type: 'CHANGE_FETCHING',
        }
    };
    if (fetchStatus === 'error') {
        return {
            type: 'CHANGE_FETCHING',
            fetchErrors: fetchInfo
        }
    };
    if (fetchStatus === 'success') {
        return {
            type: 'CHANGE_FETCHING',
            fetchSucess: fetchInfo
        }
    };
};


