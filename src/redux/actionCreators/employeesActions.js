export const setEmployeesArray = employeesArray => {
    return { 
        type: 'CHANGE_EMPLOYEES_ARRAY',
        employeesArray
    };
};

export const setDeleteEmployeeById = employeeId => {
    return { 
        type: 'DELETE_EMPLOYEE_BY_ID',
        employeeId
    };
};

export const setEditEmployee = changedEmployee => {
    return { 
        type: 'EDIT_EMPLOYEE',
        changedEmployee
    };
};

export const setAddEmployeeToEnd = newEmployee => {
    return { 
        type: 'ADD_EMPLOYEE_TO_END',
        newEmployee
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
        detailedEmployeeId,
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