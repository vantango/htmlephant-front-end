const intitialState = {
    location: ""
}

const playerReducer = (state=intitialState, action) => {
    switch(action.type) {
        case 'CHANGE_LOCATION':
            return {
                ...action.payload
            }
        default:
            return state
    }
}

export default playerReducer