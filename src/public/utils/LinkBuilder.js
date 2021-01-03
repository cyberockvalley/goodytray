export const productLink = (title, id) => {
    title += ""
    title = title.trim();
    title = title.replace(/[^-\dA-Z-a-z\s\.]/g, "");
    title = title.replace(/[\s\.]+/g, "-");
    if(title.startsWith("-"))title = title.substring(1);
    if(title.endsWith("-"))title = title.substring(0, title.length -1);
    return ("/products/"+title+"/"+id).toLowerCase();
}

export const catLink = (name) => {
    return "/search/cat/"+encodeURIComponent(name)
}

export const flashLink = () => {
    return "/search/flash/"
}

export const groupLink = () => {
    return "/search/group/"
}

export const subCatLink = (name) => {
    return "/search/sub_cat/"+encodeURIComponent(name)
}

export const countryLink = (name) => {
    return "/search/"+encodeURIComponent(name)
}

export const stateLink = (name) => {
    return "/search/state/"+encodeURIComponent(name)
}

export const cityLink = (name) => {
    return "/search/city/"+encodeURIComponent(name)
}