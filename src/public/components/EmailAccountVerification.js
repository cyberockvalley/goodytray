import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

class EmailAccountVerification extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return(
            <div>
                <Navbar user={this.props.user} />
                <div className="h-bg-grey h-pb-15">
                </div>
                <Footer />
            </div>
        )
    }
}

export default EmailAccountVerification