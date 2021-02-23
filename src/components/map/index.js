import React from 'react'
import { connect } from 'react-redux'
import { SPRITE_SIZE } from '../../config/constants'
import rock from './tiles/rock.png'
import tree from './tiles/tree.png'
import chest from './tiles/chest.png'
import door from './tiles/door.jpg'

import './styles.css'

function getTileSprite(type) {
    switch (type) {
        case 0:
            return 'grass'
        case 4:
            return chest
        case 5:
            return rock
        case 6:
            return tree
        case 3:
            return door
        default:
            break;
    }
}

function MapTile(props) {
    return <div
        className={`tile`}
        style={{
            backgroundImage: `url(${getTileSprite(props.tile)})`,
            height: SPRITE_SIZE,
            width: SPRITE_SIZE,

        }}
    />

}

function MapRow(props) {
    return <div className="tileRow" 
    style= {{
        height: SPRITE_SIZE
    }}>
        {
            props.tiles.map(tile => <MapTile tile={tile} />)
        }
    </div>
}

function Map(props) {
    return (
        <div
            style={{
                position: 'relative',
                top: '0px',
                left: '0px',
                width: '640px',
                height: '320px',
                border: '4px solid white',
            }}
        >
            {
                props.tiles.map(row => <MapRow tiles={row} />)
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        tiles: state.map.tiles,
    }
}

export default connect(mapStateToProps)(Map)