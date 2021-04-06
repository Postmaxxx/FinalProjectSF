export const setShowConfirmation = showConfirmation => {
    return {
        type: 'CHANGE_SHOW_CONFIRMATION',
        showConfirmation
    };
};


export const setConfirmationMainText = confirmationMainText => {
    return {
        type: 'CHANGE_CONFIRMATION_MAIN_TEXT',
        confirmationMainText
    };
};


export const setConfirmationLeftButtonText = confirmationLeftButtonText => {
    return {
        type: 'CHANGE_CONFIRMATION_LEFT_BUTTON_TEXT',
        confirmationLeftButtonText
    };
};


export const setConfirmationRightButtonText = confirmationRightButtonText => {
    return {
        type: 'CHANGE_CONFIRMATION_RIGHT_BUTTON_TEXT',
        confirmationRightButtonText
    };
};


export const setConfirmationLeftButtonAction = confirmationLeftButtonAction => {
    return {
        type: 'CHANGE_CONFIRMATION_LEFT_BUTTON_ACTION',
        confirmationLeftButtonAction
    };
};


export const setConfirmationRightButtonAction = confirmationRightButtonAction => {
    return {
        type: 'CHANGE_CONFIRMATION_RIGHT_BUTTON_ACTION',
        confirmationRightButtonAction
    };
};

export const setShouldCloseOnOverlayClick = shouldCloseOnOverlayClick => {
    return {
        type: 'CHANGE_CLOSE_CONFIRMATION_ON_OVERLAY_CLICK',
        shouldCloseOnOverlayClick
    };
};


export const setShouldCloseOnEsc = shouldCloseOnEsc => {
    return {
        type: 'CHANGE_CLOSE_CONFIRMATION_ON_ESC',
        shouldCloseOnEsc
    };
};
