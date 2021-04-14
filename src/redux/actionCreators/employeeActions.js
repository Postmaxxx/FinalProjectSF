export const setEmail = email => {
    return { 
        type: 'CHANGE_EMPLOYEE_EMAIL',
        email
    };
};

export const setFirstName = firstName => {
    return { 
        type: 'CHANGE_EMPLOYEE_FIRST_NAME',
        firstName
    };
};

export const setLastName = lastName => {
    return { 
        type: 'CHANGE_EMPLOYEE_LAST_NAME',
        lastName
    };
};

export const setPassword = password => {
    return { 
        type: 'CHANGE_EMPLOYEE_PASSWORD',
        password
    };
};

export const setRePassword = rePassword => {
    return { 
        type: 'CHANGE_EMPLOYEE_REPASSWORD',
        rePassword
    };
};

export const setClientId = clientId => {
    return { 
        type: 'CHANGE_EMPLOYEE_CLIENT_ID',
        clientId
    };
};

export const setApproved = approved => {
    return { 
        type: 'CHANGE_EMPLOYEE_APPROVED',
        approved
    };
};


