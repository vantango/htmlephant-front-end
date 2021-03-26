const intitialState = {
    text: ""
}

const editorReducer = (state = intitialState, action) => {
    switch (action.type) {
        case 'EDITOR':
            return {
                ...action.payload
            }
        default:
            return state
    }
}

export default editorReducer