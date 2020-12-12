const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("../models/User")
const Sequelize = require("sequelize")
const Op = Sequelize.Op

const fileUploader = require("../utils/FileUploader")

users.use(cors())
import {isValidEmail, isValidNumber, jsonEmpty} from "../utils/Funcs"
import {ERROR_DB_OP, getText, LOGIN_SPAN_IN_SECONDS, USERS_PHOTOS_CLIENT_DIR, USERS_PHOTOS_SERVER_DIR} from "../../../Constants"
import {checkUserAuth} from "../components/UserFunctions"

import fs from "fs"

//import { constants } from "fs"

const validOnReg = 0
//register
users.post("/register", function(req, res) {
    const today = new Date()
    const userData = {
        email: req.body.email == null? "" : req.body.email.trim().toLowerCase(),
        password: req.body.password == null? "" : req.body.password.trim(),
        number: req.body.number == null? "" : req.body.number.trim(),
        fullname: req.body.fullname == null? "" : req.body.fullname.trim(),
        created: today,
        var_key: "verkey",
        validated: validOnReg
    }

    const form_errors = {}
    if(!isValidEmail(userData.email)) {
        form_errors.email_error = getText("PLS_ENTER_VALID_EMAIL")
    }
    if(!isValidNumber(userData.number)) {
        form_errors.number_error = getText("PLS_ENTER_VALID_PHONE_NUMBER")
    }
    if(userData.fullname.length < 2) {
        form_errors.fullname_error = getText("PLS_ENTER_FULLNAME")
    }
    if(userData.password.length == 0) {
        form_errors.password_error = getText("ERROR_ENTER_PWD")

    } else if(userData.password.length < 6) {
        form_errors.password_error = getText("SHORT_PWD")
    }

    
    if(form_errors.email_error == null) {
        User.findOne({
            where: {
                email: userData.email
            }
    
        }).then(function(user) {
            if(!user) {
                if(!jsonEmpty(form_errors)) {
                    res.json({status: 0, message: null, login_token: null, form_errors: form_errors})

                } else {
                    bcrypt.hash(userData.password, 10, function(err, hash) {
                        userData.password = hash
                        User.create(userData)
                        .then(function(user) {
                            var message
                            var token

                            //send email verification link here
                            message = getText("REG_OK")
                            token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {
                                expiresIn: "7d"
                            })
                            res.cookie('login_token', token, {
                                signed : true, 
                                maxAge: LOGIN_SPAN_IN_SECONDS * 1000,
                                httpOnly: true
                            })
                            res.json({status: 1, message: message, login_token: token, form_errors: null})
                        })
                        .catch(function(err) {
                            console.log("REG_ERROR: "+err)
                            res.status(400).json({status: 0, message: ERROR_DB_OP, login_token: null, form_errors: null})
                        })
                    })
                }
    
            } else {
                form_errors.email_error = getText("EMAIL_USED")
                res.json({status: 0, message: null, login_token: null, form_errors: form_errors})
            }
        })
        .catch(function(err) {
            console.log("REG_ERROR_CHECK_EMAIL: "+err)
            res.status(400).json({status: 0, message: ERROR_DB_OP, login_token: null, form_errors: null})
        })

    } else {
        res.json({status: 0, message: null, login_token: null, form_errors: form_errors})
    }
})

//login
users.post("/login", function(req, res) {
    const userData = {
        email: req.body.email == null? "" : req.body.email.trim().toLowerCase(),
        password: req.body.password == null? "" : req.body.password.trim()
    }
    const form_errors = {}
    if(userData.email.length == 0) {
        form_errors.email_error = getText("ENTER_EMAIL")
    }
    if(userData.password.length == 0) {
        form_errors.password_error = getText("ERROR_ENTER_PWD")
    }

    if(jsonEmpty(form_errors)) {
        User.findOne({
            where: {
                email: userData.email
            }
        })
        .then(function(user) {
            if(user) {
                if(bcrypt.compareSync(userData.password.trim(), user.password)) {
                    let token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {
                        expiresIn: "7d"
                    })
                    res.cookie('login_token', token, {
                        signed : true, 
                        maxAge: LOGIN_SPAN_IN_SECONDS * 1000,
                        httpOnly: true
                    })
                    res.json({status: 1, message: null, login_token: token, form_errors: null})
    
                } else {
                    form_errors.password_error = getText("WRONG_LOGIN_DATA")
                    res.json({status: 0, message: null, login_token: null, form_errors: form_errors})
                }

            } else {
                form_errors.password_error = getText("WRONG_LOGIN_DATA")
                res.json({status: 0, message: null, login_token: null, form_errors: form_errors})
            }
        })
        .catch(function(err) {
            res.status(400).json({status: 0, message: ERROR_DB_OP+err, login_token: null, form_errors: form_errors})
        })

    } else {
        res.json({status: 0, message: null, login_token: null, form_errors: form_errors})
    }
})

users.use(["/update_password", "/update_profile"], checkUserAuth)
users.post("/update_password", (req, res) => {
    if(!res.locals.token_user) {
        res.json({success: false, auth_required: true})

    } else {
        var errors = {}
        var hasErrors = false
        if(!req.body.new_password || req.body.new_password.length == 0) {
            errors.new_password = getText("PLS_ENTER_NEW_PWD")

        } else if(req.body.new_password.length < 6) {
            errors.new_password = getText("NEW_PWD_SHORT")

        }
        if(!req.body.password || req.body.password.length == 0) {
            errors.password = getText("ERROR_ENTER_PWD")
        } 
        if(hasErrors) {
            res.json({success: false, errors: errors})

        } else {
            User.findOne({
                where: {
                    id: res.locals.token_user.id
                }
            })
            .then(user => {
                if(user) {
                    if(!bcrypt.compareSync(req.body.password.trim(), user.password)) {
                        errors.password = getText("WRONG_PWD")
                        res.json({success: false, errors: errors})

                    } else {
                        bcrypt.hash(req.body.new_password, 10, function(err, hash) {
                            user.update({password: hash})
                            .then(function(user) {
                                res.json({success: true})
                            })
                            .catch(function(err) {
                                res.status(400).json({success: false, error: ERROR_DB_OP+"_ERR0R 1_"+err})
                            })
                        })
                    }
    
                } else {
                    res.json({success: false, auth_required: true})
                }
            })
            .catch(error => {
                res.json({success: false, error: ERROR_DB_OP+error})
            })
        }
        
    }
})
users.post("/update_profile", (req, res) => {
    if(!res.locals.token_user) {
        res.json({success: false, auth_required: true})

    } else {
        const data = {}
        var fullname = req.body.fullname
        var number = req.body.number
        if(fullname && fullname.length > 0) {
            data.fullname = fullname
        }
        if(number && number.length > 0) {
            data.number = number
        }
        User.findOne({
            where: {
                id: res.locals.token_user.id
            }
        })
        .then(user => {
            if(user) {
                user.update(data)
                res.json({success: true})

            } else {
                res.json({success: false, auth_required})
            }
        })
        .catch(err => {
            res.json({success: false, error: ERROR_DB_OP})
        })
    }
})

users.post("/logout", (req, res) => {
    res.cookie('login_token', "out", {
        signed : true, 
        maxAge: new Date() - LOGIN_SPAN_IN_SECONDS,
        httpOnly: true
    })
    res.json({link: '/', b: JSON.stringify(req.body)})
})

//userdata
users.get("/", (req, res) => {
    var id = req.query.id;
    if(id == null) {
        res.status(400).json({user: null, error: "Bad request"})

    } else {
        id = decodeURIComponent(id)
        User.findOne({
            where: {
                [Op.or]: [{id: {[Op.eq]: id}}, {email: {[Op.eq]: id}}]
            }, 
            attributes: {
                exclude: ['password', 'cookie', 'cookie_exp', 'validated', 'ver_key']
            }
        })
        .then(user => {
            if(user) {
                res.status(200).json({user: user, error: null})

            } else {
                res.status(404).json({user: null, error: "not found"})
            }
        })
        .catch(error => {
            console.log(req.url + " error: " + error)
            res.status(500).json({user: null, error: ERROR_DB_OP})
        })
    }
})

users.post("/mail-key", (req, res) => {
    const allowed_type = ["email_ver", "password_reset"]
    const type = req.query.type
    const email = req.body.email
    if(allowed_type.includes(type)) {
        res.status(400).json({message: getText("INVALID_TYPE"), status: 0})

    } else {

    }
})

users.post("/upload/profile-photo", checkUserAuth, (req, res) => {
    if(!res.locals.token_user) {
        res.redirect("/login")

    } else {
        const uploader = fileUploader.singleUserUpload('photo')
        uploader(req, res, err => {
            if (err instanceof fileUploader.MULTER_ERROR) {
                return res.status(200).json({status: err.code == "LIMIT_FILE_SIZE"?3:0, message: err.message})
            } else if (err) {
                return res.status(200).json({status: 0, message: err})
            }
            const filePath = USERS_PHOTOS_CLIENT_DIR + req.file.filename
            User.findOne({
                where: {
                    id: res.locals.token_user.id
                }
            })
            .then(user => {
                if(user) {
                    const old_photo = user.profile_photo
                    user.update({profile_photo: filePath})
                    .then(user => {
                        if(old_photo.length > 0) {
                            //delete previous photo
                            const deletePath = USERS_PHOTOS_SERVER_DIR + "/" + old_photo.split("/")[old_photo.split("/").length - 1]
                            try {
                                fs.unlinkSync(deletePath)
                                return res.status(200).json({status: 1, message: getText("UPLOAD_OK")})

                            } catch(e) {
                                return res.status(200).json({status: 1, message: getText("UPLOAD_OK")})
                            }

                        } else {
                            return res.status(200).json({status: 1, message: getText("UPLOAD_OK")})
                        }
                    })
                    .catch(e => {
                        return res.status(200).json({status: 0, message: ERROR_DB_OP})
                    })

                } else {
                    return res.status(200).json({status: 0, message: getText("UPLOAD_FAILED")})
                }
            })
            .catch(e => {
                return res.status(200).json({status: 0, message: ERROR_DB_OP})
            })
        })
    }
})

module.exports = users