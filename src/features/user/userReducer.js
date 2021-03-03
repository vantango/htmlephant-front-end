const intitialState = {
    name: "",
    password: "",
    key: 0,
    token: "",
    level: 1,
    id: "",
    isLoggedIn: false,
    encounter: 0,
    // is question 1 answered
    question1: false,
    // is question 2 answered
    question2: false,
    // is question 3 answered
    question3: false,
    character: ""
}
const userReducer = (state = intitialState, action) => {
    switch (action.type) {
        case 'USER_ACTION':
            return {
                ...action.payload
            }
        default:
            return state
    }
}

export default userReducer
