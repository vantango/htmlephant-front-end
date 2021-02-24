import React from 'react'
import Map from '../map'
import Player from '../player'

import { tiles } from '../../data/maps/1'
import store from '../../config/store'

function World(props) {
    store.dispatch({
        type: 'ADD_TILES',
        payload: {
            tiles: tiles
        }
    })

    // function handleInteract() {
    //     alert("You found a chest!")
    // }

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
            <button id="modalBtn" className="btn btn-primary btn-lg float-right disabled"
                data-toggle="modal" data-target="#chestModal"
                style={{
                    color: "white",
                    backgroundColor: "blue"
                }}
                // onClick={handleInteract}
            >Interact</button>
        </div>
    )
}

export default World