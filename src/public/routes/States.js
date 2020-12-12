const express = require("express")
const states = express.Router()
const cors = require("cors")

const State = require("../models/State")
const { getText } = require("../../../Constants")
states.use(cors())

//get states
states.get("/", function(req, res) {
    const id = req.query.cid
    if(!id) {
        res.json({states: null, message: getText("API_NO_DATA_KEY_PROVIDED")})

    } else {
        State.findAll({
            where: {
                country_id: id
            },
            order: [
                ['name', 'ASC']
            ]
        }).then(states => {
            res.json({states: states})
        })
        .catch((error) => {
            res.json({states: null, message: getText("API_LIST_ERROR")})
        })
    }
})

//get states details
states.get("/details", function(req, res) {
    const id = req.query.id
    if(!id) {
        res.json({details: null, message: getText("API_NO_DATA_KEY_PROVIDED")})

    } else {
        State.findOne({
            where: {
                id: id
            }
        }).then((details) => {
            res.json({details: details})
        })
        .catch((error) => {
            res.json({details: null, message: getText("API_LIST_ERROR")})
        })
    }
})

module.exports = states