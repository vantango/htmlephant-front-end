// Dependencies
const axios = require("axios");

// Deployed API URL
const URL_PREFIX = "https://vast-oasis-70689.herokuapp.com"

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
    levelUp: (id, token) => {
        return axios.put(`${URL_PREFIX}/levelup/${id}`, {
            headers: {
                authorization: `Bearer: ${token}`
            }
        })
    },
    levelDown: (id, token) => {
        return axios.put(`${URL_PREFIX}/leveldown/${id}`, {
            headers: {
                authorization: `Bearer: ${token}`
            }
        })
    },
    resetLevel: (id, token) => {
        return axios.put(`${URL_PREFIX}/reset/${id}`, {
            headers: {
                authorization: `Bearer: ${token}`
            }
        })
    },
    playAsCat: username => {
        return axios.put(`${URL_PREFIX}/switchtocat/${username}`)
    },
    playAsManatee: username => {
        return axios.put(`${URL_PREFIX}/switchtomanatee/${username}`)
    },
    healthDown: (id, token) => {
        return axios.put(`${URL_PREFIX}/healthdown/${id}`, {
            headers: {
                authorization: `Bearer: ${token}`
            }
        })
    }

}

export default API;