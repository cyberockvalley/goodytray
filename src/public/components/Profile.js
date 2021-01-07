import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { NO_PROFILE_PHOTO_IMAGE, API_ROOT, ERROR_NET_UNKNOWN, STATIC_IMAGES_CLIENT_DIR, SITE_NAME, getText, AD_APPROVAL_RANK } from '../../../Constants'
import { commaNum } from '../utils/Funcs'
const browser = require("../utils/Browser")
import queryString from 'querystring'
import { productLink } from '../utils/LinkBuilder'
var dateFormat = require('dateformat');
import Navbar from './Navbar'
import Footer from "./Footer"

import ImageView from "./widgets/ImageView"
import TextView from "./widgets/TextView"
import Swal from 'sweetalert2'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user,

      products_type: null,
      products: [],
      products_has_next: false,

      active_total: 0,
      active_products: [],
      active_products_page: 0,
      active_has_next: false,

      draft_total: 0,
      draft_products: [],
      draft_products_page: 0,
      draft_has_next: false,
      
      sponsored_total: 0,
      sponsored_products: [],
      sponsored_products_page: 0,
      sponsored_has_next: false,
      
      pending_total: 0,
      pending_products: [],
      pending_products_page: 0,
      pending_has_next: false,

      loading: false,
      uploading_profile_photo: false,
      profile_photo_error: null
    }
    var tempUser = {"id":2,"username":"jinminetics","fullname":"Jinmi Adegoke","profile_photo":"/public/res/images/users/dcc26b9e-c37a-4146-89dc-cf56e3105434-1577153147680.jpg","email":"jinminetics@gmail.com","number":"08130729216","created":"2019-11-04","last_seen":"2019-11-21","rank":0}
    this.state.user = props.user || tempUser

    this.uploadPhoto = this.uploadPhoto.bind(this)
    //this.loadProducts = this.loadProducts.bind(this)
    this.updateProductsData = this.updateProductsData.bind(this)
    this.showStats = this.showStats.bind(this)
    this.approveAd = this.approveAd.bind(this)
    if(!this.state.user) props.history.replace("/login")
  }

  componentDidMount() {
    console.log("mounted", this.props.user, this.state.user)
    
    if(!this.state.user) {
      this.state.history.replace("/login")

    } else {
      const queryValues = queryString.parse(this.props.location.search.substring(1))
      const p_type = queryValues.products_type? queryValues.products_type : "active"
      this.state.products_type = p_type
      this.setState({products_type: p_type})
      console.log("queryValues.products_type", queryValues.products_type, this.state.products_type)
      //get active counts
      browser.axios.get(API_ROOT + "products/user/non_boosted/"+this.state.user.id+"?count_only=1")
      .then(resp => {console.log("CountNonBoosted", resp.data)
        if(resp.data) {
          this.setState({active_total: resp.data.counts})
        }
      })
      //get sponsored counts
      browser.axios.get(API_ROOT + "products/user/boosted/"+this.state.user.id+"?count_only=1")
      .then(resp => {
        console.log("CountBoosted", resp.data)
        if(resp.data) {
          this.setState({sponsored_total: resp.data.counts})
        }
      })
      //get pending counts
      browser.axios.get(API_ROOT + "products/pending/?count_only=1")
      .then(resp => {
        console.log("PendingAds", resp.data)
        if(resp.data) {
          this.setState({pending_total: resp.data.counts})
        }
      })
      this.loadProducts()
    }
    
  }



  updateProductsData(type) {
    console.log("updateProductsData", "type", type)
    if(type == "sponsored") {
      console.log("updateProductsData", "spons")
      this.state.products = this.state.sponsored_products
      this.state.products_has_next = this.state.sponsored_has_next
      this.setState({products: this.state.sponsored_products})
      this.setState({products_has_next: this.state.sponsored_has_next})

    } else if(type == "active") {
      console.log("updateProductsData", "act")
      this.state.products = this.state.active_products
      this.state.products_has_next = this.state.active_has_next
      this.setState({products: this.state.active_products})
      this.setState({products_has_next: this.state.active_has_next})

    } else if(type == "pending") {
      console.log("updateProductsData", "pending")
      this.state.products = this.state.pending_products
      this.state.products_has_next = this.state.pending_has_next
      this.setState({products: this.state.pending_products})
      this.setState({products_has_next: this.state.pending_has_next})

    }
  }

  changeProductsType = (e) => {
    const type = e.target.getAttribute("data-type")
    this.state.products_type = type
    this.setState({products_type: type})
    console.log("PRO_TYPE", type)
    console.log("PRO_TYPE 2", this.state.products_type)
    this.updateProductsData(type)
    console.log("Products: ", this.state.products)
    if(this.state.products.length == 0) {
      console.log("Load from change")
      this.loadProducts()

    } else {
      console.log("Don't Load from change")
    }

  }

  showStats = (e) => {
    e.preventDefault()
    var dataIndex = e.target.getAttribute("data-index")
    this.setState({shown_stats: this.state.products[dataIndex]})
    this.setState({modal: true})
  }

  approveAd = e => {
    e.preventDefault()
    var dataIndex = e.target.getAttribute("data-index")
    var product = this.state.products[dataIndex]
    if(this.state["approving_ad_"+product.id]) return
    this.setState({
      ["approving_ad_"+product.id]: true
    })
    //approve product
    browser.axios.get(API_ROOT + "products/approve/"+product.id)
    .then(resp => {
      console.log("ApprovaleResponse", resp.data)
      if(resp.data && resp.data.status == 1) {
        var pending_products = this.state.pending_products
        pending_products.splice(dataIndex, 1)
        this.setState({
          pending_total: this.state.pending_total - 1,
          pending_products: pending_products,
          ["approving_ad_"+product.id]: false
        })
        if(this.state.products_type == "pending") {
          this.setState({products: pending_products})
        }

      } else {
        this.setState({
          ["approving_ad_"+product.id]: false
        })
        Swal.fire('', 'An error occurred', 'error')
      }
    })
    .catch(e => {
      this.setState({
        ["approving_ad_"+product.id]: false
      })
      Swal.fire('', 'An error occurred'+e, 'error')
    })
  }

  hideStats = () => {
    this.setState({shown_stats: null})
    this.setState({modal: false})
  }

  loadProducts = () => {
    var apiSubPath = ""
    var hasNextKey
    var productPageKey
    var productsKey
    var productTotalKey
    var page
    console.log("State", JSON.stringify(this.state))
    if(this.state.products_type == "sponsored") {
      page = this.state.sponsored_products_page + 1
      apiSubPath = "products/user/boosted/"+this.state.user.id+"?page="+page
      hasNextKey = "sponsored_has_next"
      productPageKey = "sponsored_products_page"
      productsKey = "sponsored_products"
      productTotalKey = "sponsored_total"

    } else if(this.state.products_type == "active") {
      page = this.state.active_products_page + 1
      apiSubPath += "products/user/non_boosted/"+this.state.user.id+"?page="+page
      hasNextKey = "active_has_next"
      productPageKey = "active_products_page"
      productsKey = "active_products"
      productTotalKey = "active_total"

    } else if(this.state.products_type == "pending") {
      page = this.state.pending_products_page + 1
      apiSubPath += "products/pending/?page="+page
      hasNextKey = "pending_has_next"
      productPageKey = "pending_products_page"
      productsKey = "pending_products"
      productTotalKey = "pending_total"

    }
    
    console.log("API_ROOT + apiSubPath", API_ROOT + apiSubPath)
    this.setState({loading: true})
    browser.axios.get(API_ROOT + apiSubPath)
    .then(response => {
      if(response && response.data.list) {
        var prods = response.data.list
        if(apiSubPath.startsWith("products/user/boosted/")) {
          for(var i = 0; i < prods.length; i++) {
            prods[i].sponsored = true
          }
        }
        const products = this.state[[productsKey]].concat(prods)
        this.setState({[[productsKey]]: products})
        this.setState({[[hasNextKey]]: response.data.has_next})
        if(response.data.counts) {
          console.log("CountNonBoosted3", response.data.counts)
          this.setState({[[productTotalKey]]: response.data.counts})
        }
        
        this.setState({[[productPageKey]]: page})

        this.updateProductsData(this.state.products_type)
        

      }
      this.setState({loading: false})

    })
    .catch(e => {
      console.log("responz err", e)
      this.setState({loading: false})
    })
  }

  uploadPhoto = e => {
    const photo = e.target.files[0]
    console.log("upload: ", photo)
    const formData = new FormData()
    formData.append('photo', photo)

    this.setState({uploading_profile_photo: true})
    this.setState({profile_photo_error: null})
    browser.axios.post(API_ROOT + "users/upload/profile-photo", formData)
    .then(response => {
      if(response && response.data && response.data.status == 1) {
        const user = this.state.user
        user.profile_photo = URL.createObjectURL(photo)
        this.setState({user: user})

      } else if(response && response.data && response.data.message && response && response.data.message.length > 0) {
        if(response.data.status == 3) {
          this.setState({profile_photo_error: getText("DP_SIZE_HIGH_ERROR")})

        } else {
          this.setState({profile_photo_error: response.data.message})
        }

      } else {
        this.setState({profile_photo_error: getText("PHOTO_UPLOAD_ERROR")})
      }
      this.setState({uploading_profile_photo: false})
      $('#add_profile_photo').modal('toggle');
    })
    .catch(err => {
      this.setState({profile_photo_error: ERROR_NET_UNKNOWN})
      this.setState({uploading_profile_photo: false})
      $('#add_profile_photo').modal('toggle');
    })
  }

  render() {
    console.log("SSS_USER", this.state.user)
    return (
      <div>
            <Navbar user={this.state.user} />
<div className="h-bg-grey container h-pt-10 h-pb-15">
  {
    !this.state.user?
    <div>
        <div className="b-bouncing-loader-wrapper" data-v-67bc6bc4="" style={{display: "block"}}>
            <div className="b-bouncing-loader spinner-absolute h-pt-20" style={{bottom: "0px"}}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
      <div className="before-data-load"></div>
    </div>
    :
    <div>
    <div className="h-dflex h-mt-20 row">
     <div className="col-sm-12 col-md-3">
      <div action="" className="b-user-settings__avatarblock">
       <div className="js-avatar b-user-settings__avatarblock__avatar" style={{backgroundImage: this.state.user.profile_photo.length > 0?'url('+this.state.user.profile_photo+'?w=120)':'url('+NO_PROFILE_PHOTO_IMAGE+')'}}>
        <button className="b-user-settings__avatarblock__upload-foto" data-target="#add_profile_photo" data-toggle="modal" type="button">
         <i className="h-icon icon-profile-settings-upload">
         </i>
        </button>
       </div>
       <div className="b-user-settings__avatarblock__name">
        <Link to={"/seller/"+this.state.user.id}>
         {this.state.user.fullname}
        </Link>
       </div>
       <div className={this.state.profile_photo_error?"fw-field__error qa-fw-field__error":"fw-field__error qa-fw-field__error"} id="img_status">
        {this.state.profile_photo_error}
       </div>
       <div className="h-mt-15 h-width-100p h-ph-5">
        <Link to="/settings" className="general-button general-button--full general-button--border-radius general-button--with-shadow general-button--orange-color" href="/request-call.html">
         {getText("SETTINGS")}
        </Link>
       </div>
      </div>
      <div aria-labelledby="ModalLabel" style={{display: "none"}} aria-hidden="true" className="modal out" id="add_profile_photo" role="dialog" tabIndex="-1">
       <div className="modal-dialog" role="document">
        <div className="modal-content">
         <div className="modal-header h-text-center h-font-16" style={{background: "rgb(242, 244, 248) none repeat scroll 0% 0%"}}>
          <button aria-hidden="true" className="close" data-dismiss="modal" type="button">
           ×
          </button>
          <h5 className="h-bold">
           {getText("ADD_A_DP")}
          </h5>
         </div>
         <div className="modal-body">
          <div className="b-popup-form js-input-image-block" name="advert_image">
           <div className="js-upload b-user-settings__avatarblock__avatar " style={{backgroundImage: this.state.user.profile_photo.length > 0?'url('+this.state.user.profile_photo+')':'url('+NO_PROFILE_PHOTO_IMAGE+')'}}>
           </div>
           <div className="js-upload-preview h-hidden b-user-settings__avatarblock__avatar" style={{zIndex: "2"}}>
           </div>
           <div className="b-user-settings__avatarblock__text-1">
            {getText("UPLOAD_UR_DP")}
           </div>
           <div className="b-user-settings__avatarblock__text-2">
            {getText("DP_RULES")}
           </div>
           <div className=" b-user-settings__avatarblock__text b-user-settings__avatarblock__text_red h-hidden h-mt-15">
           </div>
           <div className="h-width-100p h-height-100 h-text-center">
            <img className={this.state.uploading_profile_photo?"js-upload-progress h-mt-20":"js-upload-progress h-mt-20 hide"} src="/public/res/images/static/preload2.gif"/>
            <a className="js-upload-link">
             <div className="b-user-settings__avatarblock__btnblock">
              <div className="b-user-settings__avatarblock__btn btn btn-lg">
               <div className="btn btn-lg btn-success btn-block" id="file-name-btn">
                {getText("CHOOSE_A_FILE")}
               </div>
               <input onChange={this.uploadPhoto} accept="image/*" className="js-input-image" name="photo" type="file"/>
              </div>
             </div>
            </a>
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
      <Link to="/create-ad-tips" className="b-notification b-notification__green qa-premium-create-ad-tips">
       <div className="b-notification-icon">
        <i className="h-icon icon-profile-lightbulb">
        </i>
       </div>
       <div className="h-pr-10 h-dflex h-flex-main-center h-flex-dir-column">
        <div className="b-notification-text">
         <div>
          {getText("AD_TIP_CHECK")}
         </div>
        </div>
       </div>
      </Link>
     </div>
     <div className="col-sm-12 col-md-9">
      <div className="h-mb-10 h-mt-0 h-lh-em-1_8 b-link-tabs h-dflex h-flex-space-between">
       <ul>
        <li className="h-mr-15">
         <a onClick={this.changeProductsType} data-type="active" className={this.state.products_type == "active"?"active b-link-tabs__a qa-list-advert-tab":"b-link-tabs__a qa-list-advert-tab"} href="javascript:void(0)">
          {getText("NON_BOOSTED_ADS")}
         </a>
         {
           this.state.active_total > 0?
           <span className="b-link-tabs__notification qa-list-advert-notification">
            {commaNum(this.state.active_total)}
           </span>
           :
           ""
          }
        </li>
        <li className="h-mr-15">
         <a onClick={this.changeProductsType} data-type="sponsored" className={this.state.products_type == "sponsored"?"active b-link-tabs__a qa-list-advert-tab":"b-link-tabs__a qa-list-advert-tab"} href="javascript:void(0)">
          {getText("BOOSTED_ADS")}
         </a>
         {
           this.state.sponsored_total > 0?
           <span className="b-link-tabs__notification qa-list-advert-notification">
            {commaNum(this.state.sponsored_total)}
           </span>
           :
           ""
          }
        </li>
        {
          this.state.user && this.state.user.rank >= AD_APPROVAL_RANK?
          <li className="h-mr-15">
          <a onClick={this.changeProductsType} data-type="pending" className={this.state.products_type == "pending"?"active b-link-tabs__a qa-list-advert-tab":"b-link-tabs__a qa-list-advert-tab"} href="javascript:void(0)">
            {getText("PENDING_ADS")}
          </a>
          {
            this.state.pending_total > 0?
            <span className="b-link-tabs__notification qa-list-advert-notification">
              {commaNum(this.state.pending_total)}
            </span>
            :
            ""
            }
        </li> : null
        }
       </ul>
       <div className="h-float-right h-font-16">
          {getText("TOTAL")}: {this.state.active_total + this.state.sponsored_total} ads
         </div>
      </div>
      {
        this.state.products.map((product, index) => (
          <div key={index} className="b-profile-advert box-shadow h-mb-10 h-pos-rel">
          <Link to={productLink(product.title, product.id)} className="b-profile-advert__img">
           <img alt={product.title} src={`${product.photos.split(",")[0]}?w=300`}/>
          </Link>
          <div className="b-profile-advert__body">
           <div className="b-profile-advert__title">
            <Link to={productLink(product.title, product.id)}>
             {product.title}
            </Link>
           </div>
           <div className="b-profile-advert__text">
            {getText("UPDATED")}: {dateFormat(new Date(product.last_update), "mmm dd")}
           </div>
           <div className="h-mt-5">
            <span className="b-profile-advert__price" dangerouslySetInnerHTML={{__html: product.currency_symbol+" "+commaNum(product.price)}}></span>
           </div>
           <div className="h-dflex h-flex-cross-center">
           </div>
           <div className="b-profile-advert__footer" style={{paddingLeft: "175px"}}>
            <div className="b-profile-advert__footer-info-panel">
            {
              this.state.products_type != "pending"?
              <div>
                <Link to={"/edit-ad?id="+product.id} className="b-profile-advert__go-to-edit cap-case">
                <span data-index={index} data-id={product.id}>{getText("EDIT")}&nbsp;<i className="fa fa-pencil"></i></span>
                </Link>
                <a onClick={this.showStats} href="javascript:void(0)" data-index={index} data-id={product.id} style={{paddingLeft: "5px", paddingRight: "5px"}} className="cap-case qa-fw-field__error b-profile-advert__go-to-publish qa-btn-owner-publish-draft">
                  {getText("SHOW_STATS")}&nbsp;<i className="fa fa-bar-chart"></i>
                </a>
              </div> : 
              <div>
                <Link to={productLink(product.title, product.id, true)} target="_blank" className="b-profile-advert__go-to-edit cap-case">
                <span data-index={index} data-id={product.id}>{getText("VIEW_AD")}&nbsp;<i className="fa fa-eye"></i></span>
                </Link>
                <a onClick={this.approveAd} href="javascript:void(0)" data-index={index} data-id={product.id} style={{paddingLeft: "5px", paddingRight: "5px"}} className="cap-case qa-fw-field__error b-profile-advert__go-to-publish qa-btn-owner-publish-draft">
                  {
                    this.state["approving_ad_"+product.id]?
                    "Please wait..."
                    :
                    <span data-index={index} data-id={product.id}>{getText("APPROVE_AD")}&nbsp;<i className="fa fa-check"></i></span>
                  }
                </a>
              </div>
            }
             <div className="h-inline-block">
              <p className="hide b-profile-advert__footer-block low-case">
               <i className="h-icon icon-profile-eye-new">
               </i>
               {product.views} {getText("VIEWS")}
              </p>
             </div>
             <div className="h-inline-block">
              <p className="hide b-profile-advert__footer-block low-case">
               <i className="h-icon icon-profile-phone-new">
               </i>
               {product.contact_views} {getText("CONTACT_VIEWS")}
              </p>
             </div>
             <a className="b-profile-advert__go-to-statistic hide" href="/statistics.html">
              <i className="h-icon icon-profile-statistic">
              </i>
             </a>
            </div>
           </div>
          </div>
          <div className="clearfix">
          </div>
         </div>
        ))
      }
      {
        this.state.products.length == 0 && !this.state.loading?
        <div className="h-mb-10">
        <div className="b-empty-cart box-shadow">
         <div className="h-centerItem">
          <div className="b-empty-cart__info">
           <img alt="" className="h-mb-10 h-rl-15" src={STATIC_IMAGES_CLIENT_DIR+"no_ads.png"}/>
           {
             this.state.products_type == "active"?
              <p>{getText("NO_NON_BOOSTED_AD")}<br />{getText("POST_AD_4_FREE")}</p>
              :
              this.state.products_type == "sponsored"?
                <p>{getText("NO_BOOSTED_AD")}<br />{getText("POST_BOOSTED_AD_FREE")}</p>
                :
                <p>{getText("NO_PENDING_AD")}</p>
          }
          </div>
         </div>
        </div>
       </div>
       :
       ""
       
      }
      {
        this.state.loading?
        <div className="b-bouncing-loader-wrapper" data-v-67bc6bc4="" style={{display: "block"}}>
           <div className="b-bouncing-loader spinner-absolute h-pt-20" style={{bottom: "0px"}}>
               <div></div>
               <div></div>
               <div></div>
           </div>
       </div>
       :
       this.state.products_has_next?
       <a onClick={this.loadProducts} rel="nofollow" className="h-a-without-underline" style={{width: "200px", display: "block", margin: "15px auto"}}>
           <span className="qa-start-chat b-button b-button--transparent b-button--biggest-size">
               {getText("SHOW_MORE")}
           </span>
       </a>
       :
       ""
      }
     </div>
    </div>
   </div>
  }
</div>
<Footer />
<div style={{display: "flex", justifyContent: "space-around"}} className={this.state.modal?"fw-fixed-background":"fw-fixed-background hide"}>
  {
    !this.state.shown_stats?"":
    <div id="stats" style={
      { 
        borderRadius: "4px",
        backgroundColor: "#fff",
        minWidth: "50px", 
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
          click={this.hideStats} 
          padding="10px"
          align_parent_end={true}
          color="red"
          text_size="18px"
          cursor="pointer"
          text="X" />
      <div>
        <div style={{marginBottom: "15px", display: "flex", flexDirection: "row"}}>
          <ImageView 
              src={this.state.shown_stats.photos.split(",")[0]}
              width="25px"
              height="25px"
              margin_right="10px" />
          <TextView 
            class="b-profile-advert__title"
            text={this.state.shown_stats.title} />
        </div>
        <div style={{display: "flex", flexDirection: "column"}}>
          <div style={{marginBottom: "10px", display: "flex", flexDirection: "row"}}>
            <TextView  
              text_size="18px"
              margin_right="5px"
              text="Currently Boosted:" />
            <TextView  
              text_size="18px"
              font_weight="bold"
              text={this.state.shown_stats.sponsored?"Yes":"No"} />
          </div>

          <div style={{marginBottom: "10px", display: "flex", flexDirection: "row"}}>
            <TextView  
              text_size="18px"
              margin_right="5px"
              text="Total Views:" />
            <TextView  
              text_size="18px"
              font_weight="bold"
              text={this.state.shown_stats.views} />
          </div>

          <div style={{marginBottom: "10px", display: "flex", flexDirection: "row"}}>
            <TextView  
              text_size="18px"
              margin_right="5px"
              text="Total Boosted packages views:" />
            <TextView  
              text_size="18px"
              font_weight="bold"
              text={this.state.shown_stats.sponsored_views} />
          </div>

          <div style={{marginBottom: "10px", display: "flex", flexDirection: "row"}}>
            <TextView  
              text_size="18px"
              margin_right="5px"
              text="Total Boosted packages ends/ended on:" />
            <TextView  
              text_size="18px"
              font_weight="bold"
              text={this.state.shown_stats.sponsored_end_time == 0?"This ad has no boosted package"
              :dateFormat(new Date(this.state.shown_stats.sponsored_end_time), "d mmm yyyy")} />
          </div>
        </div>
      </div>
    </div>
  }
</div>
</div>
    )
  }
}

export default Profile