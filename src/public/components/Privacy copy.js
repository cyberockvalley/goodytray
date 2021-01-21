import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { SITE_NAME, SITE_DOT_COM, EMAIL_SUPPORT, getText } from '../../../Constants'


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
    <h1 className="b-tips__h1">
        <Link to="/" className="logo font-bask-normal">
            <img src={`${getText("LOGO_PATH")}`} width="45" alt="logo" className="d-inline-block align-middle mr-2"/>
        </Link>
        Privacy Policy
    </h1>
    
<div className="b-about-wrapper container">
 <div className="h-bg-white h-pv-15 h-ph-15">
  <h1 className="h-mt-0">
   {getText("PRIVACY_POLICY")}
  </h1>
  <p>
{"   This Privacy Policy explains what personal data is collected when you use the " + SITE_DOT_COM + " any " + SITE_DOT_COM + " mobile application (“"}
   <b>
{"    " + SITE_NAME + ""}
   </b>
   ”) and the services provided through it (together with the “
   <b>
    Service
   </b>
   ”), how such personal data will be used, shared.
  </p>
  <p>
   BY USING THE SERVICE, YOU PROMISE US THAT (I) YOU HAVE READ, UNDERSTAND AND AGREE TO THIS PRIVACY POLICY, AND (II) YOU ARE OVER 16 YEARS OF AGE (OR HAVE HAD YOUR PARENT OR GUARDIAN READ AND AGREE TO THIS PRIVACY POLICY FOR YOU). If you do not agree or are unable to make this promise, you must not use the Service. In such case, you must contact the support team via online chat or email to (a) request deletion of your account and data.
  </p>
  <p>
   “
   <b>
    Process
   </b>
   ”, in respect of personal data, includes to collect, store, and disclose to others.
  </p>
  <h3>
   TABLE OF CONTENTS
  </h3>
  <ul className="h-ml-15 h-list-style-none">
   <li>
    <h4>
     <a href="#1">
      1. PERSONAL DATA CONTROLLER
     </a>
    </h4>
   </li>
   <li>
    <h4>
     <a href="#2">
      2. CATEGORIES OF PERSONAL DATA WE COLLECT
     </a>
    </h4>
   </li>
   <li>
    <h4>
     <a href="#3">
      3. DATA PROTECTION PRINCIPLES
     </a>
    </h4>
   </li>
   <li>
    <h4>
     <a href="#4">
      4. FOR WHAT PURPOSES WE PROCESS PERSONAL DATA
     </a>
    </h4>
   </li>
   <li>
    <h4>
     <a href="#5">
      5. UNDER WHAT LEGAL BASES WE PROCESS YOUR PERSONAL DATA
     </a>
    </h4>
   </li>
   <li>
    <h4>
     <a href="#6">
      6. WITH WHOM WE SHARE YOUR PERSONAL DATA
     </a>
    </h4>
   </li>
   <li>
    <h4>
     <a href="#7">
      7. HOW YOU CAN EXERCISE YOUR PRIVACY RIGHTS
     </a>
    </h4>
   </li>
   <li>
    <h4>
     <a href="#8">
      8. AGE LIMITATION
     </a>
    </h4>
   </li>
   <li>
    <h4>
     <a href="#9">
      9. CHANGES TO THIS PRIVACY POLICY
     </a>
    </h4>
   </li>
   <li>
    <h4>
     <a href="#10">
      10. DATA RETENTION
     </a>
    </h4>
   </li>
   <li>
    <h4>
     <a href="#11">
      11. CONTACT US
     </a>
    </h4>
   </li>
  </ul>
  <h3 id="1">
   1. PERSONAL DATA CONTROLLER
  </h3>
  <p>
{"   " + SITE_DOT_COM + " will be the controller of your personal data."}
  </p>
  <h3 id="2">
   2. CATEGORIES OF PERSONAL DATA WE COLLECT
  </h3>
  <p>
   We collect data you give us voluntarily (for example, an email address). We also collect data automatically (for example, your IP address).
  </p>
  <ol className="h-ml-15">
   <li>
    <h5>
     Data you give us
    </h5>
    <p>
     You may be asked to provide us information about yourself when you register for and/or use the Service. This information includes: "first name, phone number, email (together “Required Information”), last name, photo, address details, working hours.
    </p>
    <p>
     To use our Service and register an account, you will need to provide Required Information. You will be able to use the Service even if you do not give this data to us, but some Service’s functionality may be limited to you (for example, if you do no register an account, you will not be able to chat with other users, post ads, see contact details of other users).
    </p>
    <p>
     Sometimes you may also need to provide to us additional information in the communication with our Support Team in order to fulfill your request (for example, if your account was previously blocked, we may ask you to confirm your identity by providing an ID document).
    </p>
   </li>
   <li>
    <h5>
     Data provided to us by third parties
    </h5>
    When you decide to log in using Facebook or Google, we get personal data from your Facebook or Google account. This includes your profile image, name, and Facebook ID, Google ID, friends list. For more information, please refer to the Facebook Permissions Reference (describes the categories of information, which Facebook may share with third parties and the set of requirements) and to the Facebook Data policy. In addition, Facebook lets you control the choices you made when connecting your Facebook profile to the App on their Apps and Websites page. To know more about how Google processes your data, visit its Privacy Policy.
   </li>
   <li>
    <h5>
     Data we collect automatically:
    </h5>
    <ul className="h-ml-15">
     <li>
      <h5>
       Data about how you found us
      </h5>
      We collect data about your referring URL (that is, the place on the Web where you were when you tapped on our ad).
     </li>
     <li>
      <h5>
       Device and Location data.
      </h5>
      We collect data from your device. Examples of such data include language settings, IP address, time zone, type and model of a device, device settings, operating system, Internet service provider, mobile carrier, hardware ID, and Facebook ID.
     </li>
     <li>
      <h5>
       Usage data
      </h5>
      We record how you interact with our Service. For example, we log the features, and content you interact with, how often you use the Service, how long you are on the Service, what sections you use, how many ads you watch.
     </li>
     <li>
      <h5>
       Advertising IDs
      </h5>
      We collect your Apple Identifier for Advertising (“IDFA”) or Google Advertising ID (“AAID”) (depending on the operating system of your device). You can typically reset these numbers through the settings of your device’s operating system (but we do not control this).
     </li>
     <li>
      <h5>
       Transaction data
      </h5>
      When you make payments through the Service, you need to provide financial account data, such as your credit card number, to our third-party service providers. We do not collect or store full credit card number data, though we may receive credit card-related data, data about the transaction, including date, time and amount of the transaction, the type of payment method used.
     </li>
     <li>
      <h5>
       Cookies
      </h5>
      A cookie is a small text file that is stored on a user's computer for record-keeping purposes. Cookies can be either session cookies or persistent cookies. A session cookie expires when you close your browser and is used to make it easier for you to navigate our Service. A persistent cookie remains on your hard drive for an extended period of time. We also use tracking pixels that set cookies to assist with delivering online advertising. Cookies are used, in particular, to automatically recognize you the next time you visit our Website. As a result, the information, which you have earlier entered in certain fields on the Website may automatically appear the next time when you use our Service. Cookie data will be stored on your device and most of the times only for a limited time period.
     </li>
    </ul>
   </li>
  </ol>
  <h3 id="3">
   3. DATA PROTECTION PRINCIPLES
  </h3>
  <p>
   In our data protection practices we strive to, in particular, to provide that personal data is:
  </p>
  <ol className="h-ml-15">
   <li>
    processed in accordance with specific, legitimate and lawful purpose consented to by you",
   </li>
   <li>
    is adequate, accurate and without prejudice to the dignity of a human person;
   </li>
   <li>
    stored only for the period within which it is reasonably needed; and
   </li>
   <li>
    secured against reasonably foreseeable hazards and breaches such as theft, cyberattack, viral attack, dissemination, manipulations of any kind, damage by rain, fire or exposure to other natural elements.
   </li>
  </ol>
  <h3 id="4">
   4. FOR WHAT PURPOSES WE PROCESS YOUR PERSONAL DATA
  </h3>
  <p>
   We process your personal data: "</p>
  <ol className="h-ml-15">
   <li>
    <h5>
     To provide our Service
    </h5>
    This includes enabling you to use the Service in a seamless manner and preventing or addressing Service errors or technical issues.
   </li>
   <li>
    <h5>
     To customize your experience
    </h5>
    We process your personal data to adjust the content of the Service and make offers tailored to your personal preferences and interests.
   </li>
   <li>
    <h5>
     To manage your account and provide you with customer support
    </h5>
    We process your personal data to respond to your requests for technical support, Service information or to any other communication you initiate. This includes accessing your account to address technical support requests. For this purpose, we may send you, for example, notifications or emails about the performance of our Service, security, payment transactions, notices regarding our Terms and Conditions of Use or this Privacy Policy.
   </li>
   <li>
    <h5>
     To communicate with you regarding your use of our Service
    </h5>
    <p>
{"     We communicate with you, for example, by push notifications or in the chat. As a result, you may, for example, receive a notification whether on the Website or via email that you received a new message on " + SITE_NAME + ". To opt out of receiving push notifications, you need to change the settings on your browser or mobile device. To opt out of the certain type of emails, you need to follow an unsubscribe link located in the footer of the email by contacting our support team at " + EMAIL_SUPPORT + " or in your profile setting."}
    </p>
    <p>
     The services that we use for these purposes may collect data concerning the date and time when the message was viewed by our users, as well as when they interacted with it, such as by clicking on links included in the message.
    </p>
   </li>
   <li>
    <h5>
     To research and analyze your use of the Service
    </h5>
{"    This helps us to better understand our business, analyze our operations, maintain, improve, innovate, plan, design, and develop " + SITE_NAME + " and our new products. We also use such data for statistical analysis purposes, to test and improve our offers. This enables us to better understand what features and sections of " + SITE_NAME + " our users like more, what categories of users use our Service. As a consequence, we often decide how to improve " + SITE_NAME + " based on the results obtained from this processing. For example, if we discover that Jobs section is not as popular as others, we may focus on improving it."}
   </li>
   <li>
    <h5>
     To send you marketing communications
    </h5>
    <p>
{"     We process your personal data for our marketing campaigns. We may add your email address to our marketing list. As a result, you will receive information about our products, such as for example, special offers, and products of our partners. If you do not want to receive marketing emails from us, you can unsubscribe following instructions in the footer of the marketing emails, by contacting our support team at " + EMAIL_SUPPORT + " or in your profile setting."}
    </p>
    <p>
     We may also show you advertisements on the Website, and send you push notifications for marketing purposes. To opt out of receiving push notifications, you need to change the settings on your device or/and browser.
    </p>
   </li>
   <li>
    <h5>
     To personalize our ads
    </h5>
    <p>
     We and our partners use your personal data to tailor ads and possibly even show them to you at the relevant time. For example, if you have visited our Website, you might see ads of our products, for example, in your Facebook’s feed.
    </p>
    <p>
     We may target advertising to you through a variety of ad networks and exchanges, using data from advertising technologies on and off of our Services like unique cookie, or similar tracking technology, pixel, device identifiers, geolocation, operation system information, email.
    </p>
    <p>
     <b>
      How to opt out or influence personalized advertising
     </b>
    </p>
    <p>
    </p>
    <h5>
     iOS:
    </h5>
    On your iPhone or iPad, go to “Settings,” then “Privacy” and tap “Advertising” to select “Limit Ad Track”. In addition, you can reset your advertising identifier (this also may help you to see less of personalized ads) in the same section.
    <p>
    </p>
    <p>
    </p>
    <h5>
     Android:
    </h5>
    To opt-out of ads on an Android device, simply open the Google Settings app on your mobile phone, tap “Ads” and enable “Opt out of interest-based ads”. In addition, you can reset your advertising identifier in the same section (this also may help you to see less of personalized ads).
    <p>
    </p>
    <p>
     To learn even more about how to affect advertising choices on various devices, please look at the information available
     <a href="http://www.networkadvertising.org/mobile-choice">
      here
     </a>
     .
    </p>
    <p>
     In addition, you may get useful information and opt out of some interest-based advertising, by visiting the following links:
    </p>
    <ol className="h-ml-15">
     <li>
      Network Advertising Initiative –
      <a href="http://optout.networkadvertising.org/">
       http://optout.networkadvertising.org/
      </a>
     </li>
     <li>
      Digital Advertising Alliance –
      <a href="http://optout.aboutads.info/">
       http://optout.aboutads.info/
      </a>
     </li>
     <li>
      Digital Advertising Alliance (Canada) –
      <a href="http://youradchoices.ca/choices">
       http://youradchoices.ca/choices
      </a>
     </li>
     <li>
      Digital Advertising Alliance (EU) –
      <a href="http://www.youronlinechoices.com/">
       http://www.youronlinechoices.com/
      </a>
     </li>
     <li>
      DAA AppChoices page –
      <a href="http://www.aboutads.info/appchoices">
       http://www.aboutads.info/appchoices
      </a>
     </li>
    </ol>
    <p>
    </p>
    <p>
    </p>
    <h5>
     Browsers:
    </h5>
    <p>
     It is also may be possible to stop your browser from accepting cookies altogether by changing your browser’s cookie settings. You can usually find these settings in the “options” or “preferences” menu of your browser. The following links may be helpful, or you can use the “Help” option in your browser.
    </p>
    <ol className="h-ml-15">
     <li>
      Cookie settings in Internet Explorer
     </li>
     <li>
      Cookie settings in Firefox
     </li>
     <li>
      Cookie settings in Chrome
     </li>
     <li>
      Cookie settings in Safari web and iOS
     </li>
    </ol>
    <p>
    </p>
    <p>
     <b>
      Google
     </b>
     allows its users to <a href="https//adssettings.google.com/authenticated?hl=ru">
      opt out of Google’s personalized ads
     </a>
     and to <a href="https://tools.google.com/dlpage/gaoptout/">
      prevent their data from being used by Google Analytics.
     </a>
    </p>
    <p>
    </p>
    <p>
     <b>
      Facebook
     </b> also allows its users to influence the types of ads they see on Facebook. To find how to control the ads you see on Facebook, please go <a href="https//www.facebook.com/help/146952742043748?helpref=related">
      here
     </a> or adjust your ads settings on <a href="https//www.facebook.com/ads/preferences/?entry_product=ad_settings_screen">
      Facebook
     </a>
    </p>
    <ol className="h-ml-15">
     <li>
      <h5>
       To enforce our Terms and Conditions of Use and to prevent and combat fraud
      </h5>
      We use personal data to enforce our agreements and contractual commitments, to detect, prevent, and combat fraud. As a result of such processing, we may share your information with others, including law enforcement agencies (in particular, if a dispute arises in connection with our Terms and Conditions of Use).
     </li>
     <li>
      <h5>
       To comply with legal obligations
      </h5>
      We may process, use, or share your data when the law requires it, in particular, if a law enforcement agency requests your data by available legal means.
     </li>
     <li>
      <h5>
       To process your payments
      </h5>
      We provide paid products and/or services within the Service. For this purpose, we use third-party services for payment processing (for example, payment processors). As a result of this processing, you will be able to make a payment and use the paid features of the Service.
     </li>
    </ol>
    <p>
    </p>
   </li>
  </ol>
  <h3 id="5">
   5. UNDER WHAT LEGAL BASES WE PROCESS YOUR PERSONAL DATA
  </h3>
  <p>
   We process your personal data, in particular, under the following legal bases:
  </p>
  <ol className="h-ml-15">
   <li>
    your consent",
   </li>
   <li>
    to perform our contract with you;
   </li>
   <li>
    <p>
     for our (or others') legitimate interests; Under this legal basis we, in particular: "</p>
    <ul className="h-ml-15">
     <li>
      <p>
       communicate with you regarding your use of our Service
      </p>
      <p>
       This includes, for example, sending you push notifications reminding you that you have unread messages. The legitimate interest we rely on for this purpose is our interest to encourage you to use our Service more often. We also take into account the potential benefits to you.
      </p>
     </li>
     <li>
      <p>
       research and analyze your use of the Service
      </p>
      <p>
       Our legitimate interest for this purpose is our interest in improving our Service so that we understand users’ preferences and are able to provide you with a better experience (for example, to make the use of our mobile application easier and more enjoyable, or to introduce and test new features).
      </p>
     </li>
     <li>
      <p>
       send you marketing communications
      </p>
      <p>
       The legitimate interest we rely on for this processing is our interest to promote our Service in a measured and appropriate way.
      </p>
     </li>
     <li>
      <p>
       personalize our ads
      </p>
      <p>
       The legitimate interest we rely on for this processing is our interest to promote our Service in a reasonably targeted way.
      </p>
     </li>
     <li>
      <p>
       enforce our Terms and Conditions of Use and to prevent and combat fraud
      </p>
      <p>
       Our legitimate interests for this purpose are enforcing our legal rights, preventing and addressing fraud and unauthorized use of the Service, non-compliance with our Terms and Conditions of Use.
      </p>
     </li>
     <li>
      <p>
       to comply with legal obligations.
      </p>
     </li>
    </ul>
   </li>
  </ol>
  <h3 id="6">
   6. WITH WHOM WE SHARE YOUR PERSONAL DATA
  </h3>
  <p>
   We share information with third parties that help us operate, provide, improve, integrate, customize, support, and market our Service. We may share some sets of personal data, in particular, for purposes and with parties indicated in Section 2 of this Privacy Policy. The types of third parties we share information with include, in particular:
  </p>
  <ol className="h-ml-15">
   <li>
    <h5>
     Service providers
    </h5>
    <p>
     We share personal data with third parties that we hire to provide services or perform business functions on our behalf, based on our instructions. We may share your personal information with the following types of service providers:
    </p>
    <ul className="h-ml-15">
     <li>
      cloud storage providers (Amazon, DigitalOcean, Hetzner)
     </li>
     <li>
      data analytics providers (Facebook, Google, Appsflyer)
     </li>
     <li>
      marketing partners (in particular, social media networks, marketing agencies, email delivery services", such as Facebook, Google, Mailfire)
     </li>
    </ul>
   </li>
   <li>
    <h5>
     Law enforcement agencies and other public authorities
    </h5>
    <p>
     We may use and disclose personal data to enforce our Terms and Conditions of Use, to protect our rights, privacy, safety, or property, and/or that of our affiliates, you or others, and to respond to requests from courts, law enforcement agencies, regulatory agencies, and other public and government authorities, or in other cases provided for by law.
    </p>
   </li>
   <li>
    <h5>
     Third parties as part of a merger or acquisition
    </h5>
    <p>
     As we develop our business, we may buy or sell assets or business offerings. Customers’ information is generally one of the transferred business assets in these types of transactions. We may also share such information with any affiliated entity (e.g. parent company or subsidiary) and may transfer such information in the course of a corporate transaction, such as the sale of our business, a divestiture, merger, consolidation, or asset sale, or in the unlikely event of bankruptcy.
    </p>
   </li>
  </ol>
  <h3 id="7">
   7. HOW YOU CAN EXERCISE YOUR PRIVACY RIGHTS
  </h3>
  <p>
   To be in control of your personal data, you have the following rights: "</p>
  <p>
   <b>
    Accessing / reviewing / updating / correcting your personal data.
   </b>
{"   You may review, edit, or change the personal data that you had previously provided to " + SITE_NAME + " in the settings section on the Website."}
  </p>
  <p>
{"   You may also request a copy of your personal data collected during your use of the Service at " + EMAIL_SUPPORT + "."}
  </p>
  <p>
   <b>
    Deleting your personal data.
   </b>
{"   You can request the erasure of your personal data by sending us an email at " + EMAIL_SUPPORT + "."}
  </p>
  <p>
   When you request deletion of your personal data, we will use reasonable efforts to honor your request. In some cases we may be legally required to keep some of the data for a certain time", in such event, we will fulfill your request after we have complied with our obligations.
  </p>
  <p>
   <b>
    Objecting to or restricting the use of your personal data (including for direct marketing purposes).
   </b>
{"   You can ask us to stop using all or some of your personal data or limit our use thereof by sending a request at " + EMAIL_SUPPORT + "."}
  </p>
  <p>
   <b>
    The right to lodge a complaint with the supervisory authority.
   </b>
   We would love you to contact us directly, so we could address your concerns. Nevertheless, you have the right to lodge a complaint with a competent data protection supervisory authority.
  </p>
  <h3 id="8">
   8. AGE LIMITATION
  </h3>
  <p>
{"   We do not knowingly process personal data from persons under 16 years of age. If you learn that anyone younger than 16 has provided us with personal data, please contact us at " + EMAIL_SUPPORT + "."}
  </p>
  <h3 id="9">
   9. CHANGES TO THIS PRIVACY POLICY
  </h3>
  <p>
   We may modify this Privacy Policy from time to time. If we decide to make material changes to this Privacy Policy, you will be notified through our Service or by other available means and will have an opportunity to review the revised Privacy Policy. By continuing to access or use the Service after those changes become effective, you agree to be bound by the revised Privacy Policy.
  </p>
  <h3 id="10">
   10. DATA RETENTION
  </h3>
  <p>
{"   We will store your personal data for as long as it is reasonably necessary for achieving the purposes set forth in this Privacy Policy (including providing the Service to you), which includes (but is not limited to) the period during which you have a " + SITE_NAME + " account. We will also retain and use your personal data as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements."}
  </p>
  <h3 id="11">
   11.CONTACT US
  </h3>
  <p>
{"   You may contact us at any time for details regarding this Privacy Policy and its previous versions. For any questions concerning your account or your personal data please contact us at " + EMAIL_SUPPORT + "."}
  </p>
  <p>
   Effective as of January 2020
  </p>
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