import store from '../../config/store'
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from '../../config/constants'

import { tiles2 } from '../../data/maps/2'

export default function handleMovement(player) {

    // const stepSize =
    function getNewPosition(oldPos, direction) {
        switch(direction) {
            case 'WEST':
                return [ oldPos[0]-SPRITE_SIZE, oldPos[1]]
            case 'EAST':
                return [ oldPos[0]+SPRITE_SIZE, oldPos[1]]
            case 'NORTH':
                return [ oldPos[0], oldPos[1]-SPRITE_SIZE]
            case 'SOUTH':
                return [ oldPos[0], oldPos[1]+SPRITE_SIZE]
        }
    }

    function getSpriteLocation(direction, walkIndex) {
        switch(direction) {
            case 'SOUTH': 
            return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 0}px`
            case 'NORTH': 
            return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 1}px`
            case 'EAST': 
            return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 2}px`
            case 'WEST': 
            return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 3}px`
        }
    }

    function getWalkIndex() {
        const walkIndex = store.getState().player.walkIndex
        return walkIndex >= 2 ? 0 : walkIndex + 1
    }

    function observeBoundaries(oldPos, newPos) {
        return (newPos[0] >= 0 && newPos[0] <= MAP_WIDTH - SPRITE_SIZE) &&
        (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE)
        
    }    

    function observeImpassable(oldPos, newPos) {
        const tiles = store.getState().map.tiles
        const y = newPos[1] / SPRITE_SIZE
        const x = newPos[0] / SPRITE_SIZE
        const nextTile = tiles[y][x]
        return nextTile < 5
    }

    function observeAction(oldPos, newPos) {
        const tiles = store.getState().map.tiles
        const y = newPos[1] / SPRITE_SIZE
        const x = newPos[0] / SPRITE_SIZE
        const nextTile = tiles[y][x]
        switch (nextTile) {
            case 4:
                showModal()
                return true
            case 3:
                alert ("Leaving Room")
                changeRoom()
                return true
        
            default:
                return false;
        }
    }

    function showModal() {
        // alert ("You found the chest")
        const interactBtn = document.querySelector('#modalBtn')
        interactBtn.classList.remove("disabled")

        // const modal = document.querySelector('#chestModal')
        // modal.setAttribute("style", "display: block;")

        // interactBtn.setAttribute("display", "none")
        // delete interactBtn.disabled
        // delete interactBtn['aria-disabled']
    }

    function hideModal() {
        // alert ("You found the chest")
        const interactBtn = document.querySelector('#modalBtn')
        interactBtn.classList.add("disabled")

        // const modal = document.querySelector('#chestModal')
        // modal.setAttribute("style", "display: none;")
        // interactBtn.setAttribute("display", "block")

    }



    function changeRoom() {
        store.dispatch({
            type: 'ADD_TILES',
            payload: {
                tiles: tiles2
            }
        })
    }


    function dispatchMove(direction, newPos) {
        const walkIndex = getWalkIndex()
        store.dispatch({
            type: 'MOVE_PLAYER',
            payload: {
                position: newPos,
                direction: direction,
                walkIndex: walkIndex,
                spriteLocation: getSpriteLocation(direction, walkIndex)
            }
        })
    }

    function attemptMove(direction) {
        const oldPos = store.getState().player.position
        const newPos = getNewPosition(oldPos, direction)
        if(observeBoundaries(oldPos, newPos) && observeImpassable(oldPos, newPos)) {
            if(!observeAction(oldPos, newPos)) {
                hideModal()
                dispatchMove(direction, newPos)
            }
        }
    }
    


    function handleKeyDown(e) {
        e.preventDefault()

        switch(e.keyCode) {
            case 37:
                return attemptMove('WEST')

            case 38:
                return attemptMove('NORTH')

            case 39:
                return attemptMove('EAST')

            case 40:
                return attemptMove('SOUTH')

            default:
                console.log(e.keyCode)
        }
    }

    window.addEventListener('keydown', (e) => {
        handleKeyDown(e)
    })

    return player
}