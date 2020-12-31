const express = require("express")
const messages = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const Message = require("../models/Message")
const User = require("../models/User")

messages.use(cors())

import {checkUserAuth} from "../components/UserFunctions"
import { DISTINCNT_MESSAGES_PER_HOUR, ERROR_DB_OP, getText } from "../../../Constants"
import { userDetails } from "../utils/ExpressFunc"
const db = require("../database/db")
const Sequelize = require("sequelize")

messages.use(checkUserAuth)

messages.get("/new/count", (req, res) => {
    if(!res.locals.token_user) {
        res.json({success: false, auth_required: true, total: 0})

    } else {
        const user = res.locals.token_user
        Message.count({
            where: {
                to_id: user.id,
                seen: 0
            }
        })
        .then(total => {
            res.status(200).json({success: true, total: total})
        })
        .catch( e=> {
            res.status(503).json({success: false, error: ERROR_DB_OP, total: 0})
        })
    }
})

messages.get("/threads", (req, res) => {
    const page = req.query.page && !isNaN(parseInt(req.query.page))? req.query.page : 1
    const rowsPerPage = 20
    var hasNext = false, hasPrev = false
    if(!res.locals.token_user) {
        res.json({success: false, auth_required: true})

    } else {
        const user = res.locals.token_user
        const offset = (page - 1) * rowsPerPage
        db.sequelize.query(`
        SELECT m.*, products.title as product_title, products.price as product_price, products.currency_symbol as product_currency_symbol, products.photos product_photos FROM (SELECT messages.*,  
            users.id as user_id,
            users.number as user_number, 
            users.profile_photo as user_photo, 
            users.fullname as user_fullname 
            FROM messages, users 
            WHERE messages.from_id = ? AND users.id = messages.to_id OR messages.to_id = ? 
            AND users.id = messages.from_id 
            ORDER BY messages.id DESC LIMIT 0, 1000000000) m LEFT JOIN products ON products.id = m.product_id GROUP BY m.thread_id ORDER BY m.id DESC LIMIT ?, ?`, {
            replacements: [user.id, user.id, offset, rowsPerPage],
            raw: false,
            type: Sequelize.QueryTypes.SELECT,
            model: Message,
            mapToModel: false
        })
        .then(data => {
            if(!data) {
                res.status(200).json({success: false, list: []})

            } else {
                res.status(200).json({success: true, list: data})
            }
        })
        .catch(e => {
            res.status(503).json({success: false, list: [], error: e})
        })
    }

})

messages.get("/threads/:thread_id", (req, res) => {
    var threadId = req.params.thread_id && !isNaN(parseInt(req.params.thread_id))? req.params.thread_id : -1
    if(threadId < 0) {
        res.json({success: false, error: getText("NO_CHAT_SPECIFIED")})
        return
    }
    if(!res.locals.token_user) {
        res.json({success: false, auth_required: true})

    } else {
        const user = res.locals.token_user
        const limit = 50
        db.sequelize.query("SELECT * FROM messages WHERE thread_id = ? AND to_id = ? OR thread_id = ? AND from_id = ? ORDER by id DESC LIMIT ?", {
            replacements: [threadId, user.id, threadId, user.id, limit],
            raw: false,
            type: Sequelize.QueryTypes.SELECT,
            model: Message,
            mapToModel: true
        })
        .then(data => {
            if(!data) {
                res.status(200).json({success: false, list: []})

            } else {
                Message.update({seen: 1}, {
                    where: {
                        thread_id: threadId,
                        to_id: user.id
                    }
                })
                res.status(200).json({success: true, list: data.reverse()})
            }
        })
        .catch(e => {
            res.status(503).json({success: false, list: [], error: ERROR_DB_OP})
        })
    }


})

messages.post("/delete", (req, res) => {
    if(!res.locals.token_user) {
        res.json({success: false, auth_required: true})

    } else {
        const messagesIds = req.body.messages_ids
        if(messagesIds.length < 0) {
            res.json({success: false, error: getText("NO_MESSAGE_SPECIFIED")})

        } else {
            const user = res.locals.token_user
            Message.findAll({
                where: {
                    id: messagesIds
                }
            })
            .then(msgs => {
                var sanitised_ids = []
                if(msgs && msgs.length > 0) {
                    var l = msgs.length
                    for(var i = 0; i < msgs.length; i++) {
                        if(msgs[i].from_id == user.id || msgs[i].to_id == user.id) {
                            sanitised_ids.push(msgs[i].id)
                        }
                    }

                }
                if(sanitised_ids.length == 0) {
                    res.json({success: false, error: "Cool"})

                } else {
                    Message.destroy({
                        where: {
                            id: sanitised_ids
                        }
                    })
                    .then(result => {
                        res.json({success: true, error: JSON.stringify(result)})
                    })
                    .catch(e => {
                        res.status(503).json({success: false, error: 1 + ERROR_DB_OP})

                    })
                }
            })
            .catch(e => {
                res.status(503).json({success: false, error: ERROR_DB_OP})
            })
        }
    }
})

messages.post("/send", (req, res) => {
    if(!res.locals.token_user) {
        res.json({success: false, auth_required: true})

    } else {
        const user = res.locals.token_user
        if(!req.body.text || req.body.text.length == 0) {
            res.json({status: 0, message: getText("ENTER_MSG_BODY")})

        }

        if(!req.body.to_id || req.body.to_id < 0) {
            res.json({status: 0, message: getText("NO_RECEPIENT_PROVIDED")})

        } else if(user.id == parseInt(req.body.to_id)) {
            res.json({status: 0, message: getText("CANT_SEND_MSG_2_URSELF")})

        } else {
            //check if the user is spamming by checking the number of messages 
            // sent to different users within an hour
            const dateAgo = new Date()
            dateAgo.setHours(dateAgo.getHours() - 1)
            
            db.sequelize.query("SELECT COUNT(DISTINCT to_id) AS product_id from messages WHERE from_id = ? AND created >= ?", {
                replacements: [user.id, dateAgo],
                raw: false, 
                type: Sequelize.QueryTypes.SELECT,
                model: Message,
                mapToModel: true
            })
            .then(message => {
                if(!message.product_id > DISTINCNT_MESSAGES_PER_HOUR) {
                    res.json({status: 0, message: getText("MSG_MAX_RATE_REACHED")})

                } else {
                    //check if recipent exists
                    userDetails(req.body.to_id)
                    .then(recipient => {
                        if(!recipient || !recipient.user) {
                            res.json({status: 0, message: getText("RECIPIENT_DONT_EXIST")})
    
                        } else {
                            var productId = -1
                            if(req.body.product_id && !isNaN(parseInt(req.body.product_id)) && parseInt(req.body.product_id) > -1) {
                                productId = req.body.product_id
    
                            }
                            const messageData = {}
                            messageData.from_id = user.id
                            messageData.to_id = recipient.user.id
                            messageData.product_id = productId
                            messageData.body = req.body.text
                            messageData.thread_id = messageData.from_id < messageData.to_id?
                            messageData.from_id+":"+messageData.to_id
                            :
                            messageData.to_id+":"+messageData.from_id
                            messageData.created = new Date()
                            //res.json({status: 0, message: messageData});
                            Message.create(messageData)
                            .then(msg => {
                                res.json({status: 1, message: getText("MSG_SENT")})
                            })
                            .catch(err => {
                                res.json({status: 0, message: ERROR_DB_OP+"ZZ"})
                            })
                        }
                    })
                    .catch(e => {
                        res.json({status: 0, message: ERROR_DB_OP+"AA"})
                    })
                }
            })
            .catch(e => {
                res.json({status: 0, message: ERROR_DB_OP+"BB"})
            })
        }
    }
})

module.exports = messages