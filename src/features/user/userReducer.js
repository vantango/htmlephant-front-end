const intitialState = {
    name: "",
    password: "",
    key: 0,
    token: "",
    isLoggedIn: false

}
const userReducer = (state=intitialState, action) => {
    switch(action.type) {
        case 'USER_ACTION':
            return {
                ...action.payload
            }
        default:
            return state
    }
}

export default userReducer
