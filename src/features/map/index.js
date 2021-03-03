import React from 'react'
import { connect } from 'react-redux'
import { SPRITE_SIZE } from '../../config/constants'
import { v4 as uuidv4 } from 'uuid'
import grass from './tiles/grassy.png'
import rock from './tiles/rock.png'
import tree from './tiles/tree4.png'
import chest from './tiles/chest.png'
import denis from './tiles/denisv4.png'
import zac from './tiles/f2.png'
import aslan from './tiles/aslanv4.png'
import joe from './tiles/e1.png'
import path3 from './tiles/path.png'
import fire2 from './tiles/fire2.png'
import doortop from './tiles/doortop.png'
import doorbottom from './tiles/doorbottom.png'
import doorbottom2 from './tiles/doorbottom2.png'




import './styles.css'

function getTileSprite(type) {
    switch (type) {
        case 0:
            return grass
        case 1:
            return 'grass'
        case 2:
            return 'gravel'
        case 3:
            return path3
        case 10:
            return rock
        case 11:
            return tree
        case 12:
            return chest
        case 15:
            return denis
        case 16:
            return zac
        case 17:
            return aslan
        case 18:
            return joe
        case 21:
            // east door
            return doorbottom
        case 22:
            // north door
            return doorbottom
        case 23:
            // west door
            return doorbottom
        case 24:
            // main door in west room
            return doorbottom
        case 25:
            // main door in north room
            return doorbottom2
        case 26:
            // main door in east room
            return doorbottom
        case 27:
            return fire2
        case 28:
            return doortop
        default:
            break;
    }
}

function MapTile(props) {
    if (props.tile === 15 || props.tile === 16 || props.tile === 17 || props.tile === 18) {
        return <div
            className={`tile`}
        >
            <div className={`Character tile`} style={{ height: SPRITE_SIZE, width: SPRITE_SIZE }}>
                <img className={`Character_spritesheet`} src={`${getTileSprite(props.tile)}`} alt={`Character`} />
            </div>

        </div>
    } else {
        return <div
            className={`tile`}
            style={{
                backgroundImage: `url(${getTileSprite(props.tile)})`,
                height: SPRITE_SIZE,
                width: SPRITE_SIZE,

            }}
        />
    }

}

function MapRow(props) {
    return <div className="tileRow"
        style={{
            height: SPRITE_SIZE
        }}>
        {
            props.tiles.map(tile => <MapTile key={uuidv4()} tile={tile} />)
        }
    </div>
}

function Map(props) {
    return (
        <div
            name="map"
            style={{
                position: 'relative',
                top: '0px',
                left: '0px',
                width: '640px',
                height: '320px',
            }}
        >
            {
                props.tiles.map(row => <MapRow key={uuidv4()} tiles={row} />)
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