import React from 'react'
import Swal from 'sweetalert2'
import { ALLOWED_MAIL_TYPES, API_ROOT, getText, PASSWORD_VALIDITY_TYPES, PASSWORD_VALIDITY_TYPES_USED } from '../../../Constants'
import { clearErrors, getParam, nullOrEmpty, regexValidation } from '../utils/Funcs'
import Footer from './Footer'
import Navbar from './Navbar'

const browser = require("../utils/Browser")

class EmailPasswordReset extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        this.setState({key: getParam(this, 'key')})
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    run = () => {
        if(this.state.posting_form) return

        clearErrors(this, "fw-field__error")

        if(nullOrEmpty(this.state.password)) {
            this.setState({password_error: getText("ENTER_PWD")})
      
        } else {
            var passwordVerification = regexValidation(this.state.password.trim(), PASSWORD_VALIDITY_TYPES_USED, PASSWORD_VALIDITY_TYPES)
            if(!passwordVerification.isValid) {
                var errors = ""
                passwordVerification.errors.forEach(error => {
                    errors += `<p>${getText(error)}</p>`
                });
                this.setState({password_error: errors})

            } else if(nullOrEmpty(this.state.password2)) {
                this.setState({password2_error: getText("RETYPE_PWD")})

            } else if(this.state.password.trim() != this.state.password2.trim()) {
                this.setState({password2_error: getText("PWD_MISMATCH_ERROR")})

            } else {
                this.setState({posting_form: true})
                browser.axios.post(API_ROOT + `users/verify-mail-key?type=${ALLOWED_MAIL_TYPES.password_reset}`, {
                    key: this.state.key,
                    password: this.state.password
                })
                .then(response => {
                    this.setState({posting_form: false})
                    console.log("RestorePass", "response", JSON.stringify(response))
                    Swal.fire('', response.data.message, response.data.status == 1? 'success' : 'error')
                })
                .catch(e => {
                    this.setState({posting_form: false})
                    console.log("RestorePass", "catch", e)
                    Swal.fire('', e.message, 'error')
                })

            }
        }
    }

    render() {
        return(
            <div>
                <Navbar user={this.props.user} />
                <div className="h-bg-grey h-pb-15">
                    <div className="fw-card qa-fw-card bc-auth-card">
                    <div className="fw-card-title">
                        {getText("RESET_PASS")}
                    </div> 
                    <div className="fw-card-content qa-fw-card-content">
                        <div className="row center-xs">
                            <div noValidate className="bc-auth-card__form-holder">
                                <div className="bc-auth-card__form-separator hide"></div> 
                                <div className="text-left">
                                    <div id="password-group1" className="form-group input-group-lg">
                                        <label for="password">{getText("PASSWORD")}:</label>
                                        <input autoComplete="off" type="password"
                                            className="form-control"
                                            name="password"
                                            id="password"
                                            placeholder={getText("ENTER_PWD")}
                                            value={this.state.password}
                                            onChange={this.onChange}/>
                                        <span id="password_error" className="fw-field__error qa-fw-field__error" dangerouslySetInnerHTML={{__html: this.state.password_error}}></span>
                                    </div>

                                    <div id="password-group" className="form-group input-group-lg">
                                        <label for="password">{getText("PASSWORD")}:</label>
                                        <input autoComplete="off" type="password"
                                            className="form-control"
                                            name="password2"
                                            id="password2"
                                            placeholder={getText("RETYPE_PWD")}
                                            value={this.state.password2}
                                            onChange={this.onChange}/>
                                        <span id="password2_error" className="fw-field__error qa-fw-field__error" dangerouslySetInnerHTML={{__html: this.state.password2_error}}></span>
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
                                    <button id="submit" onClick={this.run} type="submit" className="h-width-100p h-bold fw-button qa-fw-button fw-button--type-success fw-button--size-large">
                                    <span className="fw-button__content"> 
                                        <span className="fw-button__slot-wrapper up-case">{getText("SUBMIT")}</span>
                                    </span>
                                    </button>
                                }
                                <span className="bc-auth-card-error"></span>
                            </div>
                        </div> 
                        <div className="fw-card-content-icon"></div>
                    </div>
                </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default EmailPasswordReset