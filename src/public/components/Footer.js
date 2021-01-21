import React, {Component} from "react"
import {Link, withRouter} from "react-router-dom"
import { SITE_NAME, FACEBOOK_PAGE_LINK, INSTAGRAM_PAGE_LINK, TWITTER_PAGE_LINK, getText } from "../../../Constants"
//import { unlink } from "fs"

class Footer extends Component {
    render() {
        return (
        <div>
            <div className="footer">
                <div className="footer-title">{getText("PLACE_AN_ADVERT_ON")} {SITE_NAME}</div>
                <div className="footer-grids">
                    <div className="footer-grid">
                        <div className="fa fa-check-square" style={{fontSize: '6em'}}></div>
                        <div style={{marginRight: "10px"}}>{getText("FOOTER_EASY")}</div>
                    </div>
                    <div className="footer-grid">
                        <div className="fa fa-clock-o" style={{fontSize: '6em'}}></div>
                        <div>{getText("FOOTER_FAST")}</div>
                    </div>
                    <div className="footer-grid">
                        <div className="fa fa-lock" style={{fontSize: '6em'}}></div>
                        <div>{getText("FOOTER_SECURE")}</div>
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
                        <Link to="/about">
                            {getText("ABOUT_US")}
                        </Link>
                        <Link to="/contact">
                            {getText("CONTACT_US")}
                        </Link>
                        <Link to="/privacy">
                            {getText("PRIVACY_POLICY")}
                        </Link>
                        <Link to="/tos">
                            {getText("TOS")}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default withRouter(Footer)