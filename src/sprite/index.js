import React from "react"
export default function Sprite ({ image, data }){
    const {y, x, h, w} = data;
    return (
        <div
            style = {{
                display: "inline-block",
                height: `${h}px`,
                width: `${w}px`,
                backgroundImage: `url(${image})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: `-${x}px -${y}px`
            }}
        />
    )
}