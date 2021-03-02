import React from 'react'
import { connect } from 'react-redux'
import walkSprite from './m1.png'
import handleMovement from './movement'

import store from '../../config/store'

import './style.css'


function Player(props) {


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