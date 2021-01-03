export const error400 = function(message) {
    return `<!Doctype html><html><body style="background-color: #3c3c3c;"><h1 style="font-family: sans-serif; color: #c7c7c7; text-align: center;">404 - Not Found</h1><br/>${message}</body></html>`
}

export const error500 = function(message) {
    return `<!Doctype html><html><body style="background-color: #3c3c3c;"><h1 style="font-family: sans-serif; color: #c7c7c7; text-align: center;">500 - Internal Server Error</h1><br/>${message}</body></html>`
}