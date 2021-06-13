const initState = {method: 'in'};

/**
 * stores the authentification method
 *
 * @param state
 * @param action
 * @return {{method}|{method: string}}
 */
function storeSignMethod(state=initState, action){
    let nextState;
    switch (action.type){
        case 'SETMETHOD':
            nextState = {
                method: action.value
            };
            return nextState || state;
        default:
            return state;
    }
}

export default storeSignMethod;
