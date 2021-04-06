const initialState = {
    showConfirmation: false,
    shouldCloseOnOverlayClick: false,
    shouldCloseOnEsc: false
};

function confirmationReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_SHOW_CONFIRMATION':
            return {
                ...state,
                showConfirmation: action.showConfirmation
            }
        case 'CHANGE_CONFIRMATION_MAIN_TEXT':
            return {
                ...state,
                confirmationMainText: action.confirmationMainText
            }
        case 'CHANGE_CONFIRMATION_LEFT_BUTTON_TEXT':
            return {
                ...state,
                confirmationLeftButtonText: action.confirmationLeftButtonText
            }               
        case 'CHANGE_CONFIRMATION_RIGHT_BUTTON_TEXT':
            return {
                ...state,
                confirmationRightButtonText: action.confirmationRightButtonText
            }
        case 'CHANGE_CONFIRMATION_LEFT_BUTTON_ACTION':
            return {
                ...state,
                confirmationLeftButtonAction: action.confirmationLeftButtonAction
            }
        case 'CHANGE_CONFIRMATION_RIGHT_BUTTON_ACTION':
            return {
                ...state,
                confirmationRightButtonAction: action.confirmationRightButtonAction
            }        
        case 'CHANGE_CLOSE_CONFIRMATION_ON_OVERLAY_CLICK':
            return {
                ...state,
                shouldCloseOnOverlayClick: action.shouldCloseOnOverlayClick
            }
       case 'CHANGE_CLOSE_CONFIRMATION_ON_ESC':
            return {
                ...state,
                shouldCloseOnEsc: action.shouldCloseOnEsc
            }


        default: return state;
    }
}

export default confirmationReducer;