const express = require("express")
const attrs = express.Router()
const cors = require("cors")
import { logger } from "../utils/Funcs"
//logger.disableLogger()
const Attr = require("../models/Attr")
attrs.use(cors())
const Sequelize = require("sequelize")
const Op = Sequelize.Op

import {ERROR_DB_OP, getText} from "../../../Constants"

const db = require("../database/db")

//get attrs
attrs.get("/", function(req, res) {
    const id = req.query.scid
    if(!id) {
        res.json({attrs: null, message: getText("API_NO_DATA_KEY_PROVIDED")})

    } else {
        db.sequelize.query("SELECT DISTINCT * from attrs WHERE sub_cat_id = ? ORDER BY attr_key, attr_value ASC ", {
            replacements: [id],
            raw: false, 
            type: Sequelize.QueryTypes.SELECT,
            model: Attr,
            mapToModel: true
        })
        .then(result => {
            if(result.length == 0) {
                res.json({attrs: null, message: getText("NO_REZ_FOUND")})
            } else {
                const final_result = []
                var i = 0;
                var currentKey = null
                var currentValues = []
                var currentInputType = null
                var currentNullAllow = false
                while(i < result.length) {
                    if(currentKey != null && currentKey != result[i].attr_key || i == result.length - 1) {
                        final_result.push({key: currentKey, values: currentValues, input_type: currentInputType, allow_null: currentNullAllow})
                        currentValues = []
                    }
                    currentKey = result[i].attr_key
                    currentValues.push(result[i].attr_value)
                    currentInputType = result[i].attr_type
                    currentNullAllow = result[i].allow_null == 1
                    i++
                }
                res.json({attrs: final_result, attrs2: result})
            }
        })
        .catch(error => {
            res.json({attrs: null, message: ERROR_DB_OP})
        })
    }
})

//get attrs details
attrs.get("/details", function(req, res) {
    const id = req.query.id
    if(!id) {
        res.json({details: null, message: getText("API_NO_DATA_KEY_PROVIDED")})

    } else {
        Attr.findOne({
            where: {
                id: id
            }
        }).then((product) => {
            res.json({details: product})
        })
        .catch((error) => {
            res.json({details: null, message: getText("API_LIST_ERROR")})
        })
    }
})

module.exports = attrs