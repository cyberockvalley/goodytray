import React, {Component} from "react"
import {Link, withRouter} from "react-router-dom"
import { getCopy } from "../utils/Funcs"
import { SITE_NAME, FACEBOOK_PAGE_LINK, INSTAGRAM_PAGE_LINK, TWITTER_PAGE_LINK } from "../utils/Constants"
//import { unlink } from "fs"

class Footer extends Component {
    render() {
        return (
        <div>
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
            <div className="row footer-color-grid-wrapper">
                <div className="col-xs-1 footer-color-grid"></div>
                <div className="col-xs-1 footer-color-grid"></div>
                <div className="col-xs-1 footer-color-grid"></div>
                <div className="col-xs-1 footer-color-grid"></div>
                <div className="col-xs-1 footer-color-grid"></div>
                <div className="col-xs-1 footer-color-grid"></div>
                <div className="col-xs-1 footer-color-grid"></div>
                <div className="col-xs-1 footer-color-grid"></div>
                <div className="col-xs-1 footer-color-grid"></div>
                <div className="col-xs-1 footer-color-grid"></div>
                <div className="col-xs-1 footer-color-grid"></div>
                <div className="col-xs-1 footer-color-grid"></div>
            </div>
            <div className="footer-links-wrapper container">
                <div className="footer-links-external">
                    <a target="_blank" href={FACEBOOK_PAGE_LINK}>
                        <i className="fa fa-2x fa-facebook"></i>
                    </a>
                    <a target="_blank" href={INSTAGRAM_PAGE_LINK}>
                        <i className="fa fa-2x fa-instagram"></i>
                    </a>
                    <a target="_blank" href={TWITTER_PAGE_LINK}>
                        <i className="fa fa-2x fa-twitter"></i>
                    </a>
                </div>
                <div className="footer-links-internal container">
                    <div className="footer-links-internal-box">
                        <Link target="_blank" to="/about">
                            About Us
                        </Link>
                        <Link target="_blank" to="/contact">
                            Contact Us
                        </Link>
                        <Link to="/privacy">
                            Privacy Policy
                        </Link>
                        <Link target="_blank" to="/tos">
                            Terms Of Services
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default withRouter(Footer)