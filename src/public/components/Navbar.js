import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
//import { unlink } from "fs"
import { isClientSide, sqlTimeStampToJsDate, truncText } from "../utils/Funcs"
import {SITE_NAME, API_ROOT} from "../../../Constants"
import { HOME_PATHS } from "../utils/RoutePaths"
import queryString from 'querystring'
import { productLink } from "../utils/LinkBuilder"

var dateFormat = require('dateformat')

const browser = require("../utils/Browser")


class Navbar extends Component {
  constructor(props) {
    super(props)
    //this.state = props.user
    this.state = {
      user: props.user,
      collapsed: true,
      notifications: [],
      review_types: [{
        name: "Product review"
      }],
      total_new_messages: 0,
      total_new_notifications: 0,
      prevent_notification_loading: false,
      notifications_page: 0,
      has_next_notifications: false
    }
    this.onClick = this.onClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.closeNavbar = this.closeNavbar.bind(this)
    this.handleNotificationTrigger = this.handleNotificationTrigger.bind(this)
  }

  componentDidMount() {
    this.getCounters()
    console.log("HOME_PATHS: "+HOME_PATHS)
    console.log("this.props.location.pathname: "+this.props.location.pathname)
    //this.setState({collapsed: true})
    var queryValues;
    if(this.props.location && this.props.location.search) {
      var queryValues = queryString.parse(this.props.location.search.substring(1))
      console.log("mounted: Q ", queryValues)

    }
    
    if(queryValues && queryValues.search) {
      this.setState({search: queryValues.search})

    } else {
      this.setState({search: ""})
    }
    $(document).on('click', '.notification-dropdown-menu', function (e) {
      e.stopPropagation();
    })
    $(document).on('click', '#notification-dropdown-trigger', this.handleNotificationTrigger)
  }

  getCounters = () => {
    browser.axios.get(API_ROOT + "notifications/new/count")
    .then(resp => {
        if(resp && resp.data && resp.data.total) {
          this.setState({total_new_notifications: resp.data.total})
        }
    })

    browser.axios.get(API_ROOT + "messages/new/count")
    .then(resp => {
        if(resp && resp.data && resp.data.total) {
          this.setState({total_new_messages: resp.data.total})
        }
    })
  }

  handleNotificationTrigger = e => {
    if($(".notification-dropdown").hasClass("open") && this.state.notifications.length == 0 && !this.state.prevent_notification_loading) {
      this.loadNotifications()
    }
  }

  notificationTime = time => {
    return dateFormat(sqlTimeStampToJsDate(time), "yyyy-mm-dd HH:MM:ss")
  }

  loadNotifications = () => {
    if(!this.state.no_notifications) {
      //from_id, from_name, from_photo, time, reference_type, reference_id, reference_title, reference_photo, message
      this.setState({loading_notifications: true})
      this.setState({prevent_notification_loading: false})
      var nots = this.state.notifications
      console.log("loadNotifications", 1)
      browser.axios.get(API_ROOT + "notifications?page=" + (this.state.notifications_page + 1))
      .then(resp => {
        console.log("loadNotifications", 2, resp)
          if(resp && resp.data && resp.data.list) {
            console.log("loadNotifications", resp.data.list)
              nots = nots.concat(resp.data.list)
              var total = this.state.total_new_notifications - resp.data.list.length
              if(total < 0) total = 0
              this.setState({
                notifications: nots,
                loading_notifications: false,
                total_new_notifications: total,
                prevent_notification_loading: false,
                notifications_page: this.state.notifications_page + 1,
                has_next_notifications: resp.data.has_next
              })

          }
          if(resp.data.error) this.setState({no_notifications: true})
      })
      .catch(e => {
        console.log("loadNotifications", "error", e)
      })
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSearch = (e) => {
    e.preventDefault()
    if(this.state.search && this.state.search.length > 0) {
      document.location.href = "/search?q="+this.state.search
      //this.closeNavbar();
    }
  }

  onClick(e) {
    e.preventDefault()
  }

  logOut() {
    $("#logoutform").submit()

  }
  toggleNavbar() {
    this.setState({collapsed: !this.state.collapsed})
  }
  closeNavbar() {
    if (!this.state.collapsed) {
      this.toggleNavbar();
    }
  }
  render() {console.log("NAV-State: " + JSON.stringify(this.props))
    const circleButtonStyle = {
      backgroundColor: "rgb(255, 255, 255)",
      position: "relative",
    };

    const circleButtonSVGStyle = {
      width: 16 + "px",
      height: 16 + "px",
      maxWidth: 16 + "px",
      maxHeight: 16 + "px",
      fill: "rgb(166, 184, 189)",
      stroke: "inherit"
    };

    var stateLinks
    if(!this.props.user) {
      //if the user is not logged in
      stateLinks = (
        <ul className="nav navbar-nav b-app-header-user-bar navbar-right" style={{fontSize: "17px"}}>
          <li className="nav-item">
            <Link onClick={this.closeNavbar} to="/register" className="h-flex-center">
              <span className="glyphicon glyphicon-user"></span>
              <span> Registration</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link onClick={this.closeNavbar} to="/login" className="h-flex-center">
              <span className="glyphicon glyphicon-log-in"></span>
              <span> Sign in</span>
            </Link>
          </li>
          <li className="nav-item sm-hide-down">
            <div className="h-width-120">
              <Link onClick={this.closeNavbar} to="/login?next=/sell" className="h-width-100p fw-button qa-fw-button fw-button--type-warning fw-button--size-medium">
                <span className="fw-button__content">
                  <span className="fw-button__slot-wrapper">SELL</span>
                </span>
              </Link>
            </div>
          </li>
        </ul>
      )

    } else {
      stateLinks = (
        <ul className="nav navbar-nav b-app-header-user-bar navbar-right" style={{fontSize: "17px"}}>
          <li className="nav-item" data-toggle="tooltip" title="Profile" data-placement="bottom">
            <Link onClick={this.closeNavbar} to="/profile" className="h-flex-center">
              <span className="glyphicon glyphicon-user"></span>
              <span className="md-hide-up"> Profile</span>
            </Link>
          </li>
          <li className="nav-item" data-toggle="tooltip" title="Messages" data-placement="bottom">
            <span className="badge badge-pill badge-primary">{this.state.total_new_messages}</span>
            <Link onClick={this.closeNavbar} to="/messages" className="h-flex-center">
              <span className="glyphicon glyphicon-envelope"></span>
              <span className="md-hide-up"> Messages</span>
            </Link>
          </li>
          <li className="nav-item dropdown notification-dropdown" data-toggle="tooltip" title="Notifications" data-placement="bottom">
            <span className="badge badge-pill badge-primary">{this.state.total_new_notifications}</span>
            <a id="notification-dropdown-trigger" href="javascript:void(0)" to="/notifications" className="h-flex-center" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
              <span className="glyphicon glyphicon-bell"></span>
              <span className="md-hide-up"> Notifications</span>
            </a>
            <ul className="dropdown-menu no-pad no-margin notification-dropdown-menu">
              <li className="notification-header div-head site-primary-bg">
                <div>New (<b>{this.state.total_new_notifications}</b>)</div>
                <div></div>
              </li>
              <ul className="notification-container">
                {
                  this.state.notifications.map((not, index) => {
                    return (
                        <li key={index} className="notification-box">
                            <Link to={"/seller/"+not.from_id}>
                              <img src={not.from_photo} className="w-50 img-circle" />
                            </Link>    
                            <div>
                                <Link to={"/seller/"+not.from_id}>
                                  <strong className="text-info">{not.from_name}</strong>
                                </Link>
                                <div>
                                    {truncText(not.message, 70)}
                                </div>
                                <small className="text-warning">{this.notificationTime(not.time)}</small>
                            </div>
                            <Link to={productLink(not.reference_title, not.reference_id)}>
                              <img src={not.reference_photos.split(",")[0]} className="w-70 h-70"/>
                            </Link>
                        </li>
                        /*
                        <li key={index} className="notification-box">
                            <div className="row">
                                <div className="col-lg-3 col-sm-3 col-3 text-center">
                                    <img src={not.from_photo} className="w-50 img-circle" />
                                </div>    
                                <div className="col-lg-8 col-sm-8 col-8">
                                    <strong className="text-info">{not.from_name}</strong>
                                    <div>
                                        {not.message}
                                    </div>
                                    <small className="text-warning">{this.notificationTime(not.time)}</small>
                                </div>    
                            </div>
                        </li>*/
                    )
                  })
                }
                {
                    this.state.loading_notifications?
                    <li style={{paddingBottom: "25px"}}>
                      <div className="b-bouncing-loader-wrapper" data-v-67bc6bc4="" style={this.state.product == null?{display: "block"}:{display: "none"}}>
                        <div className="b-bouncing-loader spinner-absolute h-pt-20" style={{bottom: "0px"}}>
                          <div>
                          </div>
                          <div>
                          </div>
                          <div>
                          </div>
                        </div>
                      </div>
                    </li>
                    :
                    <li className="hide"></li>
                }
                {
                  this.state.no_notifications?
                  <li className="notification-empty">
                    <i className="fa fa-3x fa-bell-slash"></i>
                    <span style={{alignSelf: "center"}}>You have no notification yet</span>
                  </li>
                  :
                  <li className="hide"></li>
                }
              </ul>
              <li className="div-foot site-primary-bg">
                <span onClick={this.loadNotifications} className={"button" + (this.state.has_next_notifications? "" : " hide")}>Load More</span>
              </li>
            </ul>
          </li>
          <li className="nav-item" data-toggle="tooltip" title="Settings" data-placement="bottom">
            <Link onClick={this.closeNavbar} to="/settings" className="h-flex-center">
              <span className="glyphicon glyphicon-cog"></span>
              <span className="md-hide-up"> Settings</span>
            </Link>
          </li>
          <li className="nav-item" data-toggle="tooltip" title="Logout" data-placement="bottom">
            <form id="logoutform" method="post" action="/login">
              <input type="hidden" name="log_out" value="ok"/>
            </form>
            <a href="javascript:void(0)" onClick={this.logOut} className="h-flex-center">
              <span className="glyphicon glyphicon-log-out"></span>
              <span className="md-hide-up"> Logout</span>
            </a>
          </li>
          <li className="nav-item sm-hide-down">
            <div className="h-width-120">
              <a href="/sell" className="h-width-100p fw-button qa-fw-button fw-button--type-warning fw-button--size-medium">
                <span className="fw-button__content">
                  <span className="fw-button__slot-wrapper">SELL</span>
                </span>
              </a>
            </div>
          </li>
        </ul>
      )
    }

    return (
      <div id="header" className={"b-app-header-wrapper" + (this.props.class_suffix? " " +this.props.class_suffix.trim() : "")}>
        <div style={{height: "66px"}}></div>
        <nav className="navbar b-app-header navbar-fixed-top">
          <div className="container-fluid nav-container">
            <div className="navbar-header">
              <button style={{height: "40px"}} type="button" className="navbar-toggle" data-toggle="collapse"  onClick={this.toggleNavbar}>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a style={{height: "30px", width: "30px", fontSize: "1.5em"}} onClick={this.toggleNavbar} className="navbar-toggle md-hide-up fa fa-2x fa-search"></a>
              <a style={{height: "35px"}} href="/sell" className="navbar-toggle fw-button--type-warning">Sell</a>
              <Link onClick={this.closeNavbar} to="/" className="navbar-brand logo font-bask-normal">
                <img src="/public/logo.png" width="45" alt="logo" className="d-inline-block align-middle mr-2"/>
                <span>{SITE_NAME}</span>
              </Link>
            </div>
            <div className={"collapse navbar-collapse"+(this.state.collapsed?"":" in")} id="myNavbar">
              <form style={{display: "inline-block", height: "40px", width:"100%"}} className={"md-w-up-2"+(this.props.location.pathname == "/" || this.props.location.pathname.startsWith("/index.")?" md-hide-up":"")} onSubmit={this.handleSearch}>
                <div className="input-group input-group-lg fw-search--rounded">
                  <input autoComplete="off" onChange={this.handleChange}
                  type="text" className="form-control" value={this.state && this.state.search?this.state.search:""} name="search" 
                  placeholder="Enter your search..." onChange={this.handleChange}/>
                  <span onClick={this.handleSearch} type="submit" style={{cursor: "pointer", height: "40px", background: "#FFA010", borderColor: "#FFA010"}} className="input-group-addon">
                    <div onClick={this.handleSearch} className="fw-search__icon">
                      <svg onClick={this.handleSearch} className="loupe-2" strokeWidth="0" style={{width: "16px", height: "16px",maxWidth: "16px",maxHeight: "16px",fill: "rgb(255, 255, 255)",stroke: "inherit"}}>
                        <use xlinkHref="#loupe-2"></use>
                      </svg>
                    </div>
                  </span>
                </div>
              </form>
              {stateLinks}
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default withRouter(Navbar)