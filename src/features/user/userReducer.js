const intitialState = {
    name: "",
    password: "",
    key: 0,
    token: "",
    level: 0,
    id: "",
    isLoggedIn: false,
    encounters:0

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
