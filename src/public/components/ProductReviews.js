import React, { Component } from "react"
import { Link } from "react-router-dom"
import { API_ROOT, SERVER_ADDR, ERROR_NET_UNKNOWN, NO_PROFILE_PHOTO_IMAGE } from "../../../Constants"
const browser = require("../utils/Browser")
var dateFormat = require('dateformat');
import Navbar from './Navbar'
import Footer from "./Footer"
import { intOrMin, queries } from "../utils/Funcs";
import { get } from "https";

const reviewsType = [1, 0, -1]
class ProductReviews extends Component {
    constructor() {
        super()
        this.state = {
          product: {},
          selected_type: 1,
          positive_reviews: [],
          neutral_reviews: [],
          negative_reviews: [],
          positive_count: 0,
          neutral_count: 0,
          negative_count: 0,
          positive_page: 1,
          neutral_page: 1,
          negative_page: 1
        }

        this.handleClick = this.handleClick.bind(this)
    }

    showPositive = () => {
      this.setState({selected_type: 1})
      this.state.selected_type = 1
      if(this.state.positive_count > 0 && this.state.positive_reviews.length == 0) {
        this.getReviews()
      }
    }
    showNeutral = () => {
      this.setState({selected_type: 0})
      this.state.selected_type = 0
      if(this.state.neutral_count > 0 && this.state.neutral_reviews.length == 0) {
        this.getReviews()
      }
    }
    showNegative = () => {
      this.setState({selected_type: -1})
      this.state.selected_type = -1
      if(this.state.negative_count > 0 && this.state.negative_reviews.length == 0) {
        this.getReviews()
      }
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
        this.state.product.id = id
        var positive_loaded = false;
        var negative_loaded = false;
        var neutral_loaded = false;
        //get total number of positive, negative, and neutral reviews
        //get positive total number
        this.setState({loading: true})
        browser.axios.get(API_ROOT + "reviews/" + id + "?type=1&count_only=1")
        .then(response => {
          this.setState({positive_count: response.data.total})
          positive_loaded = true
          if(positive_loaded && negative_loaded && neutral_loaded) {
            this.setDefaultReview()
            this.getReviews()
          }
        })
        //get neutral total number
        browser.axios.get(API_ROOT + "reviews/" + id + "?type=0&count_only=1")
        .then(response => {
          this.setState({neutral_count: response.data.total})
          neutral_loaded = true
          if(positive_loaded && negative_loaded && neutral_loaded) {
            this.setDefaultReview()
            this.getReviews()
          }
        })
        //get negative total number
        browser.axios.get(API_ROOT + "reviews/" + id + "?type=-1&count_only=1")
        .then(response => {
          this.setState({negative_count: response.data.total})
          negative_loaded = true
          if(positive_loaded && negative_loaded && neutral_loaded) {
            this.setDefaultReview()
            this.getReviews()
          }
        })
      }
    }

    setDefaultReview = () => {
      const defaultWeight = intOrMin(queries(this.props).weight, -10)
      if(reviewsType.includes(defaultWeight)) {
        this.setState({selected_type: defaultWeight})

      } else {
        if(this.state.positive_count > 0) {
          this.setState({selected_type: 1})
  
        } else if(this.state.neutral_count > 0) {
          this.setState({selected_type: 0})
  
        } else if(this.state.negative_count > 0) {
          this.setState({selected_type: -1})
          
        } else {
          this.setState({selected_type: -10})
        }
      }
    }
    getReviews = () => {
      if(reviewsType.includes(this.state.selected_type)) {
        this.setState({loading: true})
        var page = 1;
        switch (this.state.selected_type) {
          case 1:
            page = this.state.positive_page
            break;
          case 0:
            page = this.state.neutral_page
            break;
          case -1:
            page = this.state.negative_page
        }
        var reviewsAddr = API_ROOT 
        + "reviews/" 
        + this.state.product.id 
        + "?type=" + this.state.selected_type
        + "&page=" + page
        browser.axios.get(reviewsAddr)
        .then(response => {
          switch (this.state.selected_type) {
            case 1:
              var reviews = this.state.positive_reviews.
              concat(response.data.list)
              this.setState({positive_reviews: reviews})
              this.setState({positive_page: this.state.positive_page + 1})
              break;
            case 0:
              var reviews = this.state.neutral_reviews.
              concat(response.data.list)
              this.setState({neutral_reviews: reviews})
              this.setState({neutral_page: this.state.neutral_page + 1})
              break;
            case -1:
              var reviews = this.state.negative_reviews.
              concat(response.data.list)
              this.setState({negative_reviews: reviews})
              this.setState({negative_page: this.state.negative_page + 1})
          }
          this.setState({loading: false})
        })
      }
      
    }

    handleClick = e => {
      console.log("clickDetected")
      var dataType = e.target.getAttribute("data-type")
      console.log("clickdDataType", dataType)
      if(dataType == "create-review") {
        console.log("clickDataType is", "create-review")
        this.props.history.push("/create-review/"+this.state.product.id)
      }
    }

    render () {
        return (
          <div>
            <Navbar user={this.props.user} />
            <div className="h-bg-grey h-pb-15">
            <div>
              <div className="b-bouncing-loader-wrapper" data-v-67bc6bc4="" style={!this.state.loading?{display: "none"}:{display: "block"}}>
                <div className="b-bouncing-loader spinner-absolute h-pt-20" style={{bottom: "0px"}}>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
             <div className={"container"+(this.state.loading?" hide":"")}>
              <div className="row center-xs h-pt-30">
               <div className="bc-opinions-left-container">
                <div className="b-opinions-card">
                 <div className="b-opinions-card__title">
                  Feedbacks&nbsp;
                  {
                    this.state.product.id?
                    <Link to={"/seller/"+this.state.product.user_id}>
                      {this.state.product.poster_fullname}
                    </Link>
                    :
                    ""
                  }
                 </div>

                 {
                   this.state.product && this.state.product.id?
                   <div>
                       <div className="b-tab-feedback__summary b-tab-feedback__summary--white">
                       <div className="b-tab-feedback__summary--reactions">
                        <div onClick={this.showPositive} className={"b-tab-feedback__summary--reactions-item b-tab-feedback__summary--reactions-item-positive" 
                        + (this.state.selected_type == 1? " feedback-tab-positive-active":"")}>
                         <svg className="positive" strokeWidth="0" style={{width: "34px", height: "34px", maxWidth: "34px", maxHeight: "34px", fill: "rgb(112, 185, 63)", stroke: "inherit"}}>
                          <use xlinkHref="#positive">
                          </use>
                         </svg>
                         <br/>
                          <span>
                           Positive ({this.state.positive_count})
                          </span>
                        </div>
                        <div onClick={this.showNeutral} className={"b-tab-feedback__summary--reactions-item b-tab-feedback__summary--reactions-item-neutral" 
                        + (this.state.selected_type == 0? " feedback-tab-neutral-active":"")}>
                         <svg className="neutral" strokeWidth="0" style={{width: "34px", height: "34px", maxWidth: "34px", maxHeight: "34px", fill: "rgb(241, 173, 78)", stroke: "inherit"}}>
                          <use xlinkHref="#neutral">
                          </use>
                         </svg>
                         <br/>
                          <span>
                           Neutral ({this.state.neutral_count})
                          </span>
                        </div>
                        <div onClick={this.showNegative} className={"b-tab-feedback__summary--reactions-item b-tab-feedback__summary--reactions-item-negative" 
                        + (this.state.selected_type == -1? " feedback-tab-negative-active":"")}>
                         <svg className="negative" strokeWidth="0" style={{width: "34px", height: "34px", maxWidth: "34px", maxHeight: "34px", fill: "rgb(255, 100, 78)", stroke: "inherit"}}>
                          <use xlinkHref="#negative">
                          </use>
                         </svg>
                         <br/>
                          <span>
                           Negative ({this.state.negative_count})
                          </span>
                        </div>
                       </div>
                       <div className="b-tab-feedback__summary--copy-link">
                        <button onClick={this.handleClick} data-type="create-review" className="h-width-100p h-bold fw-button qa-fw-button fw-button--type-success fw-button--size-medium" type="button">
                         <span className="fw-button__content" data-type="create-review">
                          <span className="fw-button__slot-wrapper" data-type="create-review">
                           Leave Feedback
                          </span>
                         </span>
                        </button>
                       </div>
                      </div>
                      <div className={this.state.selected_type != 1? "hide" : ""}>
                      {
                        this.state.positive_reviews.map((review, index) => (
                         <div className="b-feedback-item" key={review.id}>
                         <div className="b-feedback-item--user">
                          <Link to={"/seller/"+review.user_id} className="b-feedback-item--logo" style={review.profile_photo.length == 0?{backgroundImage: 'url('+NO_PROFILE_PHOTO_IMAGE+')'}:{backgroundImage: 'url('+review.profile_photo+')'}}>
                          </Link>
                          <div className="b-feedback-item--profile-info">
                           <Link to={"/seller/"+review.user_id} className="b-feedback-item--profile-info-name">
                            {review.fullname}
                           </Link>
                           <span className="b-feedback-item--profile-info-status b-feedback-item--profile-info-status--negative">
                            Positive
                           </span>
                          </div>
                         </div>
                         <div className="b-feedback-item--comment-container">
                          <div className="b-feedback-item--comment">
                           {review.body}
                           <br/>
                          </div>
                         </div>
                         <div className="b-feedback-item--date">
                          {dateFormat(new Date(review.created), "mm-yyyy")}
                         </div>
                        </div>
                        ))
                      }
                        <button onClick={this.getReviews} data-type="create-review" type="button" 
                        className={
                          (this.state.positive_count > 
                            this.state.positive_reviews.length?"":"hide ") +
                          "h-width-100p h-bold fw-button qa-fw-button fw-button--type-success fw-button--size-medium"
                        }>
                         <span className="fw-button__content" data-type="create-review">
                          <span className="fw-button__slot-wrapper" data-type="create-review">
                          Load more >>
                          </span>
                         </span>
                        </button>
                      </div>
                      <div className={this.state.selected_type != 0? "hide" : ""}>
                      {
                        this.state.neutral_reviews.map((review, index) => (
                         <div className="b-feedback-item" key={review.id}>
                         <div className="b-feedback-item--user">
                          <Link to={"/seller/"+review.user_id} className="b-feedback-item--logo" style={review.profile_photo.length == 0?{backgroundImage: 'url('+NO_PROFILE_PHOTO_IMAGE+')'}:{backgroundImage: 'url('+review.profile_photo+')'}}>
                          </Link>
                          <div className="b-feedback-item--profile-info">
                           <Link to={"/seller/"+review.user_id} className="b-feedback-item--profile-info-name">
                            {review.fullname}
                           </Link>
                           <span className="b-feedback-item--profile-info-status b-feedback-item--profile-info-status--negative">
                            Neutral
                           </span>
                          </div>
                         </div>
                         <div className="b-feedback-item--comment-container">
                          <div className="b-feedback-item--comment">
                           {review.body}
                           <br/>
                          </div>
                         </div>
                         <div className="b-feedback-item--date">
                          {dateFormat(new Date(review.created), "mm-yyyy")}
                         </div>
                        </div>
                        ))
                      }
                      <button onClick={this.getReviews} data-type="create-review" type="button" 
                      className={
                        (this.state.neutral_count > 
                          this.state.neutral_reviews.length?"":"hide ") +
                        "h-width-100p h-bold fw-button qa-fw-button fw-button--type-success fw-button--size-medium"
                      }>
                       <span className="fw-button__content" data-type="create-review">
                        <span className="fw-button__slot-wrapper" data-type="create-review">
                        Load more >>
                        </span>
                       </span>
                      </button>
                      </div>
                      <div className={this.state.selected_type != -1? "hide" : ""}>
                      {
                        this.state.negative_reviews.map((review, index) => (
                         <div className="b-feedback-item" key={review.id}>
                         <div className="b-feedback-item--user">
                          <Link to={"/seller/"+review.user_id} className="b-feedback-item--logo" style={review.profile_photo.length == 0?{backgroundImage: 'url('+NO_PROFILE_PHOTO_IMAGE+')'}:{backgroundImage: 'url('+review.profile_photo+')'}}>
                          </Link>
                          <div className="b-feedback-item--profile-info">
                           <Link to={"/seller/"+review.user_id} className="b-feedback-item--profile-info-name">
                            {review.fullname}
                           </Link>
                           <span className="b-feedback-item--profile-info-status b-feedback-item--profile-info-status--negative">
                            Negative
                           </span>
                          </div>
                         </div>
                         <div className="b-feedback-item--comment-container">
                          <div className="b-feedback-item--comment">
                           {review.body}
                           <br/>
                          </div>
                         </div>
                         <div className="b-feedback-item--date">
                          {dateFormat(new Date(review.created), "mm-yyyy")}
                         </div>
                        </div>
                        ))
                      }
                      <button onClick={this.getReviews} data-type="create-review" type="button" 
                      className={
                        (this.state.negative_count > 
                          this.state.negative_reviews.length?"":"hide ") +
                        "h-width-100p h-bold fw-button qa-fw-button fw-button--type-success fw-button--size-medium"
                      }>
                       <span className="fw-button__content" data-type="create-review">
                        <span className="fw-button__slot-wrapper" data-type="create-review">
                        Load more >>
                        </span>
                       </span>
                      </button>
                      </div>
                   </div>
                   :
                   ""
                 }
                 
                </div>
               </div>
               <div className="b-opinions-card-info">
                <div className="b-feedback-info-card">
                 <svg className="without-feedback" strokeWidth="0" style={{width: "96px", height: "84px", maxWidth: "96px", maxHeight: "84px", fill: "rgb(112, 185, 63)", stroke: "inherit"}}>
                  <use xlinkHref="#without-feedback">
                  </use>
                 </svg>
                 <br/>
                  Your feedback is very important for the seller review. Please, leave the honest review to help other buyers and the seller in the customer attraction.
                 
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

export default ProductReviews