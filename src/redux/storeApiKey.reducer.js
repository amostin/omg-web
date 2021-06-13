const initState = {apiKey: ""};

/**
 * stores the API key
 *
 * @param state
 * @param action
 * @return {{apiKey}|{apiKey: string}}
 */
function storeApiKey(state=initState, action){
    let nextState;
    switch (action.type){
        case 'SETKEY':
            nextState = {
                apiKey: action.value
            };
            return nextState || state;
        default:
            return state;
    }
}

export default storeApiKey;
