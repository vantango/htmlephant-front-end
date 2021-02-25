// Dependencies
const axios = require("axios")

// Deployed API URL
const URL_PREFIX = "https://vast-oasis-70689.herokuapp.com/"

// Algo API calls
const API = {

    // Algorithms
    allAlgo: () => {
        return axios.post(`${URL_PREFIX}/api/algo`)
    },
    randomAlgo: () => {
        return axios.post(`${URL_PREFIX}/api/random`)
    },
    easyAlgo: () => {
        return axios.post(`${URL_PREFIX}/api/easy`)
    },
    medAlgo: () => {
        return axios.post(`${URL_PREFIX}/api/medium`)
    },
    hardAlgo: () => {
        return axios.post(`${URL_PREFIX}/api/hard`)
    },
}

export default API;