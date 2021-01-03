const express = require("express")
const files = express.Router()
const fs = require("fs")
import path from 'path'
import { error400 } from '../utils/Errors'

import { intOrMin, logger, okResponse } from "../utils/Funcs"
//logger.disableLogger()
const Jimp = require("jimp")

const IMAGES = ["jpg", "jpeg", "png"]
const MIN_IMAGE_WIDTH = 50
const getExt = url => {
    return path.extname(url).substring(1)
}

const removeExt = (filePath, ext) => {
    return filePath.replace(`.${ext}`, "")
}

const getFilePath = (localRoot, filePath, ext, width) => {
    return localRoot + removeExt(filePath, ext) + `${width? `___w-${width}` : ""}.${ext}`

}

const resize = (w, h, nw) => {
    return [nw, Math.round((h / w) * nw)]
}


const handler = (localRoot, cacheControl) => {
    files.get("/*", (req, res, next) => {
        var ext = getExt(req.path)
        var w = req.query.w

        var originalPath = getFilePath(localRoot, req.path, ext)
    
        if(!IMAGES.includes(ext) || !w || isNaN(w) || w < MIN_IMAGE_WIDTH) {
            next()
    
        } else {
            w = parseInt(w)
            var editPath = getFilePath(localRoot, req.path, ext, w)
            Jimp.read(editPath)
            .then(image => {
                image.getBuffer(image.getMIME(), (err, buff) => {
                    if(err) {
                        if(cacheControl) {
                            cacheControl(res, false)
                
                        }
                        res.contentType("text/html")
                        res.status(404).send(error400("The image was not found"))

                    } else {
                        if(cacheControl) {
                            cacheControl(res, true)
                
                        }
                        res.setHeader("Image-Status", "read")
                        res.contentType(image.getMIME())
                        res.end(buff, 'binary')
                    }
                })           
            })
            .catch(err => {
                Jimp.read(originalPath)
                .then(image => {
                    if(image.bitmap.width <= w) {
                        if(cacheControl) {
                            cacheControl(res, true)
                
                        }
                        res.setHeader("Image-Status", "original-read")
                        res.contentType(image.getMIME())

                        image.write(editPath)
                        res.end(buff, 'binary')

                    } else {
                        const size = resize(image.bitmap.width, image.bitmap.height, w)
                        //okResponse(res, {size: size})
                        image
                        .resize(size[0], size[1]) // resize
                        .quality(80) // set JPEG quality
                        
                        
                        image.getBuffer(image.getMIME(), (err, buff) => {
                            if(err) {
                                if(cacheControl) {
                                    cacheControl(res, false)
                        
                                }
                                res.contentType("text/html")
                                res.status(404).send(error400("The image was not found"))
        
                            } else {
                                if(cacheControl) {
                                    cacheControl(res, true)
                        
                                }
                                res.setHeader("Image-Status", "created")
                                res.contentType(image.getMIME())

                                image.write(editPath)
                                res.end(buff, 'binary')
                            }
                        })
                    }
                })
                .catch(e => {
                    res.contentType("text/html")
                    res.status(404).send(error400("The image was not found"))
                })
            })
            
        }
    })
    
    files.get('*', express.static(localRoot, { maxAge: 31557600 }))
    return files
}

module.exports = {handler: handler}