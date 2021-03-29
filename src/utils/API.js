// Dependencies
const axios = require("axios");

// Deployed API URL
const URL_PREFIX = "https://vast-oasis-70689.herokuapp.com"

// API calls
const API = {
    allAlgo: () => {
        return axios.get(`${URL_PREFIX}/api/algo`)
    },
    randomAlgo: () => {
        return axios.get(`${URL_PREFIX}/api/random`)
    },
    hardAlgo: () => {
        return axios.get(`${URL_PREFIX}/api/hard`)
    },
    medAlgo: () => {
        return axios.get(`${URL_PREFIX}/api/medium`)
    },
    easyAlgo: () => {
        return axios.get(`${URL_PREFIX}/api/easy`)
    },
    allNPC: () => {
        return axios.get(`${URL_PREFIX}/api/npc`)
    },
    getVip: token => {
        return axios.get(`${URL_PREFIX}/vip`, {
            headers: {
                authorization: `Bearer: ${token}`
            }
        })
    },
    signup: userData => {
        return axios.post(`${URL_PREFIX}/signup`, userData)
    },
    login: userData => {
        return axios.post(`${URL_PREFIX}/login`, userData)
    },
    // Increment level by 1, set health to 3 and keys to 0
    levelUp: (id, token) => {
        return axios.put(`${URL_PREFIX}/levelup/${id}`, {
            headers: {
                authorization: `Bearer: ${token}`
            }
        })
    },
    // Decrement level by 1, set health to 3 and keys to 0
    levelDown: (id, token) => {
        return axios.put(`${URL_PREFIX}/leveldown/${id}`, {
            headers: {
                authorization: `Bearer: ${token}`
            }
        })
    },
    // Set health to 3 and keys to 0, keep existing level
    resetLevel: (id, token) => {
        return axios.put(`${URL_PREFIX}/reset/${id}`, {
            headers: {
                authorization: `Bearer: ${token}`
            }
        })
    },
    // Increment keys by 1, keep existing health and level
    addKey: (id, token) => {
        return axios.put(`${URL_PREFIX}/keyup/${id}`, {
            headers: {
                authorization: `Bearer: ${token}`
            }
        })
    },
    // Set keys to 0, keep existing health and level
    noKeys: (id, token) => {
        return axios.put(`${URL_PREFIX}/nokeys/${id}`, {
            headers: {
                authorization: `Bearer: ${token}`
            }
        })
    },
    // Switch character to cat
    playAsCat: username => {
        return axios.put(`${URL_PREFIX}/switchtocat/${username}`)
    },
    // Switch character to manatee
    playAsManatee: username => {
        return axios.put(`${URL_PREFIX}/switchtomanatee/${username}`)
    },
    // Decrement health by 1, keep existing keys and level
    healthDown: (id, token) => {
        return axios.put(`${URL_PREFIX}/healthdown/${id}`, {
            headers: {
                authorization: `Bearer: ${token}`
            }
        })
    }

}

export default API;