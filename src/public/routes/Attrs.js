const express = require("express")
const attrs = express.Router()
const cors = require("cors")
import { logger } from "../utils/Funcs"
//logger.disableLogger()
const Attr = require("../models/Attr")
attrs.use(cors())
const Sequelize = require("sequelize")
const Op = Sequelize.Op

import {ERROR_DB_OP, getDatabaseTranslatedColumnName, getText} from "../../../Constants"

const db = require("../database/db")

//get attrs
attrs.get("/", function(req, res) {
    const id = req.query.scid
    if(!id) {
        res.json({attrs: null, message: getText("API_NO_DATA_KEY_PROVIDED")})

    } else {
        const attr_key_locale = getDatabaseTranslatedColumnName("attr_key")
        const attr_value_locale = getDatabaseTranslatedColumnName("attr_value")
        db.sequelize.query(`SELECT attrs.id, attrs.attr_type, attrs.cat_id, attrs.sub_cat_id, attrs.${attr_key_locale} as attr_key, attrs.${attr_value_locale} as attr_value FROM attrs WHERE sub_cat_id = ? ORDER BY attrs.${attr_key_locale}, attrs.${attr_value_locale} ASC `, {
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
                const finalResult = []
                const keyMap = {}//attr_key to array pos
                for(var i = 0; i < result.length; i++) {
                    var key = result[i].attr_key
                    var value = result[i].attr_value
                    var attrIndex = keyMap[key]
                    if(finalResult[attrIndex]) {
                        finalResult[attrIndex].values.push(value)

                    } else {
                        var item = {}
                        item.key = key
                        item.values = [value]
                        item.allow_null = result[i].allow_null == 1? true : false
                        item.input_type = result[i].attr_type
                        var index = finalResult.push(item)
                        keyMap[key] = index - 1
                    }
                }
                
                res.json({attrs: finalResult})
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