export const setCasesArray = casesArray => {
    let casesArrayProcessed = casesArray.map((item) => {
    return {
        ...item,
        bikeType: item.type
        } 
    })
    return { 
        type: 'CHANGE_CASES_ARRAY',
        casesArray: casesArrayProcessed
    };
};

export const setShowCaseDetails = showCaseDetails => {
    return { 
        type: 'CHANGE_SHOW_CASE_DETAILS',
        showCaseDetails
    };
};

export const setDetailedCaseId = detailedCaseId => {
    return { 
        type: 'CHANGE_DETAILED_CASE_ID',
        detailedCaseId
    };
};

export const setDetailedCaseHeaderText = detailedCaseHeaderText => {
    return { 
        type: 'CHANGE_DETAILED_CASE_HEADER_TEXT',
        detailedCaseHeaderText
    };
};
