const initialState = {
    casesArray: [],
    showCaseDetails: false,
    detailedCaseId: '',
    detailedCaseHeaderText: ''
};

function casesReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_CASES_ARRAY':
            return {
                ...state,
                casesArray: action.casesArray
        };
        case 'CHANGE_SHOW_CASE_DETAILS':
            return {
                ...state,
                showCaseDetails: action.showCaseDetails
        };
        case 'CHANGE_DETAILED_CASE_ID':
            return {
                ...state,
                detailedCaseId: action.detailedCaseId
        };
        case 'CHANGE_DETAILED_CASE_HEADER_TEXT':
            return {
                ...state,
                detailedCaseHeaderText: action.detailedCaseHeaderText
        };
        default: return state;
    }
}

export default casesReducer;