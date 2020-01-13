import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { SITE_NAME } from '../utils/Constants'


class About extends Component {
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
        About Us
    </h1>
    
<div className="b-about-bg">
 <div>
  <div className="b-about-wrapper container">
   <div className="b-about-section">
    <div className="b-about-side">
     <div className="b-about-header-wrapper">
      <h2 className="b-about-header-title">
       {SITE_NAME + " is the best place to sell anything from anywhere to anyone"}
      </h2>
      <span className="b-about-span h-mt-30 h-mb-30">
       It is the biggest free online classified with an advanced security system.                                 We provide a simple hassle-free solution to sell and buy almost anything.
      </span>
      <span className="b-about-scroll-to-header">
       Table of contents
      </span>
      <div className="b-about-scroll-to">
       {"How to sell on "+SITE_NAME+"?"}
       <div className="b-about-scroll-to-icon">
        <svg className="bottom" strokeWidth="0" style={{width: "24px", height: "24px", maxWidth: "24px", maxHeight: "24px", fill: "rgb(189, 189, 189)", stroke: "inherit"}}>
         <use xlinkHref="#bottom">
         </use>
        </svg>
       </div>
      </div>
      <div className="b-about-scroll-to">
       {"How to buy on "+SITE_NAME+"?"}
       <div className="b-about-scroll-to-icon">
        <svg className="bottom" strokeWidth="0" style={{width: "24px", height: "24px", maxWidth: "24px", maxHeight: "24px", fill: "rgb(189, 189, 189)", stroke: "inherit"}}>
         <use xlinkHref="#bottom">
         </use>
        </svg>
       </div>
      </div>
      <div className="b-about-scroll-to">
       Safety
       <div className="b-about-scroll-to-icon">
        <svg className="bottom" strokeWidth="0" style={{width: "24px", height: "24px", maxWidth: "24px", maxHeight: "24px", fill: "rgb(189, 189, 189)", stroke: "inherit"}}>
         <use xlinkHref="#bottom">
         </use>
        </svg>
       </div>
      </div>
      <div className="b-about-scroll-to">
       Sell like a pro!
       <div className="b-about-scroll-to-icon">
        <svg className="bottom" strokeWidth="0" style={{width: "24px", height: "24px", maxWidth: "24px", maxHeight: "24px", fill: "rgb(189, 189, 189)", stroke: "inherit"}}>
         <use xlinkHref="#bottom">
         </use>
        </svg>
       </div>
      </div>
     </div>
    </div>
    <div className="b-about-side">
     <img alt="first" src="/public/res/images/static/first.svg"/>
    </div>
   </div>
   <div className="b-about-section reverse" id="howToSell">
    <div className="b-about-side">
     <h2 className="b-about-header-title">
      {"How to sell on "+SITE_NAME+"?"}
     </h2>
     <div className="b-about-list-element">
      <h3 className="b-about-list-element-title">
       1.
       <a href="/registration.html">
        Register
       </a>
      </h3>
      <span>
       Register using your e-mail and phone number (or do it via Facebook or Google).                                 Make sure you’re entering a correct phone number, so your clients could reach you!
      </span>
     </div>
     <div className="b-about-list-element">
      <h3 className="b-about-list-element-title">
       2. Make photos of your item.
      </h3>
      <span>
       Feel free to make a lot of photos using your smartphone.                                 Make sure they show your item in the best light.
      </span>
     </div>
     <div className="b-about-list-element">
      <h3 className="b-about-list-element-title">
       3. Press
       <a href="/add-free-ad.html">
        SELL
       </a>
       .
      </h3>
      <span>
       Choose a proper category, upload your photos and write a clear title and full description of your item.                                 Enter a fair price, select attributes and send your advert to review!
      </span>
     </div>
     <div className="b-about-list-element">
      <h3 className="b-about-list-element-title">
       4. Answer the messages and calls from your clients!
      </h3>
      <span>
       If everything is ok with your advert, it’ll be on Jiji in a couple of hours after sending to moderation.                                 We’ll send you a letter and notification when your advert goes live.                                 Check your messages and be ready to earn money!
       <span>
        Do you want to sell like a pro? Check out our
        <a className="" href="/sc/premium-services">
         Premium Services
        </a>
        .
       </span>
      </span>
     </div>
     <button className="b-primary-button about accent h-mt-30">
      Sell
     </button>
    </div>
    <div className="b-about-side">
     <img alt="second" src="/public/res/images/static/second.svg"/>
    </div>
   </div>
   <div className="b-about-section" id="howToBuy">
    <div className="b-about-side">
     <h2 className="b-about-header-title">
      {"How to buy on "+SITE_NAME+"?"}
     </h2>
     <div className="b-about-list-element">
      <h3 className="b-about-list-element-title">
       1. Search for the item.
      </h3>
      <span>
       Find what you need using search panel and filters.                                 We have over a million adverts, choose exactly what you are looking for.
      </span>
     </div>
     <div className="b-about-list-element">
      <h3 className="b-about-list-element-title">
       2. Contact a seller.
      </h3>
      <span>
       You may use chat on Jiji or call them via phone.                                 Discuss all the details, negotiate about the price.
      </span>
     </div>
     <div className="b-about-list-element">
      <h3 className="b-about-list-element-title">
       3. Take your item or order a delivery.
      </h3>
      <span>
       We check our sellers carefully, but it’s always better to check twice, right?                                 Meet a seller in public place and be sure to pay only after collecting your item.
      </span>
     </div>
     <div className="b-about-list-element">
      <h3 className="b-about-list-element-title">
       4. Leave your feedback about the seller.
      </h3>
      <span>
       Feel free to tell us about your purchase.                                 Your feedback will be published online on the seller’s page and will be very helpful for other buyers.                                 Let’s build a safe and professional business community together!
      </span>
     </div>
     <button className="b-primary-button about accent h-mt-30">
      Go shopping
     </button>
    </div>
    <div className="b-about-side">
     <img alt="third" src="/public/res/images/static/third.svg"/>
    </div>
   </div>
   <div className="b-about-section reverse" id="safety">
    <div className="b-about-side">
     <h2 className="b-about-header-title">
      Safety
     </h2>
     <div className="b-about-list-element">
      <h3 className="b-about-list-element-title">
       1. General
      </h3>
      <span>
       We are highly focused on the security and can solve any issues in short-terms.                                 That’s why we ask you, kindly, to leave a review after purchasing.                                 If you run into any problems with a seller, you can report us and Jiji Team will check this seller as soon as possible.
      </span>
     </div>
     <div className="b-about-list-element">
      <h3 className="b-about-list-element-title">
       2. Personal safety tips.
      </h3>
      <span>
       - Do not pay in advance, even for the delivery
       <br/>
        - Try to meet at a safe, public location
        <br/>
         - Check the item BEFORE you buy it
          - Pay only after collecting the item
          <br/>
      </span>
     </div>
     <div className="b-about-list-element">
      <h3 className="b-about-list-element-title">
       3. Secure payments.
      </h3>
      <span>
       Jiji provides
       <a className="" href="/sc/premium-services">
        Premium Services
       </a>
       for those who want to sell and earn more.                                 We accept both online and offline payments for these services.                                 We guarantee secure and reliable payments on Jiji.
      </span>
     </div>
    </div>
    <div className="b-about-side">
     <img alt="fourth" src="/public/res/images/static/fourth.svg"/>
    </div>
   </div>
   <div className="b-about-section" id="sellLikePro">
    <div className="b-about-side">
     <h2 className="b-about-header-title">
      Sell like a pro!
     </h2>
     <div className="b-about-list-element">
      <h3 className="b-about-list-element-title">
       1. Pay attention to the details.
      </h3>
      <span>
       Make good photos of your goods, write clear and detailed description.
      </span>
     </div>
     <div className="b-about-list-element">
      <h3 className="b-about-list-element-title">
       2. Answer quickly.
      </h3>
      <span>
       Don’t make your buyer wait for your message for days.
       <span>
        Be online or get
        <a className="" href="/sc/premium-services">
         SMS notifications
        </a>
        on your messages.
       </span>
      </span>
     </div>
     <div className="b-about-list-element">
      <h3 className="b-about-list-element-title">
       3. Use
       <a className="" href="/sc/premium-services">
        Premium Services
       </a>
       to get 15x more customers!
      </h3>
      <span>
       Your adverts will appear at the top of the page and you will sell faster!
       <a className="" href="/sc/premium-services/how-it-works">
        How does it work?
       </a>
      </span>
     </div>
     <button className="b-primary-button about accent h-mt-30">
      Go premium
     </button>
    </div>
    <div className="b-about-side">
     <img alt="fifth" src="/public/res/images/static/fifth.svg"/>
    </div>
   </div>
   <div className="b-about-questions">
    <button className="b-primary-button about">
     Still have questions? Read FAQ.
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