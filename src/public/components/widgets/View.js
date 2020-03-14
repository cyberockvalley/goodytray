import React, {Component} from "react"
import { buildStyle } from "./utils/Functions"
import { VIEWS } from "./utils/Constants"

class View extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div onClick={this.props.click} style={buildStyle(VIEWS.view, this.props)} />
        )
    }
}

module.exports =  View