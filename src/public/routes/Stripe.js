const express = require("express")
const route = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")

const User = require("../models/User")
const Sequelize = require("sequelize")
const Op = Sequelize.Op

const bodyParser = require('body-parser');
import {okResponse, jsonEmpty} from "../utils/Funcs"
import { AD_PACKAGES } from "../../../Constants"

const Product = require("../models/Product")

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const isInvalidCurrency = (currency) => {
    return false
}

const getPackageKey = (amount) => {
    var key;
    if(amount == AD_PACKAGES.paid_package_b.amount) {
        key = AD_PACKAGES.paid_package_b.key

    } else if(amount == AD_PACKAGES.paid_package_c.amount) {
        key = AD_PACKAGES.paid_package_c.key
        
    }
    return key
}
const toCent = (amount) => {
    return amount * 100
}
route.get("/client_secret", (req, res) => {
    var amount = req.query.amount && !isNaN(req.query.amount)?toCent(req.query.amount):null
    console.log("STRIPE_AMOUNT", amount, req.query.amount)
    var packageKey = getPackageKey(req.query.amount)
    var currency = req.query.currency
    var description = req.query.description
    var error = {}

    if(!amount) {
        error.amount = "Please enter amount"

    } else if(!packageKey) {
        error.amount = "Invalid amount"
    }
    
    if(!currency || isInvalidCurrency(currency)) {
        error.currency = "Invalid currency sent"
    }

    if(!jsonEmpty(error)) {
        okResponse(res, {client_secret: null, error: error})

    } else {
        const paymentData = {
            amount: amount,
            currency: currency,
            // To verify the integration in the stripe guide by including this parameter
            metadata: {id: req.query.id, package_key: packageKey}

        }
        if(description) {
            paymentData.description = description
        }
        stripe.paymentIntents.create(paymentData)
        .then(data => {
            okResponse(res, {client_secret: data.client_secret})

        })
        .catch(e => {
            okResponse(res, e)
        })
    }
})

route.post("/webhook", (req, res) => {
    let event;
  
    const sig = req.headers['stripe-signature']
    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET)

    }
    catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`)
    }
    
    if (event.type === 'charge.succeeded') {
        // Fulfill the purchase...
        handleCheckoutSession(event.data.object, res, 'payment_intent.succeeded');

    } else {
        res.json({received: true})
    }
})

const handleCheckoutSession = (data, response, t) => {
    const metaData = data.metadata
    var productId = metaData.id || -1
    var pkg = metaData.package_key;//paid_package_b || paid_package_c
    var days;
    if(pkg == AD_PACKAGES.paid_package_b.key) {
        //7 DAYS sponsorship
        days = 7
    } else if(pkg == AD_PACKAGES.paid_package_c.key) {
        //30 DAYS sponsorship
        days = 30
    }
    if(days && productId > -1) {
        Product.findOne({
            where: {
                id: productId
            }
        })
        .then(product => {
            //set the sponsored_views to 0 if it is greater than 0 and the
            // ad spnsored_end_time is in the past. This is to show the users how their
            // sponsored ads are performing(getting more views)
            var now = new Date()
            const update = {}
            if(product.sponsored_end_time <= now.getTime()) {
                if(product.sponsored_views > 0) {
                    update.sponsored_views = 0 
                }
                now.setDate(now.getDate() + days)
                console.log("StripeUpdate", "expired")
            } else {
                var remainingDays = product.sponsored_end_time - now.getTime()
                remainingDays = Math.round(remainingDays / 86400000)//1 day
                now.setDate(now.getDate() + days + remainingDays)
                console.log("StripeUpdate", "remainingDays", remainingDays, days)
            }
            update.sponsored_end_time = now.getTime()

            product.update(update)
            .then(r => {
                console.log("StripeUpdate", {product: productId, package: pkg, updated: true})
                response.json({received: true, data: {product: productId, package: pkg, updated: true}})
            })
            .catch(e => {
                console.log("StripeUpdate", "error", e, {product: productId, package: pkg, updated: true})
                response.json({received: true, data: {product: productId, package: pkg, updated: true}})
            })
        })
        .catch(e => {
            console.log("StripeUpdate", {product: productId, package: pkg, updated: false, error: e})
            response.json({received: true, data: {product: productId, package: pkg, updated: false, error: e}})
        })

    } else {
        console.log("StripeUpdate", {product: productId, package: pkg, updated: false, dt: date})
        response.json({received: true, data: {product: productId, package: pkg, updated: false, dt: date}})
    }
    
}

module.exports = route