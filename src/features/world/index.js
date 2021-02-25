import React from 'react'
import Map from '../map'
import Player from '../player'
import Modal, {showModal} from "../../components/Modal/index";
import { tiles } from '../../data/maps/1'
import store from '../../config/store'

function World(props) {
    store.dispatch({
        type: 'ADD_TILES',
        payload: {
            tiles: tiles
        }
    })
    return (
        <div style={{
                position: 'relative',
                width: '800px',
                height: '400px',
                margin: '20px auto',
            }}
        >
            
            <Map />
            <Player />
            {/* <Modal /> */}
            <Modal onClose={props.showModal} show="false">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
                deserunt corrupti, ut fugit magni qui quasi nisi amet repellendus non
                fuga omnis a sed impedit explicabo accusantium nihil doloremque
                consequuntur.
            </Modal>
        </div>
    )
}

export default World