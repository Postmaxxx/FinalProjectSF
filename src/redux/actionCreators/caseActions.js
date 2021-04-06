export const setStatus = status => {
    return { 
        type: 'CHANGE_STATUS',
        status
    };
};

export const setDate = date => {
    return { 
        type: 'CHANGE_DATE',
        date
    };
};

export const setLicenseNumber = licenseNumber => {
    return { 
        type: 'CHANGE_LICENSE_NUMBER',
        licenseNumber
    };
};

export const setColor = color => {
    return { 
        type: 'CHANGE_COLOR',
        color
    };
};

export const setType = bikeType => {
    return { 
        type: 'CHANGE_TYPE',
        bikeType
    };
};

export const setOwnerFullName = ownerFullName => {
    return { 
        type: 'CHANGE_OWNER_FULLNAME',
        ownerFullName
    };
};


export const setOfficer = officer => {
    return { 
        type: 'CHANGE_OFFICER',
        officer
    };
};


export const setCreatedAt = createdAt => {
        return {
            type: 'CHANGE_CREATED_AT',
            createdAt
        }
};

export const setUpdateAt = updateAt => {
        return {
            type: 'CHANGE_UPDATE_AT',
            updateAt
        }
};

export const setClientId = clientId => {
    return {
        type: 'CHANGE_CLIENT_ID',
        clientId
    }
};

export const setDescription = description => {
    return {
        type: 'CHANGE_DESCRIPTION',
        description
    }
};

export const setResolution = resolution => {
    return {
        type: 'CHANGE_RESOLUTION',
        resolution
    }
};

export const setHasOfficer = hasOfficer => {
    return {
        type: 'CHANGE_HAS_OFFICER',
        hasOfficer
    }
};


