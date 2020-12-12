import React, { Component } from "react"
import Navbar from './Navbar'
import Footer from "./Footer"
import { API_ROOT, getText } from "../../../Constants"
import { intOrMin, queries } from "../utils/Funcs"

const browser = require("../utils/Browser")

const MIN_BODY_SIZE = 5
const MAX_BODY_SIZE = 200

class CreateReview extends Component {
    constructor() {
        super()
        this.state = {
          selected_weight: 0,
          rating: -1,
          body: "",
          ratings_text: getText("RATINGS_TEXTS"),
          editor_error: "",
          experience_error: ""
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
      var pathname = this.props.location.pathname
      pathname = pathname.endsWith("/")? pathname.substring(0, pathname.length - 1) : pathname
      const paths = pathname.split("/")
      const id = intOrMin(paths[paths.length - 1], -1)
      console.log("productId", id)
      if(id < 0) {
        this.props.history.push("/errors/404")

      } else {
        this.setState({product: {id: id}})
      }
    }

    handleClick = function (e) {
      const target = e.target;
      if(target.getAttribute("data-weight")) {
        this.setState({selected_weight: target.getAttribute("data-weight")});
      }
    }

    handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
      this.state[[e.target.name]] = e.target.value
    }

    submit = () => {
      this.setState({experience_error: ""})
      this.setState({editor_error: ""})
      var hasError = false
      if(this.state.rating < 0 || this.state.rating == this.state.ratings_text.length) {
        this.setState({experience_error: getText("SELECT_EXPERIENCE_WITH_SELLER")})
        hasError = true

      }
      
      if(this.state.body.length == 0) {
        this.setState({editor_error: getText("SELECT_REVIEW")})
        hasError = true

      } else if(this.state.body.length < MIN_BODY_SIZE) {
        this.setState({editor_error: getText("SHORT_REVIEW")})
        hasError = true

      } else if(this.state.body.length > MAX_BODY_SIZE) {
        this.setState({editor_error: getText("ERROR_LONG_REVIEW")})
        hasError = true

      }
      if(!hasError) {
        this.setState({loading: true})
        browser.axios.post(API_ROOT + "reviews/create", {
          product_id: this.state.product.id,
          weight: this.state.selected_weight,
          experience_id: this.state.rating,
          body: this.state.body
        })
        .then(response => {
          console.log("REVIEW_RESPONSE", response.data)
          if(response.data.auth_required) {
            this.props.history.push("/login")

          } else if(!response.data.success) {
            //show error
            alert(response.data.error)

          } else {
            this.props.history.push("/reviews/" 
            + this.state.product.id + "?weight=" + this.state.selected_weight)
          }
          this.setState({loading: false})
        })
      }
    }

    render () {
        return (
          <div>
            <Navbar user={this.props.user} />
            <div className="h-bg-grey h-pb-15">
            <div>
              <div className={"b-bouncing-loader-wrapper" + (!this.state.loading?" hide":"")} data-v-67bc6bc4="">
                <div className="b-bouncing-loader spinner-absolute h-pt-20" style={{bottom: "0px"}}>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
             <div className={"container" + (this.state.loading?" hide":"")}>
              <div className="row center-xs h-pt-30">
               <div className="b-opinions-card">
                <div className="b-opinions-card__title">
                 {getText("LEAVE_REVIEW")} 
                 <a className="hide" href="/sellerpage-187196">
                  Bibiana O-Onadipe
                 </a>
                </div>
                <div className="b-opinions-card__form">
                 <div className="b-opinions-card__form--rating">
                  <span className="b-opinions-card__form--rating-title">
                   {getText("HOW_WAS_UR_EXP")}
                  </span>
                  <div className="b-opinions-card__form--rating__container">
                   <div onClick={this.handleClick} data-weight={1} className={"b-opinions-card__form--rating__container--item b-opinions-card__form--rating__container--item-positive"+(this.state.selected_weight==1?" b-opinions-card__form--rating__container--item-active":"")}>
                    <svg data-weight={1} className="positive" strokeWidth="0" style={{width: "24px", height: "24px", maxWidth: "24px", maxHeight: "24px", fill: "rgb(112, 185, 63)", stroke: "inherit"}}>
                     <use xlinkHref="#positive">
                     </use>
                    </svg>
                    <span data-weight={1}>
                     {getText("POSITIVE")}
                    </span>
                   </div>
                   <div onClick={this.handleClick} data-weight={0} className={"b-opinions-card__form--rating__container--item b-opinions-card__form--rating__container--item-neutral"+(this.state.selected_weight==0?" b-opinions-card__form--rating__container--item-active":"")}>
                    <svg data-weight={0} className="neutral" strokeWidth="0" style={{width: "24px", height: "24px", maxWidth: "24px", maxHeight: "24px", fill: "rgb(241, 173, 78)", stroke: "inherit"}}>
                     <use xlinkHref="#neutral">
                     </use>
                    </svg>
                    <span data-weight={0}>
                     {getText("NEUTRAL")}
                    </span>
                   </div>
                   <div onClick={this.handleClick} data-weight={-1} className={"b-opinions-card__form--rating__container--item b-opinions-card__form--rating__container--item-negative"+(this.state.selected_weight==-1?" b-opinions-card__form--rating__container--item-active":"")}>
                    <svg data-weight={-1} className="negative" strokeWidth="0" style={{width: "24px", height: "24px", maxWidth: "24px", maxHeight: "24px", fill: "rgb(255, 100, 78)", stroke: "inherit"}}>
                     <use xlinkHref="#negative">
                     </use>
                    </svg>
                    <span data-weight={-1}>
                     {getText("NEGATIVE")}
                    </span>
                   </div>
                  </div>
                     <div className={"form-group fw" 
                   + (this.state.experience_error.length > 0?" fw-has-error":" fw-focused")} style={{maxHeight: "600px"}} tabIndex="-1">
                       <select onChange={this.handleChange} name="rating" className="form-control">
                         <option value="-1">{getText("SELECT_UR_EXP")}</option>
                         {
                           this.state.ratings_text.map((rt, i) => (
                            <option key={i} value={i}>{rt}</option>
                           ))
                         }
                       </select>
                      </div>
                      <span style={{textAlign: "left !important"}} className="fw-field__error qa-fw-field__error">
                         {this.state.experience_error}
                      </span>
                 </div>
                 <div className="b-opinions-card__form--text">
                  <div className="fw-field-container qa-fw-field-container">
                   <div className={"fw-field fw-has-value" 
                   + (this.state.editor_error.length > 0?" fw-has-error":" fw-focused")}>
                    <div className="fw-field__content">
                     <label for="">
                      {getText("WRITE_FEEDBACK")}
                     </label>
                     <textarea onChange={this.handleChange} name="body" className="fw-textarea"></textarea>
                    </div>
                   </div>
                   <span className="fw-field__error qa-fw-field__error">
                     {this.state.editor_error}
                   </span>
                   <div class="b-text-area-max-length" data-v-cca4341a="">{MAX_BODY_SIZE - this.state.body.length} {getText("CHARS_LEFT")}</div>
                  </div>
                  <div className="b-tab-feedback__summary--copy-link">
                   <button onClick={this.submit} className="h-width-100p h-bold fw-button qa-fw-button fw-button--type-success fw-button--size-medium" type="button">
                    <span className="fw-button__content">
                     <span className="fw-button__slot-wrapper cap-case">
                      {getText("SEND_FEEDBACK")}
                     </span>
                    </span>
                   </button>
                  </div>
                 </div>
                </div>
               </div>
               <div className="b-opinions-card-info">
                <div className="b-feedback-info-card">
                 <svg className="without-feedback" strokeWidth="0" style={{width: "96px", height: "84px", maxWidth: "96px", maxHeight: "84px", fill: "rgb(112, 185, 63)", stroke: "inherit"}}>
                  <use xlinkHref="#without-feedback">
                  </use>
                 </svg>
                 <br/>
                  {getText("UR_FEEDBACK_IS_IMPORTANT")}
                 
                </div>
               </div>
              </div>
             </div>
            </div>
           </div>
           <Footer />
           </div>
        )
    }
}

export default CreateReview