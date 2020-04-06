const express = require("express")
const products = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

import { logger } from "../utils/Funcs"
logger.disableLogger()

const Product = require("../models/Product")
const TopAd = require("../models/TopAd")
const Cat = require("../models/Cat")
const SubCat = require("../models/SubCat")
const imageEditor = require("../utils/imageEditor")

products.use(cors())
const fileUploader = require("../utils/FileUploader")
//const Jimp = require("jimp")

import {checkUserAuth} from "../components/UserFunctions"
import {truncText, jsonEmpty, randNum, okResponse} from "../utils/Funcs"
import { ERROR_DB_OP, MAX_PRODUCT_PHOTOS_SIZE, PRODUCTS_PER_PAGE, PRODUCTS_PHOTOS_CLIENT_DIR, SERVER_ADDR, PRODUCTS_PHOTOS_SERVER_DIR, API_ROOT } from "../../../Constants"
const db = require("../database/db")
const Sequelize = require("sequelize")
const Op = Sequelize.Op

import fs from "fs"
import { nameToId, userDetails, EXCHANGE_RATE } from "../utils/ExpressFunc"
import { subCatLink } from "../utils/LinkBuilder"
import { sequelize } from "../database/db"

const andQuery = function(query, filter) {
    return query.includes("WHERE")? query + " AND " + filter : query + " WHERE " + filter
}
const orQuery = function(query, filter) {
    return query.includes("WHERE")? query + " OR " + filter : query + " WHERE " + filter
}
const orderQuery = function(query, filter) {
    return query.includes("ORDER BY")? query + ", " + filter : query + " ORDER BY " + filter
}
products.get(["/user/boosted/:id", "/user/non_boosted/:id"], (req, res) => {
    var currentTime = (new Date()).getTime()
    var userId = req.params.id
    var page = req.query.page
    var q
    if(req.originalUrl.startsWith(API_ROOT + "products/user/boosted/")) {
        q = "SELECT " + (req.query.count_only?"COUNT(id) AS id ": "* ") + "FROM products WHERE user_id = ? AND sponsored_end_time > ? ORDER BY id DESC"

    } else {
        q = "SELECT " + (req.query.count_only?"COUNT(id) AS id ": "* ") + "FROM products WHERE user_id = ? AND sponsored_end_time <= ? ORDER BY id DESC"
    }
    var reps = [userId, currentTime]
    if(!req.query.count_only) {
        if(req.query.page && parseInt(req.query.page) > 0) {
            q += " LIMIT ?, ?"
            var offset = (parseInt(req.query.page) - 1) * PRODUCTS_PER_PAGE
            reps.push(offset, PRODUCTS_PER_PAGE + 1)//one is added to notify the user if there is more

        } else {
            q += " LIMIT ?"
            reps.push(PRODUCTS_PER_PAGE + 1)//one is added to notify the user if there is more
        }
    }
    db.sequelize.query(q, {
        replacements: reps,
        raw: false, 
        type: Sequelize.QueryTypes.SELECT,
        model: Product,
        mapToModel: true
    })
    .then(prods => {
        if(!prods || prods.length == 0) {
            res.json({status: 1, message: "No result", list: null, counts: 0})

        } else {
            if(req.query.count_only) {
                okResponse(res, {status: 1, message: "ok", list: null, counts: prods[0].id})

            } else {
                okResponse(res, {
                    status: 1, 
                    message: "ok", 
                    list: prods,
                    has_prev: req.query.page > 1,
                    has_next: prods.length > PRODUCTS_PER_PAGE
                })
            }
            
        }
    })
    .catch(e => {
        res.json({status: 0, message: ERROR_DB_OP+e, list: null, counts: 0})
    })
})
products.get("/sponsored", (req, res) => {
    var currentTime = (new Date()).getTime()
    var q = "SELECT * FROM products WHERE sponsored_end_time > ? ORDER BY last_sponsored_view_time ASC LIMIT ?"
    db.sequelize.query(q, {
        replacements: [currentTime, 4],
        raw: false, 
        type: Sequelize.QueryTypes.SELECT,
        model: Product,
        mapToModel: true
    })
    .then(prods => {
        if(!prods || prods.length == 0) {
            res.json({status: 1, message: "No result", list: null})

        } else {
            //update the results last_sponsored_view_time and sponsored_views
            q = "UPDATE products SET last_sponsored_view_time=? WHERE id=?"
            var updates = []
            var update = {
                last_sponsored_view_time: currentTime
            }
            for(var i = 0; i < prods.length; i++) {
                updates.push(new Promise(resolve => {
                    update.sponsored_views = prods[i].sponsored_views + 1
                    Product.update(update, {
                        where: {
                            id: prods[i].id
                        }
                    })
                    .then(updateResult => {
                        resolve({success: true})
                    })
                    .catch(e => {
                        resolve({success: false, error: e})
                    })

                }))
            }
            Promise.all(updates)
            .then(updatesResults => {
                res.json({status: 1, message: "Success", list: prods, updates_results: updatesResults})
            })
        }
    })
    .catch(e => {
        res.json({status: 0, message: ERROR_DB_OP+e, list: null})
    })
})
//get products
products.get("/", async function(req, res) {
    const today = new Date()
    const page = req.query.page && !isNaN(parseInt(req.query.page)) && parseInt(req.query.page) > 0? parseInt(req.query.page) : 1
    var hasNext = false, hasPrev = page > 1
    const select = "SELECT * FROM products"
    const selectCount = "SELECT COUNT(id) AS id FROM products"
    var query = ""
    const replacements = []
    
    var i = 0
    const q = req.query.q
    if(q && q.length > 0) {
        query = andQuery(query, "UPPER(title) LIKE ? OR UPPER(description) LIKE ? OR UPPER(title) LIKE ? OR UPPER(description) LIKE ? OR UPPER(title) LIKE ? OR UPPER(description) LIKE ?")
        i = 0
        while(i < 2) {
            replacements.push("%"+q.toUpperCase()+"%")
            i++
        }
        i = 0
        while(i < 2) {
            replacements.push(q.toUpperCase()+"%")
            i++
        }
        i = 0
        while(i < 2) {
            replacements.push("%"+q.toUpperCase())
            i++
        }
    }
    
    const isDraft = req.query.is_draft
    if(isDraft && !isNaN(parseInt(isDraft))) {
        query = andQuery(query, "is_draft = ?")
        replacements.push(parseInt(isDraft) == 1?true:false)
    }
    const user_id = req.query.user_id
    if(user_id && !isNaN(parseInt(user_id))) {
        query = andQuery(query, "user_id = ?")
        replacements.push(user_id)
    }
    const user_name = req.query.user_name
    if(user_name && user_name.length > 0) {
        query = andQuery(query, "UPPER(username) LIKE ? OR UPPER(fullname) LIKE ? OR UPPER(username) LIKE ? OR UPPER(fullname) LIKE ? OR UPPER(username) LIKE ? OR UPPER(fullname) LIKE ?")
        i = 0
        while(i < 3) {
            replacements.push("%"+user_name.toUpperCase()+"%")
            i++
        }
        i = 0
        while(i < 3) {
            replacements.push(user_name.toUpperCase()+"%")
            i++
        }
        i = 0
        while(i < 3) {
            replacements.push("%"+user_name.toUpperCase())
            i++
        }
    }

    var cat_id = req.query.cat_id
    if(cat_id && !isNaN(parseInt(cat_id)) || (req.query.cat_name && req.query.cat_name.length > 0)) {
        if(!cat_id || isNaN(parseInt(cat_id))) {
            var cat_id = await nameToId(req.query.cat_name, 'cats')
            //res.json({h: 1, cat_id: cat_id, cat_name: req.query.cat_name, enc: encodeURIComponent("Mobile Phones &amp; Tablets")})

        }
        if(cat_id != null) {
            query = andQuery(query, "cat_id = ?")
            replacements.push(cat_id)
        }
    }

    var sub_cat_id = req.query.sub_cat_id
    if(sub_cat_id && !isNaN(parseInt(sub_cat_id)) || (req.query.sub_cat_name && req.query.sub_cat_name.length > 0)) {
        if(!sub_cat_id || isNaN(parseInt(sub_cat_id))) {
            var sub_cat_id = await nameToId(req.query.sub_cat_name, 'sub_cats')
        }
        if(sub_cat_id != null) {
            query = andQuery(query, "sub_cat_id = ?")
            replacements.push(sub_cat_id)
        }
    }

    var country_id = req.query.country_id
    if(country_id && !isNaN(parseInt(country_id)) || (req.query.country_name && req.query.country_name.length > 0)) {
        if(!country_id || isNaN(parseInt(country_id))) {
            var country_id = await nameToId(req.query.country_name, 'countries')
        }
        if(country_id != null) {
            query = andQuery(query, "country_id = ?")
            replacements.push(country_id)
        }
    }

    var state_id = req.query.state_id
    if(state_id && !isNaN(parseInt(state_id)) || (req.query.state_name && req.query.state_name.length > 0)) {
        if(!state_id || isNaN(parseInt(state_id))) {
            var state_id = await nameToId(req.query.state_name, 'states')
        }
        if(state_id != null) {
            query = andQuery(query, "state_id = ?")
            replacements.push(state_id)
        }
    }

    var city_id = req.query.city_id
    if(city_id && !isNaN(parseInt(city_id)) || (req.query.city_name && req.query.city_name.length > 0)) {
        if(!city_id || isNaN(parseInt(city_id))) {
            var city_id = await nameToId(req.query.city_name, 'cities')
        }
        if(city_id != null) {
            query = andQuery(query, "city_id = ?")
            replacements.push(city_id)
        }
    }

    const attr = req.query.attr
    if(attr && attr.length > 0) {
        if(Array.isArray(attr)) {
            i = 1
            query = andQuery(query, "LOWER(attrs) LIKE ?")
            replacements.push("%"+attr[0].toLowerCase()+"%")
            while(i < attr.length) {
                query = orQuery(query, "LOWER(attrs) LIKE ?");
                replacements.push("%"+decodeURIComponent(attr[i]).toLowerCase()+"%")
                i++
            }

        } else {
            query = andQuery(query, "LOWER(attrs) LIKE ?")
            replacements.push("%"+decodeURIComponent(attr).toLowerCase()+"%")
        }
    }

    const priceMin = req.query.price_min
    if(priceMin && priceMin > 0) {
        query = andQuery(query, "global_price >= ?")
        replacements.push(priceMin)
    }
    const priceMax = req.query.price_max
    if(priceMax && priceMax > 0) {
        query = andQuery(query, "global_price <= ?")
        replacements.push(priceMax)
    }

    var not_id = req.query.not_id
    if(not_id && !isNaN(parseInt(not_id))) {
        query = andQuery(query, "id != ?")
        replacements.push(not_id)
    }
    
    const priceOrder = req.query.price_order//1 = DESC, 0 = ASC
    if(parseInt(priceOrder) == 1) {
        query = orderQuery(query, "global_price DESC")

    } else if(parseInt(priceOrder) == 0) {
        query = orderQuery(query, "global_price ASC")

    }
    const viewsOrder = req.query.views_order//1 = DESC, 0 = ASC
    if(parseInt(viewsOrder) == 1) {
        query = orderQuery(query, "views DESC")

    } else if(parseInt(viewsOrder) == 0) {
        query = orderQuery(query, "views ASC")

    }
    const updateOrder = req.query.update_order//1 = DESC, 0 = ASC
    if(parseInt(updateOrder) == 1) {
        query = orderQuery(query, "last_update DESC")

    } else if(parseInt(viewsOrder) == 0) {
        query = orderQuery(query, "last_update ASC")

    }
    const createdOrder = req.query.create_order//1 = DESC, 0 = ASC
    if(parseInt(createdOrder) == 1) {
        query = orderQuery(query, "created DESC")

    } else if(parseInt(viewsOrder) == 0) {
        query = orderQuery(query, "created ASC")

    }
    //counts all
    db.sequelize.query(selectCount + query, {
        replacements: replacements,
        raw: false, 
        type: Sequelize.QueryTypes.SELECT,
        model: Product,
        mapToModel: true
    })
    .then((counts) => {
        if(!counts || !counts[0] || counts[0].id == 0) {
            hasPrev = false
            res.json({status: 0, message: "No result found", list: null, has_prev: hasPrev, has_next: hasNext})

        } else {
            if(req.query.count_only && parseInt(req.query.count_only) == 1) {
                res.json({counts: counts[0].id})

            } else {
                //now let's get the result
                hasNext = page < Math.ceil(counts[0].id / PRODUCTS_PER_PAGE)
                const offset = (page - 1) * PRODUCTS_PER_PAGE
                replacements.push(offset)
                replacements.push(PRODUCTS_PER_PAGE)
                db.sequelize.query(select + query + " LIMIT ?, ?", {
                    replacements: replacements,
                    raw: false, 
                    type: Sequelize.QueryTypes.SELECT,
                    model: Product,
                    mapToModel: true
                })
                .then(products => {
                    res.json({status: 1, message: "Success", list: products, has_prev: hasPrev, has_next: hasNext, counts: counts[0].id})
                })
                .catch(e => {
                    res.json({status: 0, message: ERROR_DB_OP+e, list: null, has_prev: hasPrev, has_next: hasNext})
                })
            }
        }
    })
    .catch((error) => {
        res.json({status: 0, message: ERROR_DB_OP+error, list: null, has_prev: hasPrev, has_next: hasNext})
    })
})

//get products counts by category and sub category
products.get("/cats_and_sub_cats", (req, res) => {
    var q = "SELECT cats.id, cat.name, sub_cats.id as sub_cat_id"
    db.sequelize.query("SELECT sub_cats.*, cats.name as cat_name, cats.total_products as cat_total_products FROM sub_cats, cats WHERE sub_cats.cat_id = cats.id ORDER BY cat_id ASC", {
        replacements: [],
        raw: false, 
        type: Sequelize.QueryTypes.SELECT
    })
    .then(cats => {
        const catsAndSubCats = []
        var lastCatId = -1
        var current = null
        for(var i = 0; i < cats.length; i++) {
            if(lastCatId != cats[i].cat_id) {
                if(current) {
                    catsAndSubCats.push(current)
                }
                current = {}
                current.id = cats[i].cat_id
                current.name = cats[i].cat_name
                current.total_products = cats[i].cat_total_products
                current.sub_cats = []
                current.sub_cats.push({id: cats[i].id, name: cats[i].name, total_products: cats[i].total_products})
                lastCatId = cats[i].cat_id
            } else {
                current.sub_cats.push({id: cats[i].id, name: cats[i].name, total_products: cats[i].total_products})
            }
        }
        if(current) {
            catsAndSubCats.push(current)
        }
        res.json(catsAndSubCats)
        
    })
    .catch(e => {
        res.json(null+e)
    })
})

//get products details
products.get("/details", function(req, res) {
    const id = req.query.id
    var viewsSize = randNum(1, 10)
    if(viewsSize > 1) {
        viewsSize = 0;
    }
    if(!id) {
        res.json({details: null, message: "No identifier provided"})

    } else {
        db.sequelize.query("SELECT products.*, users.username AS poster_username, users.fullname AS poster_fullname, users.profile_photo AS poster_profile_photo, users.number AS poster_number, users.created AS poster_created, users.last_seen AS poster_last_seen FROM products, users WHERE products.id = ? AND users.id = products.user_id LIMIT 1", {
            replacements: [id],
            raw: false, 
            type: Sequelize.QueryTypes.SELECT,
            model: Product,
            mapToModel: true
        })
        .then((product) => {
            product = product[0]
            //get cat and sub_cat name
            db.sequelize.query("SELECT cats.name AS cat_name, sub_cats.name AS sub_cat_name from cats, sub_cats WHERE cats.id = ? AND sub_cats.id = ? LIMIT 1 ", {
                replacements: [product.cat_id, product.sub_cat_id],
                raw: false, 
                type: Sequelize.QueryTypes.SELECT,
                model: Product,
                mapToModel: true
            })
            .then(productEXT => {
                product.cat_name = productEXT[0].cat_name
                product.sub_cat_name = productEXT[0].sub_cat_name

                //get country, state, and city name
                db.sequelize.query("SELECT countries.name AS country_name, states.name AS state_name, cities.name AS city_name from countries, states, cities WHERE countries.id = ? AND states.id = ? AND cities.id = ? LIMIT 1 ", {
                    replacements: [product.country_id, product.state_id, product.city_id],
                    raw: false, 
                    type: Sequelize.QueryTypes.SELECT,
                    model: Product,
                    mapToModel: true
                })
                .then(productEXT => {
                    product.country_name = productEXT[0].country_name
                    product.state_name = productEXT[0].state_name
                    product.city_name = productEXT[0].city_name

                    //get reviews count
                    db.sequelize.query("SELECT COUNT(id) as reviews FROM reviews WHERE product_id = ?", {
                        replacements: [product.id],
                        raw: false, 
                        type: Sequelize.QueryTypes.SELECT,
                        model: Product,
                        mapToModel: true
                    })
                    .then(productEXT => {
                        product.reviews = productEXT[0].reviews
        
                        //get sponsored status
                        db.sequelize.query("SELECT clicks, max_clicks, group_views, max_group_views, start_date, end_date FROM top_ads WHERE product_id = ?", {
                            replacements: [product.id],
                            raw: false, 
                            type: Sequelize.QueryTypes.SELECT,
                            model: TopAd,
                            mapToModel: true
                        })
                        .then(productEXT => {
                            if(productEXT[0]) {
                                product.sponsored = productEXT[0].end_date > new Date()
                            }
                            //increase the views if the vi query string is 1
                            if(req.query.vi && parseInt(req.query.vi) == 1) {
                                var v = product.views + viewsSize
                                db.sequelize.query("UPDATE products SET views = ? WHERE id = ?", {
                                    replacements: [v, product.id],
                                    raw: false, 
                                    type: Sequelize.QueryTypes.UPDATE
                                })
                                .then((r) => {
                                    product.views = product.views + viewsSize
                                    res.json({details: product})
                                })
                                .catch(e => {
                                    product.views = e
                                    res.json({details: product})
                                })

                            } else {
                                res.json({details: product})
                            }
                        })
                        .catch(e => {
                            res.json({details: product})
                        })
                    })
                    .catch(e => {
                        res.json({details: product})
                    })
                })
                .catch(e => {
                    res.json({details: product})
                })
            })
            .catch(e => {
                res.json({details: product})
            })
        })
        .catch((error) => {
            res.json({details: null, message: "An error occurred while trying to get the product details"})
        })
    }
})

const waterMark = async function(FILENAME) {
    /*
    console.log("Watermark 1");
const LOGO = SERVER_ADDR + "/public/static/logo.png";

const LOGO_MARGIN_PERCENTAGE = 5;

  const [image, logo] = await Promise.all([
    Jimp.read(FILENAME),
    Jimp.read(LOGO)
  ]);

  logo.resize(image.bitmap.width / 10, Jimp.AUTO);

  const xMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;
  const yMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;

  const X = image.bitmap.width - logo.bitmap.width - xMargin;
  const Y = image.bitmap.height - logo.bitmap.height - yMargin;

  image.composite(logo, X, Y, [
    {
      mode: Jimp.BLEND_SCREEN,
      opacitySource: 1,
      opacityDest: 1
    }
  ]).image.write(SERVER_ADDR + "/public/products/jimp_1.jpg");
  return true;
//var imageFromMain = main();
//return main().then(image => image.write(FILENAME)).catch(e => console.log("Jinmp upload error: "+e));
*/
}

products.post("/upload/photos", checkUserAuth, (req, res) => {
    if(!res.locals.token_user) {
        res.json({auth_required: true})

    } else {
        const uploader = fileUploader.multipleProductUpload("file")

        uploader(req, res, err => {
            if (err instanceof fileUploader.MULTER_ERROR) {
                return res.status(200).json({status: err.code == "LIMIT_FILE_SIZE"?3:0, message: err.message})
            } else if (err) {
                return res.status(200).json({status: 0, message: err})
            }
            
            const fileNames = []
            const filePaths = []
            var totalFileSize = 0
            var i = 0
            
            while(i < req.files.length) {
                if(totalFileSize + req.files[i].size <= MAX_PRODUCT_PHOTOS_SIZE) {
                    //var wm = await waterMark(PRODUCTS_PHOTOS_SERVER_DIR + req.files[i].filename);
                    fileNames.push(PRODUCTS_PHOTOS_CLIENT_DIR + req.files[i].filename)
                    filePaths.push(req.files[i].path)
                } else {
                    try {
                        fs.unlinkSync(req.files[i].path)
                    } catch(e) {
                        
                    }
                }
                totalFileSize += req.files[i].size 
                i++
            }
            if(fileNames.length == 0) {
                return res.status(200).json({status: 3, message: "Upload failed"})

            } else {
                return imageEditor.waterMark(filePaths)
                .then(result => {
                    return res.status(200).json({status: 1, message: "Upload successfull", filenames: fileNames})
                })
                .catch(e => {
                    return res.status(200).json({status: 0, message: e})
                })
            }
        })
    }
})


//upload products
products.post(["/upload", "/edit"], checkUserAuth,  (req, res) => {
    const product = req.body.product
    if(!res.locals.token_user) {
        res.json({status: 5, message: "Login required", auth_required: true})

    } else if(req.originalUrl.includes("edit") && res.locals.token_user.id != product.user_id) {
        res.json({status: 4, message: "Permission required"})

    } else {
        const today = new Date()
        const form_errors = []
        const productData = {}
        if(product.id) {
            productData.id = product.id
        }
        productData.hide_phone_number = product.hide_phone_number == 1?1:0

        productData.user_id = res.locals.token_user.id
        if(!product.cat || isNaN(parseInt(product.cat)) || parseInt(product.cat) < 0) {
            form_errors.push({key: "cat", value: "Please select a category"})

        } else {
            productData.cat_id = parseInt(product.cat)
        }
        
    
        if(!product.sub_cat || isNaN(parseInt(product.sub_cat)) || parseInt(product.sub_cat) < 0) {
            form_errors.push({key: "sub_cat", value: "Please select a sub category"})

        } else {
            productData.sub_cat_id = parseInt(product.sub_cat)
        }

        if(product.attrs && product.attrs.length > 0) {
            var attrs = "_"
            for(var a = 0; a < product.attrs.length; a++) {
                console.log(product.attrs[a])
                attrs += truncText(product.attrs[a], 70, null) + ","
            }
            attrs = attrs.substring(0, attrs.length - 1) + "_"
            productData.attrs = attrs

        } else {
            productData.attrs = ""
        }

        if(!product.title || product.title.length == 0) {
            form_errors.push({key: "title", value: "Please enter title"})

        } else {
            productData.title = truncText(product.title, 70, null)
        }

        if(!product.desc || product.desc.length == 0) {
            form_errors.push({key: "desc", value: "Please enter description"})

        } else {
            productData.description = truncText(product.desc, 1000, null)
        }

        if(!product.price_currency_symbol || product.price_currency_symbol.length == 0) {
            form_errors.push({key: "price", value: "Please enter your price currency"})

        } else {
            productData.currency_symbol = truncText(product.price_currency_symbol, 30, null)
        }

        if(!product.price || isNaN(parseInt(product.sub_cat)) || parseInt(product.sub_cat) < 0) {
            form_errors.push({key: "price", value: "Please enter price"})

        } else {
            productData.price = parseInt(truncText(product.price, 30, null))
        }

        if(productData.currency_symbol && productData.price) {
            productData.global_price = EXCHANGE_RATE[[productData.currency_symbol]] * productData.price
        }

        if(!product.country || isNaN(parseInt(product.country)) || parseInt(product.country) < 0) {
            form_errors.push({key: "country", value: "Please select a country"})

        } else {
            productData.country_id = parseInt(product.country)
        }

        if(!product.state || isNaN(parseInt(product.state)) || parseInt(product.state) < 0) {
            form_errors.push({key: "state", value: "Please select a state"})

        } else {
            productData.state_id = parseInt(product.state)
        }

        if(!product.city || isNaN(parseInt(product.city)) || parseInt(product.city) < 0) {
            form_errors.push({key: "city", value: "Please select a city"})

        } else {
            productData.city_id = parseInt(product.city)
        }

        if(form_errors.length > 0) {
            if(product.photos && product.photos.length > 0) {
                var i = 0
                while(i < product.photos.length) {
                    try {
                        fs.unlinkSync("dist" + product.photos[i])
                    } catch(e) {
                        res.json({status: 0, message: "Failed to delete file: ("+"dist" + product.photos[i]+")" + e})
                    }
                    i++
                }
            }
            res.json({status: 0, message: null, form_errors: form_errors})

        } else {
            //delete photos deleted on client on server
            console.log("DelPhotoZ", product.del_photos)
            if(product.del_photos && product.del_photos.length > 0) {
                var i = 0
                while(i < product.del_photos.length) {
                    try {
                        fs.unlinkSync("dist" + product.del_photos[i])
                        console.log("DelPhotoz", "ok", product.del_photos[i])
                    } catch(e) {
                        console.log("DelPhotoZ", "notOk", product.del_photos[i])
                    }
                    i++
                }
            }
            productData.created = today
            productData.last_update = today
            var photos = ""
            if(product.photos && product.photos.length > 0) {
                var i = 0
                while(i < product.photos.length) {
                    photos += product.photos[i] + ","
                    i++
                }
                photos = photos.substring(0, photos.length - 1)
            }
            productData.photos = photos
            if(req.originalUrl.includes("upload")) {
                console.log("c-a-t", 77)
                Product.create(productData)
                .then(prod => {
                    Cat.findOne({
                        where: {
                            id: prod.cat_id
                        }
                    })
                    .then(cat => {
                        if(cat) {
                            const newCat = {total_products: cat.total_products + 1};
                            cat.update(newCat)
                            SubCat.findOne({
                                where: {
                                    id: productData.sub_cat_id
                                }
                            })
                            .then(sub_cat => {
                                if(sub_cat) {
                                    const newSubCat = {total_products: sub_cat.total_products + 1};
                                    sub_cat.update(newSubCat)
                                    return res.status(200).json({status: 1, message: "1 Ad posted successfully"+JSON.stringify(prod), product_id: prod.id})
                    
                                } else {
                                    return res.status(200).json({status: -1, message: ERROR_DB_OP})
                                }
                            })
                            .catch(err => {
                                return res.status(200).json({status: -1, message: ERROR_DB_OP+err})
                            })
            
                        } else {
                            return res.status(200).json({status: -1, message: ERROR_DB_OP})
                        }
                    })
                    .catch(err => {
                        return res.status(200).json({status: -1, message: ERROR_DB_OP+err})
                    })
                })
                .catch(e => {
                    return res.status(200).json({status: -1, message: ERROR_DB_OP+e, c: productData.currency_symbol})
                })

            } else {
                console.log("c-a-t= cat", 1)
                Product.update(productData, {
                    where: {
                        id: productData.id
                    }
                })
                .then(prod => {
                    const cats_and_sub_cats_updates = []
                    console.log("c-a-t= cat")
                    console.log("cats_and_sub_cats_updatesData", {
                        cat_id: productData.cat_id,
                        prev_cat: product.prev_cat,
                        sub_cat_id: productData.sub_cat_id,
                        prev_sub_cat: product.prev_sub_cat
                    })
                    //if the category was changed
                    if(productData.cat_id != product.prev_cat) {
                        //then we reduce the product count under the previous
                        // category, and increase it under the category changed to.
                        cats_and_sub_cats_updates.push(
                            new Promise(resolve => {
                                Cat.findOne({
                                    where: {
                                        id: product.prev_cat
                                    }
                                })
                                .then(cat => {
                                    var newCat = {total_products: cat.total_products - 1}
                                    cat.update(newCat)
                                    Cat.findOne({
                                        where: {
                                            id: productData.cat_id
                                        }
                                    })
                                    .then(cat2 => {
                                        var newCat2 = {total_products: cat2.total_products + 1}
                                        cat2.update(newCat2)
                                        resolve({cats: "Success 1 2"})
                                    })
                                    .catch(e => {
                                        resolve({cats: "Success 1 Failed 2", e: e})
                                    })
                                })
                                .catch(e => {
                                    resolve({cats: "Failed 1", e: e})
                                })
                            })
                        )
                    }
                    //if the sub category was changed
                    if(productData.sub_cat_id != product.prev_sub_cat) {
                        //then we reduce the product count under the previous
                        // sub category, and increase it under the sub category changed to.
                        cats_and_sub_cats_updates.push(
                            new Promise(resolve => {
                                SubCat.findOne({
                                    where: {
                                        id: product.prev_sub_cat
                                    }
                                })
                                .then(cat => {
                                    var newCat = {total_products: cat.total_products - 1}
                                    cat.update(newCat)
                                    SubCat.findOne({
                                        where: {
                                            id: productData.sub_cat_id
                                        }
                                    })
                                    .then(cat2 => {
                                        var newCat2 = {total_products: cat2.total_products + 1}
                                        cat2.update(newCat2)
                                        resolve({sub_cats: "Success 1 2"})
                                    })
                                    .catch(e => {
                                        resolve({sub_cats: "Success 1 Failed 2", e: e})
                                    })
                                })
                                .catch(e => {
                                    resolve({sub_cats: "Failed 1", e: e})
                                })
                            })
                        )
                    }

                    //if the category and sub category wasn't changed
                    if(cats_and_sub_cats_updates.length == 0) {
                        console.log("c-a-t", 99)
                        return res.status(200).json({status: 1, message: "2 Ad posted successfully"+JSON.stringify(prod), product_id: productData.id})

                    } else {
                        console.log("c-a-t", 88)
                        Promise.all(cats_and_sub_cats_updates)
                        .then(results => {
                            console.log("cats_and_sub_cats_updatesResult", results)
                            return res.status(200).json({status: 1, message: "3 Ad posted successfully"+JSON.stringify(prod), product_id: productData.id})
                        })
                    }
                    
                })
                .catch(e => {
                    return res.status(200).json({status: -1, message: ERROR_DB_OP+e, c: productData.currency_symbol})
                })
            }
            
        }
    }
})

module.exports = products