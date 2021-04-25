export const setStatus = status => {
    return { 
        type: 'CHANGE_CASE_STATUS',
        status
    };
};

export const setDate = date => {
    return { 
        type: 'CHANGE_CASE_DATE',
        date
    };
};

export const setLicenseNumber = licenseNumber => {
    return { 
        type: 'CHANGE_CASE_LICENSE_NUMBER',
        licenseNumber
    };
};

export const setColor = color => {
    return { 
        type: 'CHANGE_CASE_COLOR',
        color
    };
};

export const setType = bikeType => {
    return { 
        type: 'CHANGE_CASE_TYPE',
        bikeType
    };
};

export const setOwnerFullName = ownerFullName => {
    return { 
        type: 'CHANGE_CASE_OWNER_FULLNAME',
        ownerFullName
    };
};

export const setOfficer = officer => {
    return { 
        type: 'CHANGE_CASE_OFFICER',
        officer
    };
};

export const setCreatedAt = createdAt => {
        return {
            type: 'CHANGE_CASE_CREATED_AT',
            createdAt
        }
};

export const setUpdateAt = updateAt => {
        return {
            type: 'CHANGE_CASE_UPDATE_AT',
            updateAt
        }
};

export const setClientId = clientId => {
    return {
        type: 'CHANGE_CASE_CLIENT_ID',
        clientId
    }
};

export const setDescription = description => {
    return {
        type: 'CHANGE_CASE_DESCRIPTION',
        description
    }
};

export const setResolution = resolution => {
    return {
        type: 'CHANGE_CASE_RESOLUTION',
        resolution
    }
};

export const setHasOfficer = hasOfficer => {
    return {
        type: 'CHANGE_CASE_HAS_OFFICER',
        hasOfficer
    }
};