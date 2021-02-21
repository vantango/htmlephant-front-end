import {useEffect} from "react"

export default function useKeyPress (fn) {
    useEffect(() => {
        window.addEventListener("keydown", fn)
    }, [])
}