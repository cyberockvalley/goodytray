import React, { Component } from 'react'
import { SITE_NAME, API_ROOT, SITE_DOT_COM, AD_PACKAGES, SERVER_ADDR } from '../../../Constants'
const browser = require('../utils/Browser')
import {id, cls, commaNum, remove, removeObject, currencyLogo, getObjectValue, queries, uniqueArray, isFile, jsonEmpty} from '../utils/Funcs'
import {MAX_PRODUCT_PHOTOS_SIZE} from "../../../Constants"
import { productLink } from '../utils/LinkBuilder'
const StripeView = require("../components/third_party/stripe/StripeView")
import TextView from "./widgets/TextView"

class SellEdit extends Component {
  constructor(props) {
    super(props)
    this.state()
    this.state.seven_days_advert = {
      amount: AD_PACKAGES.paid_package_b.amount,
      description: "Payment to get more people to see your ad for 7 days"
    },
    this.state.thirty_days_advert = {
      amount: AD_PACKAGES.paid_package_c.amount,
      description: "Payment to get more people to see your ad for 30 days"
    }
    this.state.payment_data = {
      amount: this.state.thirty_days_advert.amount,
      currency: "usd",
      currency_symbol: "$",
      description: this.state.thirty_days_advert.description,
      name: props.initialData.user.fullname,
      email: props.initialData.user.email
    }
    this.state.user = props.initialData.user
    this.state.fullname = props.initialData.user.fullname

    this.state.number = props.initialData.user.number
    this.state.email = props.initialData.user.email

    //set arrays
    this.state.cats = props.initialData.cats
    this.state.countries = props.initialData.countries
    this.state.currency_symbols = props.initialData.currency_symbols
    this.state.price_currency_symbol = this.state.currency_symbols[0]
    
    this.handleChange = this.handleChange.bind(this)
    this.handleIntChange = this.handleIntChange.bind(this)
    this.handleSingleCheckbox = this.handleSingleCheckbox.bind(this)
    this.handleAttrCheckbox = this.handleAttrCheckbox.bind(this)
    this.handleAttrSelect = this.handleAttrSelect.bind(this)
    this.handleAttrInput = this.handleAttrInput.bind(this)
    this.onPhotoChangedHandler = this.onPhotoChangedHandler.bind(this)
    this.removePhoto = this.removePhoto.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  state () {
    
    this.state = {
      queries: queries(this.props),
      product: null,
      cat: -1,
      sub_cat: -1,
      country: -1,
      state: -1,
      city: -1,
      price_currency_symbol: '',
      title: '',
      desc: '',
      price: '',
      photos: [],
      photo_size: 0,
      loaded: 0,
      attrs: [],
      attributes: "",

      user: null,
      fullname: '',
      number: '',
      email: '',
      cats: [],
      sub_cats: [],
      countries: [],
      states: [],
      cities: [],
      input_attrs: [],
      checkbox_attrs: [],
      select_attrs: [],
      compulsory_attrs: [],

      
      currency_symbols: [],
      payment_form_visible: false
    }
  }

  getProduct = () => {
    if(this.state.product) {
      return this.state.product

    } else if(this.state.queries) {
      const product = {}
      if(this.state.queries.cat > -1) {
        product.cat_id = parseInt(this.state.queries.cat)
      }
      if(this.state.queries.sub_cat > -1) {
        product.sub_cat_id = parseInt(this.state.queries.sub_cat)
      }
      if(this.state.queries.country > -1) {
        product.country_id = parseInt(this.state.queries.country)
      }
      if(this.state.queries.state > -1) {
        product.state_id = parseInt(this.state.queries.state)
      }
      if(this.state.queries.city > -1) {
        product.city_id = parseInt(this.state.queries.city)
      }
      return jsonEmpty(product)? null : product

    } else {
      return null
    }
  }

  resetState() {
    this.setState({del_photos: []})
    const product = this.getProduct()
    if(product) {
      var hide = product.hide_phone_number == 1? 1 : 0
      this.state.hide_phone_number = hide
      this.setState({hide_phone_number: hide})

      if(product.cat_id > -1) {
        this.state.cat = product.cat_id
        this.setState({cat: product.cat_id})
        this.onCatChanged()
        console.log("QueryLike", product.cat_id, this.state.cat, product)

        this.state.sub_cat = product.sub_cat_id
        this.setState({sub_cat: product.sub_cat_id})
        this.onSubCatChanged()
      }

      if(product.country_id > -1) {
        this.state.country = product.country_id
        this.setState({country: product.country_id})
        this.onCountryChanged()

        this.state.state = product.state_id
        this.setState({state: product.state_id})
        this.onStateChanged()

        if(product.city_id > -1) {
          this.state.city = product.city_id
          this.setState({city: product.city_id})
        }
      }

      
      if(product.attrs) {
        this.state.attrs = product.attrs
        this.setState({attrs: product.attrs})
      }

      if(product.title) {
        this.state.title = product.title
        this.setState({title: product.title})
      }

      if(product.description) {
        this.state.desc = product.description
        this.setState({desc: product.description})
      }

      if(product.currency_symbol) {
        this.state.price_currency_symbol = product.currency_symbol
        this.setState({price_currency_symbol: product.currency_symbol})
      }

      if(product.price) {
        this.state.price = product.price
        this.setState({price: commaNum(product.price)})
      }

      /*
      var i = 0
      while(i < states.length) {
        try {
          this.setState(states[i])
        }catch(e) {
          console.log("SET_ERROR", e)
        }
        i++
      }*/

      //set photos
      console.log("EditProduct", product)
      i = 0
      const files = product.photos? product.photos.split(",") : []
      const maxUpload = 20 - files.length
      while(i < maxUpload) {
        files.push(null)
        i++
      }
      this.setState({photos: files})

    } else {
      const states = [
        {hide_phone_number: 0},
        {cat: -1},
        {sub_cat: -1},
        {country: -1},
        {state: -1},
        {city: -1},
        {title: ""},
        {desc: ""},
        {price_currency_symbol: ""},
        {price: ""},
        {photos: []},
        {photo_size: 0},
        {loaded: 0},
        {attrs: []},
  
        {sub_cats: []},
        {states: []},
        {cities: []},
        {input_attrs: []},
        {checkbox_attrs: []},
        {select_attrs: []},
        {compulsory_attrs: []}
      ]

      var i = 0
      while(i < states.length) {
        try {
          this.setState(states[i])
        }catch(e) {
          console.log("SET_ERROR", e)
        }
        i++
      }
  
      //set photos
      i = 0
      const files = []
      while(i < 20) {
        files.push(null)
        i++
      }
      this.setState({photos: files})
    }
    
  }

  componentDidMount() {
    this.setState({queries: queries(this.props)})
    const id = this.state.queries.id
    console.log("productId", id)
    if(id > -1) {
        //get load product from id
        this.onServerRequest()//to show the loading indicator
        browser.axios.get(API_ROOT + "products/details?vi=1&id="+id)
        .then(response => {
            if(response.data.details) {
                const product = response.data.details
                if(!this.props.initialData.user || this.props.initialData.user.id != product.user_id) {
                  alert("You don't have permission to edit this ad")
                  window.location.href = productLink(product.title, id)
                }
                //set attributes
                var attrs = response.data.details.attrs
                if(attrs) {
                  if(attrs.startsWith("_")) attrs = attrs.substring(1)
                  if(attrs.endsWith("_")) attrs = attrs.substring(0, attrs.length - 1)
                  product.attrs = attrs.split(",")
                }

                console.log("Product", 2, product)
                this.setState({product_id: id})
                this.state.product_id = id
                this.setState({product: product})
                this.resetState()
                this.onServerResponse()

            } else {
                console.log("No product from response:", response.data, API_ROOT + "products/details?id="+id)
            }

        })
        .catch(e => {
            console.log("error from request:", e)
        })

    } else {
        this.resetState()
    }
  }

  componentDidUpdate(prevProps) {
    console.log("update")
  }

  removeErrors() {
    var errs = cls("fw-field__error");

    if(errs.length > 0) {
        for(var i = 0; i < errs.length; i++) {
            errs[i].classList.add(["hide"])
        }
    }
  }

  setError(elId, error) {
    var err = id(elId + "-error")
    err.innerHTML = error
    err.classList.remove(["hide"])
  }

  onServerRequest() {
    id("spiner").classList.remove(["hide"])
    id("ad-form").classList.add(["hide"])
  }

  onServerResponse() {
    id("spiner").classList.add(["hide"])
    id("ad-form").classList.remove(["hide"])
  }

  isEdit = () => {
    return this.state.product? true : false
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.removeErrors()
    var hasError = false

    const editProduct = {

    }
    const product = {

    }

    const allowed_packages = ["0", "1", "2"]
    if(!this.state.paid_package || !allowed_packages.includes(this.state.paid_package)) {
      this.setError("paid_package", "Please select a package")
      hasError = true
    }
    
    product.hide_phone_number = this.state.hide_phone_number
    try {
      editProduct.hide_phone_number = this.state.product.hide_phone_number
    }catch(e) {}
    console.log("product.hide_phone_number", product.hide_phone_number, this.state.hide_phone_number, this.state)

    if(this.state.cat == -1) {
      this.setError("cat", "Please select a category")
      hasError = true

    } else {
      product.cat = this.state.cat
      try{
        editProduct.cat = this.state.product.cat || this.state.product.cat_id
      }catch(e) {}
    }

    if(this.state.sub_cat == -1) {
      this.setError("sub_cat", "Please select a sub category")
      hasError = true

    } else {
      product.sub_cat = this.state.sub_cat
      try{
        editProduct.sub_cat = this.state.product.sub_cat || this.state.product.sub_cat_id
      }catch(e) {}
    }
    
    
    console.log("this.state.compulsory_attrs", this.state.compulsory_attrs)
    var hasAttrError = false
    for(var index = 0; index < this.state.compulsory_attrs.length; index++) {
      var key = this.state.compulsory_attrs[index]
      if(this.getAttrKeyValues(key).length == 0) {
        this.setError(key, key+" cannot be empty")
        hasError = hasAttrError = true
      }
    }
    if(!hasAttrError) {
      product.attrs = this.state.attrs
      try{
        editProduct.attrs = this.state.product.attrs
      }catch(e) {}
    }

    var noPhoto = true
    var hasOnlyPhotoUrls = true
    const photoFilePlusUrl = []
    const formData = new FormData()
    for(var i = 0; i < this.state.photos.length; i++) {
      if(this.state.photos[i] != null && this.state.photos[i] != "") {
        noPhoto = false
        if(isFile(this.state.photos[i])) {
          formData.append("file", this.state.photos[i])
          photoFilePlusUrl.push(i)
          hasOnlyPhotoUrls = false
        } else {
          photoFilePlusUrl.push(this.state.photos[i])
        }
        
      }
    }
    console.log("noPhoto", noPhoto)
    console.log("formData a", JSON.stringify(formData))
    if(noPhoto) {
      this.setError("photo", "Please upload at least one photo")
      hasError = true
    }

    if(this.state.currency_symbols.indexOf(this.state.price_currency_symbol) == -1) {
      this.setError("price", "Please select your currency")
      hasError = true

    } else if(this.state.price.length == 0 || isNaN(parseInt(this.state.price))) {
      this.setError("price", "Please enter your price")
      hasError = true

    } else {
      product.price_currency_symbol = this.state.price_currency_symbol
      try{
        editProduct.price_currency_symbol = this.state.product.price_currency_symbol || this.state.product.currency_symbol
      }catch(e) {}

      product.price = parseInt(remove([",", "."], this.state.price))
      try{
        editProduct.price = parseInt(remove([",", "."], this.state.product.price))
      }catch(e) {}
    }

    if(this.state.title.length == 0) {
      this.setError("title", "Please enter advert title")
      hasError = true

    } else {
      product.title = this.state.title
      try{
        editProduct.title = this.state.product.title
      }catch(e) {}
    }

    if(this.state.desc.length == 0) {
      this.setError("desc", "Please enter description")
      hasError = true

    } else {
      product.desc = this.state.desc
      try{
        editProduct.desc = this.state.product.desc || this.state.product.description
      }catch(e) {}
    }

    if(this.state.country == -1) {
      this.setError("country", "Please select country")
      hasError = true

    } else {
      product.country = this.state.country
      try{
        editProduct.country = this.state.product.country || this.state.product.country_id
      }catch(e) {}
    }

    if(this.state.state == -1) {
      this.setError("state", "Please select state")
      hasError = true

    } else {
      product.state = this.state.state
      try{
        editProduct.state = this.state.product.state || this.state.product.state_id
      }catch(e) {}
    }

    if(this.state.city == -1) {
      this.setError("city", "Please select city")
      hasError = true

    } else {
      product.city = this.state.city
      try{
        editProduct.city = this.state.product.city || this.state.product.city_id
      }catch(e) {}
    }

    if(!hasError) {
      this.onServerRequest()
      if(hasOnlyPhotoUrls) {
        //skip the photo files upload since there is none
        //send the product with the photo urls to the server
        product.photos = photoFilePlusUrl
        try{
          editProduct.photos = this.state.product.photos.split(",")
        }catch(e) {}

        //Prevent unneccessary server request if nothing has changed
        if(JSON.stringify(product) == JSON.stringify(editProduct)) {
          this.sponsorAd(this.state.title, this.state.product.id)
          console.log("ServerRequestRequired", false)
          return
        }
        console.log("ServerReuestRequired", true)
        
        this.uploadProduct(product, this.isEdit())

      } else {
        //upload the photo files then join the returned photo urls to the 
        // the product photo urls and send the product with the photo urls to the server
        const config = {/*
          headers: {
            'content-type': 'application/x-www-form-urlencoded'//'multipart/form-data'
          },*/
          onUploadProgress: ProgressEvent => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
            })
          }
        }
        browser.axios.post(API_ROOT + "products/upload/photos", formData)
        .then(response => {
          console.log("photoUrls", "response.data", response.data)
          if(response.data.status == 1) {
            const fileNames = response.data.filenames
            var fileNameIndex = 0
            const photoUrls = []
            for(var i = 0; i < photoFilePlusUrl.length; i++) {
              if(photoFilePlusUrl[i] == i) {
                photoUrls.push(fileNames[fileNameIndex])
                fileNameIndex++

              } else {
                photoUrls.push(photoFilePlusUrl[i])
              }
            }
            product.photos = photoUrls
            console.log("photoUrls", photoUrls)
            this.uploadProduct(product, this.isEdit())

          } else {
            console.log("photoUrls", "failed", response.data.message)
            this.setError("photo", response.data.message)
            this.onServerResponse()
          }
        })
        .catch(err => {
          console.log("UploadError: "+JSON.stringify(err))
          this.onServerResponse()
        })

      }

    }
    
  }

  uploadProduct = (product, isEdit) => {
    if(isEdit) {
      product.id = this.state.product.id
      product.user_id = this.state.product.user_id
      product.del_photos = this.state.del_photos
      product.prev_cat = this.state.product.cat_id || this.state.product.cat
      product.prev_sub_cat = this.state.product.sub_cat_id || this.state.product.sub_cat
      product.prev_country = this.state.product.country_id || this.state.product.country
      product.prev_state = this.state.product.state_id || this.state.product.state
      product.prev_city = this.state.product.city_id || this.state.product.city
      
      console.log("productEdit", product, this.state.product)
    }
    browser.axios.post(API_ROOT + "products/" + (!isEdit?"upload/":"edit/"), {product: product})
    .then(response => {
      const respData = response.data
      console.log("respData: ", respData)
      if(respData.status == 1) {
        const productId = respData.product_id
        console.log("pid", productId)
        //alert("Success")
        this.state.product = product
        this.setState({product: product})
        this.sponsorAd(this.state.title, productId)
      } else {
        if(respData.form_errors && respData.form_errors.length > 0) {console.log("ERR", 2)
          for(var er = 0; er < respData.form_errors.length; er++) {
            //console.log("respData.form_errors[er].key, respData.form_errors[er].value: ", respData.form_errors[er].key, respData.form_errors[er].value)
            this.setError(respData.form_errors[er].key, respData.form_errors[er].value)
          }
          this.onServerResponse()

        } else if(respData.error || respData.message) {
          this.onServerResponse()
          alert(respData.error || respData.message)

        } else {
          this.onServerResponse()
          alert("An unexpected error occurred")
        }
        
      }
    })
    .catch(err => {
      console.log("UploadError inner: "+JSON.stringify(err))
      this.onServerResponse()
    })
  }

  onPaymentMessage = (message) => {
    console.log("onStripeMessage", message)
    const msg = message.message
    const paymentSuccessfull = message.payment_successfull
    if(paymentSuccessfull) {
      alert("Payment successfull. Your product has been updated with the purchased package.")
      window.location.href = productLink(this.state.title, this.state.product_id)
    } else {
      alert(msg)
    }
    this.hidePaymentForm()
  }
  showPaymentForm = () => {
    this.setState({payment_form_visible: true})
    this.onServerRequest()
  }
  hidePaymentForm = () => {
    this.setState({payment_form_visible: false})
    this.onServerResponse()
  }
  sponsorAd = (title, productId) => {
    this.state.product_id = productId
    if(parseInt(this.state.paid_package) > 0) {
      var paymentSubData
      switch(parseInt(this.state.paid_package)) {
        case 1:
          paymentSubData = this.state.seven_days_advert
          break
        case 2:
          paymentSubData = this.state.thirty_days_advert
      }
      this.state.payment_data.id = productId
      this.state.payment_data.amount = paymentSubData.amount
      this.state.payment_data.description = paymentSubData.description
      this.showPaymentForm()
    } else {
      window.location.href = productLink(title, productId)
    }
  }

  keyValue = (key, value) => {
    return key + ":" + value
  }

  handleSingleCheckbox = e => {
    console.log("SingleChecked", e.target.checked)
    var value = e.target.checked? e.target.value : e.target.getAttribute("empty-value")
    if(e.target.getAttribute("data-type") == "number") value = parseInt(value)
    this.state[e.target.name] = value
    this.setState({[e.target.name]: value})
    console.log("SingleCheck", e.target.name, this.state[e.target.name], this.state.hide_phone_number)
  }

  handleAttrCheckbox = e => {
    const keyValuePair = this.keyValue(e.target.name, e.target.value)
    const attrs = this.state.attrs
    //Since this is a checkbox, then
    //if the attributes already contains the key-value pair of this checkbox,
    // we remove the key-value pair from the attributes list, else we add it
    if(attrs.includes(keyValuePair)) {
      removeObject(keyValuePair, attrs)

    } else {
      attrs.push(keyValuePair)
    }
    this.setState({attrs: attrs})
  }

  getAttrKeyValues = (key) => {
    const keyPair = this.keyValue(key, "")
    const attrsString = this.state.attrs.join()
    if(!attrsString.includes(keyPair)) return []
    const regex = RegExp(keyPair + "([^,\\:]+)")
    const values = attrsString.match(regex)
    const valuesOnly = []
    for(var i = 0; i < values.length; i++) {
      if(!values[i].includes(":")) {
        valuesOnly.push(values[i])
      }
    }
    console.log("getAttrKeyValues", values, regex, valuesOnly)
    return valuesOnly
  }

  removeAttrIfExists = key => {
    const attrs = this.state.attrs
    const prevKeyValues = this.getAttrKeyValues(key)
    if(prevKeyValues) {
      for(var i = 0; i < prevKeyValues.length; i++) {
        removeObject(this.keyValue(key, prevKeyValues[i]), attrs)
      }
      this.setState({attrs: attrs})
    }
  }

  isValidAttr = (key, value) => {
    return value && value.length > 0 && !value.toLowerCase().includes("select")
  }


  handleAttrSelect = e => {
    const keyValuePair = this.keyValue(e.target.name, e.target.value)
    this.removeAttrIfExists(e.target.name)
    const attrs = this.state.attrs
    if(this.isValidAttr(e.target.name, e.target.value)) {
      attrs.push(keyValuePair)
      this.setState({attrs: attrs})
    }
  }

  handleAttrInput = e => {
    const keyValuePair = this.keyValue(e.target.name, e.target.value)
    this.removeAttrIfExists(e.target.name)
    const attrs = this.state.attrs
    attrs.push(keyValuePair)
    this.setState({attrs: attrs})
  }

  handleIntChange = e => {
    const value = parseInt(e.target.value)
    this.state[e.target.name] = value
    this.setState({[e.target.name]: value})
    console.log("handleIntChange", e.target.name, e.target.value, value)

    switch(e.target.name) {
      case "cat":
        this.onCatChanged()
        break
      case "sub_cat":
        this.onSubCatChanged()
        break
      case "country":
        this.onCountryChanged()
        break
      case "state":
        this.onStateChanged()
        break
    }
  }
  handleChange = (e) => {
    console.log(e.target.name +": "+e.target.value)
    if(!e.target.getAttribute("data-limit") || e.target.value.length <= parseInt(e.target.getAttribute("data-limit"))) {
      if(e.target.getAttribute("data-type") && e.target.getAttribute("data-type") == "number") {
        var number = commaNum(e.target.value)
        if(number.length > 0) {
          this.state[e.target.name] = number
          this.setState({[e.target.name]: number})
        }

      } else {
        this.state[e.target.name] = e.target.value
        this.setState({[e.target.name]: e.target.value})
      }

    } else {
      e.target.value = this.state[e.target.name]
    }
  }


  clearAllFields = e => {
    e.preventDefault
    console.log("clearAllFields")
    this.resetState()
  }
  removePhoto = e => {
    const photos = this.state.photos
    console.log("removeTarget", e.target)
    const index = parseInt(e.target.getAttribute("photo-index"))
    console.log("photoIndex", index)
    const photo = photos[index]
    this.state.photo_size -= photo.size
    photos.splice(index, 1)
    this.state.photos = photos
    this.setState({photos: photos})
    const delPhotos = this.state.del_photos
    if(!isFile(photo) && !delPhotos.includes(photo)) {
      delPhotos.push(photo)
      this.setState({del_photos: delPhotos})
    }
  }

  onPhotoChangedHandler = e => {
    this.setState({loaded: 0})
    const files = e.target.files
    var nextPhotoIndex = parseInt(e.target.getAttribute("photo-index"))
    console.log("e.target.getAttribute: "+e.target.getAttribute("photo-index"))
    
    const photos = this.state.photos
    for(var i = 0; i < files.length; i++) {
      console.log("id: "+i)
      console.log("photos.length: "+photos.length)
      console.log("nextPhotoIndex: "+nextPhotoIndex)
      if(nextPhotoIndex >= photos.length) {
        nextPhotoIndex = 0
      }
      while(photos[nextPhotoIndex] != null || photos[nextPhotoIndex] == "") {
        nextPhotoIndex++
        if(nextPhotoIndex >= photos.length) nextPhotoIndex = 0
      }
      if(this.state.photo_size + files[i].size > MAX_PRODUCT_PHOTOS_SIZE) {
        console.log("max reached")
        this.setError("photo", "You've exceded the total maximum file size allowed")

      } else {
        photos[nextPhotoIndex] = files[i]
        this.state.photo_size += files[i].size
      }
      console.log("asadasdsd")
      console.log("photo-size:", files[i].size, "totalSize:", this.state.photo_size, "maxSize:", MAX_PRODUCT_PHOTOS_SIZE)
      nextPhotoIndex++
    }
    this.setState({photos: photos})
    console.log("photos")
    console.log(this.state.photos)
  }

  resetCustomInputs() {
    this.setState({input_attrs: []})
    this.setState({select_attrs: []})
    this.setState({checkbox_attrs: []})
    this.setState({compulsory_attrs: []})
  }

  onCountryChanged() {
    const eid = this.state.country
    this.state.state = -1
    this.setState({state: -1})
    this.state.city = -1
    this.setState({city: -1})
    console.log("id = "+eid)
    const section = id("state-section")
    const section2 = id("city-section")
    section.classList.add(["disabled-section"], ["loading-section"])
    section2.classList.add(["disabled-section"])
    this.setState({states: []})
    this.setState({cities: []})
    browser.axios.get(API_ROOT + "states?cid="+eid)
    .then(response => {
      this.setState({states: response.data.states})
      section.classList.remove(["disabled-section"], ["loading-section"])
    })
  }

  onStateChanged() {
    const eid = this.state.state
    this.state.city = -1
    this.setState({city: -1})
    console.log("id = "+eid)
    const section = id("city-section")
    section.classList.add(["disabled-section"], ["loading-section"])
    this.setState({cities: []})
    browser.axios.get(API_ROOT + "cities?sid="+eid)
    .then(response => {
      this.setState({cities: response.data.cities})
      section.classList.remove(["disabled-section"], ["loading-section"])
    })
  }

  onCatChanged () {
    const eid = this.state.cat
    this.state.sub_cat = -1
    this.setState({subs_cat: -1})
    console.log("id = "+eid)
    const section = id("sub_cat-section")
    section.classList.add(["disabled-section"], ["loading-section"])
    this.resetCustomInputs()
    //id("custom-section").classList.add(["disabled-section"])
    browser.axios.get(API_ROOT + "sub_cats?cid="+eid)
    .then(response => {
      this.setState({sub_cats: response.data.sub_cats})
      section.classList.remove(["disabled-section"], ["loading-section"])
    })
  }

  onSubCatChanged () {
    const eid = this.state.sub_cat
    console.log("scid = "+eid)
    this.state.attrs = []
    this.setState({attrs: []})
    this.resetCustomInputs()
    const section = id("custom-section")
    section.classList.add(["disabled-section"], ["loading-section"])
    browser.axios.get(API_ROOT + "attrs?scid="+eid)
    .then(response => {
      console.log("response.data.attrs: "+JSON.stringify(response.data.attrs))
      const attrs = response.data.attrs
      if(attrs != null && attrs.length > 0) {
        const input_attrs = []
        const select_attrs = []
        const checkbox_attrs = []
        const compulsories = []
        for(var i = 0; i < attrs.length; i++) {
          if(attrs[i].input_type.startsWith("input")) {
            input_attrs.push(attrs[i])

          } else if(attrs[i].input_type.startsWith("select")) {
            select_attrs.push(attrs[i])
          
          } else if(attrs[i].input_type.startsWith("check_box")) {
            checkbox_attrs.push(attrs[i])
          
          }

          if(!attrs[i].allow_null) {
            compulsories.push(attrs[i].key)
          }
        }
        console.log("input_attrs", input_attrs)
        console.log("select_attrs", select_attrs)
        console.log("checkbox_attrs", checkbox_attrs)

        this.setState({input_attrs: input_attrs})
        this.setState({select_attrs: select_attrs})
        this.setState({checkbox_attrs: checkbox_attrs})
        this.setState({compulsory_attrs: compulsories})
      }
      section.classList.remove(["disabled-section"], ["loading-section"])
    })
  }

  photoUrl = photo => {
    return isFile(photo)?URL.createObjectURL(photo) : photo
  }

  render() {
    const allow_null_class = "b-form-section h-mb-15"
    const no_null_class = allow_null_class + " b-form-section--required"
    
    return (
      <div className="js-body-wrapper b-body-wrapper">
 <div className="js-content h-bg-grey h-flex" data-use-spa="true" data-web-id="1572972604##53410168c7cbd8ec896909dc9c93feaa3f3b8af6" id="js-vue-scope">
  <div className="b-stickers-wrapper" id="js-stickers-wrapper">
  </div>
  <div className="b-js-load-app-replacement js-load-app-replacement" style={{display: "none"}}>
  </div>
  <div style={{marginBottom: "50px"}} className="b-app-header-wrapper">
        <nav className="navbar b-app-header navbar-fixed-top">
          <div className="container-fluid nav-container" style={{margin: "0px"}}>
            <div className="navbar-header">
              <a href="/" className="navbar-brand logo font-bask-normal text-left">
              <img src="/public/logo.png" width="45" alt="logo" className="d-inline-block align-middle mr-2"/>
                {SITE_NAME}
              </a>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              
            </div>
          </div>
        </nav>
        <div className="form-group">
        </div>
  </div>
  
  <div className="h-bg-grey container h-pt-10 h-pb-15">
   <div>

    {
      this.state.user.email.email_not_confirmed?
      <div className="b-notification b-notification__red qa-confirm-email-notification">
      <div className="h-ph-25 h-pv-7 h-dflex h-flex-main-center h-flex-dir-column">
        <div className="b-notification-text">
          <div className="h-main-gray-force">
              <div className="h-font-18 h-darker-red h-bold h-mb-5">Your ad won't be posted unless you confirm your email address!</div>
              <div>
                Email: <b>{this.state.user.email}</b> If you did not receive the email with confirmation link you can request it again.
              </div> 
              <div>
                <form name="baseform" method="post" validate="true" action="/resend-confirmation-email.html">
                  <input id="csrf_token" name="csrf_token" type="hidden" value="1573919242##f3d9acaa6df8f64e4b320384d393ff92ba5888b5"/>
                    <button className="b-button b-button--black-light b-button--bg-transparent b-button--border-radius-5 b-button--size-small-2 h-mt-10">
                      Resend email
                    </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      :
      ""
    }

    <div className="h-text-center h-mb-20 h-mt-10">
     <h1 className="qa-h1-title h-mv-0">
      <b className="h-font-26">
       Post Ad
      </b>
     </h1>
    </div>
    <div className="h-flex-center h-mv-20 hide" id="spiner">
     <img height="50" src="/public/res/images/static/spin.svg" width="50"/>
    </div>
    <form id="ad-form" className="ad-form" noValidate onSubmit={this.handleSubmit}>
     {/*<input name="csrf_token" type="hidden" value="1572972604##53410168c7cbd8ec896909dc9c93feaa3f3b8af6"/>*/}
     <div className="block h-p-15 b-content-area b-content-area--shadow" data-v-2f9b1610="">
      <div className="h-hflex h-flex-cross-center h-mb-5" data-v-2f9b1610="">
       <h4 className="h-flex" data-v-2f9b1610="">
        <b data-v-2f9b1610="">
         Ad Details
        </b>
       </h4>
       <button onClick={this.clearAllFields} className="qa-clear-all-fields-button js-clear-fields b-button b-button--primary-light b-button--size-small" data-v-2f9b1610="" type="button">
        Clear all fields
       </button>
      </div>

      <div className="h-max-width-300 h-phone-max-width-100p" data-v-2f9b1610="">
      
       <div id="cat-section" data-v-2f9b1610="">
         <div className=" b-form-section h-mb-15 qa-choose-category b-form-section--required">
          <label className="b-form-section__title">
           Category
          </label>
          <div className="form-group">
            <select className="form-control" name="cat" value={this.state.cat} onChange={this.handleIntChange}>
              <option value={-1}>--- Choose category ---</option>
              {this.state.cats.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <span id="cat-error" className="fw-field__error qa-fw-field__error hide">
              this field is required.
            </span>
          </div>
         </div>
        </div>

        <div id="sub_cat-section" data-v-2f9b1610="" className={parseInt(this.state.cat) == -1? "disabled-section":""}>
         <div className="b-form-section h-mb-15 qa-choose-category b-form-section--required">
          <label className="b-form-section__title">
           Sub Category
          </label>
          <div className="form-group">
            <select className="form-control" name="sub_cat" value={this.state.sub_cat} onChange={this.handleIntChange}>
              <option value={-1}>--- Choose subcategory ---</option>
              {this.state.sub_cats.map(scat => (
                <option key={scat.id} value={scat.id}>{scat.name}</option>
              ))}
            </select>
            <span id="sub_cat-error" className="fw-field__error qa-fw-field__error hide">
              this field is required.
            </span>
          </div>
         </div>
        </div>

        <div id="custom-section" data-v-2f9b1610="" className={parseInt(this.state.cat) == -1 || parseInt(this.sub_cat) == -1? "disabled-section":""}>

          {this.state.input_attrs.map(attr => (
            <div key={"custom-"+attr.key} className={attr.allow_null? allow_null_class : no_null_class}>
              <label className="b-form-section__title">
                {attr.key}
              </label>
              <div className="form-group">
                <input value={
                  this.getAttrKeyValues(attr.key).length > 0?
                  this.getAttrKeyValues(attr.key)[0]
                  :""
                  } data-attr={"input"+(!attr.allow_null?"_must":"")} type="text" className="form-control" name={attr.key} onChange={this.handleAttrInput} />
                <span id={attr.key+"-error"} className="fw-field__error qa-fw-field__error hide">
                  this field is required.
                </span>
              </div>
            </div>
          ))}

          {this.state.select_attrs.map(attr => (
            <div key={"custom-"+attr.key} className={attr.allow_null? allow_null_class : no_null_class}>
              <label className="b-form-section__title">
                {attr.key}
              </label>
              <div className="form-group">
                <select data-attr={"select"+(!attr.allow_null?"_must":"")} className="form-control" name={attr.key} onChange={this.handleAttrSelect}>
                  <option>--- Select {attr.key} ---</option>
                  {attr.values.map(value => (
                    
                    this.state.attrs.includes(this.keyValue(attr.key, value))?
                      <option key={"custom-"+attr.key+value} selected>{value}</option>
                      :
                      <option key={"custom-"+attr.key+value}>{value}</option>
                  ))}
                </select>
                <span id={attr.key+"-error"} className="fw-field__error qa-fw-field__error hide">
                  this field is required.
                </span>
              </div>
            </div>
          ))}

          {this.state.checkbox_attrs.map(attr => (
            <div key={"custom-"+attr.key} className={attr.allow_null? allow_null_class : no_null_class}>
              <label className="b-form-section__title">
                {attr.key}
              </label>
              <div classname="b-form-section__elem-wrapp">
                {attr.values.map(value => (
                  this.state.attrs.includes(this.keyValue(attr.key, value))?
                  <div key={"custom-"+attr.key+value} className="b-form-section__row">
                    <div className="qa-checkbox b-form-section h-mb-0">
                      <input onChange={this.handleAttrCheckbox} name={attr.key} value={value} id={"custom-"+attr.key+"-"+value} type="checkbox" className="b-form-section__checkbox" 
                      checked/> 
                      <label for={"custom-"+attr.key+"-"+value} className="qa-description-label">{value}</label>
                    </div>
                  </div>
                  :
                  <div key={"custom-"+attr.key+value} className="b-form-section__row">
                    <div className="qa-checkbox b-form-section h-mb-0">
                      <input onChange={this.handleAttrCheckbox} name={attr.key} value={value} id={"custom-"+attr.key+"-"+value} type="checkbox" className="b-form-section__checkbox" /> 
                      <label for={"custom-"+attr.key+"-"+value} className="qa-description-label">{value}</label>
                    </div>
                  </div>
                ))}
              </div>
              <span id={attr.key+"-error"} className="fw-field__error qa-fw-field__error hide">
                this field is required.
              </span>
            </div>
          ))}
          
        </div>

      </div>

      <div id="photo-section" className="block h-pl-0 b-content-area h-p-15" data-v-2f9b1610="" data-v-b364e386="">
       <h4 className="title" data-v-b364e386="">
        <b data-v-b364e386="">
         Photos
        </b>
       </h4>
       <p data-v-b364e386="">
        <b data-v-b364e386="">
         Ads with photo get 5x more clients.
        </b>
        Accepted formats are .jpg, .gif and .png. Max allowed size for uploaded files is 5 MB.
        <br data-v-b364e386=""/>
        Add at least 1 photo for this category.
       </p>

       <div data-v-61d25a85="" data-v-b364e386="">
        <div className="scrollWrap qa-photos start h-mb-10" data-v-61d25a85="">
         <div className="draggable" data-v-61d25a85="">
           
          {
            this.state.photos.map((photo, index) => (
              photo != null?
              <div className="item" data-v-61d25a85="" key={"photo-"+index}>
              <div className="qa-add-photo photo-block" data-v-61d25a85="" data-v-6ea5e880="" style={{height: "136px", width: "136px"}}>
                {
                  photo == ""?
                  <div data-v-6ea5e880="">
                    <svg data-v-6ea5e880="" width="50px" height="50px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="uil-spin">
                      <rect x="0" y="0" width="100" height="100" fill="none" className="bk"></rect> 
                      <g transform="translate(50 50)"><g transform="rotate(0) translate(34 0)">
                        <circle cx="0" cy="0" r="8" fill="#c1c1c1">
                          <animate attributeName="opacity" from="1" to="0.1" begin="0s" dur="1.2s" repeatCount="indefinite"></animate> 
                          <animateTransform attributeName="transform" type="scale" from="1.4" to="1" begin="0s" dur="1.2s" repeatCount="indefinite"></animateTransform>
                        </circle>
                      </g> 
                      <g transform="rotate(45) translate(34 0)">
                        <circle cx="0" cy="0" r="8" fill="#c1c1c1">
                          <animate attributeName="opacity" from="1" to="0.1" begin="0.15s" dur="1.2s" repeatCount="indefinite"></animate> 
                          <animateTransform attributeName="transform" type="scale" from="1.4" to="1" begin="0.15s" dur="1.2s" repeatCount="indefinite"></animateTransform>
                        </circle>
                      </g> 
                      <g transform="rotate(90) translate(34 0)">
                        <circle cx="0" cy="0" r="8" fill="#c1c1c1">
                          <animate attributeName="opacity" from="1" to="0.1" begin="0.3s" dur="1.2s" repeatCount="indefinite"></animate> 
                          <animateTransform attributeName="transform" type="scale" from="1.4" to="1" begin="0.3s" dur="1.2s" repeatCount="indefinite"></animateTransform>
                        </circle>
                      </g> 
                      <g transform="rotate(135) translate(34 0)">
                        <circle cx="0" cy="0" r="8" fill="#c1c1c1">
                          <animate attributeName="opacity" from="1" to="0.1" begin="0.44s" dur="1.2s" repeatCount="indefinite"></animate> 
                          <animateTransform attributeName="transform" type="scale" from="1.4" to="1" begin="0.44s" dur="1.2s" repeatCount="indefinite"></animateTransform></circle></g> 
                          <g transform="rotate(180) translate(34 0)">
                            <circle cx="0" cy="0" r="8" fill="#c1c1c1">
                              <animate attributeName="opacity" from="1" to="0.1" begin="0.6s" dur="1.2s" repeatCount="indefinite"></animate> 
                              <animateTransform attributeName="transform" type="scale" from="1.4" to="1" begin="0.6s" dur="1.2s" repeatCount="indefinite"></animateTransform>
                            </circle>
                          </g> 
                          <g transform="rotate(225) translate(34 0)">
                            <circle cx="0" cy="0" r="8" fill="#c1c1c1">
                              <animate attributeName="opacity" from="1" to="0.1" begin="0.75s" dur="1.2s" repeatCount="indefinite"></animate> 
                              <animateTransform attributeName="transform" type="scale" from="1.4" to="1" begin="0.75s" dur="1.2s" repeatCount="indefinite"></animateTransform>
                            </circle>
                          </g> 
                          <g transform="rotate(270) translate(34 0)">
                            <circle cx="0" cy="0" r="8" fill="#c1c1c1">
                              <animate attributeName="opacity" from="1" to="0.1" begin="0.89s" dur="1.2s" repeatCount="indefinite"></animate> 
                              <animateTransform attributeName="transform" type="scale" from="1.4" to="1" begin="0.89s" dur="1.2s" repeatCount="indefinite"></animateTransform>
                            </circle>
                          </g> 
                          <g transform="rotate(315) translate(34 0)">
                            <circle cx="0" cy="0" r="8" fill="#c1c1c1">
                              <animate attributeName="opacity" from="1" to="0.1" begin="1.05s" dur="1.2s" repeatCount="indefinite"></animate> 
                              <animateTransform attributeName="transform" type="scale" from="1.4" to="1" begin="1.05s" dur="1.2s" repeatCount="indefinite"></animateTransform>
                            </circle>
                          </g>
                        </g>
                      </svg>
                    </div>
                    :
                    <div data-v-6ea5e880="" className="preview">
                    <div data-v-6ea5e880="" className="preview__img" style={{backgroundImage: "url("+ this.photoUrl(photo)+")", transform: "rotate(0deg)"}}></div> 
                    <div data-v-6ea5e880="" className="preview__bar">
                      <div data-v-6ea5e880="" className="preview__bar-button" style={{display: "none"}}>
                        <i data-v-6ea5e880="" className="glyphicon glyphicon-repeat icon icon-rotate">
                          <div data-v-6ea5e880="" className="preview__bar-button-content"></div>
                        </i>
                      </div> 
                      <div photo-index={index} onClick={this.removePhoto} data-v-6ea5e880="" className="preview__bar-button">
                        <i photo-index={index} data-v-6ea5e880="" className="glyphicon glyphicon-remove icon icon-remove">
                          <div photo-index={index} data-v-6ea5e880="" className="preview__bar-button-content"></div>
                        </i>
                      </div>
                    </div>
                  </div>
                }
              </div>
             </div>
             :
             <div className="item" data-v-61d25a85="" key={"photo-"+index}>
             <div className="qa-add-photo photo-block" data-v-61d25a85="" data-v-6ea5e880="" style={{height: "136px", width: "136px"}}>
              <div data-v-6ea5e880="">
               <div data-v-6ea5e880="">
                <img data-v-6ea5e880="" src="/public/res/images/static/no-photo.svg" width="95.19999999999999px"/>
                <label className="input-label" data-v-6ea5e880="" for={"fileUpload-"+index}>
                </label>
                <input photo-index={index} onChange={this.onPhotoChangedHandler} accept="image/*" className="input" data-v-6ea5e880="" id={"fileUpload-"+index} multiple={true} name={"photo-"+index} style={{height: "136px", width: "136px"}} type="file"/>
               </div>
              </div>
             </div>
            </div>
            ))
          }
         </div>
        </div>
        <input data-v-61d25a85="" name="img_rotate_data" type="hidden" value="{}"/>
       </div>
       {
         this.state.loaded > 0?
         <div className="form-group">
           <div className="progress">
             <div className="progress-bar progress-bar-success progress-bar-striped" style={{width: "100%"}} role="progressbar" aria-valuenow={this.state.loaded} aria-valuemin="0" aria-valuemax="100">
              {Math.round(this.state.loaded,2) }%
            </div>
          </div>
        </div>
        :
        ""
       }
       <span id="photo-error" className="fw-field__error qa-fw-field__error hide">
        this field is required.
       </span>
       <div className="h-grey" data-v-b364e386="">
        <b data-v-b364e386="">
         First picture - is the title picture.
        </b>
       </div>
      </div>

      <div className="h-max-width-600 h-phone-max-width-100p" data-v-2f9b1610="">
       <div className="qa-attributes" data-v-2f9b1610="">
        <div className="qa-input b-form-section qa-title h-phone-max-width-100p b-form-section--required">
         <label className="b-form-section__title" for="input-54">
          Title
         </label>
         <div className="b-form-section__elem-wrapp">
          <input data-limit="70" onChange={this.handleChange} id="input-54" name="title" placeholder="Please write a clear title for your item" value={this.state.title} type="text"/>
         </div>
         <span id="title-error" className="fw-field__error qa-fw-field__error hide">
          this field is required.
         </span>
         <div className="b-input-style-maxlength h-mv-3">
          {70 - this.state.title.length} characters left
         </div>
         <div className="b-form-section__error-descr">
         </div>
        </div>

        <div className="h-max-width-300 h-phone-max-width-100p b-form-section--required">
          <label className="b-form-section__title">
            Price
          </label>
          <div className="input-group">
            <span className="input-group-addon">
              <select name="price_currency_symbol" value={this.state.price_currency_symbol} onChange={this.handleChange}>
                <option value="">--select currency--</option>
                {this.state.currency_symbols.map(symbol => (
                  <option key={symbol} value={symbol} dangerouslySetInnerHTML={{__html: symbol}}></option>
                ))}
              </select>
            </span>
            <input data-type="number" name="price" value={this.state.price} type="text" className="form-control" onChange={this.handleChange}/>
          </div>
          <span id="price-error" className="fw-field__error qa-fw-field__error hide">
            this field is required.
          </span>
        </div>
        
        <div className="qa-textarea b-form-section qa-description b-form-section--required" data-v-cca4341a="">
         <label className="b-form-section__title" data-v-cca4341a="" for="textarea-58">
          Description
         </label>
         <div className="b-form-section__elem-wrapp" data-v-cca4341a="">
          <textarea data-limit="1000" onChange={this.handleChange} data-v-cca4341a="" id="textarea-58" name="desc" value={this.state.desc} placeholder="Please provide a detailed description. You can mention as many details as possible. It will make your ad more attractive for buyers" rows="5"></textarea>
         </div>
         <span id="desc-error" className="fw-field__error qa-fw-field__error hide">
            this field is required.
         </span>
         <div className="b-text-area-max-length" data-v-cca4341a="">
         {1000 - this.state.desc.length} characters left
         </div>
         <div className="b-form-section__error-descr" data-v-cca4341a="">
         </div>
        </div>
       </div>
      </div>
     </div>
     <div className="block b-content-area b-content-area--shadow h-p-15" data-v-50679713="">
      <h4 className="title" data-v-50679713="">
       <b data-v-50679713="">
        Contact Information for Ad
       </b>
      </h4>
      <div className="h-mb-10" data-v-50679713="">
       <p data-v-50679713="">
        Name:&nbsp;
        <b className="user-data" data-v-50679713="">
         {this.state.fullname}
        </b>
       </p>
       <p data-v-50679713="">
          Phone:&nbsp;
          <b className="user-data" data-v-50679713="">
          {this.state.number}
          </b>
        </p>
        <div className="b-form-section__row">
            <div className="qa-checkbox b-form-section h-mb-0">
              {
                this.state.hide_phone_number == 1?
                <input data-type="number" onChange={this.handleSingleCheckbox} name="hide_phone_number" id="hide_phone_number" value={1} empty-value={0} type="checkbox" className="b-form-section__checkbox" 
                      checked/>
                :
                <input data-type="number" onChange={this.handleSingleCheckbox} name="hide_phone_number" id="hide_phone_number" value={1} empty-value={0} type="checkbox" className="b-form-section__checkbox" />
              }
              <label for="hide_phone_number" className="qa-description-label">Hide phone number</label>
            </div>
        </div>
      </div>
      
      <div id="location-section" className="h-max-width-300 h-phone-max-width-100p" data-v-2f9b1610="">
      
       <div id="country-section" data-v-2f9b1610="">
         <div className=" b-form-section h-mb-15 qa-choose-category b-form-section--required">
          <label className="b-form-section__title">
           Country
          </label>
          <div className="form-group">
            <select className="form-control" name="country" value={this.state.country} onChange={this.handleIntChange}>
              <option value={-1}>--- Select country ---</option>
              {this.state.countries.map(country => (
                <option key={country.id} value={country.id}>{country.name}</option>
              ))}
            </select>
            <span id="country-error" className="fw-field__error qa-fw-field__error hide">
              this field is required.
            </span>
          </div>
         </div>
        </div>

        <div id="state-section" data-v-2f9b1610="" className={parseInt(this.state.country) == -1? "disabled-section":""}>
         <div className=" b-form-section h-mb-15 qa-choose-category b-form-section--required">
          <label className="b-form-section__title">
           State
          </label>
          <div className="form-group">
            <select className="form-control" name="state" value={this.state.state} onChange={this.handleIntChange}>
              <option value={-1}>--- Select state ---</option>
              {this.state.states.map(state => (
                <option key={state.id} value={state.id}>{state.name}</option>
              ))}
            </select>
            <span id="state-error" className="fw-field__error qa-fw-field__error hide">
              this field is required.
            </span>
          </div>
         </div>
        </div>

        <div id="city-section" data-v-2f9b1610="" className={parseInt(this.state.country) == -1 || parseInt(this.state.state) == -1? "disabled-section":""}>
         <div className=" b-form-section h-mb-15 qa-choose-category b-form-section--required">
          <label className="b-form-section__title">
           City
          </label>
          <div className="form-group">
            <select className="form-control" name="city" value={this.state.city} onChange={this.handleIntChange}>
              <option value={-1}>--- Select city ---</option>
              {this.state.cities.map(city => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
            <span id="city-error" className="fw-field__error qa-fw-field__error hide">
              this field is required.
            </span>
          </div>
         </div>
        </div>

      </div>
      
     </div>
     <div className="qa-premium-section block b-content-area b-content-area--shadow h-p-15" data-v-0d6ab1a8="">
 <h4 className="title" data-v-0d6ab1a8="">
  <b data-v-0d6ab1a8="">
   Boost your ad
  </b>
 </h4>
 <p className="h-mb-20" data-v-0d6ab1a8="">
  Please, choose one of the following packages to publish your ad.
 </p>
 <div className="b-form-section h-mb-0" data-v-0d6ab1a8="">
  <div className="b-form-section__row" data-v-0d6ab1a8="">
   <input className=" b-form-section__radio b-form-section__radio--vertical-center" data-v-0d6ab1a8="" id="0-free_post" name="paid_package" value="0" type="radio" onChange={this.handleChange}/>
   <label className="h-font-normal h-mb-0" data-v-0d6ab1a8="" for="0-free_post">
    <span className="package-label package-label--free" data-v-0d6ab1a8="">
      No-Boost Package
    </span>
    <div data-v-0d6ab1a8="" style={{display: "inline-block", padding: "3px 0px"}}>
      No <b>top placement(Selecting this package does not cancel your previously purchased boosted packages)</b>.
    </div>
   </label>
  </div>
  <div className="b-form-section__row h-mt-15" data-v-0d6ab1a8="">
   <input className=" b-form-section__radio b-form-section__radio--vertical-center" data-v-0d6ab1a8="" id="1-page_top_1" name="paid_package" value="1" type="radio" onChange={this.handleChange}/>
   <label className="h-font-normal h-mb-0" data-v-0d6ab1a8="" for="1-page_top_1">
    <span className="package-label package-label--top" data-v-0d6ab1a8="">
     7-DAYS-BOOST package
    </span>
    <div data-v-0d6ab1a8="" style={{display: "inline-block", padding: "3px 0px"}}>
     One advert promotion for <b>7 days(your ad will be frequently placed on top of other ads to get more people to see your ad for 7 days. If this ad already has a boosted package, the boost duration will be extended by 7 days)</b>.
    </div>
   </label>
  </div>
  <div className="b-form-section__row h-mt-15" data-v-0d6ab1a8="">
   <input className=" b-form-section__radio b-form-section__radio--vertical-center" data-v-0d6ab1a8="" id="2-page_top_1_30" name="paid_package" value="2" type="radio" onChange={this.handleChange}/>
   <label className="h-font-normal h-mb-0" data-v-0d6ab1a8="" for="2-page_top_1_30">
    <span className="package-label package-label--top" data-v-0d6ab1a8="">
     30-DAYS-BOOST package
    </span>
    <div data-v-0d6ab1a8="" style={{display: "inline-block", padding: "3px 0px"}}>
     One advert promotion for <b>30 days(your ad will be frequently placed on top of other ads to get more people to see your ad for 30 days. If this ad already has a boosted package, the boost duration will be extended by 30 days)</b>.
    </div>
   </label>
  </div>
  <span id="paid_package-error" className="fw-field__error qa-fw-field__error hide">
    this field is required.
  </span>
 </div>
</div>
     <div className="h-text-center h-mb-50">
      <button className="qa-submit-button b-button b-button--secondary b-button--border-radius b-button--shadow" data-package-category="" data-package-id="" data-package-name="" id="submitButton" type="submit">
       <b>
        Post Ad
       </b>
      </button>
      <p className="h-pt-10">
       By publishing an ad you agree and accept&nbsp;
       <a href="/rules.html" target="_blank">
        the Rules of {SITE_DOT_COM}
       </a>
      </p>
      <div className="h-pt-10">
       <a href="/create-ad-tips">
        <svg className="info" style={{width: "15px", height: "15px", maxWidth: "15px", maxHeight: "15px", fill: "rgb(114, 183, 71)", stroke: "inherit", marginBottom: "-3px"}}>
         <use xlinkHref="#info">
         </use>
        </svg>
        How to create an effective ad
       </a>
       
      </div>
     </div>
    </form>
    
   </div>
   <div style={{display: "flex", justifyContent: "space-around"}} className={this.state.payment_form_visible?"fw-fixed-background":"fw-fixed-background hide"}>
     <div style={
       { 
         borderRadius: "4px",
         backgroundColor: "#f2f2f2",
         width: "400px", 
         maxWidth: "90%",
         minHeight: "10px",
         maxHeight: "70%",
         display: "flex", 
         justifyContent: "space-between",
         padding: "10px",
         flexDirection: "column",
         margin: "auto 0"
        }
      }>
        <TextView 
          click={this.hidePaymentForm} 
          padding="10px"
          align_parent_end={true}
          color="red"
          text_size="18px"
          cursor="pointer"
          text="X" />
        {
          this.state.payment_form_visible?
          <StripeView on_message={this.onPaymentMessage} payment_data={this.state.payment_data}/> : ""
        }
     </div>
   </div>
  </div>
 </div>
 
</div>
    )
  }
}

export default SellEdit