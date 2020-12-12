import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { getText, SITE_NAME } from '../../../Constants'


class About extends Component {
    constructor() {
        super()
    }

    sell = () => {
        document.location.href = "/sell"
    }

    shop = () => {
        this.props.history.push("/")
    }

    render() {
        return (
<div className="h-bg-grey h-pb-15">
 <div>
  <div firstLoad="true">
   <div className="b-tips__wrapper">
    <h1 className="b-tips__h1 cap-case">
        <Link to="/" className="logo font-bask-normal">
            <img src={`${getText("LOGO_PATH")}`} width="45" alt="logo" className="d-inline-block align-middle mr-2"/>
        </Link>
        {getText("ABOUT_US")}
    </h1>
    
<div className="b-about-bg">
 <div>
  <div className="b-about-wrapper container">
   <div className="b-about-section">
    <div className="b-about-side">
     <div className="b-about-header-wrapper">
      <h2 className="b-about-header-title">
       {getText("ABOUT_SITE_SHORT")}
      </h2>
      <span className="b-about-span h-mt-30 h-mb-30">
       {getText("LONG_SITE_DESC")}
      </span>
      <span className="b-about-scroll-to-header">
       {getText("TABLE_OF_CONTENT")}
      </span>
      <a href="#howToSell" className="b-about-scroll-to div">
       {getText("HOW_TO_SELL_ON") + " " + SITE_NAME + "?"}
       <div className="b-about-scroll-to-icon">
        <svg className="bottom" strokeWidth="0" style={{width: "24px", height: "24px", maxWidth: "24px", maxHeight: "24px", fill: "rgb(189, 189, 189)", stroke: "inherit"}}>
         <use xlinkHref="#bottom">
         </use>
        </svg>
       </div>
      </a>
      <a href="#howToBuy" className="b-about-scroll-to div">
      {getText("HOW_TO_SELL_ON") + " " + SITE_NAME + "?"}
       <div className="b-about-scroll-to-icon">
        <svg className="bottom" strokeWidth="0" style={{width: "24px", height: "24px", maxWidth: "24px", maxHeight: "24px", fill: "rgb(189, 189, 189)", stroke: "inherit"}}>
         <use xlinkHref="#bottom">
         </use>
        </svg>
       </div>
      </a>
      <a href="#safety" className="b-about-scroll-to div">
       {getText("SAFETY")}
       <div className="b-about-scroll-to-icon">
        <svg className="bottom" strokeWidth="0" style={{width: "24px", height: "24px", maxWidth: "24px", maxHeight: "24px", fill: "rgb(189, 189, 189)", stroke: "inherit"}}>
         <use xlinkHref="#bottom">
         </use>
        </svg>
       </div>
      </a>
      <a href="#sellLikePro" className="hidden b-about-scroll-to div">
       {getText("SELL_LIKE_A_PRO")}
       <div className="b-about-scroll-to-icon">
        <svg className="bottom" strokeWidth="0" style={{width: "24px", height: "24px", maxWidth: "24px", maxHeight: "24px", fill: "rgb(189, 189, 189)", stroke: "inherit"}}>
         <use xlinkHref="#bottom">
         </use>
        </svg>
       </div>
      </a>
     </div>
    </div>
    <div className="b-about-side">
     <img alt="first" src="/public/res/images/static/first.svg"/>
    </div>
   </div>
   <div className="b-about-section reverse" id="howToSell">
    <div className="b-about-side">
     <h2 className="b-about-header-title">
      {getText("HOW_TO_SELL_ON") + " " + SITE_NAME + "?"}
     </h2>
     <div className="b-about-list-element">
      <h3 className="b-about-list-element-title">
       {getText("FIG_1")}.
       <a href="/register">
        {getText("REG")}
       </a>
      </h3>
      <span>
       {getText("REG_MARKETING")}
      </span>
     </div>
     <div className="b-about-list-element">
      <h3 className="b-about-list-element-title">
      {getText("FIG_2")}. {getText("MAKE_ITEM_PHOTOS")}
      </h3>
      <span>
       {getText("PHOTO_UPLOAD_MARKETING")}
      </span>
     </div>
     <div className="b-about-list-element">
      <h3 className="b-about-list-element-title">
      {getText("FIG_3")}. <a href="/sell" className="up-case">{getText("CLICK_D_SELL_BTN")}</a>.
      </h3>
      <span>
       {getText("AD_POST_MARKETING")}
      </span>
     </div>
     <div className="b-about-list-element">
      <h3 className="b-about-list-element-title">
       {getText("FIG_4")}. {getText("ANS_REACTIONS")}
      </h3>
      <span>
{"       If everything is ok with your advert, it’ll be on " + SITE_NAME + " in a couple of hours after sending to moderation.                                 We’ll send you a letter and notification when your advert goes live.                                 Check your messages and be ready to earn money!"}
       <span className="hidden">
        {getText("SELL_LIKE_A_PRO_QUEST")} <a className="" href="/sc/premium-services">
        {getText("CHECK_PREMIUM")}
        </a>
        .
       </span>
      </span>
     </div>
     <button onClick={this.sell} className="b-primary-button about accent h-mt-30">
      {getText("SELL")}
     </button>
    </div>
    <div className="b-about-side">
     <img alt="second" src="/public/res/images/static/second.svg"/>
    </div>
   </div>
   <div className="b-about-section" id="howToBuy">
    <div className="b-about-side">
     <h2 className="b-about-header-title">
      {getText("HOW_TO_BUY_ON") + " " + SITE_NAME + "?"}
     </h2>
     <div className="b-about-list-element">
      <h3 className="b-about-list-element-title">
       {getText("FIG_1")}. {getText("BROWSE_OR_SEARCH_CTL")}
      </h3>
      <span>
       {getText("FIND_WHAT_U_NEED")}
      </span>
     </div>
     <div className="b-about-list-element">
      <h3 className="b-about-list-element-title">
       {getText("FIG_2")}. {getText("CONTACT_A_SELLER")}
      </h3>
      <span>
          {getText("USE_CHAT")}
      </span>
     </div>
     <div className="b-about-list-element">
      <h3 className="b-about-list-element-title">
       {getText("FIG_3")}. {getText("PICK_OR_DELIVERY")}
      </h3>
      <span>
       {getText("CHECK_SELLER")}
      </span>
     </div>
     <div className="b-about-list-element">
      <h3 className="b-about-list-element-title">
       {getText("FIG_4")}. {getText("GIVE_SELLER_FEEDBACK")}
      </h3>
      <span>
       {getText("FEEDBACK_ENCOURAGED")}
      </span>
     </div>
     <button onClick={this.shop} className="b-primary-button about accent h-mt-30">
      {getText("GO_SHOPPING")}
     </button>
    </div>
    <div className="b-about-side">
     <img alt="third" src="/public/res/images/static/third.svg"/>
    </div>
   </div>
   <div className="b-about-section reverse" id="safety">
    <div className="b-about-side">
     <h2 className="b-about-header-title">
      {getText("SAFETY")}
     </h2>
     <div className="b-about-list-element">
      <h3 className="b-about-list-element-title">
       {getText("FIG_1")}. {getText("GENERAL")}
      </h3>
      <span>
          {getText("USER_REPORT_ENCOURAGED")}
      </span>
     </div>
     <div className="b-about-list-element">
      <h3 className="b-about-list-element-title">
       {getText("FIG_2")}. {getText("PERSONAL_SAFETY_TIPS")}
      </h3>
      <span>
       - {getText("DO_NOT_PAY_ADVANCE")}
       <br/>
        - {getText("PUBLIC_MEET_UP")}
        <br/>
         - {getText("CHECK_B4_PAY")}
          - {getText("PAY_AFTER_COLLECTION")}
          <br/>
      </span>
     </div>
     <div className="hidden b-about-list-element">
      <h3 className="b-about-list-element-title">
       {getText("FIG_3")}. {getText("SECURE_PAY")}
      </h3>
      <span>
        <a className="" href="/sc/premium-services">
            {getText("WE_PROVIDE_PREMIUM")}
        </a>
        {getText("PREMIUM_FOR_THOSE")}
      </span>
     </div>
    </div>
    <div className="b-about-side">
     <img alt="fourth" src="/public/res/images/static/fourth.svg"/>
    </div>
   </div>
   <div className="hidden b-about-section" id="sellLikePro">
    <div className="b-about-side">
     <h2 className="b-about-header-title">
     {getText("SELL_LIKE_A_PRO")}
     </h2>
     <div className="b-about-list-element">
      <h3 className="b-about-list-element-title">
       {getText("FIG_1")}. {getText("ATTENTION_TO_INFO")}
      </h3>
      <span>
       {getText("MAKE_GOOD_PHOTOS")}
      </span>
     </div>
     <div className="b-about-list-element">
      <h3 className="b-about-list-element-title">
       {getText("FIG_2")}. {getText("ANS_QUICKLY")}
      </h3>
      <span>
       {getText("DONT_MAKE_BUYERS_WAIT")}
       <span>
        Be online
        <a className="D-none" href="/sc/premium-services">
            {getText("OR_GET_SMS_NOT")}
        </a>
       </span>
      </span>
     </div>
     <div className="b-about-list-element">
      <h3 className="b-about-list-element-title">
       {getText("FIG_3")}. {getText("USE")}
       <a className="" href="/sc/premium-services">
        {getText("USE_PREMIUM_15X")}
       </a>
      </h3>
      <span>
       {getText("UR_ADVERT_ON_TOP")}
       <a className="" href="/sc/premium-services/how-it-works">
        {getText("HOW_DOES_IT_WORK")}
       </a>
      </span>
     </div>
     <button className="b-primary-button about accent h-mt-30">
      {getText("GO_PREMIUM")}
     </button>
    </div>
    <div className="b-about-side">
     <img alt="fifth" src="/public/res/images/static/fifth.svg"/>
    </div>
   </div>
   <div className="b-about-questions">
    <button className="hidden b-primary-button about">
     {getText("GOT_QUEST_READ_FAQ")}
    </button>
   </div>
  </div>
 </div>
</div>
   </div>
  </div>
</div>
</div>
        )
    }
}

export default About