import React, { useState, useEffect } from 'react'
import Map from '../map'
import Player from '../player'
import Dpad from '../dpad'
import Keys from '../keys'
import Modal, {showModal} from "../../components/Modal/index";
import { tiles } from '../../data/maps/1'

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
            <div style={{display:"flex", justifyContent: "space-between"}}>
            <Dpad />
            <Keys />
            </div>
            <Modal onClose={props.showModal} show="false" />
        </div>
    )
}

export default World