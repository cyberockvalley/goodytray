import { SITE_DOT_COM, NO_PROFILE_PHOTO_IMAGE } from "../../../Constants"
const uuidv4 = require('uuid/v4')
const qs = require("querystring")

//console.log switch(logger.enableLogger(), logger.disableLogger())
//console.log = function() {} also disables console.log
export const logger = function()
{
    var oldConsoleLog = null;
    var pub = {};

    pub.enableLogger =  function enableLogger() 
                        {
                            if(oldConsoleLog == null)
                                return;

                                console.log = oldConsoleLog;
                        };

    pub.disableLogger = function disableLogger()
                        {
                            oldConsoleLog = console.log;
                            console.log = function() {};
                        };

    return pub;
}()

export const resizeImageFile = function (settings) {
    var file = settings.file;
    var maxSize = settings.maxSize;
    var reader = new FileReader();
    var image = new Image();
    var canvas = document.createElement('canvas');
    var dataURItoBlob = function (dataURI) {
        var bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ?
            atob(dataURI.split(',')[1]) :
            unescape(dataURI.split(',')[1]);
        var mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var max = bytes.length;
        var ia = new Uint8Array(max);
        for (var i = 0; i < max; i++)
            ia[i] = bytes.charCodeAt(i);
        return new Blob([ia], { type: mime });
    };
    var resize = function () {
        var width = image.width;
        var height = image.height;
        if (width > height) {
            if (width > maxSize) {
                height *= maxSize / width;
                width = maxSize;
            }
        } else {
            if (height > maxSize) {
                width *= maxSize / height;
                height = maxSize;
            }
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(image, 0, 0, width, height);
        var dataUrl = canvas.toDataURL('image/jpeg');
        return dataURItoBlob(dataUrl);
    };
    return new Promise(function (ok, no) {
        if (!file.type.match(/image.*/)) {
            no(new Error("Not an image"));
            return;
        }
        reader.onload = function (readerEvent) {
            image.onload = function () { return ok(resize()); };
            image.src = readerEvent.target.result;
        };
        reader.readAsDataURL(file);
    });
}

export const blobToFile = (filename, blob) => {
    return new File([blob], filename, blob)
}

export const queries = (props) => {
    return qs.parse(props.location.search.substring(1))
}

export const okResponse = (res, data) => {
    res.status(200).json(data)
}

export const returnServerError = (res, data) => {
    res.status(500).json(data)
}

export const returnBadRequest = (res, data) => {
    res.status(400).json(data)
}

export const returnNotFound = (res, data) => {
    res.status(404).json(data)
}

export const overflows = (el) => {
       var curOverflow = el.style.overflowY;
       console.log("curOverflow", curOverflow, el, el.style)
    
       if ( !curOverflow || curOverflow === "visible" )
          el.style.overflow = "hidden";
    
       var isOverflowing = el.clientWidth < el.scrollWidth 
          || el.clientHeight < el.scrollHeight;
    
       el.style.overflow = curOverflow;
       console.log("el.style.overflow", el.style.overflow, isOverflowing)
       return true;//isOverflowing;
}
export const uniqueArray = (listValues) => {
    return listValues.filter(function(value, index, self) {
        return self.indexOf(value) === index
    })
}
export const removeObject = (object, array) => {
    array.splice(array.indexOf(object), 1)
}
export const isFile = data => {
    return data instanceof File
}
export const getExtFromMime = function(mime) {
    if(mime == "image/jpeg" || mime == "image/jpg") {
        return ".jpg"

    } else if(mime == "image/png") {
        return ".png"

    } else {
        return ""
    }
}
export const genFilename = (mime) => {
    return uuidv4() + '-' + Date.now() + getExtFromMime(mime)
}
export const remove = function(chrs, text) {
    text += ""
    while(text.includes(chrs[0]) || text.includes(chrs[1])) {
        text = text.replace(chrs[0], "").replace(chrs[1], "")
    }
    return text
}
export const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export const addQueryParam = (name, link, next) => {
    var state = name + "="
    if(!link.includes(state) ) {
      link += (link.includes("?") ? "&" : "?") + state
  
    }
    return link.replace(new RegExp(name + "=[^&]*"), state + next)
}
  
export const randNum = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
export const getEXT = (filename, includeDot) => {
    var index = filename.indexOf(".");
    if(!includeDot){
        index++;
    }
    return filename.substring(index);
}
export const mimeFromFilename = (filename) => {
    var ext = getEXT(filename, false);
    var mimeExtArray = {jpg: "image/jpeg", png: "image/png"};
    var mime = mimeExtArray[[ext.toLowerCase()]];
    console.log("MIME", mime)
    if(mime) { 
        return mime;

    } else {
        return "";
    }

}
export const currencyLogo = (name) => {
    const logos = {
        dollar: "$",
        naira: "#"
    }
    if(logos.name) {
        return logos.name;

    } else {
        return logos.dollar;
    }
}
export const truncText = (text, len, append) => {
    text += "";
    if(text.length <= len) {
      return text;

    } else {
      return text.substr(0, len)+(append?append:"...");
    }
}
export const dataCall = (e) => {
    const number = e.target.getAttribute("data-call");
    const callClass = e.target.getAttribute("data-call-class");
    e.target.innerHTML = formatPhoneNumber(number)+' <i class="'+callClass+'"></i>';
    call(number);
}
export const call = (number) => {
    window.location = "tel:"+number;
}
export const modalAlert = (msg, func) => {
    //alert(msg);
    
    
    if(func) {
        $("#modalOk").click(function() {
            $("#modalAlert").hide()
        }, func)

    } else {
        $("#modalOk").click(function() {
            $("#modalAlert").hide()
        })
    }
    $("#modalBody").text(msg)
    $("#modalAlert").show();
    console.log("#modal")
}

/*
export const decodeHTML = function (html) {
	var txt = document.createElement('textarea');
	txt.innerHTML = html;
	return txt.value;
};*/
export const userFromRes = res => {
    try {
        return res.locals.token_user
    }catch(e) {
        return null
    }
}
export const getValue = (object) => {
    return JSON.parse(JSON.stringify(object))
}
export const isProduction = () => {
    return process.env.NODE_ENV.toLowerCase().startsWith("prod")
}
export const buildError = (id, debugError, generalError) => {
    return !isProduction()? id + ": " + debugError + " -> " +generalError : generalError
}
export const intOrMin = (data, minValue) => {
    var intVal = parseInt(data)
    return isNaN(intVal) || intVal < minValue? minValue : intVal
}
export const getIdFromPath = path => {
    path = path.endsWith("/")? path.substring(0, path.length - 1) : path
    const paths = path.split("/")
    return parseInt(paths[paths.length - 1])
}
export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const getIdFromPath2 = (path, posFromEnd) => {
    path = path.endsWith("/")? path.substring(0, path.length - 1) : path
    const paths = path.split("/")
    return parseInt(paths[paths.length - (posFromEnd + 1)])
}
export const profilePhoto = (link) => {
    if(!link || link.length == 0) {
        return NO_PROFILE_PHOTO_IMAGE

    } else {
        return link
    }
}
export const commaNum = (num) => {
    num += "";
    console.log("NUM BEFORE", num);
    //remove non-digit characters
    num = num.replace(/\D/g, "");
    //add commas before every 3 digits
    num = num.split(/(?=(?:\d{3})+$)/).join(",");
    return num;
}
const formatPhoneNumber = (num) => {
    num += "";
    var plus = "";
    if(num.startsWith("+"))plus = "+"; num = num.substr(1);
    //remove non-digit characters
    num = num.replace(/\D/g, "");
    //add commas before every 3 digits
    // /(?=(?:\d{3})+$)/
    // (?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}
    num = num.split(/(?=(?:\d{3})+(?:\d{4})$)/).join("-");
    num = num.split(/(?=(?:\d{4})+$)/).join("-");
    return plus+num;
}
export const isValidNumber = function(number) {
    return (number != null && number.length > 0)
}

export const isValidEmail = function(email) {
    return (email != null && email.length > 0)
}

export const isClientSide = function() {
    return (typeof window !== 'undefined')
}

export const getObjectValue = (object) => {
    return JSON.parse(JSON.stringify(object))
}

export const getCopy = function() {
    const date = new Date()
    return "© 2019 "+SITE_DOT_COM;
}

export const id = function(ele) {
    return document.getElementById(ele)
}

export const cls = function(ele) {
    return document.getElementsByClassName(ele)
}

export const jsonEmpty = function (obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key)) return false
    }
    return true
}
String.prototype.shuffle = function() {
    var a = this.split(""), 
    n = a.length

    for(var i = n- 1; i > 0; i--) {
        var j = Math.floor(Math.random * (i + 1));
        var tmp = a[i];
        a[i] = a[j]
        a[j] = tmp
    }
    return a.join("")
}
String.prototype.shuffleHash = function() {
    var a = this.split(""), 
    n = a.length

    for(var i = n- 1; i > 0; i--) {
        var j = Math.floor(Math.random * (i + 1));
        var tmp = a[i].hashCode;
        a[i] = a[j]
        a[j] = tmp
    }
    return a.join("")
}
String.prototype.hashCode = function() {
    var hash = 0; i, this.chr
    if(this.length === 0)return hash
    for(i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i)
        hash = ((hash << 5) - hash) + chr
        hash |= 0//convert to 32 bit integer
    }
    return hash
}
export const randomString = function (length) {
    var text = "ABCDEFGHIJKLMNOPQRSTUVWXWZabcdefghijklmnopqrstuvwxyz0123456789"
    text = text.shuffle()
    return length >= text.length? text : text.substr(0, length)
}

export const randomHashString = function (length) {
    var text = "ABCDEFGHIJKLMNOPQRSTUVWXWZabcdefghijklmnopqrstuvwxyz0123456789"
    text = text.shuffleHash()
    return length >= text.length? text : text.substr(0, length)
}


const helpers = {
    helper1: function(){

    },
    helper2: function(param1){

    },
    helper3: function(param1, param2){

    }
}

export default helpers;