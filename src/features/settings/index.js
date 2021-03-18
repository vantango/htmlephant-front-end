import React from 'react'
import home_button from './home_button.png'
import './style.css'
import { useHistory } from "react-router-dom";


export default function Sound() {
    let history = useHistory();

    function handleHomeButton() {
        // show modal first to confirm
        document.querySelector(".settings_modal").style.display = "block"
        // log the user out

        // history.push('/')
    }

    function handleClose() {
        document.querySelector(".settings_modal").style.display = "none"
    }

    function handleGoHome() {
        history.push('/')
    }

    return(
        <div>

        <button onClick={handleHomeButton}><img className="home_button" src={home_button}/></button>
        
        <div className="setting_wrapper">
        {/* modal when home button is clicked on */}
        <div className=" rpgui-center settings_modal rpgui-container framed" style={{display: "none"}}>
            <h1 style={{ fontSize: '250%', margin: 'auto'}}>Are you sure you want to quit? </h1>
            <h1>You will lose all progress for your current level.</h1>
            <button type="button" className="settings_button rpgui-button" onClick={handleGoHome}>Go home</button>
            <button type="button" className="setting_button rpgui-button" onClick={handleClose}>Close</button>
        </div>
        </div>

        </div>
    )
}
