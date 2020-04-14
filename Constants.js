export const SITE_TRADE_MARK = "GoodyTray"
export const LOGO_ADDR = "dist/public/logo.png"

export const PORT = 8080
export const PORT_SSL = 4433
export const SERVER_HOST = "http://dev.domain.com"//"http://192.168.43.58"
export const SERVER_ADDR = SERVER_HOST + ":" + PORT

export const EMAIL_SUPPORT = "support@goodytray.com"
export const ERROR_NET_UNKNOWN = "An unexpected error occurred. Please make sure you're connected to the internet"
export const ERROR_DB_OP = "An unexpected error occurred from the server"
export const LOGIN_SPAN_IN_SECONDS = 86400 * 7
export const SITE_NAME = "GoodyTray"
export const SITE_DOT_COM = "goodytray.com"
export const API_ROOT = "/api/v1/"
export const MAX_PRODUCT_PHOTO_WIDTH = 500
export const MAX_PRODUCT_PHOTOS_SIZE = 1024 * 1024 * 5
export const DISTINCNT_MESSAGES_PER_HOUR = 60
export const REVIEWS_PER_HOUR = 60
export const REVIEWS_PER_PAGE = 30
export const PRODUCTS_PER_PAGE = 20
export const NO_PROFILE_PHOTO_IMAGE = "/public/res/images/static/no-profile-photo.jpg"
export const MAX_ONLINE_INDICATOR_IN_MINS = 5
export const SITE_TITLE = "Number 1 Place For Cheap Quality Goods"
export const FACEBOOK_PAGE_NAME = "GoodyTray - " + SITE_TITLE
export const FACEBOOK_PAGE_LINK = "http://facebook.com/goodytray"
export const INSTAGRAM_PAGE_LINK = "http://instagram.com/goodytray"
export const TWITTER_PAGE_LINK = "http://twitter.com/goodytray"
export const PRODUCTS_PHOTOS_SERVER_DIR = "dist/public/res/images/products"
export const PRODUCTS_PHOTOS_CLIENT_DIR = "/public/res/images/products/"
export const USERS_PHOTOS_SERVER_DIR = "dist/public/res/images/users"
export const USERS_PHOTOS_CLIENT_DIR = "/public/res/images/users/"
export const STATIC_IMAGES_CLIENT_DIR = "/public/res/images/static/"
export const PAID_AD_NAME = "Boosted ad"

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
        amount: 6.84
    },
    paid_package_c: {
        key: "paid_package_c",
        amount: 24.62
    }
}