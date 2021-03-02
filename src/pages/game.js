import React from "react";
import World from "../features/world/index"
import API from "../utils/API";
import { useHistory } from "react-router-dom";


// Render world and export as Game
function Game() {
<<<<<<< HEAD
    let history = useHistory();

    console.log("loaded")
    API.getVip(localStorage.getItem('token')).then((res) => {
        if(res) {
            console.log(res)
            
        }
    }).catch(() => {
        console.log("not signed in")
            history.push('/')
    })
    

    window.addEventListener('onload', e => {
        console.log(e)
    })
=======
    API.getVip(localStorage.getItem("token")).then() => {
        
    }
>>>>>>> dev

    return (
        <World />
    )
}

export default Game