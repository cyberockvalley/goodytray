const express = require("express")
const notifications = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const Message = require("../models/Message")
const Review = require("../models/Review")
const User = require("../models/User")
const Product = require("../models/Product")

notifications.use(cors())

import {checkUserAuth} from "../components/UserFunctions"
import { DISTINCNT_MESSAGES_PER_HOUR, ERROR_DB_OP, REVIEWS_PER_PAGE } from "../../../Constants"
import { userDetails } from "../utils/ExpressFunc"
import { rootResponse } from "../utils/ResponseTemplates"
import { okResponse, intOrMin, buildError, returnServerError } from "../utils/Funcs"
import DatabaseCursor from "../objects/DatabaseCursor"
const db = require("../database/db")
const Sequelize = require("sequelize")

notifications.use(checkUserAuth)

notifications.get("/", (req, res) => {
    var result = rootResponse()
    if(!res.locals.token_user) {
        result.auth_required = true
        result.total = 0
        okResponse(res, result)

    } else {
        const user = res.locals.token_user
        var page = intOrMin(req.query.page, 1)
        var cursor = new DatabaseCursor(page, REVIEWS_PER_PAGE)
        db.sequelize.query(`
        SELECT reviews.id, reviews.user_id from_id, users.fullname from_name, users.profile_photo from_photo,
        UNIX_TIMESTAMP(reviews.created) time, 0 reference_type, products.id reference_id, products.title reference_title, products.photos reference_photos,
        reviews.body message FROM reviews
        JOIN products ON products.id = reviews.product_id
        JOIN users ON users.id = reviews.user_id WHERE products.user_id = ?
        ORDER BY reviews.id DESC LIMIT ?, ?`, {  
            replacements: [user.id, cursor.offset, cursor.limit],
            raw: false, 
            type: Sequelize.QueryTypes.SELECT
        })
        .then(results => {
            result = cursor.getResult(results)
            if(result.list.length > 0) {
                var minId = Number.POSITIVE_INFINITY
                var maxId = Number.NEGATIVE_INFINITY
                for(var i = 0; i < result.list.length; i++) {
                    if(result.list[i].id < minId) minId = result.list[i].id
                    if(result.list[i].id > maxId) maxId = result.list[i].id
                }
                db.sequelize.query(`
                UPDATE reviews r JOIN products p ON (p.id = r.product_id) 
                SET r.seen = 1 WHERE r.id >= ? AND r.id <= ? AND p.user_id = ?
                `, {
                    replacements: [minId, maxId, user.id]
                })
            }
            okResponse(res, result)
        })
        .catch( e=> {
            result.error = buildError("/notifications"+page, e, ERROR_DB_OP)
            returnServerError(res, result)
        })
    }
})
notifications.get("/new/count", (req, res) => {
    if(!res.locals.token_user) {
        res.json({success: false, auth_required: true, total: 0})

    } else {
        const user = res.locals.token_user
        db.sequelize.query("SELECT COUNT(reviews.id) count FROM reviews LEFT JOIN products ON products.id = reviews.product_id WHERE reviews.seen = 0 AND products.user_id = ?", {  
            replacements: [user.id],
            raw: false, 
            type: Sequelize.QueryTypes.SELECT
        })
        .then(total => {
            res.status(200).json({success: true, total: total[0].count})
        })
        .catch( e=> {
            res.status(503).json({success: false, error: ERROR_DB_OP, total: 0})
        })
    }
})

module.exports = notifications
