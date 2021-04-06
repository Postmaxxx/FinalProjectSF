
export const middleware = store => next => action => {
    if (action.type === 'CHANGE_TOKEN') {
        console.log(action.type);
    }
    if (action.type === 'CHANGE_AUTORIZATION_STATUS') {
        console.log(action.type);
    }


    
    return next(action);
}