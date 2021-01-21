import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { SITE_NAME, EMAIL_SUPPORT, getText } from '../../../Constants'


class Contact extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="h-bg-grey h-pb-15">
 <div>
  <div firstLoad="true">
   <div className="b-tips__wrapper">
    <h1 className="b-tips__h1">
        <Link to="/" className="logo font-bask-normal">
            <img src={`${getText("LOGO_PATH")}`} width="45" alt="logo" className="d-inline-block align-middle mr-2"/>
        </Link>
        {getText("CONTACT_US")}
    </h1>
    <div className="h-hflex b-tip__wrapper">
      <div className="b-tip__content-wrapper">
        <img src="/public/res/images/static/tips-answer-calls.png"/>
      </div>
      <div className="b-tip__content-wrapper">
       <div className="h-bold h-font-16 h-mb-5">
        {getText("CONTACT_P_1")}
       </div>
       <div className="h-font-14">
        {getText("CONTACT_P_2")}
        <a href={"mailto:" + EMAIL_SUPPORT}>{EMAIL_SUPPORT}</a>
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

export default Contact