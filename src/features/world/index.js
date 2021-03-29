import React, { useState, useEffect } from 'react'
import Map from '../map'
import Player from '../player'
// import Dpad from '../dpad'
import Health from '../health'

import Keys from '../keys'
import Level from '../level'
import Modal, { showModal } from "../../components/Modal/index";
import { tiles } from '../../data/maps/1'
import phone from './phoneRotation.png'

import { tiles1 } from '../../data/maps/1'
import { tiles2 } from '../../data/maps/2'
import store from '../../config/store'
import API from "../../utils/API"


function World(props) {
    store.dispatch({
        type: 'ADD_TILES',
        payload: {
            tiles: tiles1
        }
    })

    const health = store.getState().user.health;

    window.onorientationchange = function() {
        window.location.reload()
    }

    let orientation
    window.addEventListener("deviceorientation", handleOrientation, true)
    if(window.innerHeight > window.innerWidth) {
        orientation = 'portrait'
    } else {
        orientation = 'landscape'
    }
    function handleOrientation(event) {
        // check if device is landscape
        if (event.alpha>89 && event.alpha< 150) {
            orientation = 'landscape'
        } else {
            orientation = 'portrait'
        }
    }

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    if (!isMobile || orientation === 'landscape') {
    return (
        <div
            style={{
                position: 'relative',
                width: '650px',
                height: '400px',
                margin: '20px auto',
            }}
        >
            <Map />
            <Player />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                {/* <Dpad /> */}
                <Health />
                <Level />
                <Keys />

            </div>
            <Modal onClose={props.showModal} show="false" />
        </div>
    )
        } else {
            return (
                <div className="game-wrapper">                  
      <div className="menu-select rpgui-container framed">
        <h1>Wizards and Whiteboards</h1>
        <img src={phone}/>
        <h1 style={{ fontSize: '250%'}}>Please turn your device</h1>
      </div>
     
    </div>
            )
        }
}

export default World