export const HOME_PATHS = [
    '/', '/index.html', '/index.js', '/index.php'
]

export const PRODUCTS_PATHS = [
    '/products'
]

export const PRODUCT_PATHS = [
    '/products/:title/:id', 'products/:title/:preview/:id'
]

export const PRODUCT = [
    '/products'
]

export const SEARCH_PATHS = [
    '/search'
]

export const CREATE_TIPS_PATHS = [
    '/create-ad-tips'
]

export const LOGIN_PATHS = [
    '/login'
]
export const REGISTER_PATHS = [
    '/register'
]

export const FOOTER_PATHS = [
    '/about', '/contact', '/privacy', '/tos'
]

export const GUEST_PATHS = LOGIN_PATHS.concat(REGISTER_PATHS)

export const USER_PATHS = [
    '/profile', '/settings', '/messages', '/messages/:id'/*, '/notifications'*/
]

export const EMAIL_VERIFICATION_PATHS = [
    '/email_verify/:key', '/password_reset/:key'
]

export const APP_PATHS = HOME_PATHS.concat(PRODUCT_PATHS)
.concat(PRODUCT_PATHS)
.concat(SEARCH_PATHS)
.concat(GUEST_PATHS)
.concat(USER_PATHS)
.concat(CREATE_TIPS_PATHS)
.concat(EMAIL_VERIFICATION_PATHS)
.concat(FOOTER_PATHS)

export const SELL_PATHS = ['/sell', '/edit-ad']