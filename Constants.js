import Texts from './Texts.json'
import en from 'javascript-time-ago/locale/en'
import it from 'javascript-time-ago/locale/it'

const LOCALES = {
    "en": en,
    "it": it
}

export const AD_APPROVAL_RANK = 1

export const PORT = 8080
export const PORT_SSL = 4433

 export const objectSize = obj => {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
}


//console.log("EN_TEXT_SIZE", objectSize(Texts.sites[0].texts))
//console.log("IT_TEXT_SIZE", objectSize(Texts.sites[1].texts))

const isClient = () => {
    return (typeof window !== 'undefined')
}

export const hostName = () => {
    if(isClient()) {
        return window.REQUEST_HOST

    } else {
        return global.REQUEST_HOST
    }
}

export const timeAgoText = text => {
    return text
}

const aliasOfSite = (alias, siteAliases) => {
    return siteAliases.includes(alias)
}
export const getTextSource = () => {
    var hostname = hostName()
    //console.log("GLOBAL_HOST_GET", hostname)
    let textSource
    for(var i = 0; i < Texts.sites.length; i++) {
        var name = Texts.sites[i].name
        var aliases = Texts.sites[i].aliases
        if(hostname == name || aliasOfSite(hostname, aliases)) {
            return Texts.sites[i].texts

        } else if(name == "*" || aliases.includes("*")) {
            textSource = Texts.sites[i].texts
        }
    }
    return textSource
}

export const getDatabaseTranslatedColumnName = defaultColumnName => {
    //return defaultColumnName
    const textSource = getTextSource()
    console.log("DB_COL", defaultColumnName, textSource? textSource.LOCALE : "textSource is null")
    if(textSource && textSource.LOCALE != "en") return defaultColumnName + "_" + textSource.LOCALE
    return defaultColumnName
}

export const getText = key => {
    const textSource = getTextSource()
    return textSource? textSource[key] : ""
}

export const getTimeLocale = () => {
    const textSource = getTextSource()
    return LOCALES[textSource.LOCALE]
}


export const SITE_TRADE_MARK = getText("SITE_TRADE_MARK")
export const LOGO_ADDR = getText("LOGO_ADDR")

export const SERVER_HOST = getText("SERVER_HOST")
export const SERVER_ADDR = SERVER_HOST;// + ":" + PORT

export const EMAIL_SUPPORT = getText("EMAIL_SUPPORT")
export const ERROR_NET_UNKNOWN = getText("ERROR_NET_UNKNOWN")
export const ERROR_DB_OP = getText("ERROR_DB_OP")
export const LOGIN_SPAN_IN_SECONDS = 86400 * 7

export const TITLE_DIV = ": "
export const DESCRIPTION_DIV = " - "
export const SITE_NAME = getText("SITE_NAME")
export const SITE_DOT_COM = getText("SITE_DOT_COM")
export const API_ROOT = "/api/v1/"
export const MAX_PRODUCT_PHOTO_WIDTH = 500;
export const MAX_PRODUCT_PHOTOS_SIZE = 1024 * 1024 * 20
export const DISTINCNT_MESSAGES_PER_HOUR = 60
export const REVIEWS_PER_HOUR = 60
export const REVIEWS_PER_PAGE = 30
export const PRODUCTS_PER_PAGE = 20
export const NO_PROFILE_PHOTO_IMAGE = "/public/res/images/static/no-profile-photo.jpg"
export const MAX_ONLINE_INDICATOR_IN_MINS = 5
export const SITE_TITLE = getText("SITE_TITLE")
export const FACEBOOK_PAGE_NAME = getText("SITE_NAME") + " - " + SITE_TITLE
export const FACEBOOK_PAGE_LINK = getText("FACEBOOK_PAGE_LINK")
export const INSTAGRAM_PAGE_LINK = getText("INSTAGRAM_PAGE_LINK")
export const TWITTER_PAGE_LINK = getText("TWITTER_PAGE_LINK")
export const PRODUCTS_PHOTOS_SERVER_DIR = "dist/public/res/images/products"
export const PRODUCTS_PHOTOS_CLIENT_DIR = "/public/res/images/products/"
export const USERS_PHOTOS_SERVER_DIR = "dist/public/res/images/users"
export const USERS_PHOTOS_CLIENT_DIR = "/public/res/images/users/"
export const STATIC_IMAGES_CLIENT_DIR = "/public/res/images/static/"
export const PAID_AD_NAME = getText("PAID_AD_NAME")

export const DB_HOST = process.env.DB_HOST
export const DB_USER = process.env.DB_USER
export const DB_PASS = process.env.DB_PASS

export const SSL_KEY = process.env.SSL_KEY
export const SSL_CHAIN = process.env.SSL_CHAIN
export const SSL_DH = process.env.SSL_DH
export const SSL_CA = process.env.SSL_CA

export const SSL_SQL_KEY = process.env.SSL_SQL_KEY
export const SSL_SQL_CHAIN = process.env.SSL_SQL_CHAIN
export const SSL_SQL_CA = process.env.SSL_SQL_CA

export const STRIPE_PUBLIC_KEY = "pk_live_pMDGxRWGiQisC9BxQsGTH96M00k5YMUiN4"

export const AD_PACKAGES = {
    paid_package_b: {
        key: "paid_package_b",
        amount: getText("paid_package_b_price")
    },
    paid_package_c: {
        key: "paid_package_c",
        amount: getText("paid_package_c_price")
    }
}
