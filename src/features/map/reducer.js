const intitialState = {
    tiles: [],
}

const mapReducer = (state=intitialState, action) => {
    switch(action.type) {
        case 'ADD_TILES':
            return {
                ...action.payload
            }
        default:
            return state
    }
}

export default mapReducer