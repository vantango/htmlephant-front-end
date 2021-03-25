import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../../config/store';
import empty from './empty.png'
import filled from './filled.png'

class Health extends Component {
    constructor(props) {
        super(props);
        this.state = { health: 0 }
    }

    componentDidMount() {
        const health = this.props.health;
        console.log(health);
        switch (health) {
            case 1:
                document.querySelector('.health1').src = filled
                break;
            case 2:
                document.querySelector('.health1').src = filled
                document.querySelector('.health2').src = filled
                break;
            case 3:
                document.querySelector('.health1').src = filled
                document.querySelector('.health2').src = filled
                document.querySelector('.health3').src = filled
                break;
            default:
                document.querySelector('.health1').src = empty
                document.querySelector('.health2').src = empty
                document.querySelector('.health3').src = empty
        }
    }

    render() {
        return (
            <div className={'health'}>
                <img className='health health1' src={filled} />
                <img className='health health2' src={filled} />
                <img className='health health3' src={filled} />
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        ...state.user
    }
}

export default connect(mapStateToProps)(Health)


