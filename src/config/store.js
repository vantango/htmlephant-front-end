import { createStore, combineReducers } from 'redux'
import playerReducer from '../features/player/reducer'
import mapReducer from '../features/map/reducer'
import modalReducer from '../components/Modal/reducer'
import questionReducer from '../components/Question/reducer'
import keyReducer from '../features/keys/reducer'
import userReducer from '../features/user/userReducer'
import worldReducer from '../features/world/reducer'


const rootReducer = combineReducers({
    player: playerReducer,
    map: mapReducer,
    modal: modalReducer,
    question: questionReducer,
    key: keyReducer,
    user: userReducer,
    world: worldReducer,
})

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export default store