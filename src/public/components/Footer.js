import React, {Component} from "react"
import {Link, withRouter} from "react-router-dom"
import { getCopy } from "../utils/Funcs"
import { SITE_NAME } from "../utils/Constants"
//import { unlink } from "fs"

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="footer-title">Place an ad on {SITE_NAME}</div>
                <div className="footer-grids">
                    <div className="footer-grid">
                        <img className="img-responsive" src="/public/res/images/static/easy.png" style={{margin: "auto"}}/>
                    </div>
                    <div className="footer-grid">
                        <img className="img-responsive" src="/public/res/images/static/fast.png" style={{margin: "auto"}}/>
                    </div>
                    <div className="footer-grid">
                        <img className="img-responsive" src="/public/res/images/static/secure.png" style={{margin: "auto"}}/>
                    </div>
                </div>
            </div>
          
        )
    }
}

export default withRouter(Footer)