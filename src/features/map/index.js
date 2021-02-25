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
            return 'ground'
        case 1:
            return 'grass'
        case 2:
            return 'gravel'
        case 10:
            return rock
        case 11:
            return tree
        case 12:
            return chest
        case 15:
            return 'denis'
        case 16:
            return 'zac'
        case 17:
            return 'aslan'
        case 18:
            return 'joe'
        case 21:
            // east door
            return door
        case 22:
            // north door
            return door
        case 23:
            // west door
            return door
        case 24:
            // main door in west room
            return door
        case 25:
            // main door in north room
            return door
        case 26:
            // main door in east room
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
        style={{
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