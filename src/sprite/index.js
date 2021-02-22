import React from "react"
export default function Sprite ({ image, data, position, style }){
    const {y, x, h, w} = data;
    return (
        <div
            style = {{
                ...style,
                position: "absolute",
                top: position.y,
                left: position.x,
                height: `${h}px`,
                width: `${w}px`,
                backgroundImage: `url(${image})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: `-${x}px -${y}px`
            }}
        />
    )
}