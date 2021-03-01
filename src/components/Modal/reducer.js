const intitialState = {
    show: false,
    name: "",
    dialogue: ""
}

const modalReducer = (state=intitialState, action) => {
    switch(action.type) {
        case 'SHOW_MODAL':
            return {
                ...action.payload
            }
        default:
            return state
    }
}

export default modalReducer