import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import store from '../../config/store';
import empty from './empty.png'
import filled from './filled.png'

function Health(props) {

    useEffect(() => {
        const health = props.health;
        console.log(health);
        switch (health) {
            case 0:
                document.querySelector('.health1').src = empty
                document.querySelector('.health2').src = empty
                document.querySelector('.health3').src = empty
            case 1:
                document.querySelector('.health1').src = empty
                document.querySelector('.health2').src = empty
                break;
            case 2:
                document.querySelector('.health1').src = empty
                break;
            default:
                break;
        }

    })


    return (
        <div className={'health'}>
            <img className='health health1' src={filled} />
            <img className='health health2' src={filled} />
            <img className='health health3' src={filled} />
        </div>
    )

}

function mapStateToProps(state) {
    return {
        ...state.user
    }
}

export default connect(mapStateToProps)(Health)


