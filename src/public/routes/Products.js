const express = require("express")
const products = express.Router()
const cors = require("cors")

import { intOrMin, logger } from "../utils/Funcs"
//logger.disableLogger()

const Product = require("../models/Product")
const TopAd = require("../models/TopAd")
const Cat = require("../models/Cat")
const SubCat = require("../models/SubCat")
const imageEditor = require("../utils/imageEditor")

products.use(cors())
const fileUploader = require("../utils/FileUploader")
//const Jimp = require("jimp")

import {checkUserAuth} from "../components/UserFunctions"
import {truncText, randNum, okResponse} from "../utils/Funcs"
import { ERROR_DB_OP, MAX_PRODUCT_PHOTOS_SIZE, PRODUCTS_PER_PAGE, PRODUCTS_PHOTOS_CLIENT_DIR, API_ROOT, getText, getDatabaseTranslatedColumnName, AD_APPROVAL_RANK, CAT_ID_FLASH_AD, CAT_ID_GROUP_AD, SHOW_DB_ERROR, FLASH_AD_ADMIN } from "../../../Constants"
const db = require("../database/db")
const Sequelize = require("sequelize")

import fs from "fs"
import { nameToId, EXCHANGE_RATE } from "../utils/ExpressFunc"
import { request } from "http"

const andQuery = function(query, filter) {
    return query.includes("WHERE")? query + " AND " + filter : query + " WHERE " + filter
}
const orQuery = function(query, filter) {
    return query.includes("WHERE")? query + " OR " + filter : query + " WHERE " + filter
}
const orderQuery = function(query, filter) {
    return query.includes("ORDER BY")? query + ", " + filter : query + " ORDER BY " + filter
}

products.get("/approve/:id", checkUserAuth, (req, res) => {
    if(!res.locals.token_user) {
        res.json({auth_required: true})

    } else if(res.locals.token_user.rank < AD_APPROVAL_RANK) {
        res.json({permission_required: true})

    } else {
        if(!req.params.id) {
            okResponse(res, {status: 0, message: "Identifier not supplied"})
        }
        var id = parseInt(req.params.id)
        Product.update(
        { reviewed: 1 },
        { where: { id: id } }
        )
        .then(result =>
            okResponse(res, {status: 1})
        )
        .catch(err =>
            okResponse(res, {status: 0, message: ERROR_DB_OP})
        )
    }
})
products.get("/pending", checkUserAuth, (req, res) => {
    if(!res.locals.token_user) {
        res.json({auth_required: true})

    } else if(res.locals.token_user.rank < AD_APPROVAL_RANK) {
        res.json({permission_required: true})

    } else {
        var offset = (parseInt(req.query.page) - 1) * PRODUCTS_PER_PAGE
        var queryObject = {
            limit: PRODUCTS_PER_PAGE,
            offset: offset,
            where: {
                reviewed: 0
            },
            order: [
                ['id', 'DESC']
            ]
        }
        
        if(req.query.count_only) {
            queryObject.limit = 1000000
            Product.count(queryObject)
            .then(result => {
                okResponse(res, {status: 1, message: "ok", list: null, counts: result})
            })
            .catch(e => {
                okResponse(res, {status: 0, message: ERROR_DB_OP + JSON.stringify(e), list: null, counts: 0})
            })

        } else {
            Product.findAll(queryObject)
            .then(result => {
                okResponse(res, {
                    status: 1, 
                    message: "ok", 
                    list: result,
                    has_prev: req.query.page > 1,
                    has_next: result.length > PRODUCTS_PER_PAGE
                })
            })
            .catch(e => {
                okResponse(res, {status: 0, message: ERROR_DB_OP + JSON.stringify(e), list: null, counts: 0})
            })
        }
        
    }
})

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
            res.json({status: 1, message: getText("NO_REZ_FOUND"), list: null, counts: 0})

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
        res.json({status: 0, message: ERROR_DB_OP, list: null, counts: 0})
    })
})
products.get("/sponsored", (req, res) => {
    var currentTime = (new Date()).getTime()
    var q = "SELECT * FROM products WHERE reviewed=1 && sponsored_end_time > ? ORDER BY last_sponsored_view_time ASC LIMIT ?"
    db.sequelize.query(q, {
        replacements: [currentTime, 4],
        raw: false, 
        type: Sequelize.QueryTypes.SELECT,
        model: Product,
        mapToModel: true
    })
    .then(prods => {
        if(!prods || prods.length == 0) {
            res.json({status: 1, message: getText("NO_REZ_FOUND"), list: null})

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
                res.json({status: 1, message: getText("SUCCESS"), list: prods, updates_results: updatesResults})
            })
        }
    })
    .catch(e => {
        res.json({status: 0, message: ERROR_DB_OP, list: null})
    })
})
//get products
products.get("/", checkUserAuth, async function(req, res) {
    const today = new Date()
    const page = req.query.page && !isNaN(parseInt(req.query.page)) && parseInt(req.query.page) > 0? parseInt(req.query.page) : 1
    var hasNext = false, hasPrev = page > 1
    const select = "SELECT * FROM products"
    const selectCount = "SELECT COUNT(id) AS id FROM products"
    var query = ""
    query = andQuery(query, "reviewed>0")
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
            res.json({status: 0, message: getText("NO_REZ_FOUND"), list: null, has_prev: hasPrev, has_next: hasNext})

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
                    res.json({status: 1, message: getText("SUCCESS"), list: products, has_prev: hasPrev, has_next: hasNext, counts: counts[0].id})
                })
                .catch(e => {
                    res.json({status: 0, message: ERROR_DB_OP, list: null, has_prev: hasPrev, has_next: hasNext})
                })
            }
        }
    })
    .catch((error) => {
        res.json({status: 0, message: ERROR_DB_OP, list: null, has_prev: hasPrev, has_next: hasNext})
    })
})

//get products counts by category and sub category
products.get("/cats_and_sub_cats", (req, res) => {
    //var q = `SELECT cats.id, cats.identifier, ${getDatabaseTranslatedColumnName("cats.name")}, sub_cats.id as sub_cat_id`
    db.sequelize.query(`SELECT cats.id, sub_cats.id as sub_cat_id, sub_cats.cat_id, sub_cats.total_products, ${getDatabaseTranslatedColumnName("sub_cats.name")} as sub_cat_name, ${getDatabaseTranslatedColumnName("cats.name")} as cat_name, cats.total_products as cat_total_products, cats.identifier, cats.weight FROM sub_cats RIGHT JOIN cats ON sub_cats.cat_id=cats.id ORDER BY cats.weight DESC, cat_id ASC`, {
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
                current.id = cats[i].id
                current.name = cats[i].cat_name
                current.indentifier = cats[i].identifier
                current.total_products = cats[i].cat_total_products
                current.sub_cats = []
                if(cats[i].sub_cat_name) {
                    current.sub_cats.push({id: cats[i].sub_cat_id, name: cats[i].sub_cat_name, total_products: cats[i].total_products})
                }
                lastCatId = cats[i].id
            } else {
                current.sub_cats.push({id: cats[i].sub_cat_id, name: cats[i].sub_cat_name, total_products: cats[i].total_products})
            }
        }
        if(current) {
            catsAndSubCats.push(current)
        }
        res.json(catsAndSubCats)
        
    })
    .catch(e => {
        res.json()
    })
})

//get products details
products.get("/details", checkUserAuth, function(req, res) {
    const id = req.query.id
    const forceShow = intOrMin(req.query.force_show, -1)
    var viewsSize = randNum(1, 10)
    if(viewsSize < 6) {
        viewsSize = 0;
    }
    if(!id) {
        res.json({details: null, message: getText("API_NO_DATA_KEY_PROVIDED")})

    } else {
        db.sequelize.query(`SELECT products.*, users.username AS poster_username, users.fullname AS poster_fullname, users.profile_photo AS poster_profile_photo, users.number AS poster_number, users.created AS poster_created, users.last_seen AS poster_last_seen FROM products, users WHERE reviewed>${res.locals.user && res.locals.user.rank >= AD_APPROVAL_RANK || forceShow == 1? -1 : 0} && products.id = ? AND users.id = products.user_id LIMIT 1`, {
            replacements: [id],
            raw: false, 
            type: Sequelize.QueryTypes.SELECT,
            model: Product,
            mapToModel: true
        })
        .then((product) => {
            product = product[0]
            //get cat and sub_cat name
            db.sequelize.query(`SELECT ${getDatabaseTranslatedColumnName("cats.name")} AS cat_name, ${getDatabaseTranslatedColumnName("sub_cats.name")} AS sub_cat_name from cats, sub_cats WHERE cats.id = ? AND sub_cats.id = ? LIMIT 1 `, {
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
                            if(viewsSize > 0 && req.query.vi && parseInt(req.query.vi) == 1) {
                                var v = product.views + viewsSize
                                return db.sequelize.query("UPDATE products SET views = ? WHERE id = ?", {
                                    replacements: [v, product.id],
                                    raw: false, 
                                    type: Sequelize.QueryTypes.UPDATE
                                })
                                .then((r) => {
                                    product.views = product.views + viewsSize
                                    return product
                                })
                                .catch(e => {
                                    return product
                                })

                            } else {
                                return product
                            }
                        })
                        .then(details => {
                            Product.findOne({
                                where: {
                                    flash_creation_time: {[Sequelize.Op.gt]: 0}
                                },
                                order: [
                                    ['flash_creation_time', 'DESC']
                                ]
                            })
                            .then(p => {
                                console.log("FLASH_I", details.flash_creation_time, p.flash_creation_time)
                                if(JSON.stringify(details.flash_creation_time) == JSON.stringify(p.flash_creation_time)) {
                                    console.log("FLASH_I2", true)
                                    details = JSON.parse(JSON.stringify(details))
                                    details.isFlash = true

                                } else {
                                    console.log("FLASH_I2", false)
                                }
                                okResponse(res, {code: 100, details: details})
                            })
                            .catch(e => {
                                okResponse(res, {details: details, err: {code: 101, e: SHOW_DB_ERROR? e : ""}})
                            })
                        })
                        .catch(e => {
                            okResponse(res, {details: product, err: {code: 102, e: SHOW_DB_ERROR? e : ""}})
                        })
                    })
                    .catch(e => {
                        okResponse(res, {details: product, err: {code: 103, e: SHOW_DB_ERROR? e : ""}})
                    })
                })
                .catch(e => {
                    okResponse(res, {details: product, err: {code: 104, e: SHOW_DB_ERROR? e : ""}})
                })
            })
            .catch(e => {
                okResponse(res, {details: product, err: {code: 105, e: SHOW_DB_ERROR? e : ""}})
            })
        })
        .catch((error) => {
            res.json({details: null, message: getText("PRODUCT_GET_ERROR")})
        })
    }
})


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
                return res.status(200).json({status: 3, message: getText("UPLOAD_FAILED")})

            } else {
                return imageEditor.waterMark(filePaths)
                .then(result => {
                    return res.status(200).json({status: 1, message: getText("UPLOAD_OK"), filenames: fileNames})
                })
                .catch(e => {
                    return res.status(200).json({status: 0, message: e})
                })
            }
        })
    }
})

const handleFlashCount = (res, filter) => {
    Product.count(filter)
    .then(list => {
        okResponse(res, {counts: list})

    })
    .catch(e => {
        okResponse(res, {counts: 0, err: SHOW_DB_ERROR? e : ""})
    })
}

const handleFlashList = (res, filter) => {
    Product.findAll(filter)
    .then(list => {
        okResponse(res, {list: list})

    })
    .catch(e => {
        okResponse(res, {list: [], err: SHOW_DB_ERROR? e : ""})
    })
}

products.get("/flash", (req, res) => {
    Product.findOne({
        where: {
            flash_creation_time: {[Sequelize.Op.gt]: 0}
        },
        order: [
            ['flash_creation_time', 'DESC']
        ]
    })
    .then(p => {
        const filter = {
            where: {
                flash_creation_time: {[Sequelize.Op.eq]: null}
            },
            order: [
                ['id', 'ASC']
            ]
        }
        if(p && req.query.count_only) {
            filter.where.flash_creation_time = p.flash_creation_time
            handleFlashCount(res, filter)

        } else if(p && !req.query.count_only) {
            filter.where.flash_creation_time = p.flash_creation_time
            handleFlashList(res, filter)
            
        } else if(!p && req.query.count_only) {
            okResponse(res, {counts: 0})
            
        } else {
            okResponse(res, {list: []})
        }
    })
    .catch(e => {
        okResponse(res, {counts: 0, list: [], err: SHOW_DB_ERROR? e : ""})
    })
})

products.post("/flash/add", checkUserAuth,  (req, res) => {
    const productId = req.body.product_id
    if(!res.locals.token_user) {
        okResponse(res, {status: 5, message: "Login required", auth_required: true})

    } else if(res.locals.token_user.rank < FLASH_AD_ADMIN) {
        okResponse(res, {status: 4, message: getText("PERMIT_NEEDED")})

    } else if(productId < 0) {
        okResponse(res, {status: -1, message: getText("INVALID_ITEM")})

    } else {
        Product.findOne({
            where: {
                id: {[Sequelize.Op.eq]: productId}
            }
        })
        .then(p => {
            if(!p) {
                okResponse(res, {status: -2, message: getText("INVALID_ITEM")})

            } else {
                var date = new Date()
                date.setUTCHours(0, 0, 0, 0)
                p.update({flash_creation_time: date})
                .then(prod => {
                    okResponse(res, {status: 1, message: getText("OK"), success: true})

                })
                .catch(err => {
                    okResponse(res, {status: -4, message: getText("INVALID_ITEM"), err: SHOW_DB_ERROR? err : ""})
                })
            }
        })
        .catch(err => {
            okResponse(res, {status: -44, message: getText("INVALID_ITEM"), err: SHOW_DB_ERROR? err : ""})
        })
    }
})
products.post("/flash/remove", checkUserAuth,  (req, res) => {
    const productId = req.body.product_id
    if(!res.locals.token_user) {
        okResponse(res, {status: 5, message: "Login required", auth_required: true})

    } else if(res.locals.token_user.rank < FLASH_AD_ADMIN) {
        okResponse(res, {status: 4, message: getText("PERMIT_NEEDED")})

    } else if(productId < 0) {
        okResponse(res, {status: -1, message: getText("INVALID_ITEM")})

    } else {
        Product.findOne({
            where: {
                id: {[Sequelize.Op.eq]: productId}
            }
        })
        .then(p => {
            if(!p) {
                okResponse(res, {status: -2, message: getText("INVALID_ITEM")})

            } else {
                p.update({flash_creation_time: null})
                .then(prod => {
                    okResponse(res, {status: 1, message: getText("OK"), success: true})

                })
                .catch(err => {
                    okResponse(res, {status: -4, message: getText("INVALID_ITEM"), err: SHOW_DB_ERROR? err : ""})
                })
            }
        })
        .catch(err => {
            okResponse(res, {status: -44, message: getText("INVALID_ITEM"), err: SHOW_DB_ERROR? err : ""})
        })
    }
})


//upload products
products.post(["/upload", "/edit"], checkUserAuth,  (req, res) => {
    const product = req.body.product
    if(!res.locals.token_user) {
        res.json({status: 5, message: "Login required", auth_required: true})

    } else if(req.originalUrl.includes("edit")) {
        Product.findOne({
            where: {
                id: {[Sequelize.Op.eq]: product.id}
            }
        })
        .then(p => {
            if(!p) {
                okResponse(res, {status: 4, message: getText("INVALID_ITEM")})

            } else if(p.user_id != res.locals.token_user.id) {
                res.json({status: 4, message: getText("PERMIT_NEEDED")})

            } else {
                handleProduct(product, res)
            }
        })
        .catch(err => {
            okResponse(res, {status: -4, message: getText("INVALID_ITEM"), err: SHOW_DB_ERROR? err : ""})
        })

    } else {
        handleProduct(product, res)
    }
})

const handleProduct = (product, res) => {
    const today = new Date()
    const form_errors = []
    const productData = {}
    if(product.id) {
        productData.id = product.id
    }
    productData.hide_phone_number = product.hide_phone_number == 1?1:0

    productData.user_id = res.locals.token_user.id
    if(!product.cat || isNaN(parseInt(product.cat)) || parseInt(product.cat) < 0) {
        form_errors.push({key: "cat", value: getText("PLS_SELECT_A_CAT")})

    } else {
        productData.cat_id = parseInt(product.cat)
    }
    
    if(productData.cat_id == CAT_ID_FLASH_AD || productData.cat_id == CAT_ID_GROUP_AD) {
        productData.sub_cat_id = -1

    } else if(!product.sub_cat || isNaN(parseInt(product.sub_cat)) || parseInt(product.sub_cat) < 0) {
        form_errors.push({key: "sub_cat", value: getText("PLS_SELECT_A_SUB_CAT")})

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
        form_errors.push({key: "title", value: getText("PLS_ENTER_TITLE")})

    } else {
        productData.title = truncText(product.title, 70, null)
    }

    if(!product.desc || product.desc.length == 0) {
        form_errors.push({key: "desc", value: getText("PLS_ENTER_DESC")})

    } else {
        productData.description = truncText(product.desc, 1000, null)
    }

    if(!product.price_currency_symbol || product.price_currency_symbol.length == 0) {
        form_errors.push({key: "price", value: getText("PLS_SELECT_YOUR_CURRENCY")})

    } else {
        productData.currency_symbol = truncText(product.price_currency_symbol, 30, null)
    }

    if(!product.price || isNaN(parseInt(product.price)) || parseInt(product.price) < 0) {
        form_errors.push({key: "price", value: getText("PLS_ENTER_PRICE")})

    } else {
        productData.price = parseInt(truncText(product.price, 30, null))
    }

    if(productData.currency_symbol && productData.price) {
        productData.global_price = EXCHANGE_RATE[[productData.currency_symbol]] * productData.price
    }

    if(!product.country || isNaN(parseInt(product.country)) || parseInt(product.country) < 0) {
        form_errors.push({key: "country", value: getText("PLS_SELECT_YOUR_COUNTRY")})

    } else {
        productData.country_id = parseInt(product.country)
    }

    if(!product.state || isNaN(parseInt(product.state)) || parseInt(product.state) < 0) {
        form_errors.push({key: "state", value: getText("PLS_SELECT_YOUR_STATE")})

    } else {
        productData.state_id = parseInt(product.state)
    }

    if(!product.city || isNaN(parseInt(product.city)) || parseInt(product.city) < 0) {
        form_errors.push({key: "city", value: getText("PLS_SELECT_YOUR_CITY")})

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
                    res.json({status: 0, message: getText("FILE_DEL_FAILED")})
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
                fs.unlink("dist" + product.del_photos[i])
                .then(r => {
                    console.log("DelPhotoz", "ok", product.del_photos[i])
                }).catch(e => {
                    console.log("DelPhotoZ", "notOk", product.del_photos[i])
                })
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
            productData.reviewed = 0
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
                        if(productData.cat_id == CAT_ID_FLASH_AD || productData.cat_id == CAT_ID_GROUP_AD) {
                            return res.status(200).json({status: 1, message: getText("AD_POSTED"), product_id: prod.id})

                        } else {
                            SubCat.findOne({
                                where: {
                                    id: productData.sub_cat_id
                                }
                            })
                            .then(sub_cat => {
                                if(sub_cat) {
                                    const newSubCat = {total_products: sub_cat.total_products + 1};
                                    sub_cat.update(newSubCat)
                                    return res.status(200).json({status: 1, message: getText("AD_POSTED"), product_id: prod.id})
                    
                                } else {
                                    return res.status(200).json({status: -1, message: ERROR_DB_OP})
                                }
                            })
                            .catch(err => {
                                return res.status(200).json({status: -1, message: ERROR_DB_OP, err: SHOW_DB_ERROR? {id: 1, e: err} : {}})
                            })
                        }
        
                    } else {
                        return res.status(200).json({status: -1, message: ERROR_DB_OP})
                    }
                })
                .catch(err => {
                    return res.status(200).json({status: -1, message: ERROR_DB_OP, err: {id: 2, e: SHOW_DB_ERROR}? err : {}})
                })
            })
            .catch(e => {
                return res.status(200).json({status: -1, message: ERROR_DB_OP, err: SHOW_DB_ERROR? {id: 3, e: e} : {}})
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
                                .catch(err => {
                                    resolve({cats: "Success 1 Failed 2", err: SHOW_DB_ERROR? {id: 101, e: err} : {}})
                                })
                            })
                            .catch(err => {
                                resolve({cats: "Failed 1", err: SHOW_DB_ERROR? {id: 201, e: err} : {}})
                            })
                        })
                    )
                }
                //if the sub category was changed
                if(productData.cat_id != CAT_ID_FLASH_AD && productData.cat_id != CAT_ID_GROUP_AD && productData.sub_cat_id != product.prev_sub_cat) {
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
                                .catch(err => {
                                    resolve({sub_cats: "Success 1 Failed 2", err: SHOW_DB_ERROR? {id: 11, e: err} : {}})
                                })
                            })
                            .catch(err => {
                                resolve({sub_cats: "Failed 1", err: SHOW_DB_ERROR? {id: 22, e: err} : {}})
                            })
                        })
                    )
                }

                //if the category and sub category wasn't changed
                if(cats_and_sub_cats_updates.length == 0) {
                    console.log("c-a-t", 99)
                    return res.status(200).json({status: 1, message: getText("AD_POSTED"), product_id: productData.id})

                } else {
                    console.log("c-a-t", 88)
                    Promise.all(cats_and_sub_cats_updates)
                    .then(results => {
                        console.log("cats_and_sub_cats_updatesResult", results)
                        return res.status(200).json({status: 1, message: getText("AD_POSTED"), product_id: productData.id})
                    })
                    .catch(err => {
                        return res.status(200).json({status: -1, message: ERROR_DB_OP, err: SHOW_DB_ERROR? {id: 222, e: err} : {}})
                    })
                }
                
            })
            .catch(err => {
                return res.status(200).json({status: -1, message: ERROR_DB_OP, c: productData.currency_symbol, err: SHOW_DB_ERROR? {id: 33, e: err} : {}})
            })
        }
        
    }
}

module.exports = products