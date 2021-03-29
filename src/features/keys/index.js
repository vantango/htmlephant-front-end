// Dependencies
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import empty from './empty.png'
import filled from './filled.png'
import './style.css'

const Keys = (props) => {
    // Fill and empty keys based on key state
    useEffect(() => {
        const keys = props.keys
        switch (keys) {
            case 0:
                document.querySelector('.key1').src = empty
                document.querySelector('.key2').src = empty
                document.querySelector('.key3').src = empty
                break;
            case 1:
                document.querySelector('.key1').src = filled
                break;

            case 2:
                document.querySelector('.key1').src = filled
                document.querySelector('.key2').src = filled
                break;

            case 3:
                document.querySelector('.key1').src = filled
                document.querySelector('.key2').src = filled
                document.querySelector('.key3').src = filled
                break;
            default:
                break;
        }

    })

    // Key indicator
    return (
        <div className={'keys'}>
            <img className="key key1" src={empty} />
            <img className="key key2" src={empty} />
            <img className="key key3" src={empty} />
        </div>
    )
}

// Grab props from Redux state
function mapStateToProps(state) {
    return {
        ...state.user,
    }
}

export default connect(mapStateToProps)(Keys)