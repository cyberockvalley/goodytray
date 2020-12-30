const dotenv = require('dotenv')
const result = dotenv.config({ path: 'env/.env' })

if(process.env.NODE_ENV == "production") {
  console.log = () => {}
}

import { truncText, sleep, randNum, genFilename, logger } from './public/utils/Funcs'
//logger.disableLogger()
if (result.error) {
  throw result.error
}

//require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();
//console.log("PROCESS_ENV_DATA", result.parsed)
//console.log("DB_PASS", process.env.DB_PASS)
import compression from 'compression'
import express from 'express'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter as Router } from 'react-router-dom'
import MultipleRoutes from './public/components/MultipleRoutes'
import MultipleRoutesLogin from './public/components/MultipleRoutesLogin'
import SingleRoute from './public/components/SingleRoute'
import template from "./public/views/template"
import templateSell from "./public/views/template-sell"

import ThirdPartyAuth from "./public/routes/ThirdPartyAuth"
import Users from "./public/routes/Users";
import Products from "./public/routes/Products";
import Cats from "./public/routes/Cats"
import SubCats from "./public/routes/SubCats"
import Attrs from "./public/routes/Attrs"
import Countries from "./public/routes/Countries"
import States from "./public/routes/States"
import Cities from "./public/routes/Cities"
import Messages from "./public/routes/Messages"
import Reviews from "./public/routes/Reviews"
import Notifications from "./public/routes/Notifications"

import PageMetaSetter from "./public/routes/PageMetaSetter"

import {checkUserAuth, logOut} from "./public/components/UserFunctions"
import {API_ROOT, PORT, PORT_SSL} from "../Constants"
import {error400, error500} from "../src/public/utils/Errors"
import { SELL_PATHS, APP_PATHS, LOGIN_PATHS } from './public/utils/RoutePaths'

import { EXCHANGE_RATE, urlToFileStream } from './public/utils/ExpressFunc'
import { THIRD_PARTY_AUTH_PATH } from './public/routes/ThirdPartyAuth'
import { reverse } from 'dns'

const browser = require("../src/public/utils/Browser")

const app = express()
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

app.use("*", (req, res, next) => {
  global.REQUEST_HOST = req.hostname
  res.REQUEST_HOST = req.hostname
  //console.log("H_HOST", req.headers)
  next()
})

if(process.env.SSL_KEY && process.env.SSL_CHAIN) {
  const helmet = require("helmet");
  app.use(helmet())
}

app.use(cookieParser(process.env.COOKIES_SECRET_KEY));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json({
  // Because Stripe needs the raw body, we compute it but only when hitting the Stripe callback URL.
  verify: function(req,res,buf) {
      var url = req.originalUrl;
      if (url.startsWith('/api/v1/stripe/webhook')) {
          req.rawBody = buf.toString()
      }
}}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
// for compressing html and resources
app.use(compression());
// set static folder for generated css and front js files


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  res.header("X-FRAME-OPTIONS", "ALLOW-FROM https://stripe.com")
  next();
});

// set routes
app.use(ThirdPartyAuth.THIRD_PARTY_AUTH_PATH, ThirdPartyAuth)
app.use(API_ROOT + "users", Users)
app.use(API_ROOT + "products", Products)
app.use(API_ROOT + "cats", Cats)
app.use(API_ROOT + "sub_cats", SubCats)
app.use(API_ROOT + "attrs", Attrs)
app.use(API_ROOT + "countries", Countries)
app.use(API_ROOT + "states", States)
app.use(API_ROOT + "cities", Cities)
app.use(API_ROOT + "messages", Messages)
app.use(API_ROOT + "reviews", Reviews)
app.use(API_ROOT + "notifications", Notifications)
const Stripe = require('./public/routes/Stripe')
app.use(API_ROOT + "stripe", Stripe)

app.use('/public', express.static(path.resolve(__dirname, 'public')))


app.use("*", checkUserAuth);

app.use(LOGIN_PATHS, logOut);

app.use("/", PageMetaSetter);


app.get(SELL_PATHS, (req, res, next) => {
  if(!res.locals.token_user) {
    res.redirect("/login?next="+encodeURI("/sell"))

  } else {
    const initialData = {
      cats: [],
      countries: [],
      price_currency_symbols: []
    }
  
    browser.axios.get(API_ROOT + "cats")
    .then(response => {
      initialData.cats = response.data.cats

      console.log("INIT_CAT", initialData.cats)
      browser.axios.get(API_ROOT + "countries?include_currency_symbols=1")
      .then(countriesData => {
        initialData.countries = countriesData.data.countries
        initialData.currency_symbols = countriesData.data.currency_symbols

        res.locals.initialData = initialData
        res.locals.initialData.isSellPage = true

        next()
  
      })
      .catch(err => {
        res.send(error500("Please ask the developer to debug the sell page route"))
      })
    })
  }
})

app.use([...APP_PATHS, ...SELL_PATHS], (req, res) => {console.log("TOKEN_USER", res.locals.token_user)
  let initialData = {}
  if(res.locals.initialData) {
    initialData = res.locals.initialData
  }
  initialData.user = res.locals.token_user
  initialData.last_product_cat_id = res.locals.last_product_cat_id

  var component;
  const context = {}
  
  initialData.pageMeta = res.locals.pageMeta
  console.log("PAGE_META_INIT", initialData)
  
  if(initialData.user == null) {
    const third_party_login_links = {}
    third_party_login_links.google = ThirdPartyAuth.googleLoginLink()
    third_party_login_links.facebook = ThirdPartyAuth.facebookLoginLink()
    initialData.third_party_login_links = third_party_login_links
    component = ReactDOMServer.renderToString(
      <Router location={req.url} context={context}>
        <MultipleRoutes initialData={initialData}/>
      </Router>
    )

  } else {
    component = ReactDOMServer.renderToString(
      <Router location={req.url} context={context}>
        <MultipleRoutesLogin initialData={initialData}/>
      </Router>
    )
  }
  
  res.send(template({
    body: component,
    initialData: initialData,
    requestHost: res.REQUEST_HOST
  }));

})

app.get('*', (req, res) =>
  res
    .status(404)
    .send(
      error400("")
    )
)
app.listen(PORT, () => console.log('Server running on port: ' + PORT))
/*
if(process.env.SSL_KEY) {
  console.log("SAW", "YEAS")
  const https = require("https"),
  fs = require("fs");

  const options = {
    key: fs.readFileSync(process.env.SSL_KEY),
    cert: fs.readFileSync(process.env.SSL_CHAIN)
  };
  if(process.env.SSL_DH && process.env.SSL_DH.length > 0) {
    options.dhparam = fs.readFileSync(process.env.SSL_DH)
  }
  https.createServer(options, app).listen(PORT_SSL, () => console.log('Server running on ssl port: ' + PORT_SSL));
}
*/