// Dependencies
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import empty from './empty.png'
import filled from './filled.png'

import './style.css'

const Health = (props) => {
    // Fill and empty hearts based on user health state
    useEffect(() => {
        const health = props.health;
        switch (health) {
            case 0:
                document.querySelector('.health1').src = empty
                document.querySelector('.health2').src = empty
                document.querySelector('.health3').src = empty
            case 1:
                document.querySelector('.health3').src = empty
                document.querySelector('.health2').src = empty
                break;
            case 2:
                document.querySelector('.health3').src = empty
                break;
            case 3:
                document.querySelector('.health1').src = filled
                document.querySelector('.health2').src = filled
                document.querySelector('.health3').src = filled
                break;
            default:
                break;
        }
    });

    // Health indicator
    return (
        <div className={'healthContainer'}>
            <img className='health health1' src={filled} />
            <img className='health health2' src={filled} />
            <img className='health health3' src={filled} />
        </div>
    )

}

// Grab props from Redux state
function mapStateToProps(state) {
    return {
        ...state.user
    }
}

export default connect(mapStateToProps)(Health)


