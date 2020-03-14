import React, {Component} from "react"
import { buildStyle } from "./utils/Functions"
import View from "./View"
import { VIEWS } from "./utils/Constants"

class TextView extends View {
    constructor(props) {
        super(props)

    }
    
    render() {
        return(
            <div className={this.props.class?this.props.class:""} onClick={this.props.click} style={buildStyle(VIEWS.text_view.name, this.props)}>
                {this.props.text != null?this.props.text : ""}
            </div>
        )
    }
}

module.exports = TextView