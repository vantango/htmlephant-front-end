import React from 'react'
import { connect } from 'react-redux'
import store from '../../config/store'
import icon from './icon.png'


export default function Sound() {

    function handleClick() {
        if (document.querySelector('#player').style.display === "none") {
            document.querySelector('#player').style.display = "block" 
        } else {
            document.querySelector('#player').style.display = "none" 
        }
        
    }

    return (
        <img className={'sound'}
            onClick={handleClick}
            src={icon}
            style={{
                // backgroundImage: `url('${icon}')`,
                // height: '5vh',
                // width: '5vh',
                zIndex: '6',
                position: 'fixed',
                top: '0',
                left: '0'
            }}
        />
    )
}
