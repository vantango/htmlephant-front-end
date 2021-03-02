import React from "react";
import World from "../features/world/index"
import API from "../utils/API";
import { useHistory, useLocation } from "react-router-dom";
import store from "../config/store";


// Render world and export as Game
function Game() {
    let history = useHistory();

    let location = useLocation();
    console.log(location.pathname)
    store.dispatch({
        type: 'CHANGE_LOCATION',
        payload: {
            location: location.pathname
        }
    })
    

    console.log("loaded")
    const token = localStorage.getItem('token')
    API.getVip(token).then((res) => {
        if(res) {
            console.log(res.data)
            store.dispatch({
                type: "USER_ACTION",
                payload: {
                    level: res.data.level,
                    name: res.data.username,
                    password: res.data.password,
                    question1: false,
                    question2: false,
                    question3: false,
                    encounter: 0,
                    id: res.data._id,
                    token: token
                }
            })
        }
    }).catch(() => {
        console.log("not signed in")
            history.push('/')
    })
    


    return (
        <World />
    )
}

export default Game