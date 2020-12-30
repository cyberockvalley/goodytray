const express = require("express")
const metaSetter = express.Router()

const cors = require("cors")
metaSetter.use(cors())

import { SELL_PATHS, LOGIN_PATHS, REGISTER_PATHS, HOME_PATHS, PRODUCT_PATHS, SEARCH_PATHS, PRODUCTS_PATHS, CREATE_TIPS_PATHS } from "../utils/RoutePaths";
import { SITE_TITLE, SITE_NAME, getText, TITLE_DIV, DESCRIPTION_DIV } from "../../../Constants";
import { getProduct } from "../components/UserFunctions";
import { productLink } from "../utils/LinkBuilder";
import { mimeFromFilename } from "../utils/Funcs";

metaSetter.get("*", (req, res, next) => {
    res.locals.pageMeta = getDefaultPageMeta()
    next()
})

metaSetter.get(SELL_PATHS, (req, res, next) => {
    res.locals.pageMeta = getSellPageMeta()
    next()
})

metaSetter.use(LOGIN_PATHS, (req, res, next) => {
    res.locals.pageMeta = getLoginPageMeta()
    next()
})

metaSetter.get(REGISTER_PATHS, (req, res, next) => {
    res.locals.pageMeta = getRegPageMeta()
    next()
})

metaSetter.get(HOME_PATHS.concat(PRODUCTS_PATHS), (req, res, next) => {
    res.locals.pageMeta = getHomePageMeta()
    next()
})

metaSetter.get(PRODUCT_PATHS, async (req, res, next) => {
    console.log("P_REQ U2", req.url)
    console.log("P_REQ Q2", req.params)
    res.locals.pageMeta = await getProductPageMeta(req.params.id)
    console.log("P_REQ_REZ2", res.locals.pageMeta)
    next()
})

metaSetter.get(SEARCH_PATHS, (req, res, next) => {
    res.locals.pageMeta = getSearchPageMeta()
    next()
})

metaSetter.get(CREATE_TIPS_PATHS, (req, res, next) => {
    res.locals.pageMeta = getAdsTipsPageMeta()
    next()
})

metaSetter.get("/about", (req, res, next) => {
    var meta = getDefaultPageMeta()
    meta.title = getText("SITE_TRADE_MARK") + TITLE_DIV + getText("ABOUT_US")
    meta.description = SITE_NAME + DESCRIPTION_DIV + getText("ABOUT_PAGE_DESCRIPTION")
    res.locals.pageMeta = meta
    next()
})

metaSetter.get("/contact", (req, res, next) => {
    var meta = getDefaultPageMeta()
    meta.title = getText("SITE_TRADE_MARK") + TITLE_DIV + getText("CONTACT_US")
    meta.description = SITE_NAME + DESCRIPTION_DIV + getText("CONTACT_PAGE_DESCRIPTION")
    res.locals.pageMeta = meta
    next()
})

metaSetter.get("/privacy", (req, res, next) => {
    var meta = getDefaultPageMeta()
    meta.title = getText("SITE_TRADE_MARK") + TITLE_DIV + getText("PRIVACY_POLICY")
    meta.description = SITE_NAME + DESCRIPTION_DIV + getText("PRIVACY_POLICY_PAGE_DESCRIPTION")
    res.locals.pageMeta = meta
    next()
})

metaSetter.get("/tos", (req, res, next) => {
    var meta = getDefaultPageMeta()
    meta.title = getText("SITE_TRADE_MARK") + TITLE_DIV + getText("TOS")
    meta.description = SITE_NAME + DESCRIPTION_DIV + getText("TOS_PAGE_DESCRIPTION")
    res.locals.pageMeta = meta
    next()
})

const getDefaultPageMeta = () => {
    var pageMeta = {}
    pageMeta.title = ""
    pageMeta.description = getText("SITE_TRADE_MARK") + DESCRIPTION_DIV + getText("SELL_PAGE_DESCRIPTION")
    pageMeta.keywords = getText("SELL_PAGE_KEYWORDS")
    return pageMeta
}

const getSellPageMeta = () => {
    var pageMeta = getDefaultPageMeta()
    pageMeta.title = getText("SITE_TRADE_MARK") + TITLE_DIV + getText("SELL_PAGE_TITLE")
    pageMeta.url = `${getText("SERVER_HOST")}/sell`
    return pageMeta
}
export const getLoginPageMeta = () => {
    var pageMeta = getDefaultPageMeta()
    pageMeta.title = getText("SITE_TRADE_MARK") + TITLE_DIV + getText("LOGIN_PAGE_TITLE")
    pageMeta.url = getText("SERVER_HOST") + LOGIN_PATHS[0]
    return pageMeta
}
const getRegPageMeta = () => {
    var pageMeta = getDefaultPageMeta()
    pageMeta.title = getText("SITE_TRADE_MARK") + TITLE_DIV + getText("REG_PAGE_TITLE")
    pageMeta.url = getText("SERVER_HOST") + REGISTER_PATHS[0]
    return pageMeta
}
const getHomePageMeta = () => {
    var pageMeta = getDefaultPageMeta()
    pageMeta.title = getText("SITE_TRADE_MARK") + TITLE_DIV + SITE_TITLE
    pageMeta.url = getText("SERVER_HOST")
    return pageMeta
}
const getProductPageMeta = async (id) => {
    console.log("getProductPageMeta", "111")
    var data = await getProduct(id)
    console.log("getProductPageMeta", "222", data)
    var pageMeta = {}
    if(data == null) {
        pageMeta.title = getText("SITE_TRADE_MARK")
        return pageMeta;

    } else {
        var details = data.details
        if(details) {
            pageMeta.title = getText("SITE_TRADE_MARK") + TITLE_DIV + details.title
            pageMeta.description = details.description
            pageMeta.keywords = details.cat_name+" "+details.title.toLowerCase()
            pageMeta.url = getText("SERVER_HOST") +  productLink(details.title, details.id)
            var image = getText("SERVER_HOST") +   details.photos.split(',')[0];
            pageMeta.image_type = mimeFromFilename(image);
            pageMeta.image = image

        } else {
            pageMeta = getDefaultPageMeta()
        }
        return pageMeta
    }
    
}
const getSearchPageMeta = () => {
    var pageMeta = getDefaultPageMeta()
    pageMeta.title = getText("SITE_TRADE_MARK") + TITLE_DIV + getText("SEARCH_PAGE_TITLE")
    return pageMeta
}
const getAdsTipsPageMeta = () => {
    var pageMeta = {}
    pageMeta.title = getText("SITE_TRADE_MARK") + TITLE_DIV + getText("SELL_TIPS_PAGE_TITLE")
    pageMeta.description = SITE_TITLE
    pageMeta.keywords = getText("SELL_TIPS_PAGE_KEYWORDS")
    return pageMeta
}

module.exports = metaSetter