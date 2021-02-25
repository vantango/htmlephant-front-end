const intitialState = {
    position: [288,128],
    spriteLocation: '0px 0px',
    direction: 'EAST',
    walkIndex: 0,
}

const playerReducer = (state=intitialState, action) => {
    switch(action.type) {
        case 'MOVE_PLAYER':
            return {
                ...action.payload
            }
        default:
            return state
    }
}

export default playerReducer