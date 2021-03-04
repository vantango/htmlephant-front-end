import React from 'react'
import { connect } from 'react-redux'
import catSprite from './codecatspritesheet.png'
import manateeSprite from './codemanatee.png'
import handleMovement from './movement'
import store from '../../config/store'
import './style.css'


function Player(props) {
    let walkSprite

    if (store.getState().user.character === "Cat") {
        walkSprite = catSprite
    } else {
        walkSprite = manateeSprite
    }
    return (
        <div className={'player_animation'}
            style={{
                position: 'absolute',
                top: props.position[1],
                left: props.position[0],
                backgroundImage: `url('${walkSprite}')`,
                backgroundPosition: props.spriteLocation,
                width: '32px',
                height: '32px',
            }}
        />
    )
}

function mapStateToProps(state) {
    return {
        ...state.player,

    }
}

export default connect(mapStateToProps)(handleMovement(Player))