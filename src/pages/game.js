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
    store.dispatch({
        type: 'CHANGE_LOCATION',
        payload: {
            location: location.pathname
        }
    })

    const token = localStorage.getItem('token')
    const oldState = JSON.parse(localStorage.getItem("state"))
    API.getVip(token).then((res) => {
        if (res.data.username === oldState.name) {
            store.dispatch({
                type: "USER_ACTION",
                payload: {
                    level: res.data.level,
                    name: res.data.username,
                    password: res.data.password,
                    character: res.data.character,
                    question1: oldState.question1,
                    question2: oldState.question2,
                    question3: oldState.question3,
                    encounter: oldState.encounter,
                    id: res.data._id,
                    token: token,
                    health: res.data.health,
                    keys: res.data.keys,
                }
            })
        } else if (res) {
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
                    keys: res.data.keys,
                }
            })
        } else {
            console.log(`Failed to login`)
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