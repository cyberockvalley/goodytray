const express = require("express")
const cats = express.Router()
const cors = require("cors")

const Cat = require("../models/Cat")
cats.use(cors())
const Sequelize = require("sequelize")
const Op = Sequelize.Op
const db = require("../database/db")

import {CAT_ID_FLASH_AD, ERROR_DB_OP, getText} from "../../../Constants"

//get cats
cats.get("/", function(req, res) {
    Cat.findAll({
        where: {
            id: {[Op.ne]: CAT_ID_FLASH_AD}
        },
        order: [
            ['weight', 'DESC'],
            ['name', 'ASC']
        ]
    })
    .then(cats => {
        res.json({cats: cats})
    })
    .catch(error => {
        res.json({cats: null, message: ERROR_DB_OP, error: error})
    })
})


//get cats details
cats.get("/details", function(req, res) {
    const id = req.query.id
    if(!id) {
        res.json({details: null, message: getText("API_NO_DATA_KEY_PROVIDED")})

    } else {
        Cat.findOne({
            where: {
                id: id
            }
        }).then((product) => {
            res.json({details: product})
        })
        .catch((error) => {
            res.json({details: null, message: etText("API_LIST_ERROR", "An error occurred while trying to get the list")})
        })
    }
})

module.exports = cats