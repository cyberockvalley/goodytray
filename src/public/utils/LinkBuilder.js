export const productLink = (title, id, forceView) => {
    title += ""
    title = title.trim();
    title = title.replace(/[^-\dA-Z-a-z\s\.]/g, "");
    title = title.replace(/[\s\.]+/g, "-");
    if(title.startsWith("-"))title = title.substring(1);
    if(title.endsWith("-"))title = title.substring(0, title.length -1);
    return ("/products/"+title+`/${forceView? "1/" : ""}`+id).toLowerCase();
}

export const flashLink = () => {
    return `/search/?flash=1`
}

export const catLink = (name, id) => {
    return `/search/?cat=${id}`
}

export const subCatLink = (name, id) => {
    return `/search/?sub_cat=${id}`
}

export const countryLink = (name, id) => {
    return `/search/?country=${id}`
}

export const stateLink = (name, id) => {
    return `/search/?state=${id}`
}

export const cityLink = (name, id) => {
    return `/search/?city=${id}`
}