export const setEmployeesArray = employeesArray => {
    return { 
        type: 'CHANGE_EMPLOYEES_ARRAY',
        employeesArray
    };
};

export const setShowEmployeeDetails = showEmployeeDetails => {
    return { 
        type: 'CHANGE_SHOW_EMPLOYEE_DETAILS',
        showEmployeeDetails
    };
};


export const setDetailedEmployeeId = detailedEmployeeId => {
    return { 
        type: 'CHANGE_DETAILED_EMPLOYEE_ID',
        detailedEmployeeId
    };
};

export const setDetailedEmployeeHeaderText = detailedEmployeeHeaderText => {
    return { 
        type: 'CHANGE_DETAILED_EMPLOYEE_HEADER_TEXT',
        detailedEmployeeHeaderText
    };
};


export const setEmployeesObject = employeesObject => {
    return { 
        type: 'CHANGE_EMPLOYEES_OBJECT',
        employeesObject
    };
};

export const setEmployeesMap = employeesMap => {
    return { 
        type: 'CHANGE_EMPLOYEES_MAP',
        employeesMap
    };
};
