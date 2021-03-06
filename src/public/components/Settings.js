import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { NO_PROFILE_PHOTO_IMAGE, API_ROOT, ERROR_NET_UNKNOWN, STATIC_IMAGES_CLIENT_DIR, SITE_NAME, getText } from '../../../Constants'
import { commaNum } from '../utils/Funcs'
const browser = require("../utils/Browser")
import Navbar from './Navbar'
import Footer from "./Footer"
class Settings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: props.user,
            password_form: { password: "", new_password: "" },
            profile_form: { fullname: props.user.fullname, number: props.user.number }

        }
        
        this.uploadPhoto = this.uploadPhoto.bind(this)
        this.changePass = this.changePass.bind(this)
        this.changeProfile = this.changeProfile.bind(this)
        this.handleProfileChange = this.handleProfileChange.bind(this)
    }

    componentDidMount() {
      const password_form = {}
      const profile_form = {}
      $.each($('[data-form="change-profile"]'), function(i, el){
        console.log("EL", el)
        profile_form[[el.name]] = ""
      })
      $.each($('[data-form="change-password"]'), function(i, el){
        password_form[[el.name]] = ""
      })
      

      //set profile data
      /*
      $("[name='fullname']").attr("name", this.state.user.fullname)
      $("[name='number']").attr("name", this.state.user.number)
      */
      console.log("password_form", password_form)
      console.log("profile_form", profile_form)
    }

    handleProfileChange = (e) => {
      var profile_form = this.state.profile_form;
      profile_form[[e.target.name]] = e.target.value
      this.setState({profile_form: profile_form})
    }

    handlePasswordChange = (e) => {
      var form = this.state.password_form;
      form[[e.target.name]] = e.target.value
      this.setState({password_form: form})
    }

    clearPassErrors = () => {
      const keys = Object.keys(this.state.password_form);
      for (const key of keys) {
        this.setError(key, "");
      }
    }

    setError = (key, error) => {
      $("#"+key+"-error").attr("data-error", error)
    }

    changeProfile = (e) => {
      e.preventDefault();
      const formData = Object.keys(this.state.user).reduce((object, key) => {
        object[key] = this.state.user[key];
        return object;
      }, {});
      var canSend = false
      if(this.state.profile_form.fullname.length > 0 && this.state.profile_form.fullname != this.state.user.fullname) {
        formData.fullname = this.state.profile_form.fullname
        canSend = true
      }
      if(this.state.profile_form.number.length > 0 && this.state.profile_form.number != this.state.user.number) {
        formData.number = this.state.profile_form.number
        canSend = true
      }
      if(canSend) {
        $("#submit-profile").attr("data-sending", "true")
        browser.axios.post(API_ROOT + "users/update_profile", formData)
        .then(res => {
          console.log("SubmitProfile", res.data)
          var data = res.data
          if(data.success) {
            this.setState({user: formData})
            modalAlert(getText("PROFILE_UPDATED"), null)

          } else if(data.auth_required) {
            this.props.history.push("/login")
            
          } else if(data.error) {
            modalAlert(data.error, null)

          } else if(data.errors && Object.keys(data.errors).length > 0) {
            const keys = Object.keys(data.errors);
            for (const key of keys) {
              console.log("key", key, data.errors[[key]]);
              setError(key.split("-")[0].trim(), data.errors[[key]]);
            }
  
          }
          $("#submit-profile").attr("data-sending", "false")
        })
        .catch(e => {
          modalAlert(ERROR_NET_UNKNOWN, null);
          $("#submit-profile").attr("data-sending", "false")
        })
      }
    }

    changePass = (e) => {
      e.preventDefault()
      this.clearPassErrors()
      const keys = Object.keys(this.state.password_form);
      var hasErrors = false;
      const formData = {}
      for (const key of keys) {
        console.log("key", key, this.state.password_form[[key]]);
        if(this.state.password_form[[key]] == null || this.state.password_form[[key]].length == 0) {
          hasErrors = true;
          var errorStart = key.replace(/([-_])/g, " ");
          this.setError(key, errorStart+" " + getText("CANNOT_BE_EMPTY_LOWERCASE"));

        } else {
          formData[[key]] = this.state.password_form[[key]]
        }
      }
      if(!hasErrors) {
        $("#submit-password").attr("data-sending", "true")
        browser.axios.post(API_ROOT + "users/update_password", formData)
        .then(res => {
          console.log("SubmitPassword", res.data)
          var data = res.data
          console.log("SubmitPassword-", "success", data.success)
          if(data.success) {
            modalAlert(getText("PASSWORD_UPDATED"), null)

          } else if(data.auth_required) {
            this.props.history.push("/login")

          } else if(data.error) {
            modalAlert(data.error, null)

          } else if(data.errors && Object.keys(data.errors).length > 0) {
            const keys = Object.keys(data.errors);
            for (const key of keys) {
              console.log("key", key, data.errors[[key]]);
              this.setError(key.split("-")[0].trim(), data.errors[[key]]);
            }
  
          }
          $("#submit-password").attr("data-sending", "false")
        })
        .catch(e => {
          modalAlert(ERROR_NET_UNKNOWN+e, null);
          $("#submit-password").attr("data-sending", "false")
        })
      }
      
    }

    uploadPhoto = e => {
        const photo = e.target.files[0]
        console.log("upload: ", photo)
        const formData = new FormData()
        formData.append('photo', photo)
    
        this.setState({uploading_profile_photo: true})
        this.setState({profile_photo_error: null})
        browser.axios.post(API_ROOT + "users/upload/profile-photo", formData)
        .then(response => {
          if(response && response.data && response.data.status == 1) {
            const user = this.state.user
            user.profile_photo = URL.createObjectURL(photo)
            this.setState({user: user})
    
          } else if(response && response.data && response.data.message && response && response.data.message.length > 0) {
            if(response.data.status == 3) {
              this.setState({profile_photo_error: getText("DP_SIZE_HIGH_ERROR")})
    
            } else {
              this.setState({profile_photo_error: response.data.message})
            }
    
          } else {
            this.setState({profile_photo_error: getText("PHOTO_UPLOAD_ERROR")})
          }
          this.setState({uploading_profile_photo: false})
          $('#add_profile_photo').modal('toggle');
        })
        .catch(err => {
          this.setState({profile_photo_error: ERROR_NET_UNKNOWN})
          this.setState({uploading_profile_photo: false})
          $('#add_profile_photo').modal('toggle');
        })
      }

    render() {
        return (
          <div>
            <Navbar user={this.props.user} />
            <div className="h-bg-grey container h-pt-10 h-pb-15">
    {
    !this.state.user?
    <div>
        <div className="b-bouncing-loader-wrapper" data-v-67bc6bc4="" style={{display: "block"}}>
            <div className="b-bouncing-loader spinner-absolute h-pt-20" style={{bottom: "0px"}}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
      <div className="before-data-load"></div>
    </div>
    :
    <div>
    <div className="h-dflex h-mt-20 row">
     <div className="col-sm-12 col-md-3">
      <div action="" className="b-user-settings__avatarblock">
       <div className="js-avatar b-user-settings__avatarblock__avatar" style={{backgroundImage: this.state.user.profile_photo.length > 0?'url('+this.state.user.profile_photo+')':'url('+NO_PROFILE_PHOTO_IMAGE+')'}}>
        <button className="b-user-settings__avatarblock__upload-foto" data-target="#add_profile_photo" data-toggle="modal" type="button">
         <i className="h-icon icon-profile-settings-upload">
         </i>
        </button>
       </div>
       <div className="b-user-settings__avatarblock__name">
        <a href={"/seller/"+this.state.user.id}>
         {this.state.user.fullname}
        </a>
       </div>
       <div className={this.state.profile_photo_error?"fw-field__error qa-fw-field__error":"fw-field__error qa-fw-field__error"} id="img_status">
        {this.state.profile_photo_error}
       </div>
       <div className="hide h-mt-15 h-width-100p h-ph-5">
        <Link to="/settings" className="general-button general-button--full general-button--border-radius general-button--with-shadow general-button--orange-color" href="/request-call.html">
         {getText("SETTINGS")}
        </Link>
       </div>
      </div>
      <div aria-labelledby="ModalLabel" style={{display: "none"}} aria-hidden="true" className="modal out" id="add_profile_photo" role="dialog" tabIndex="-1">
       <div className="modal-dialog" role="document">
        <div className="modal-content">
         <div className="modal-header h-text-center h-font-16" style={{background: "rgb(242, 244, 248) none repeat scroll 0% 0%"}}>
          <button aria-hidden="true" className="close" data-dismiss="modal" type="button">
           ×
          </button>
          <h5 className="h-bold">
           {getText("ADD_A_DP")}
          </h5>
         </div>
         <div className="modal-body">
          <div className="b-popup-form js-input-image-block" name="advert_image">
           <div className="js-upload b-user-settings__avatarblock__avatar " style={{backgroundImage: this.state.user.profile_photo.length > 0?'url('+this.state.user.profile_photo+')':'url('+NO_PROFILE_PHOTO_IMAGE+')'}}>
           </div>
           <div className="js-upload-preview h-hidden b-user-settings__avatarblock__avatar" style={{zIndex: "2"}}>
           </div>
           <div className="b-user-settings__avatarblock__text-1">
            {getText("UPLOAD_UR_DP")}
           </div>
           <div className="b-user-settings__avatarblock__text-2">
            {getText("DP_RULES")}
           </div>
           <div className=" b-user-settings__avatarblock__text b-user-settings__avatarblock__text_red h-hidden h-mt-15">
           </div>
           <div className="h-width-100p h-height-100 h-text-center">
            <img className={this.state.uploading_profile_photo?"js-upload-progress h-mt-20":"js-upload-progress h-mt-20 hide"} src="/public/res/images/static/preload2.gif"/>
            <a className="js-upload-link">
             <div className="b-user-settings__avatarblock__btnblock">
              <div className="b-user-settings__avatarblock__btn btn btn-lg">
               <div className="btn btn-lg btn-success btn-block" id="file-name-btn">
               {getText("CHOOSE_A_FILE")}
               </div>
               <input onChange={this.uploadPhoto} accept="image/*" className="js-input-image" name="photo" type="file"/>
              </div>
             </div>
            </a>
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
      <Link to="/create-ad-tips" className="b-notification b-notification__green qa-premium-create-ad-tips">
       <div className="b-notification-icon">
        <i className="h-icon icon-profile-lightbulb">
        </i>
       </div>
       <div className="h-pr-10 h-dflex h-flex-main-center h-flex-dir-column">
        <div className="b-notification-text">
         <div>
         {getText("AD_TIP_CHECK")}
         </div>
        </div>
       </div>
      </Link>
     </div>
     <div style={{background: "#fff", paddingBottom: "25px"}} className="col-sm-12 col-md-9 box-shadow">
        <ul className="nav nav-tabs">
            <li class="left active">
                <a data-toggle="tab" href="#profile-update" className="cap-case">
                {getText("UPDATE_PROFILE")}
                </a>
            </li>
            <li class="left">
                <a data-toggle="tab" href="#password-update">
                {getText("UPDATE_PWD")}
                </a>
            </li>
        </ul>
        <div className="tab-content">
            <div className="tab-pane fade active in" id="profile-update">
            <form method="POST" name="change-profile" onSubmit={this.changeProfile}>
                    <div className="form-group row">
                        <label className="col-md-2" for="fullname">
                        {getText("FULLNAME")}:
                        </label>
                        <div className="col-md-10">
                            <input ariaDescribedby="fullname" onChange={this.handleProfileChange} value={this.state.profile_form.fullname} name="fullname" className="form-control" data-form="change-profile" placeholder={getText("ENTER_FULLNAME")} type="text"/>
                            <div className="error" data-error="" id="fullname-error"></div>
                        </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-2" for="number">
                      {getText("PHONE_NUMBER")}:
                      </label>
                      <div className="col-md-10">
                        <div className="input-group">
                          <input ariaDescribedby="number" data-type="phone-number" onChange={this.handleProfileChange} value={this.state.profile_form.number} name="number" className="form-control" data-form="change-profile" placeholder={getText("ENTER_PHONE_NUMBER")} type="text"/>
                          <span className="input-group-addon">Tel</span>
                        </div>
                        <div className="error" data-error="" id="number-error"></div>
                      </div>
                    </div>
                    <hr/>
                    <button className="btn btn-success" data-sending="false" data-text={getText("SUBMIT")} data-text-sending={`${getText("PLS_WAIT")}...`} id="submit-profile" type="submit">
                    </button>
                </form>
            </div>
            <div className="tab-pane fade" id="password-update">
                <form method="POST" name="change-password" onSubmit={this.changePass}>
                    <div className="form-group row">
                        <label className="col-md-2" for="password" required="required">
                        {getText("PASSWORD")}:
                        </label>
                        <div className="col-md-10">
                            <input ariaDescribedby="password" onChange={this.handlePasswordChange} name="password" className="form-control" data-form="change-password" data-type-change-pass="text" id="password" name="password" placeholder={getText("ENTER_PWD")} type="password"/>
                            <div className="error" data-error="" id="password-error">
                        </div>
                    </div>
                    </div>
                    <div className="form-group row">
                    <label className="col-md-2" for="new_password" required="required">
                    {getText("NEW_PASSWORD")}:
                    </label>
                    <div className="col-md-10">
                    <input ariaDescribedby="new_password" onChange={this.handlePasswordChange} name="new_password" className="form-control" data-form="change-password" data-type-change-pass="text" id="new_password" name="new_password" placeholder={getText("ENTER_NEW_PWD")} type="password"/>
                    <div className="error" data-error="" id="new_password-error">
                    </div>
                    </div>
                    </div>
                    <hr/>
                    <button className="btn btn-success" data-sending="false" data-text={getText("SUBMIT")} data-text-sending={`${getText("PLS_WAIT")}...`} id="submit-password" type="submit">
                    </button>
                </form>
            </div>
        </div>
     </div>
    </div>
   </div>
  }
</div>
<Footer />
</div>
        )
    }
}

export default Settings