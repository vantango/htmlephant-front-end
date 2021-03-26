import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import store from '../../config/store'
import empty from './empty.png'
import filled from './filled.png'



import './style.css'


function Keys(props) {

    useEffect(() => {
        const amount = props.amount
        console.log(amount)
        switch (amount) {
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

    return (
        <div className={'keys'}>
            <img className="key key1" src={empty} />
            <img className="key key2" src={empty} />
            <img className="key key3" src={empty} />

        </div>
    )
}

function mapStateToProps(state) {
    return {
        ...state.key,

    }
}

export default connect(mapStateToProps)(Keys)