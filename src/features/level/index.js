import React from 'react'
import { connect } from 'react-redux'
import store from '../../config/store'


// import './style.css'


export default function Level() {
    const level = store.getState().user.level
    console.log(level)
    return (
        <div className="level">
            <h2 id="level">Level: {level}</h2>
        </div>
    )
}
