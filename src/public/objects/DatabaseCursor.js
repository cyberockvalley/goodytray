import { listResponse } from "../utils/ResponseTemplates"

/**
 * This class set an offset for the sql LIMIT command that
 * enables us to know if the page as a previous page
 * @param {int} page the database page performing query for
 * @param {int} rowsPerPage the max number of items per page
 */
class DatabaseCursor {
    /**
     * 
     * @param {int} page the database page performing query for
     * @param {int} rowsPerPage the max number of items per page
     */
    constructor(page, rowsPerPage) {
        this.page = page
        this.rowsPerPage = rowsPerPage
        this.init()
    }

    init = () => {
        //if the page is 1, we subtract 1 from page to get 
        // to the start of the first page(requested page)
        //if the page is not 1, i.e greater then we subtract 2 from page
        // to get to the start of the previous page.
        //By comparing the number of items returned to rowsPerPage * 2,
        // we can 
        var offsetConstant = 1//page == 1? 1 : 2
        this.offset = (this.page - offsetConstant) * this.rowsPerPage
        this.limit = this.rowsPerPage + 1
    }

    getResult = (results) => {
        if(results.length > this.rowsPerPage) results.pop()
        return Object.assign(listResponse(), {
            error: results.length == 0? "Not found!" : null,
            list: results, 
            has_prev: this.page > 1, 
            has_next: results.length > this.rowsPerPage, 
            page: this.page
        })
    }
}
export default DatabaseCursor