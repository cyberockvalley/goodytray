import axios from "axios"
const https = require("https")
import {SERVER_ADDR} from "../../../Constants"
const browser = {}

const axiosBrowser = axios.create({
    baseURL: SERVER_ADDR,
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false,
    })
})
browser.axios = axiosBrowser

module.exports = browser