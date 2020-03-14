export const buildStyle = (componentName, props) => {
    const style = props.style? props.style : {}
    if(props.visibility == "visible") {
        style.display = "block"
    }
    if(props.visibility == "gone") {
        style.display = "none"
    }
    if(props.width) {
        style.width = props.width
    }
    if(props.height) {
        style.height = props.height
    }
    if(props.align_parent_end) {
        style.alignSelf = "end"
    }
    if(props.cursor) {
        style.cursor = props.cursor
    }
    if(props.center_horizontal) {
        style.textAlign = "center"
    }
    
    if(props.text_color || props.color) {
        style.color = props.text_color || props.color
    }
    if(props.background || props.background_color) {
        style.backgroundColor = props.background || props.background_color
    }
    if(props.font_weight) {
        style.fontWeight = props.font_weight
    }
    if(props.font_size || props.text_size) {
        style.fontSize = props.font_size || props.text_size
    }
    //margin
    if(props.margin) {
        style.margin = props.margin
    }
    if(props.margin_left) {
        style.marginLeft = props.margin_left
    }
    if(props.margin_top) {
        style.marginTop = props.margin_top
    }
    if(props.margin_right) {
        style.marginRight = props.margin_right
    }
    if(props.margin_bottom) {
        style.marginBottom = props.margin_bottom
    }
    //padding
    if(props.padding) {
        style.padding = props.padding
    }
    if(props.padding_left) {
        style.paddingLeft = props.padding_left
    }
    if(props.padding_top) {
        style.paddingTop = props.padding_top
    }
    if(props.padding_right) {
        style.paddingRight = props.padding_right
    }
    if(props.padding_bottom) {
        style.paddingBottom = props.padding_bottom
    }

    return style
}