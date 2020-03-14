import React from "React"
import { buildStyle } from "./utils/Functions"
import View from "./View"
import { VIEWS } from "./utils/Constants"

class ImageView extends View {
    constructor(props) {
        super(props)
    }

    render () {
        return(
            <img src={this.props.src} style={buildStyle(VIEWS.image_view.name, this.props)} />
        )
    }
}

module.exports = ImageView