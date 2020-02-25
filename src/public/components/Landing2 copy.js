import React, { Component } from "react"
import { SITE_TITLE, API_ROOT, PAID_AD_NAME, SITE_NAME } from "../../../Constants"
import { productLink, catLink, catIconName, countryLink } from "../utils/LinkBuilder"
import { commaNum, id, overflows, truncText} from "../utils/Funcs"
import { Link } from "react-router-dom"
import Navbar from './Navbar'
import Footer from "./Footer"

const browser = require("../utils/Browser")

class Landing extends Component {
    constructor(props) {
        super(props)
        this.state = {
          email: '',
          email: '',
          errors: {},
          carousel_id: 0,
          carousel_images: ["/public/res/images/static/how-to-buy.jpg", "/public/res/images/static/premium-services.jpg"],
          products: [],
          loading_products: false,
          cats: [],
          sub_cats: [],
          countries: [],
          country: null,
          countries_visible: false,
          search: "",
          cat_id: -1
        }

        this.handleClick = this.handleClick.bind(this)
        this.toggleCountries = this.toggleCountries.bind(this)
        //this.sideBarScroll = this.sideBarScroll.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.setSubCat = this.setSubCat.bind(this)
    }

    handleChange = e => {
        this.state[e.target.name] = e.target.value
        this.setState({[e.target.name]: e.target.value})
    }
    handleSearch = e => {
        e.preventDefault()
        if(this.state.search.length > 0) {
            this.props.history.push("/search?q="+this.state.search)
            //window.location.href = "/search?q="+this.state.search
        }
    }

    toggleCountries = e => {
        this.setState({countries_visible: !this.state.countries_visible})
    }

    getCatPane = (source) => {
        return source.startsWith("s")?id("side_bar_scroll_sub"):id("side_bar_scroll")
    }

    handleClick = e => {
        const source = e.target.getAttribute("data-source")
        console.log("CLICK", source)
        if(source == "change-carousel") {
            this.changeCarousel(parseInt(e.target.getAttribute("data-id")))

        } else if(source.endsWith("down")) {
            console.log("down scroll")
            const catPane = this.getCatPane(source)
            var by = catPane.offsetHeight
            //alert("top: "+catPane.scrollTop+", H: "+catPane.scrollHeight+", by1: "+by);
            
            this.scrollV(catPane, by)
            this.sideBarScroll(source)

        } else if(source.endsWith("up")) {
            console.log("up scroll")
            const catPane = this.getCatPane(source)
            const catScrollPaneHeight = catPane.scrollHeight
            var by = catPane.offsetHeight
            this.scrollV(catPane, -1 * by)
            this.sideBarScroll(source)
        }
    }

    scrollV = (el, val) => {
        el.scrollTop += val;
    }

    scrollH = (el, val) => {
        el.scrollLeft += val;
    }

    sideBarScroll = (source) => {
        console.log("side scroll", source)
        var prefix = source.startsWith("s")?"s":""
        const catPane = this.getCatPane(source)
        const catScrollPaneHeight = catPane.scrollHeight
        const scrollTop = catPane.scrollTop
        console.log("sideBarScroll", "ScrollTop", scrollTop)
        
        var idPrefix = "#"+prefix+"cat-";
        if(!overflows(catPane)) {
            $(idPrefix+"up").hide()
            $(idPrefix+"down").hide()

        } else {
            //alert("scrollTop = "+(scrollTop  + catPane.offsetHeight)+", catScrollPaneHeight = "+catScrollPaneHeight)
            var scrollbarH = catPane.offsetHeight - catPane.clientHeight
            if(scrollTop == 0) {
                $(idPrefix+"up").hide()
                $(idPrefix+"down").show()

            } else if(scrollTop  + catPane.offsetHeight == catScrollPaneHeight) {
                $(idPrefix+"up").show()
                $(idPrefix+"down").hide()

            } else {
                $(idPrefix+"up").show()
                $(idPrefix+"down").show()
            }
        }
        
        
    }

    setSubCat = (e) => {
        var id = e.target.getAttribute("data-id")
        $.each($(".b-categories-item"), (i, el) => {
            el.classList.remove(["b-categories-item-focused"])
        });
        $(".cat_and_sub_"+id)[0].classList.add(["b-categories-item-focused"])
        var index = e.target.getAttribute("data-index")
        if(index) {
            index = parseInt(index)
            console.log("setSubCat", "index", index)
            this.state.cat_id = this.state.cats[index].id
            this.setState({cat_id: this.state.cats[index].id});
            this.state.sub_cats = this.state.cats[index].sub_cats
            this.setState({sub_cats: this.state.cats[index].sub_cats})
        }
    }

    clearSubCats = () => {
        this.state.sub_cats = []
        this.setState({sub_cats: []})
        $.each($(".b-categories-item"), (i, el) => {
            el.classList.remove(["b-categories-item-focused"])
        });
    }

    changeCarousel(id) {
        if(id >= this.state.carousel_images.length) {
            id = 0

        } else if(id < 0) {
            id = this.state.carousel_images.length - 1

        } else {
        }
        this.setState({carousel_id: id})
    }
    
    componentDidMount() {
        console.log("AYAM READY", 2)
        $(document).ready(function(){
            console.log("AYAM READY", 3)
            $(".b-fixed-element-static").stick_in_parent();
        });
        //window.location.replace("#")
        document.title = SITE_TITLE
        this.changeCarousel(this.state.carousel_id)
        try{
            this.sideBarScroll("")

        }catch(e){}
        
        
        this.setState({loading_products: true})

        //get cats & sub cats
        browser.axios.get(API_ROOT + "products/cats_and_sub_cats")
        .then(resp => {
            if(resp && resp.data) {
                this.setState({cats: resp.data})
            }
        })
        //get products
        browser.axios.get(API_ROOT + "products?update_order=1&views_order=1")
        .then(resp => {
            if(resp && resp.data && resp.data.list) {
                this.setState({products: resp.data.list})
            }
            this.setState({loading_products: false})
        })
        //get countries
        browser.axios.get(API_ROOT + "countries")
        .then(resp => {
            if(resp && resp.data && resp.data.countries) {
                this.setState({countries: resp.data.countries})
            }
        })
    }

    hideMobileCatsTab = () => {
        $("#mobile-cats-tab").hide();
        $("#mobile-cats-header").show();
    }
    showMobileCatsTab = () => {
        $("#mobile-cats-tab").show();
        $("#mobile-cats-header").hide();
    }

    render() {
        return (
            <div>
                <Navbar user={this.props.user} />
                <div className="h-bg-grey  h-pb-15">
                    <div className="b-main-page">
                        <div className="sm-hide-down b-main-page-header"></div>
                        <div id="mobile-cats-tab" class="mobile-cats-tab md-hide-up"></div>
                        <div className="container-fluid">
                            <div className="bar">
                                <div className="side">
                                    <div className="side-fixed">
                                        <div className="side-side">KKKK</div>
                                        <div className="side-main"></div>
                                    </div>
                                </div>
                                <div className="main">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div onClick={this.toggleCountries} className={this.state.countries_visible?"fw-fixed-background":"fw-fixed-background hide"}></div>
                </div>
                <Footer />
            </div>
        )
    }
}

module.exports = Landing