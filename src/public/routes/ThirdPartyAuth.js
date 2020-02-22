import { LOGIN_SPAN_IN_SECONDS, SERVER_ADDR } from "../../../Constants"

export const THIRD_PARTY_AUTH_PATH = "/third_party_auth"

export const GOOGLE_LOGIN_CALL_BACK_PATH = "/google/callback"
export const FACEBOOK_LOGIN_CALL_BACK_PATH = "/facebook/callback"

const express = require("express")
const route = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")

const User = require("../models/User")
const Sequelize = require("sequelize")
const Op = Sequelize.Op

var google = require('googleapis').google;
var OAuth2 = google.auth.OAuth2;

const cryptoRandomString = require('crypto-random-string');


//route.use(cors())
import {okResponse} from "../utils/Funcs"

route.THIRD_PARTY_AUTH_PATH = THIRD_PARTY_AUTH_PATH

function getGoogleClient() {
    return new OAuth2(process.env.GOOGLE_AUTH_CLIENT_ID, process.env.GOOGLE_AUTH_CLIENT_SECRET, googleData.redirect_url);
}
export const googleData = {
    redirect_url: SERVER_ADDR + THIRD_PARTY_AUTH_PATH + GOOGLE_LOGIN_CALL_BACK_PATH
}
export const facebookData = {
    redirect_url: SERVER_ADDR + THIRD_PARTY_AUTH_PATH + FACEBOOK_LOGIN_CALL_BACK_PATH,
    scopes: 'email',
    fields: 'name,email'
}

route.googleLoginLink = () => {
    /*
    return "https://accounts.google.com/o/oauth2/auth?scope="
    + encodeURIComponent(googleData.scope) 
    + "&redirect_uri=" + encodeURIComponent(googleData.redirect_url) 
    + "&response_type=code&client_id=" + process.env.GOOGLE_AUTH_CLIENT_ID + "&access_type=online"
    */
   var oauth2Client = getGoogleClient()
    var scopes = [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ];

    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
        //use this below to force approval (will generate refresh_token)
        //,approval_prompt : 'force'
    });

    return url;
}

const stateNumber = () => {
    //generate i6 digits length number
    return Math.floor(1000000000000000 + Math.random() * 9000000000000000)
}

route.facebookLoginLink = () => {
    return "https://www.facebook.com/v2.2/dialog/oauth?client_id=" 
    +   process.env.FACEBOOK_APP_ID + "&redirect_uri=" 
    +   encodeURI(facebookData.redirect_url) 
    + "&scope=" + encodeURIComponent(facebookData.scopes) 
    + "&display=popup"
}

const getFacebookTokenUrl = (code) => {
    return "https://graph.facebook.com/oauth/access_token"
    + "?client_id=" + encodeURIComponent(process.env.FACEBOOK_APP_ID)
    + "&client_secret=" + encodeURIComponent(process.env.FACEBOOK_SECRET)
    + "&code=" + encodeURIComponent(code)
    + "&redirect_uri=" + encodeURI(facebookData.redirect_url)
}
const getFacebookProfileUrl = (token) => {
    return "https://graph.facebook.com/me?access_token=" + token
    + "&fields=" + encodeURIComponent(facebookData.fields)
}
const http = require("https")
const httpGet = (url) => {
    return new Promise((resolve, reject) => {
        var request = http.get(url);
        request.on("response", (data) => {
            //data.setEncoding('utf8');
            var chunks = [];

            data.on('data', (chunk) => {
                chunks.push(chunk);
            })
            data.on('end', async () => {
                resolve(chunks.join(''))
            })
        })

        request.on("error", (e) => {
            reject(e)
        })
    })
}
route.get(FACEBOOK_LOGIN_CALL_BACK_PATH, async (req, res) => {
    const code = req.query.code
    const state = req.query.state? req.query.state : "/profile"
    if(!code) {
        res.redirect("/login")
        
    } else {
        httpGet(getFacebookTokenUrl(code))
        .then(data => {
            var tokenObject = JSON.parse(data);
            httpGet(getFacebookProfileUrl(tokenObject.access_token))
            .then(profile => {
                profile = JSON.parse(profile)
                saveUserAuthDetails(res, {email: profile.email, fullname: profile.name}, state)
            })
            .catch(e => {
                res.redirect("/login")
            })
            
        })
        .catch(e => {
            res.redirect("/login")
        })
    }
    
})

route.get(GOOGLE_LOGIN_CALL_BACK_PATH, (req, res) => {
    var oauth2Client = getGoogleClient()
    var session = req.session;
    var code = req.query.code;
    const state = req.query.state? req.query.state : "/profile"
    oauth2Client.getToken(code, function(err, tokens) {
        console.log("tokens : ", tokens);
        // Now tokens contains an access_token and an optional refresh_token. Save them.
        if (!err) {
            //session["tokens"] = tokens;
            oauth2Client.setCredentials(tokens);
            var oauth2 = google.oauth2({
                auth: oauth2Client,
                version: 'v2'
            });
            oauth2.userinfo.get(
                function(err, resp) {
                  if (err) {
                        console.log("oauth2.userinfo.get", "error", err)
                        res.redirect("/login")

                  } else {
                        saveUserAuthDetails(res, {email: resp.data.email, fullname: resp.data.name}, state)
                  }
                }
            );
        } else {
            res.redirect("/login")
        }
    });
})

const saveUserAuthDetails = (res, details, nextPage) => {
    User.findOne({
        where: {
            email: details.email.trim().toLowerCase()
        }
    })
    .then(user => {
        if(user) {
            //if there is a user with that email, log the user in
            login({id: user.id}, res, nextPage)

        } else {
            //create an account for the user
            var userData = {
                email: details.email.trim().toLowerCase(),
                password: cryptoRandomString({length: 16, type: 'url-safe'}),
                number: "",
                fullname: details.fullname,
                created: new Date(),
                var_key: "third_party_auth",
                validated: 0
            }
            User.create(userData)
            .then(function(user) {
                login({id: user.id}, res, nextPage)
            })
            .catch(function(err) {
                console.log("REG_ERROR: "+err)
                res.redirect("/login?msg="+encodeURIComponent("An error occurred"))
            })
        }
    })
    .catch(e => {
        okResponse(res, {e: e})
    })
}

const login = (tokenObject, res, nextPage) => {
    var token = jwt.sign(tokenObject, process.env.SECRET_KEY, {
        expiresIn: "7d"
    })
    res.cookie('login_token', token, {
        signed : true, 
        maxAge: LOGIN_SPAN_IN_SECONDS * 1000,
        httpOnly: true
    })
    res.redirect(nextPage)
}
module.exports = route