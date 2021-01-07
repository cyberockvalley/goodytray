import Texts from './Texts.json'
import en from 'javascript-time-ago/locale/en'
import it from 'javascript-time-ago/locale/it'
import { nullOrEmpty } from './src/public/utils/Funcs'

const LOCALES = {
    "en": en,
    "it": it
}

export const AD_APPROVAL_RANK = 1
export const FLASH_AD_ADMIN = 2

export const EMAIL_KEY_LENGTH = 32
export const PASSWORD_VALIDITY_TYPES_USED = [
    'minLength8', 'noCharRepeat3', 'maxLength16'
]
export const PASSWORD_VALIDITY_TYPES = {
    minLength6: {
        reg: /^.{6,}$/,
        invalidBool: false,
        error: "PASS_ERROR_MIN_LEN_6"
    },
    minLength8: {
        reg: /^.{8,}$/,
        invalidBool: false,
        error: "PASS_ERROR_MIN_LEN_8"
    },
    minLength16: {
        reg: /^.{16,}$/,
        invalidBool: false,
        error: "PASS_ERROR_MIN_LEN_16"
    },
    maxLength16: {
        reg: /^.{16,}$/,
        invalidBool: true,
        error: "PASS_ERROR_MAX_LEN_16"
    },
    maxLength32: {
        reg: /^.{32,}$/,
        invalidBool: true,
        error: "PASS_ERROR_MAX_LEN_32"
    },
    noCharRepeat3: {
        reg: /(.)\1{2,}/,
        invalidBool: true,
        error: "PASS_ERROR_REPEAT_3"
    },
    noCharRepeat5: {
        reg: /(.)\1{4,}/,
        invalidBool: true,
        error: "PASS_ERROR_REPEAT_5"
    },
    noCharRepeat8: {
        reg: /(.)\1{7,}/,
        invalidBool: true,
        error: "PASS_ERROR_REPEAT_8"
    },
    alphaNumeric: {
        reg: /^[^\p{L}\p{Nd}]+$/,
        invalidBool: true,
        error: "PASS_ERROR_A_Z_NUM"
    },
    alphaNumericBothCase: {
        reg: /^[^\p{Ll}\p{Lu}\p{N}]+$/,
        invalidBool: true,
        error: "PASS_ERROR_A_Z_NUM_BOTH_CASE"
    },
    specialChars: {
        reg: /[!@#$%^&*~()_+\-=\[\]{};':"\\|,.<>\/?]+/,
        invalidBool: false,
        error: "PASS_ERROR_SPECIAL_CHARS"
    },

}


export const ALLOWED_MAIL_TYPES = {
    email_ver: "email_ver",
    password_reset: "password_reset"
}

export const getMailerTexts = (type, key) => {
    let body;
    if(nullOrEmpty(type)) return body
    if(type == ALLOWED_MAIL_TYPES.email_ver) {
        body = {
            keyCol: "email_verification_key",
            successMsg: getText("AFTER_MAILER_ACC_VERIFY"),
            mailSubject: getText("SITE_NAME") + " " + getText("MAILER_ACC_VERIFY_SUBJECT"),
            mailMsg: getText("MAILER_ACC_VERIFY_MSG") + `<a href="${getText("SERVER_HOST")}/email_verify/${key}">${getText("SERVER_HOST")}/email_verify/${key}</a>`,
            verifyOk: getText("EMAIL_ACC_VERIFY_OK"),
            verifyNotOk: getText("EMAIL_ACC_VERIFY_NOT_OK")
        }

    } else if(type == ALLOWED_MAIL_TYPES.password_reset) {
        body = {
            keyCol: "password_reset_key",
            successMsg: getText("AFTER_MAILER_PASS_RESET"),
            mailSubject: getText("SITE_NAME") + " " + getText("MAILER_PASS_RESET_SUBJECT"),
            mailMsg: getText("MAILER_PASS_RESET_MSG") + `<a href="${getText("SERVER_HOST")}/password_reset/${key}">${getText("SERVER_HOST")}/password_reset/${key}</a>`,
            verifyOk: getText("RESET_PASS_OK"),
            verifyNotOk: getText("RESET_PASS_NOT_OK")
        }

    }
    return body
}

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

export const SHOW_DB_ERROR = true

const aliasOfSite = (alias, siteAliases) => {
    return siteAliases.includes(alias)
}
export const CAT_ID_FLASH_AD = 16
export const CAT_ID_GROUP_AD = 17
export const CAT_ID_UNKNOWN = 18
export const getTextSource = () => {
    //return Texts.sites[0].texts
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
