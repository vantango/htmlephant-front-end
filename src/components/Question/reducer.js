const intitialState = {
   name: "",
   question: "",
   form: "",
   input: "",
   answers: []
}

const questionReducer = (state=intitialState, action) => {
    switch(action.type) {
        case 'ASK_QUESTION':
            return {
                ...action.payload
            }
        default:
            return state
    }
}

export default questionReducer