import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { API_ROOT, ERROR_NET_UNKNOWN, getText } from '../../../Constants'
import { commaNum, truncText, profilePhoto, modalAlert, dataCall } from '../utils/Funcs'
import $ from 'jquery';
import Navbar from './Navbar'
import { productLink } from '../utils/LinkBuilder'

const browser = require("../utils/Browser")

class Messages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: props.user,
            page: 0,
            messages: [],
            selected: null,
            loading_threads: false,
            loading_messages: false,
            selected_messages: []
        }
        this.handleMessageView = this.handleMessageView.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleBackPressed = this.handleBackPressed.bind(this)
        this.dataCall = dataCall.bind(this)
        this.addToBucket = this.addToBucket.bind(this)
        this.removeFromBucket = this.removeFromBucket.bind(this)
    }

    handleResize() {
        console.log("handleResize", window.innerWidth,  window.innerHeight)
        try {
            this.scrollToBottom()

        } catch(e) {}
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this))
        this.loadThreads()
    }

    loadThreads = () => {
        var page = this.state.page + 1
        this.setState({loading_threads: true})
        browser.axios.get(API_ROOT + "messages/threads?page="+page)
        .then(res => {
            console.log('DATA', res.data.success, JSON.stringify(res.data))
            
            if(res.data.success) {
                this.setState({messages: res.data.list})
                this.setState({page: page})
                console.log('DATA', 'SUX', this.state.messages)

            } else {
                console.log('DATA', 'FA', this.state.messages)
            }
            this.setState({loading_threads: false})
        })
        .catch(e => {
            this.setState({loading_threads: false})
        })
    }

    handleMessageView = (e) => {
        const index = e.target.getAttribute("data-index")
        this.setState({loading_messages: true})
        this.state.selected = this.state.messages[index]
        this.setState({selected: this.state.messages[index]})
        this.setState({nav_class_suffix: "sm-hide-down"})
        console.log("handleMessageView", index, this.state.selected, this.state.messages)
        this.loadMessages()
    }

    loadMessages = () => {
        console.log("loadMessages", this.state.selected.thread_id)
        browser.axios.get(API_ROOT + "messages/threads/"+this.state.selected.thread_id)
        .then(res => {
            console.log('DATA2', res.data.success)
            var selected = this.state.selected
            selected.messages = []
            if(res.data.success) {
                selected.messages = res.data.list
                this.setState({selected: selected})
                this.setState({loading_messages: false})
                this.scrollToBottom()
                console.log('DATA2', 'SUX', this.state.selected)
            } else {
                console.log('DATA2', 'FA', this.state.messages)
                this.setState({selected: null})
                this.setState({loading_messages: false})
            }
            console.log("MMM", this.state.selected.body)
        })
        .catch(e => {
            this.setState({selected: null})
            this.setState({loading_messages: false})
        })
    }

    dateNovComma2Year(time) {
        return ""//"November, 2 2019"
    }

    date16R45(time) {
        return ""//"16:45"
    }

    handleBackPressed = (e) => {
        this.state.selected = null
        this.setState({selected: null, loading_messages: false})
        this.setState({nav_class_suffix: null})
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    scrollbarHeight = () => {
        return this.msgScrollPane.offsetHeight / this.msgScrollPane.scrollHeight
    }
    scrollToBottom = () => {
        console.log('Scroll', this.scrollbarHeight(), this.msgScrollPane.scrollTop, this.msgScrollPane.offsetHeight, this.msgScrollPane.scrollHeight)
        this.msgScrollPane.scrollTop = this.msgScrollPane.scrollHeight
        if(window.innerWidth <= 768) {
            try {
                document.body.scrollTop = document.body.scrollHeight
            }catch(e){}
        }
        console.log('Scroll2', this.msgScrollPane.scrollTop)
    }

    cancelSelected = () => {
        this.setState({selected_messages: []})
    }

    deleteSelected = () => {
        var messages = this.state.selected.messages
        var l = this.state.selected_messages.length;
        var messages_ids = []
        for (var x = 0; x < l; x++) {
            messages.splice(messages.indexOf(this.state.selected_messages[x]), 1)
            messages_ids.push(this.state.selected_messages[x].id)
        }
        console.log('DEL', 'ids', messages_ids)
        console.log('DEL', 'messages', messages)
        var selected = this.state.selected
        selected.messages = messages
        this.setState({selected: selected})
        this.setState({selected_messages: []})
        this.scrollToBottom()
        browser.axios.post(API_ROOT + "messages/delete", {
            messages_ids: messages_ids
        })
        .then(res => {
            if(res.data.success) {
                console.log('DEL', 'SUCCESS')
            } else {
                console.log('DEL', 'FAILED')
            }
        })
        .catch(e => {
            console.log('DEL', 'CATCH', e)
        })
    }

    copySelected = () => {
        var texts = this.getSelectedTexts()
        console.log("copySelected", texts)
        if (!navigator.clipboard) {
            try {
                const el = document.createElement('textarea');
                el.value = texts;
                document.body.appendChild(el)
                el.select()
                var successful = document.execCommand('copy')
                document.body.removeChild(el)
                var msg = successful ? 'successful' : 'unsuccessful';
                console.log("copySelected", 'Fallback: Copying text command was ' + msg)
            } catch (err) {
                console.error("copySelected", 'Fallback: Oops, unable to copy', err)
            }
            this.setState({selected_messages: []})
            return
        }
        navigator.clipboard.writeText(texts)
        .then(() => {
            console.log("copySelected", 'Async: Copying to clipboard was successful!')
            this.setState({selected_messages: []})
        })
        .catch( err => {
            console.error("copySelected", 'Async: Could not copy text: ', err)
            this.setState({selected_messages: []})
        })
    }

    getSelectedTexts = () => {
        var texts = ""
        console.log("getSelectedTexts A", this.state.selected_messages)
        var l = this.state.selected_messages.length;
        for (var x = 0; x < l; x++) {
            console.log("getSelectedTexts B", this.state.selected_messages[x])
            var msg = this.state.selected_messages[x]
            texts += "\n" + (msg.from_id == this.state.user.id? getText("ME") + ": " : getText("OTHER") + ": ") + msg.body
        }
        return texts.substring(1)
    }

    addToBucket = (e) => {
        e.preventDefault()
        var msg = this.state.selected.messages[parseInt(e.target.getAttribute("data-msg-index"))]
        if(!this.addedToBucket(msg)) {
            var messages = this.state.selected_messages
            messages.push(msg)
            this.setState({selected_messages: messages})
            console.log("addToBucket", msg, this.state.selected_messages)
            console.log("addToBucket B", e.target.getAttribute("data-msg-index"), this.state.selected.messages, e.target)

        } else {
            this.removeFromBucketWithIndex(parseInt(e.target.getAttribute("data-msg-index")))
        }
    }

    removeFromBucket = (e) => {
        e.preventDefault()
        this.removeFromBucketWithIndex(parseInt(e.target.getAttribute("data-msg-index")))
    }

    removeFromBucketWithIndex = (index) => {
        var msg = this.state.selected.messages[index]
        var msgIndex = $.inArray(msg, this.state.selected_messages)
        var messages = this.state.selected_messages
        messages.splice(msgIndex, 1)
        this.setState({selected_messages: messages})
        console.log("removeFromBucketWithIndex", msgIndex, this.state.selected_messages)
        console.log("removeFromBucketWithIndex B", index)
    }

    addedToBucket = (msg) => {
        var inArray = $.inArray(msg, this.state.selected_messages)
        console.log("addedToBucket", inArray > -1, msg, this.state.selected_messages)
        return inArray > -1
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.state.msg && this.state.msg.length > 0) {
            const thread = {from_id: this.state.user.id, created: new Date(), body: this.state.msg, seen: -1}
            var selected = this.state.selected
            selected.messages.push(thread)
            this.setState({selected: selected})
            this.scrollToBottom()
            this.setState({msg: ""})
            browser.axios.post(API_ROOT + "messages/send", {
                text: thread.body,
                to_id: this.state.selected.user_id,
                product_id: this.state.selected.product_id
            })
            .then(res => {
                const data = res.data
                if(data.auth_required) {
                    this.location.href = "/login"

                } else if(data.status == 0 && data.message) {
                    modalAlert(data.message, null)

                } else if(data.status == 1 || data.success) {
                    var selected = this.state.selected
                    selected.messages[selected.messages.length - 1].seen = 0
                    this.setState({selected: selected})
                    console.log("SELECTED", this.state.selected)
                }
            })
            .catch(e => {
                modalAlert(ERROR_NET_UNKNOWN, null)
            })
        }
    }

    render() {
        return (
<div>
            <Navbar user={this.props.user} class_suffix={this.state.nav_class_suffix}/>
<div style={{minHeight: "200px"}}>
    {
    this.state.loading_threads?
    <div className="container" style={{height: "80vh"}}>
    <div className="b-bouncing-loader-wrapper" style={{display: "block"}}>
        <div className="b-bouncing-loader spinner-absolute h-pt-20">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
    </div>
    :
 <div className="container">
  <div className="qa-messenger-wrapper b-messenger-wrapper">
   <div className={"b-messenger-sidebar"+(this.state.selected?" sm-hide-down":"")}>
    <header className="b-messenger-header qa-messenger-rooms-header">
     <div className="b-messenger-header-title">
      {getText("MY_MESSAGES")}
     </div>
     <div className="h-pos-rel">
      <div className="b-messenger-context-menu-wrapper">
      </div>
     </div>
    </header>
    <div className="h-bg-white qa-messenger-rooms-list b-messenger-room-list">
     {
         this.state.messages.length == 0?
         <div className="b-empty-cart__info" style={{display: "block", width: "200px", margin: "10px auto"}}>
             <i class="fa fa-envelope fa-5x"></i>
            <p>{getText("NO_MESSAGES")}</p>
         </div>
         :
         this.state.messages.map((message, index) => (
            <div onClick={this.handleMessageView} data-index={index} key={message.id} className={"qa-room-label-link b-room-label-wrapper"+((this.state.selected && this.state.selected.id == message.id)?" b-room-label-wrapper--active":"")}>
            <div className="b-user-avatar-icon h-flex-center h-flex-center" style={{flex: "0 0 48px", height: "48px", width: "48px", backgroundImage: "url("+profilePhoto(message.user_photo)+")"}}>
            </div>
            <div data-index={index} className="b-room-label">
             <header data-index={index}>
              <div data-index={index} className="h-text-one-line h-lh-em-1_3">
               <span data-index={index} className="qa-room-label-link-name">
                {message.user_fullname}
               </span>
              </div>
              <div data-index={index} className="hide b-room-label-date">
               Nov 2
               <div style={
                   {
                       color: "#fff", 
                       backgroundColor: "#70b93f", 
                       fontSize: "11px", 
                       borderRadius: "8px", 
                       width: "15px", 
                       height: "15px",
                       display: "flex"
                    }
                }>
                    <div style={{textAlign: "center", justifyContent: "center", alignItems: "center"}}>
                        {message.total_new}
                    </div>
                </div>
              </div>
             </header>
             <div data-index={index} className="b-room-label-ad-title h-text-one-line">
              <span data-index={index} className="qa-room-label-link-title">
               {message.product_title}
              </span>
             </div>
             <div data-index={index} className="h-dflex h-flex-cross-baseline">
              <div data-index={index} className="h-flex">
               <span data-index={index}>
                {(message.from_id == this.state.user.id?"You: ":"")+truncText(message.body, 70)}
               </span>
              </div>
             </div>
            </div>
           </div>
         ))
     }
    </div>
   </div>
   
   <div className={"b-messenger-main-frame"+(!this.state.selected?" sm-hide-down":"")}>
    <div className="qa-messenger-room-wrapper b-messenger-room-wrapper">
    {
       this.state.loading_messages?
        <div className={"b-filters__loader active"}>
            <div style={{display: "block"}}>
                <div className="b-bouncing-loader" style={{bottom: "0px"}}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
       :
       this.state.selected && !this.state.loading_messages?
       <div className="b-messenger-room-transition-wrapper">
      <div className="b-messenger-room-header-fixed-wrapper js-messenger-room-header-fixed-wrapper">
       <header className={"b-messenger-room-header-wrapper" + (this.state.selected_messages.length > 0? " hide" : "")}>
        <div className="b-messenger-room-header-part b-messenger-room-header-part--left">
         <div onClick={this.handleBackPressed} style={{color: "#fff"}} className="md-hide-up b-messenger-room-header-icon-wrapper fa fa-arrow-left">
         </div>
         <Link className="qa-messenger-room-avatar" to={"/"}>
          <div className="b-user-avatar-icon h-flex-center" style={{flex: "0 0 40px", height: "40px", width: "40px", backgroundImage: "url("+this.state.selected.user_photo+")", transition: "all 0.3s ease 0s", filter: "blur(0px)", opacity: "1"}}>
          </div>
         </Link>
        </div>
        <div className="b-messenger-room-header-part b-messenger-room-header-part--middle">
         <Link className="qa-messenger-room-user-name b-messenger-room-header-user-name h-text-one-line" to={"/seller/"+this.state.selected.user_id} style={{transition: "all 0.3s ease 0s", filter: "blur(0px)", opacity: "1"}}>
          {this.state.selected.user_fullname}
         </Link>
        </div>
        <div className="b-messenger-room-header-part b-messenger-room-header-part--right">
         <div className="b-messenger-room-header-icons-wrapper">
          <div>
           <div className="hide qa-messenger-room-report-abuse b-messenger-room-header-icon">
            <a className="qa-button-report-abuse">
             <span className="h-font-14 h-flex-center">
              <svg className="flag-2" strokeWidth="0" style={{width: "16px", height: "16px", maxWidth: "16px", maxHeight: "16px", fill: "rgb(255, 255, 255)", stroke: "inherit"}}>
               <use xlinkHref="#flag-2">
               </use>
              </svg>
             </span>
            </a>
           </div>
          </div>
          <div className="h-pos-rel">
           <div className="hide b-messenger-room-header-icon">
            <div className="qa-messenger-room-context-menu h-flex-center">
             <svg className="sub-menu" strokeWidth="0" style={{width: "16px", height: "16px", maxWidth: "16px", maxHeight: "16px", fill: "rgb(255, 255, 255)", stroke: "inherit"}}>
              <use xlinkHref="#sub-menu">
              </use>
             </svg>
            </div>
           </div>
           <div className="b-messenger-context-menu-wrapper">
           </div>
          </div>
         </div>
        </div>
       </header>
       {
        this.state.selected.product_id > -1 && this.state.selected.product_title?
       <div className={"b-messenger-room-advert-info" + (this.state.selected_messages.length > 0? " hide" : "")}>
           <Link className="b-messenger-room-advert-info-link" to={productLink(this.state.selected.product_title, this.state.selected.product_id)}>
         <div className="b-messenger-room-advert-info-image-wrapper h-a-without-underline" style={{transition: "all 0.3s ease 0s", filter: "blur(0px)", opacity: "1"}}>
          <div className="b-messenger-room-advert-info-image" style={{backgroundImage: "url("+this.state.selected.product_photos.split(",")[0]+")"}}>
          </div>
         </div>
         <div className="b-messenger-room-advert-info-title">
          <div className="b-messenger-room-advert-info-title-link" style={{transition: "all 0.3s ease 0s", filter: "blur(0px)", opacity: "1"}}>
           {this.state.selected.product_title}
          </div>
          <div dangerouslySetInnerHTML={{__html: this.state.selected.product_currency_symbol+" "+commaNum(this.state.selected.product_price)}} className="b-messenger-room-advert-info-price h-text-one-line" style={{transition: "all 0.3s ease 0s", filter: "blur(0px)", opacity: "1"}}>
          </div>
         </div>
        </Link>
        <div className="b-messenger-room-advert-info-extra">
         <a className="qa-show-contact cy-show-contact js-show-contact b-show-contact" rel="nofollow">
          <span className="b-show-contact-content">
           <div className="b-show-contact-wrapper h-pointer" style={{transition: "all 0.3s ease 0s", filter: "blur(0px)", opacity: "1"}}>
            <svg className="h-mr-5 phone2" strokeWidth="0" style={{width: "20px", height: "20px", maxWidth: "20px", maxHeight: "20px", fill: "rgb(70, 75, 79)", stroke: "inherit"}}>
             <use xlinkHref="#phone2">
             </use>
            </svg>
            <button onClick={this.dataCall} data-call-class="fa fa-phone-square" data-call={this.state.recipient.message.user_number} className="b-btn b-btn--main h-ml-10 text-uppercase">
             {getText("CALL_SELLER")}
            </button>
           </div>
          </span>
         </a>
        </div>
       </div>
        :
        <div></div>
        }
        {
            this.state.selected_messages.length > 0?
            <div className="b-messenger-room-advert-info" style={{flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                <i onClick={this.cancelSelected} className="fa fa-2x fa-times text-link"></i>
                <span style={{fontSize: "18px"}}>{this.state.selected_messages.length}</span>
                <i onClick={this.deleteSelected} className="fa fa-2x fa-trash text-link"></i>
                <i onClick={this.copySelected} className="fa fa-2x fa-copy text-link"></i>
            </div>
            :<div></div>
        }
      </div>
      <div ref={e => this.msgScrollPane = e} className="b-messenger-room-output">
       <div className="b-messenger-room-output-inner" style={{maxHeight: "100%"}}>
        {
        this.state.selected.messages.map((thread, index) =>(
        <div key={index} className="b-messenger-room-list-inner" id="messenger-top-message">
         <div className={"b-messenger-room-message-wrapper" + (thread.from_id == this.state.user.id? "  b-messenger-room-message-owner" : "")}>
          <div onContextMenu={this.addToBucket} data-msg-index={index} className="qa-message-wrapper b-messenger-room-message-outer">
           <div className="b-messenger-room-message-inner" data-msg-index={index}>
            <div className="b-messenger-room-message" data-msg-index={index}>
             <div className="qa-message-text b-messenger-room-message-text" data-msg-index={index}>
              {thread.body}
             </div>
             <div className="b-messenger-room-message-date" data-msg-index={index}>
              <span className="qa-message-date b-messenger-room-message-date-text" data-msg-index={index}>
               {this.date16R45(thread.created)}
              </span>
              <div data-msg-index={index} className={thread.from_id == this.state.user.id? "b-messenger-room-message-icon-wrapper" : "hide"}>
                  {
                      thread.seen < 0?
                      <span data-msg-index={index} style={{fontWeight: "bold", fontStyle: "italic", color: "#000"}}>....</span>
                      :
                      <svg data-msg-index={index} className="check" strokeWidth="0" style={{width: "16px", height: "9px", maxWidth: "16px", maxHeight: "9px", fill: "rgb(130, 180, 87)", stroke: "inherit"}}>
                        <use data-msg-index={index} xlinkHref={thread.seen == 0?"#check":"#doublecheck"}>
                        </use>
                      </svg>
                  }
              </div>
             </div>
            </div>
           </div>
          </div>
         </div>
          {
              this.addedToBucket(thread)?
              <div className="chat-select-highlight" onContextMenu={this.removeFromBucket} data-msg-index={index}></div> : <div></div>
          }
        </div>
            ))
        }
       </div>
      </div>
      <form onSubmit={this.handleSubmit} className="js-input-messenger-wrapper b-messenger-input-wrapper">
       <div className="b-messenger-input-block">
        <div className="b-messenger-input__stickers-button">
         <svg className="stickers" strokeWidth="0" style={{width: "26px", height: "26px", maxWidth: "26px", maxHeight: "26px", fill: "rgb(166, 184, 189)", stroke: "inherit"}}>
          <use xlinkHref="#stickers">
          </use>
         </svg>
         <span className="b-messenger-input__stickers-button__new">
          {getText("NEW_LOWERCASE")}
         </span>
        </div>
        <div className="b-messenger-input__wrapper">
            <input value={this.state.msg} onChange={this.handleChange} name="msg" type="text" placeholder="Write your message here" className="qa-messenger-send-message-textarea b-messenger-input"/>
        </div>
        <button type="submit" className="b-messenger-input-icon-wrapper">
         <label className="hide b-app-image-reader">
          <svg className="b-messenger-input-icon add-file" strokeWidth="0" style={{width: "24px", height: "24px", maxWidth: "24px", maxHeight: "24px", fill: "rgb(196, 196, 196)", stroke: "inherit"}}>
           <use xlinkHref="#add-file">
           </use>
          </svg>
          <input accept="image/*" className="qa-messenger-send-image" multiple="multiple" type="file"/>
         </label>
         <svg className="qa-messenger-send-message b-messenger-input-icon h-ml-15 send" strokeWidth="0" style={{width: "24px", height: "19px", maxWidth: "24px", maxHeight: "19px", fill: "rgb(196, 196, 196)", stroke: "inherit"}}>
            <use xlinkHref="#send"></use>
         </svg>
        </button>
       </div>
      </form>
     </div>
       :
    <div className="b-messenger-room-unselected h-flex-center">
        <div>
            <svg className="messenger-girl" strokeWidth="0" style={{width: "152px", height: "126px", maxWidth: "152px", maxHeight: "126px", fill: "inherit", stroke: "inherit"}}>
                <use xlinkHref="#messenger-girl"></use>
            </svg>
            <div className="h-mt-10">
                {getText("SELECT_A_CHAT")}
            </div>
        </div>
    </div>
   }
    </div>
   </div>
  </div>
 </div>
    }
</div>
</div>
        )
    }
}

export default Messages