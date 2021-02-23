import {useState} from "react"

// maxSteps equals the maximum number of steps in sprite animation (3)
export default function useWalk(maxSteps){
    const [position, setPosition] = useState({x: 0, y:0})
    const [dir, setDir] = useState(0)
    const[ step, setStep] = useState(0)

    const directions ={
        down: 0,
        left: 1,
        right: 2,
        up: 3,
 
    };

    const stepSize = 8

    const modifier = {
        down: {x:0, y: stepSize},
        left: {x : -stepSize, y:0 },
        right: {x: stepSize, y:0 },
        up: {x: 0, y: -stepSize}
    }
    
    function walk(dir){
       
        if (!directions.hasOwnProperty(dir)) return
        setDir((prev)=> {
            if(directions[dir] === prev) move(dir)
            return directions[dir]
        })
        setStep(prev => prev < maxSteps - 1 ? prev + 1: 0)
    }
    function move(dir){
        setPosition((prev) => ({
            x: prev.x + modifier[dir].x,
            y: prev.y + modifier[dir].y
        }))
    }

    // function observeBoundaries(oldPos, newPos) {
    //     return (newPos[0] >= 0 && newPos[0] <= MAP_WIDTH - SPRITE_SIZE) &&
    //     (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE)
        
    // }  

    // function attemptMove(direction) {
    //     const oldPos = store.getState().player.position
    //     const newPos = getNewPosition(oldPos, direction)
    //     if(observeBoundaries(oldPos, newPos) && observeImpassable(oldPos, newPos)) {
    //         if(!observeAction(oldPos, newPos)) {
    //             dispatchMove(direction, newPos)
    //         }
    //     }
    // }

    return {
        walk, 
        dir, 
        step, 
        position,
    }
}