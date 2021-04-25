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
        case 'CHANGE_CASE_STATUS':
            return {
                ...state,
                status: action.status
        };
        case 'CHANGE_CASE_DATE':
            return {
                ...state,
                date: action.date
        };
        case 'CHANGE_CASE_LICENSE_NUMBER':
            return {
                ...state,
                licenseNumber: action.licenseNumber
        };
        case 'CHANGE_CASE_COLOR':
            return {
                ...state,
                color: action.color
        };
        case 'CHANGE_CASE_TYPE':
            return {
                ...state,
                bikeType: action.bikeType
        };
        case 'CHANGE_CASE_OWNER_FULLNAME':
            return {
                ...state,
                ownerFullName: action.ownerFullName
        };
        case 'CHANGE_CASE_OFFICER':
            return {
                ...state,
                officer: action.officer
        };
        case 'CHANGE_CASE_CREATED_AT':
            return {
                ...state,
                createdAt: action.createdAt
        };
        case 'CHANGE_CASE_UPDATE_AT':
            return {
                ...state,
                updateAt: action.updateAt
        };
        case 'CHANGE_CASE_CLIENT_ID':
            return {
                ...state,
                clientId: action.clientId
        };
        case 'CHANGE_CASE_DESCRIPTION':
            return {
                ...state,
                description: action.description
        };
        case 'CHANGE_CASE_RESOLUTION':
            return {
                ...state,
                resolution: action.resolution
        };
        case 'CHANGE_CASE_HAS_OFFICER':
            return {
                ...state,
                hasOfficer: action.hasOfficer
        };

        default: return state;
    }
}


export default caseReducer;