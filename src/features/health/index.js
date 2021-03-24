import React from 'react'
import { connect } from 'react-redux'
import empty from './empty.png'
import filled from './filled.png'

function Health(props) {
    const health = props.health;
    console.log(health);
    switch (health) {
        case 1:
            document.querySelector(".heart1").src = filled
            break;
        case 2:
            document.querySelector(".heart1").src = filled
            document.querySelector(".heart2").src = filled
            break;
        case 3:
            document.querySelector(".heart1").src = filled
            document.querySelector(".heart2").src = filled
            document.querySelector(".heart3").src = filled
            break;
        default:
            document.querySelector(".heart1").src = empty
            document.querySelector(".heart2").src = empty
            document.querySelector(".heart3").src = empty
    }

    return (
        <div className={"health"}>
            <img className="health heart1" src={empty} />
            <img className="health heart2" src={empty} />
            <img className="health heart3" src={empty} />
        </div>
    )

}

function mapStateToProps(state) {
    return {
        ...state.user,
    }
}

export default connect(mapStateToProps)(Health)