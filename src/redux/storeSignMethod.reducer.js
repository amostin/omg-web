const initState = {method: 'in'};

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
