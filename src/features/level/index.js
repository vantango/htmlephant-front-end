import React from 'react'
import { connect } from 'react-redux'
import store from '../../config/store'
// import Health from '../health'


// import './style.css'


function Level(props) {

    return (
        <div className="level">
            <h2 id="level">Level: {props.level}</h2>
            {/* <Health /> */}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        ...state.user,

    }
}

export default connect(mapStateToProps)(Level)
