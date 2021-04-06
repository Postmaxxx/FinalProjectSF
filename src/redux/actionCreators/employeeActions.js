export const setEmail = email => {
    return { 
        type: 'CHANGE_EMAIL',
        email
    };
};

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

export const setApproved = approved => {
    return { 
        type: 'CHANGE_APPROVED',
        approved
    };
};


