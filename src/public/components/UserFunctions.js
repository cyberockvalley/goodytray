import {ERROR_NET_UNKNOWN, API_ROOT, LOGIN_SPAN_IN_SECONDS} from "../../../Constants"
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser');
const browser = require("../utils/Browser");

export const register = function(newUser) {
    return browser.axios.post( API_ROOT + "users/register", {
        username: newUser.username,
        email: newUser.email,
        number: newUser.number,
        password: newUser.password,
        fullname: newUser.fullname
    })
    .then(function(res) {
        return res.data
    })
    .catch(err => {
        return {message: ERROR_NET_UNKNOWN}
    })
}

export const login = function(user) {
    return browser.axios.post(API_ROOT + "users/login", {
        email: user.email,
        password: user.password
    })
    .then(function(res) {
        return res.data
    })
    .catch(function(err) {
        return {message: ERROR_NET_UNKNOWN}
    })
}

export const logOut = (req, res, next) => {
    if(req.method.toLowerCase() == "post" && req.body.log_out == "ok") {
        console.log("GOT LG")
        res.cookie('login_token', "out", {
            signed : true, 
            maxAge: LOGIN_SPAN_IN_SECONDS,
            httpOnly: true
        })
        res.redirect("/login")
        
    } else {console.log("GOT NOT LG URL", req.path, req.url, req.method.toLowerCase(), req.body.log_out)}
    next()
}

export const uploadProduct = function(product) {
    if(!localStorage.usertoken) {
        return {status_code: 7, message: "Please login first"}

    } else {
        return browser.axios.post(API_ROOT + "products/upload", {
            category: product.category,
            sub_category: product.sub_category,
        })
        .then(function(res) {
            return res.data
        })
        .catch(function(err) {
            console.log(err)
        })
    }
}

export const getUser = function(idOrEmail) {
    console.log("getUser", idOrEmail)
    return browser.axios.get(API_ROOT + "users?id="+idOrEmail)
    .then(res => {console.log("getUser", idOrEmail, res.data)
        return res.data
    })
    .catch(err => {console.log("getUser", idOrEmail, err)
        return idOrEmail+err
    })
}

export const getProduct = function(id) {
    return browser.axios.get(API_ROOT + "products/details?id="+id)
    .then(res => {
        return res.data
    })
    .catch(err => {
        return null
    })
}

export const checkUserAuth = function(req, res, next) {
    const locals = {req: JSON.stringify(req.signedCookies), token_user: null, message: null, last_product_cat_id: null}
    if(req.headers || req.signedCookies.login_token || req.cookies.last_product_cat_id || req.signedCookies.last_product_cat_id) {
        
        //last_product_cat_id from header or cookie
        if(req.headers.last_product_cat_id) {
            locals.last_product_cat_id = req.headers.last_product_cat_id
        } else if(req.cookies.last_product_cat_id || req.signedCookies.last_product_cat_id) {
            const unsigned_last_product_cat_id = cookieParser.signedCookie(
                req.cookies.last_product_cat_id 
                || 
                req.signedCookies.last_product_cat_id, 

                process.env.COOKIES_SECRET_KEY)
            if(unsigned_last_product_cat_id) {
                locals.last_product_cat_id = unsigned_last_product_cat_id
            }

        }
        
        //login token from header or cookie
        if(req.headers.authorization) {console.log("TOKEN_USER", "req.headers.authorization", req.headers.authorization)
            //from header(Authorization: Bearer jwt_token_string).
            //when we split the authorization(nodejs convert to header keys to lowercase automatically) 
            // header value, the string "Bearer will be at the 0 index while the token will be at 1"
            var auth = req.headers.authorization
            auth = auth.split(' ')[1]
            var decoded
            try {
                decoded = jwt.verify(auth, process.env.SECRET_KEY)
                //decoded.id = 930
                getUser(decoded.id)
                .then(data => {
                    locals.token_user = data.user
                    res.locals = locals
                    next()
                }).catch(err => {
                    locals.token_user = null
                    res.locals = locals
                    next()
                })
    
            } catch(e) {
                locals.message = "invalid auth"
                res.locals = locals
                next()
            }

        } else if(req.signedCookies.login_token) {console.log("TOKEN_USER", "req.signedCookies.login_token", req.signedCookies.login_token)
            const unsigned_login_token = cookieParser.signedCookie(req.signedCookies.login_token, 
                process.env.COOKIES_SECRET_KEY)

            if(!unsigned_login_token) {console.log("TOKEN_USER", "invalid auth on signed token")
                locals.message = "invalid auth on signed token"
                res.locals = locals
                next()

            } else {
                var decoded
                try {
                    decoded = jwt.verify(unsigned_login_token, process.env.SECRET_KEY)
                    //decoded.id = 930
                    getUser(decoded.id)
                    .then(data => {console.log("TOKEN_USER", "then", decoded.id, data.user)
                        locals.token_user = data.user
                        res.locals = locals
                        next()
                    }).catch(err => {console.log("TOKEN_USER", "thenCatch", err)
                        locals.token_user = null
                        res.locals = locals
                        next()
                    })
    
                } catch(e) {console.log("TOKEN_USER", "catch", e)
                    locals.message = "invalid auth on unsigned token"
                    res.locals = locals
                    next()
                }
            }
        } else {
            console.log("TOKEN_USER", "req.login_token", "No token")
            locals.message = "No token"
            res.locals = locals
            next()
        }
        

    } else {
        locals.message = "No token"
        res.locals = locals
        next()
    }
}