import React, {Component} from "react"
import { buildStyle } from "./utils/Functions"
import { VIEWS } from "./utils/Constants"

class Loading extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <div style={buildStyle(VIEWS.loading.name, this.props)} className="b-bouncing-loader-wrapper" data-v-67bc6bc4="" style={{display: "block"}}>
                    <div className="b-bouncing-loader spinner-absolute h-pt-20" style={{bottom: "0px"}}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = Loading