const initialState = {
    status: 'new',
    date: '',
    licenseNumber: '',
    color: '',
    bikeType: '',
    ownerFullName: '',
    //officer: '',
    createdAt: '',
    updateAt: '',
    clientId: '',
    description: '',
    resolution: '',
    hasOfficer: false
};

function caseReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_STATUS':
            return {
                ...state,
                status: action.status
        };
        case 'CHANGE_DATE':
            return {
                ...state,
                date: action.date
        };
        case 'CHANGE_LICENSE_NUMBER':
            return {
                ...state,
                licenseNumber: action.licenseNumber
        };
        case 'CHANGE_COLOR':
            return {
                ...state,
                color: action.color
        };
        case 'CHANGE_TYPE':
            return {
                ...state,
                bikeType: action.bikeType
        };
        case 'CHANGE_OWNER_FULLNAME':
            return {
                ...state,
                ownerFullName: action.ownerFullName
        };
        case 'CHANGE_OFFICER':
            return {
                ...state,
                officer: action.officer
        };
        case 'CHANGE_CREATED_AT':
            return {
                ...state,
                createdAt: action.createdAt
        };
        case 'CHANGE_UPDATE_AT':
            return {
                ...state,
                updateAt: action.updateAt
        };
        case 'CHANGE_CLIENT_ID':
            return {
                ...state,
                clientId: action.clientId
        };
        case 'CHANGE_DESCRIPTION':
            return {
                ...state,
                description: action.description
        };
        case 'CHANGE_RESOLUTION':
            return {
                ...state,
                resolution: action.resolution
        };
        case 'CHANGE_HAS_OFFICER':
            return {
                ...state,
                hasOfficer: action.hasOfficer
        };

        default: return state;
    }
}

export default caseReducer;