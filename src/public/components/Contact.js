import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { SITE_NAME } from '../utils/Constants'


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
            <img src="/public/logo.png" width="45" alt="logo" className="d-inline-block align-middle mr-2"/>
        </Link>
        Contact Us
    </h1>
    <div className="h-hflex b-tip__wrapper">
      <div className="b-tip__content-wrapper">
        <img src="/public/res/images/static/tips-answer-calls.png"/>
      </div>
      <div className="b-tip__content-wrapper">
       <div className="h-bold h-font-16 h-mb-5">
        Answer your calls and chats
       </div>
       <div className="h-font-14">
        Indicate correct contact details. Try to respond all the incoming calls or to call back your customers once available.
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