const express = require("express")
const reviews = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const Review = require("../models/Review")
const Product = require("../models/Product")
const User = require("../models/User")

reviews.use(cors())

import {checkUserAuth} from "../components/UserFunctions"
import { REVIEWS_PER_HOUR, ERROR_DB_OP, REVIEWS_PER_PAGE } from "../../../Constants"
import { userDetails } from "../utils/ExpressFunc"
import { intOrMin, buildError, okResponse, userFromRes, returnServerError } from "../utils/Funcs"
import DatabaseCursor from "../objects/DatabaseCursor"
import { rootResponse } from "../utils/ResponseTemplates"
const db = require("../database/db")
const Sequelize = require("sequelize")

reviews.get("/:id", (req, res) => {
    var result = rootResponse();
    var productId = intOrMin(req.params.id, -1)
    if(productId < 0) {
        result.error = "Invalid product"
        okResponse(res, result)
    }
    var count_only = intOrMin(req.query.count_only, 0)
    var query = (
        count_only > 0? 
        `SELECT COUNT(reviews.id) total` : 
        `SELECT reviews.*, users.fullname as fullname, users.profile_photo as profile_photo`
        ) 
    var reps = []
    if(count_only > 0) {
        query += ` FROM reviews WHERE product_id = ?`
        reps.push(productId)

    } else {
        query += ` FROM reviews, users WHERE product_id = ? 
        AND users.id = reviews.user_id`
        reps.push(productId)
    }

    var page = intOrMin(req.query.page, 1)
    var cursor = new DatabaseCursor(page, REVIEWS_PER_PAGE)

    var reviewType = intOrMin(req.query.type, -2)
    const allowed_review_type = [-1, 0, 1, 2]
    if(!allowed_review_type.includes(reviewType)) {
        query += " ORDER BY reviews.id DESC LIMIT ?, ?"
        reps.push(cursor.offset, cursor.limit)

    } else {
        query += " AND weight = ? ORDER BY reviews.id DESC LIMIT ?, ?"
        reps.push(reviewType, cursor.offset, cursor.limit)
    }

    db.sequelize.query(query, {
        replacements: reps
    })
    .then(results => {
        if(count_only > 0) {
            result.total = results[0][0].total
            okResponse(res, result)

        } else {
            result = cursor.getResult(results[0])
            okResponse(res, result)
        }
    })
    .catch(e => {
        var result = rootResponse()
        result.error = buildError("/"+productId, e, ERROR_DB_OP)
        returnServerError(res, result)
    })

})
reviews.post("/create", checkUserAuth, (req, res) => {
    const user = userFromRes(res)
    const result = rootResponse()
    if(!user) {
        result.auth_required = true
        okResponse(res, result)

    } else {
        const weights = [1, 0, -1]
        const experiences = [0, 1, 2, 3, 4]
        const payload = {created: new Date(), user_id: user.id}
        payload.product_id = intOrMin(req.body.product_id, -1)
        payload.weight = intOrMin(req.body.weight, -2)
        payload.experience_id = intOrMin(req.body.experience_id, -1)
        payload.body = req.body.body
        

        if(
            payload.product_id < 0 || 
            !weights.includes(payload.weight) ||
            !experiences.includes(payload.experience_id) || 
            !payload.body || payload.body.length < 5
            ) {
            result.error = "Input error!"
            okResponse(res, result)

        } else {
            //check if the user is spamming by checking the number of reviews 
            // made within an hour
            const dateAgo = new Date()
            dateAgo.setHours(dateAgo.getHours() - 1)
            
            db.sequelize.query("SELECT COUNT(id) total_reviews FROM reviews WHERE user_id = ? AND created >= ?", {
                replacements: [user.id, dateAgo],
                raw: false, 
                type: Sequelize.QueryTypes.SELECT,
                model: Review,
                mapToModel: true
            })
            .then(review => {
                if(!review.total_reviews > REVIEWS_PER_HOUR) {
                    res.json({status: 0, error: "You are sending reviews too fast. Please try again later"})

                } else {
                    //get the product details
                    Product.findOne({
                        id: payload.product_id
                    })
                    .then(product => {
                        if(!product) {
                            result.error = "The product does not exist"
                            okResponse(res, result)

                        } else if(product.user_id == user.id) {
                            result.error = "You can't write a review on your product"
                            okResponse(res, result)

                        } else {
                            Review.create(payload)
                            .then(review => {
                                result.success = true
                                //result.review = review
                                okResponse(res, result)
                            })
                            .catch(e => {
                                result.error = buildError("/create", e, ERROR_DB_OP)
                                returnServerError(res, result)
                            })
                        }
                    })
                    .catch(e => {
                        result.error = buildError("/create", e, ERROR_DB_OP)
                        returnServerError(res, result)
                    })
                }
            })
        }
    }
})

module.exports = reviews