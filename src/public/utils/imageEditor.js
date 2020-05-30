let Jimp = require('jimp')
    ,_ = require('lodash');/*
    ,path = require('path')
    ,Promise = require('bluebird')
    ,fileType = require('file-type');*/
import {LOGO_ADDR} from "../../../Constants"
import { getRandomInt } from "./Funcs";

const resize = (w, h, nw) => {
    return [nw, (h / w) * nw]
}
module.exports = {
    async waterMark(files) {
        Jimp.read(LOGO_ADDR, (err, logo) => {
            console.log("TheFileX", "LOGO_ERROR", err)
            console.log("TheFileX", "LOGO", logo)
            logo.opacity(0.7)
            _.forEach(files, (file)=>{
                //Create a new promise for each image processing
                console.log("TheFileX", file)
                var logoHolder = logo
                Jimp.read(file, (imageErr, image) => {
                    console.log("TheFileX", "IMAGE_ERROR", imageErr)
                    console.log("TheFileX", "IMAGE", image)
                    const nSize = resize(logoHolder.bitmap.width, logoHolder.bitmap.height, Math.ceil(image.bitmap.width / 7))
                    logoHolder.resize(nSize[0], nSize[1])
                    image.composite(logoHolder, image.bitmap.width - logo.bitmap.width - 5, image.bitmap.height - logo.bitmap.height - 5, [Jimp.BLEND_DESTINATION_OVER, 0.2, 0.2])
                    .write(file);
                })
            });
        })
        
       

        //Return promise array
        //return Promise.all(promises);
    }
}