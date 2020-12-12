import React, { Component } from 'react'
import {Link} from "react-router-dom"
import { register } from './UserFunctions'
import {isValidNumber, isValidEmail, id, cls, shuffleHash, randomHashString, addQueryParam} from '../utils/Funcs'
import Navbar from './Navbar'
import Footer from "./Footer"
import queryString from 'querystring'
import { getText } from '../../../Constants'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            third_party_login_links: props.third_party_login_links,
            fullname: '',
            number: '',
            email: '',
            password: '',
            posting_form: false,
            hasErrors: false,
            query_values: queryString.parse(this.props.location.search.substring(1))
        }
        if(this.state.query_values.next) {
            var links = this.state.third_party_login_links
            links.facebook = addQueryParam("state", links.facebook, this.state.query_values.next)
            links.google = addQueryParam("state", links.google, this.state.query_values.next)
            console.log("LINKS", 2, links)
        
            this.setState({third_party_login_links: links})
        }
    
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    

    setError(elId, error) {
        var group = id(elId + "-group")
        console.log(group)
        var err = id(elId + "-error")
        group.classList.add(["has-error"], ["has-feedback"])
        err.innerHTML = error
        err.classList.remove(["hide"])
    }


    removeErrors() {
        var errs = cls("fw-field__error");
        var groups = cls("has-error");
        if(groups.length > 0) {
            for(var i = 0; i < groups.length; i++) {
                groups[i].classList.remove(["has-error"], ["has-feedback"])
            }
        }

        if(errs.length > 0) {
            for(var j = 0; j < errs.length; j++) {
                errs[j].classList.add(["hide"])
            }
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
        //console.log([e.target.name] +": "+e.target.value)
    }
    
    onSubmit(e) {
        e.preventDefault()
        
        this.removeErrors()
        this.state.hasErrors = false
        if(this.state.fullname.length == 0) {
            this.setError("fullname", "Please enter your fullname")
            this.state.hasErrors = true
        }

        if(this.state.email.length == 0) {
            this.setError("email", "Please enter your email")
            this.state.hasErrors = true

        } else if(!isValidEmail(this.state.email)) {
            this.setError("email", "Please enter a valid email")
            this.state.hasErrors = true

        }

        if(this.state.password.length == 0) {
            this.setError("password", "Please enter your password")
            this.state.hasErrors = true
        }

        if(this.state.number.length == 0) {
            this.setError("number", "Please enter your phone number")
            this.state.hasErrors = true

        } else if(!isValidNumber(this.state.number)) {
            this.setError("number", "Please enter a valid number")
            this.state.hasErrors = true

        }

        if(!this.state.hasErrors) {
            const newUser = {
                fullname: this.state.fullname,
                email: this.state.email,
                password: this.state.password,
                number: this.state.number
            }
            this.setState({posting_form: true})
            register(newUser).then(res => {
                /*
                {status: 1, message: message, login_token: login_token, form_errors: form_error}
                form_errors = null 
                    || 
                {
                    email_error: String, 
                    password_error: String, 
                    fullname_error: String, 
                    number_error: String
                }
                */
               if(res.login_token != null) {
                    localStorage.setItem("login_token", res.login_token)
                    //redirect to after after login page
                    window.location.href = "/profile"
               } else if(res.form_errors != null) {
                   for(var key in res.form_errors) {
                    console.log("error_key: "+ key)
                       if(res.form_errors[key].length > 0) {
                           var error_name = key.substring(0, key.indexOf("_"));
                           console.log("error_name: "+ error_name)
                           this.setError(error_name, res.form_errors[key])
                       }
                   }
                   this.setState({posting_form: false})
               } else {
                   if(res.message == null) res.message = getText("ERROR_SERVER_RESPONSE")
                   console.log("reg_message: "+res.message)
                   this.setState({posting_form: false})
               }
               //console.log("randomHashString: "+randomHashString(5))
               //console.log("shuffleHash: ", "shuffleHash".shuffleHash())
               console.log("reg_response_text: "+JSON.stringify(res))
                
            })
        }
    }
    render() {
        return (
            <div>
            <Navbar user={this.props.user} />
            <div>
                <div className="h-bg-grey  h-pb-15">
                    <div>
                        <div className="container">
                            <div className="row center-xs">
                                <div className="col-sm-10 col-xs-12">
                                    

                                    <div className="fw-card qa-fw-card bc-auth-card">
                                        <div className="fw-card-title">
                                            <svg strokeWidth="0" className="person"
                                                style={{ width: "40px", height: "40px", maxWidth: "40px", maxHeight: "40px", fill: "rgb(112, 185, 63)", stroke: "inherit" }}>
                                                <use xlinkHref="#person"></use>
                                            </svg>
                                            {getText("REG")}
                                        </div>
                                        <div className="fw-card-content qa-fw-card-content">
                                            <div className="row center-xs">
                                                <div className="bc-auth-card__form-holder">
                                                    <form noValidate onSubmit={this.onSubmit}>
                                                        <div className="bc-social-buttons">
                                                            <div className="row">
                                                                <div className="col-xs-12"><a
                                                                    href={this.state.third_party_login_links.facebook}
                                                                    target=""
                                                                    className="js-handle-link-event h-width-100p bc-facebook fw-button qa-fw-button fw-button--type-success fw-button--size-large"
                                                                    ><span
                                                                        className="fw-button__content"> <span
                                                                            className="fw-button__slot-wrapper"><svg
                                                                                strokeWidth="0" className="facebook"
                                                                                style={{ width: "20px", height: "20px", maxWidth: "20px", maxHeight: "20px", fill: "rgb(255, 255, 255)", stroke: "inherit" }}>
                                                                                <use xlinkHref="#facebook"></use>
                                                                            </svg>
                                                                            {getText("LOG_WITH_FB")}
                                                                </span></span></a></div>
                                                                <div className="col-xs-12"><a
                                                                    href={this.state.third_party_login_links.google}
                                                                    target=""
                                                                    className="js-handle-link-event h-width-100p bc-google fw-button qa-fw-button fw-button--type-success fw-button--size-large"
                                                                    ><span
                                                                        className="fw-button__content"> <span
                                                                            className="fw-button__slot-wrapper"><svg
                                                                                strokeWidth="0" className="google"
                                                                                style={{ width: "30px", height: "30px", maxWidth: "30px", maxHeight: "30px", fill: "rgb(255, 255, 255)", stroke: "inherit" }}>
                                                                                <use xlinkHref="#google"></use>
                                                                            </svg>
                                                                            {getText("LOG_WITH_G")}
                                                                </span></span></a></div>
                                                            </div>
                                                        </div>
                                                        <div className="bc-auth-card__form-separator hide"></div>

                                                        <div className="text-left">
                                                            
                                                            <div id="email-group" className="form-group input-group-lg">
                                                                <label for="email">{getText("EMAIL")}:</label>
                                                                <input autoComplete="off" type="text"
                                                                        className="form-control"
                                                                        name="email"
                                                                        id="email"
                                                                        value={this.state.email}
                                                                        onChange={this.onChange}/>
                                                                <span id="email-error" className="fw-field__error qa-fw-field__error hide">
                                                                    {getText("FIELD_REQUIRED_LOWERCASE")}
                                                                </span>
                                                            </div>

                                                            <div id="password-group" className="form-group input-group-lg">
                                                                <label for="password">{getText("PASSWORD")}:</label>
                                                                <input autoComplete="off" type="password"
                                                                        className="form-control"
                                                                        name="password"
                                                                        id="password"
                                                                        value={this.state.password}
                                                                        onChange={this.onChange}/>
                                                                <span id="password-error" className="fw-field__error qa-fw-field__error hide">
                                                                    {getText("FIELD_REQUIRED_LOWERCASE")}
                                                                </span>
                                                            </div>

                                                            <div id="fullname-group" className="form-group input-group-lg">
                                                                <label for="fullname">{getText("FULLNAME")}:</label>
                                                                <input autoComplete="off" type="text"
                                                                        className="form-control"
                                                                        name="fullname"
                                                                        id="fullname"
                                                                        value={this.state.fullname}
                                                                        onChange={this.onChange}/>
                                                                <span id="fullname-error" className="fw-field__error qa-fw-field__error hide">
                                                                    {getText("FIELD_REQUIRED_LOWERCASE")}
                                                                </span>
                                                            </div>
                                                            
                                                            <div id="number-group" className="form-group input-group-lg">
                                                                <label for="number">{getText("PHONE_NUMBER")} {!getText("IS_NOT_GLOBAL")? "(e.g <b>+1</b>xxx...)" : ""}:</label>
                                                                <div className="input-group input-group-lg">
                                                                    <input autoComplete="off" type="text"
                                                                        className="form-control"
                                                                        name="number"
                                                                        id="phone_number"
                                                                        data-type="phone-number"
                                                                        value={this.state.number}
                                                                        onChange={this.onChange}/>
                                                                    <span className="input-group-addon">Tel</span>
                                                                </div>
                                                                <span id="number-error" className="fw-field__error qa-fw-field__error hide">
                                                                    {getText("FIELD_REQUIRED_LOWERCASE")}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="fw-checkbox qa-fw-checkbox h-mb-30 fw-checked">
                                                            <label className="fw-checkbox__label">
                                                                {getText("BY_CLICKING_REG")} <a href="/tos" className="h-base-link">{getText("TOS")}</a> {getText("AND_LOWERCASE")} <a href="/privacy-policy" className="h-base-link">{getText("PRIVACY_POLICY")}</a>.
                                                            </label>
                                                        </div>
                                                        {
                                                            this.state.posting_form?
                                                            <button id="submit" type="submit" disabled="disabled" 
                                                                className="fw-button--disabled h-width-100p h-bold fw-button qa-fw-button fw-button--type-success fw-button--size-large">
                                                                <span className="fw-button__content"> 
                                                                    <span className="fw-button__slot-wrapper italic">{getText("PLS_WAIT")}...</span>
                                                                </span>
                                                            </button>
                                                            :
                                                            <button id="submit" type="submit" 
                                                                className="h-width-100p h-bold fw-button qa-fw-button fw-button--type-success fw-button--size-large">
                                                                <span className="fw-button__content"> 
                                                                    <span className="fw-button__slot-wrapper up-case">{getText("REGISTER")}</span>
                                                                </span>
                                                            </button>
                                                        }
                                                    </form> 
                                                    <span className="bc-auth-card-error"></span>
                                                </div>
                                            </div>
                                            <div className="fw-card-content-icon"></div>
                                        </div>
                                    </div>
                                    <div className="bc-social-buttons-container col-xs">
                                        <div className="h-font-12 row center-xs">
                                            <div className="bc-auth-card__form-holder">
                                                {getText("HAVE_ACCOUNT_QUEST")} <Link to={"/login" +(this.state.query_values.next?"?next="+this.state.query_values.next:"")} className="h-base-link">{getText("SIGN_IN")}</Link></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fw-fixed-background" style={{ display: "none" }}></div>
                <div className="vue-portal-target"></div>
            </div>
            <Footer />
            </div>
        )
    }
}

export default Register