import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { getText, SITE_NAME } from '../../../Constants'
import Navbar from './Navbar'
import Footer from "./Footer"

class CreateTips extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
            <Navbar user={this.props.user} />
            <div className="h-bg-grey h-pb-15">
 <div>
  <div firstLoad="true">
   <div className="b-tips__wrapper">
    <h1 className="b-tips__h1">
     <svg className="light-bulb" style={{width: "16px", height: "22px", maxWidth: "16px", maxHeight: "22px", fill: "inherit", stroke: "inherit", marginBottom: "-2px", marginRight: "8px"}}>
      <use xlinkHref="#light-bulb">
      </use>
     </svg>
        {getText("TIPS_HOW_TO_POST")}
    </h1>
    <div className="b-tips__list">
     <p className="h-mt-20 h-mb-30 h-text-center h-font-16">
      {getText("TIPS_HOW_TO_POST2")} <span className="h-bold b-tips__green-color">{getText("TIPS_HOW_TO_POST3")}:</span>
     </p>
     <div className="h-hflex b-tip__wrapper">
      <div className="b-tip__content-wrapper">
       <img src="/public/res/images/static/tips-attention.png"/>
      </div>
      <div className="b-tip__content-wrapper">
       <div className="h-bold h-font-16 h-mb-5">
        {getText("TIPS_HOW_TO_POST4")}
       </div>
       <div className="h-font-14">
        {getText("TIPS_HOW_TO_POST5")}
       </div>
      </div>
     </div>
     <div className="h-hflex b-tip__wrapper">
      <div className="b-tip__content-wrapper">
       <img src="/public/res/images/static/tips-relevant-price.png"/>
      </div>
      <div className="b-tip__content-wrapper">
       <div className="h-bold h-font-16 h-mb-5">
        {getText("TIPS_HOW_TO_POST6")}
       </div>
       <div className="h-font-14">
        {getText("TIPS_HOW_TO_POST7")}
       </div>
      </div>
     </div>
     <div className="h-hflex b-tip__wrapper">
      <div className="b-tip__content-wrapper">
       <img src="/public/res/images/static/tips-detailed-description.png"/>
      </div>
      <div className="b-tip__content-wrapper">
       <div className="h-bold h-font-16 h-mb-5">
        {getText("TIPS_HOW_TO_POST8")}
       </div>
       <div className="h-font-14">
        {getText("TIPS_HOW_TO_POST9")}
       </div>
      </div>
     </div>
     <div className="h-hflex b-tip__wrapper">
      <div className="b-tip__content-wrapper">
       <img src="/public/res/images/static/tips-picture.png"/>
      </div>
      <div className="b-tip__content-wrapper">
       <div className="h-bold h-font-16 h-mb-5">
        {getText("TIPS_HOW_TO_POST10")}
       </div>
       <div className="h-font-14">
        {getText("TIPS_HOW_TO_POST11")}
       </div>
      </div>
     </div>
     <div className="h-hflex b-tip__wrapper">
      <div className="b-tip__content-wrapper">
       <img src="/public/res/images/static/tips-answer-calls.png"/>
      </div>
      <div className="b-tip__content-wrapper">
       <div className="h-bold h-font-16 h-mb-5">
        {getText("TIPS_HOW_TO_POST12")}
       </div>
       <div className="h-font-14">
        {getText("TIPS_HOW_TO_POST13")}
       </div>
      </div>
     </div>
     <div className="h-hflex b-tip__wrapper">
      <div className="b-tip__content-wrapper">
       <img src="/public/res/images/static/tips-check-location.png"/>
      </div>
      <div className="b-tip__content-wrapper">
       <div className="h-bold h-font-16 h-mb-5">
        {getText("TIPS_HOW_TO_POST14")}
       </div>
       <div className="h-font-14">
        {getText("TIPS_HOW_TO_POST15")}
       </div>
      </div>
     </div>
     <div className="h-hflex b-tip__wrapper">
      <div className="b-tip__content-wrapper">
       <img src="/public/res/images/static/tips-pay-little.png"/>
      </div>
      <div className="b-tip__content-wrapper">
       <div className="h-bold h-font-16 h-mb-5">
        {getText("TIPS_HOW_TO_POST16")}
       </div>
       <div className="h-font-14">
        {getText("TIPS_HOW_TO_POST17")}
       </div>
      </div>
     </div>
    </div>
   </div>
   <div className="b-tips__button-wrapper">
    <a className="b-button b-button--primary b-button--border-radius" href="/sell">
     {getText("SELL_NOW")}
    </a>
   </div>
  </div>
 </div>
</div>
<Footer />
</div>
        )
    }
}

export default CreateTips