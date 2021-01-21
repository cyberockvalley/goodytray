import React from 'react'
import { ALLOWED_MAIL_TYPES } from '../../../Constants'
import Footer from './Footer'
import Navbar from './Navbar'

class EmailAccountVerification extends React.Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        this.setState({key: getParam(this, 'key')})
        browser.axios.post(API_ROOT + `users/verify-mail-key?type=${ALLOWED_MAIL_TYPES.email_ver}`, {
            key: this.state.key
        })
        .then(response => {
            this.setState({stopLoading: true})
            console.log("RestorePass", "response", JSON.stringify(response))
            Swal.fire('', response.data.message, response.data.status == 1? 'success' : 'error')
            .then(() => {
                if(response.data.status == 1) {
                    window.location.href = "/profile"
                }
            })
        })
        .catch(e => {
            this.setState({stopLoading: true})
            console.log("RestorePass", "catch", e)
            Swal.fire('', e.message, 'error')
        })

    }

    render() {
        return(
            <div>
                <Navbar user={this.props.user} />
                <div className="h-bg-grey h-pb-15">
                    <div className={`"h-flex-center h-mv-20${this.state.stopLoading? 'hide' : ''}`}>
                        <img height="50" src="/public/res/images/static/spin.svg" width="50"/>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default EmailAccountVerification