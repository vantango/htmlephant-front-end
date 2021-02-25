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
    signup: userData => {
        return axios.post(`${URL_PREFIX}/signup`, userData)
    }
}

export default API;