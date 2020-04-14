import { getValue } from "./Funcs"

const ROOT_RESPONSE = {
    auth_required: false, 
    success: false,
    error: null
}

const LISTS_RESPONSE = {
    list: [],
    has_prev: false,
    has_next: false,
    page: 0
}

export const rootResponse = () => {
    return getValue(ROOT_RESPONSE)
}
export const listResponse = () => {
    return Object.assign(rootResponse(), getValue(LISTS_RESPONSE))
}
