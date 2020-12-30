import React, { Component } from 'react'
import {Link} from "react-router-dom"
import { login } from './UserFunctions'
import {id, cls, addQueryParam} from '../utils/Funcs'
import queryString from 'querystring'
import Navbar from './Navbar'
import Footer from "./Footer"
import { getText } from '../../../Constants'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      third_party_login_links: props.third_party_login_links,
      email: '',
      password: '',
      posting_form: false,
      errors: {},
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
  
componentDidMount() {
  console.log("LINKS", "lll", this.state.third_party_login_links)
}

setError(elId, error) {
    var err = id(elId + "-error")
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


onSubmit() {

  this.removeErrors()
  this.state.hasErrors = false

  if(this.state.email.length == 0) {
    this.setError("email", getText("ERROR_ENTER_EMAIL"))
    this.state.hasErrors = true
  }

  if(this.state.password.length == 0) {
    this.setError("password", getText("ERROR_ENTER_PWD"))
    this.state.hasErrors = true
  }
  console.log("state_hasErrors: "+this.state.hasErrors)
  if(!this.state.hasErrors) {
    console.log("no error")
    const user = {
      email: this.state.email,
      password: this.state.password
    }

    this.setState({posting_form: true})
    login(user).then(res => {
        if(res.login_token != null) {console.log("login_token: "+res.login_token, this.state.query_values.next)
          localStorage.setItem("login_token", res.login_token)
          //redirect to after after login page
          
          if(this.state.query_values.next) {
            window.location.href = decodeURI(this.state.query_values.next)
            //this.props.history.replace(this.state.query_values.next)

          } else {console.log("q2")
            window.location.href = "/profile"
            //this.props.history.replace("/profile")
          }

        } else if(res.form_errors != null) {
          for(var key in res.form_errors) {
            console.log("error_key: "+ key)
            if(res.form_errors[key].length > 0) {
                var error_name = key.substring(0, key.indexOf("_"));
                console.log("error_name: "+ error_name)
                this.setError(error_name, res.form_errors[key])
            }
          }
        } else {
              if(res.message == null) res.message = getText("ERROR_SERVER_RESPONSE")
              console.log("login_message: "+res.message)
        }
        console.log("reg_response_text: "+JSON.stringify(res))
        this.setState({posting_form: false})
    })
    .catch(e => {
      console.log("login_response_text:", e, JSON.stringify(e))
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
                <div className="bc-auth-notification fw-notification fw-notification--success">
                  <div className="fw-notification__content">
                    <div className="fw-notification__title">{getText("LOGIN_PAGE_MESSAGE")}</div> 
                    <div className="fw-notification__text"></div>
                  </div>
                </div>

              <div className="fw-card qa-fw-card bc-auth-card">
                <div className="fw-card-title">
                  <svg strokeWidth="0" className="person" style={{width: "40px", height: "40px", maxWidth: "40px", maxHeight: "40px", fill: "rgb(112, 185, 63)", stroke: "inherit"}}>
                    <use xlinkHref="#person"></use>
                  </svg>
                  {getText("SIGN_IN")}
                </div> 
                <div className="fw-card-content qa-fw-card-content">
                  <div className="row center-xs">
                    <div noValidate className="bc-auth-card__form-holder">
                      <div className="bc-social-buttons">
                        <div className="row">
                          <div className="col-xs-12">
                            <a href={this.state.third_party_login_links.facebook} target="" className="js-handle-link-event h-width-100p bc-facebook fw-button qa-fw-button fw-button--type-success fw-button--size-large">
                              <span className="fw-button__content"> 
                                <span className="fw-button__slot-wrapper">
                                  <svg strokeWidth="0" className="facebook" style={{ width: "20px", height: "20px", maxWidth: "20px", maxHeight: "20px", fill: "rgb(255, 255, 255)", stroke: "inherit" }}>
                                    <use xlinkHref="#facebook"></use>
                                  </svg>
                                  {getText("LOG_WITH_FB")}
                                </span>
                              </span>
                            </a>
                          </div> 
                          <div className="col-xs-12">
                            <a href={this.state.third_party_login_links.google} target="" className="js-handle-link-event h-width-100p bc-google fw-button qa-fw-button fw-button--type-success fw-button--size-large">
                              <span className="fw-button__content"> 
                                <span className="fw-button__slot-wrapper">
                                  <svg strokeWidth="0" className="google" style={{ width: "30px", height: "30px", maxWidth: "30px", maxHeight: "30px", fill: "rgb(255, 255, 255)", stroke: "inherit" }}>
                                    <use xlinkHref="#google"></use>
                                  </svg>
                                  {getText("LOG_WITH_G")}
                                </span>
                              </span>
                            </a>
                          </div>
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
                      </div>
                      
                     
                      <div className="bc-auth-card__remember-block row between-xs">
                        <div className="col-xs-3"></div> 
                        <div className="col-xs-9 h-text-right">
                          <a href="/forgot-password.html" className="h-base-link">{getText("PWD_RECOVERY_LINK_TEXT")}</a>
                        </div>
                      </div> 
                      {
                        this.state.posting_form?
                        <button id="submit" type="submit" disabled="disabled" className="fw-button--disabled h-width-100p h-bold fw-button qa-fw-button fw-button--type-success fw-button--size-large">
                          <span className="fw-button__content"> 
                            <span className="fw-button__slot-wrapper italic">{getText("PLS_WAIT")}...</span>
                          </span>
                        </button>
                        :
                        <button id="submit" onClick={this.onSubmit} type="submit" className="h-width-100p h-bold fw-button qa-fw-button fw-button--type-success fw-button--size-large">
                          <span className="fw-button__content"> 
                            <span className="fw-button__slot-wrapper up-case">{getText("SIGN_IN")}</span>
                          </span>
                        </button>
                      }
                      <span className="bc-auth-card-error"></span>
                    </div>
                  </div> 
                  <div className="fw-card-content-icon"></div>
                </div>
              </div> 
              <div className="bc-social-buttons-container col-xs">
                <div className="h-font-12 row center-xs">
                  <div className="bc-auth-card__form-holder">
                    {getText("NO_ACCOUNT_QUEST")} <Link to={"/register" +(this.state.query_values.next?"?next="+this.state.query_values.next:"")} className="h-base-link">{getText("REG")}</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >
    </div >

    <div className="fw-fixed-background" style={{ display: "none" }}></div>
    <div className="vue-portal-target"></div>
  </div >
  <Footer />
  </div>
    )
  }
}

export default Login