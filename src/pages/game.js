import React from "react";
import World from "../features/world/index"
import API from "../utils/API";
import { useHistory, useLocation } from "react-router-dom";
import store from "../config/store";
import Sound from '../features/sound'
import Settings from '../features/settings'


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

    const token = localStorage.getItem('token')
    API.getVip(token).then((res) => {
        if (res) {
            console.log(res.data)
            store.dispatch({
                type: "USER_ACTION",
                payload: {
                    level: res.data.level,
                    name: res.data.username,
                    password: res.data.password,
                    character: res.data.character,
                    question1: false,
                    question2: false,
                    question3: false,
                    encounter: 0,
                    id: res.data._id,
                    token: token,
                    health: res.data.health,
                    keys: res.data.keys
                }
            })
        }
    }).catch((err) => {
        err ? console.log(`${err}`) : console.log("Success!")
    })

    function handleHomeButton() {
        history.push("/")
    }

    return (
        <div>

            <Sound />
            <Settings />
            <World />
        </div>
    )
}

export default Game