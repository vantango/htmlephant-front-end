import React from 'react'
import { connect } from 'react-redux'
import handleMovement from './movement'
import store from '../../config/store'
import uparrow from './uparrow.png'
import downarrow from './downarrow.png'
import rightarrow from './rightarrow.png'
import leftarrow from './leftarrow.png'

import './style.css'


export default function Dpad() {


    return (
        <div className={'dpad'} style={{position: 'absolute', bottom: '5px', left: '5px'}}>
            <div className={'row'} style={{ textAlign: 'center' }}>
                <button onClick={() => handleMovement("NORTH")}>
                    <img className={'dpadButton'} src={uparrow}></img>
                </button>
            </div>

            <div className={'row'}>
                <button onClick={() => handleMovement("WEST")}>
                    <img className={'dpadButton'} src={leftarrow}></img>
                </button>
                <button style={{ float: 'right' }} onClick={() => handleMovement("EAST")}>
                    <img className={'dpadButton'} src={rightarrow}></img>
                </button>
            </div>

            <div className={'row'} style={{ textAlign: 'center' }}>
                <button onClick={() => handleMovement("SOUTH")}>
                    <img className={'dpadButton'} src={downarrow}></img>
                </button>
            </div>
        </div>
    )
}
