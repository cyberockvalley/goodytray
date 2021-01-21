import { background } from 'jimp'
import React from 'react'

class Carousel extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        //this.props.
    }

    render() {
        return(
            <div style={this.props.show? styles.root : {display: 'none'}}>
                <div style={styles.vhEnd}></div>
                <div style={styles.carousel}>
                    <div style={styles.carouselCenter} className="carousel">
                        <div className="carousel slide productCarousel" style={{width: '100%', height: '100%'}} data-ride="carousels">
                            <div className="carousel-inner" style={{width: '100%', height: '100%'}}>
                            {
                                this.props.photos.split(",").map((photo, i) => (
                                    <div style={{width: '100%', height: '100%'}} className={"override item"+(i == 0?" active":"")}>
                                        <div style={styles.carouselImageBox}>
                                            <img style={styles.carouselImage} src={photo.split(",")[0].trim()} />
                                        </div>
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                        
                        <div style={styles.carouselCursors}>
                            <div data-target=".productCarousel" data-slide="prev" data-index="-2" style={styles.carouselSide}>
                                <a className="b-carousel-arrow b-carousel-arrow-left" data-v-ced4779e="">
                                    <svg className="h-mr-3 arrow-left" data-index="-2" data-v-ced4779e="" style={{width: "15px", height: "32px", maxWidth: "15px", maxHeight: "32px", fill: "rgb(242, 242, 242)", stroke: "inherit"}}>
                                        <use xlinkHref="#arrow-left" data-index="-2">
                                        </use>
                                    </svg>
                                </a>
                            </div>
                            
                            <div data-target=".productCarousel" data-slide="next" data-index="-1" style={styles.carouselSide}>
                                <a className="b-carousel-arrow b-carousel-arrow-right" data-v-ced4779e="">
                                    <svg className="h-ml-3 arrow-right" data-index="-1" data-v-ced4779e="" style={{width: "15px", height: "32px", maxWidth: "15px", maxHeight: "32px", fill: "rgb(242, 242, 242)", stroke: "inherit"}}>
                                        <use xlinkHref="#arrow-right" data-index="-1">
                                        </use>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={styles.vhEnd}>
                    <div className="b-carousel-counter">
                        <svg className="h-mr-5 photo" style={{width: "14px", height: "16px", maxWidth: "14px", maxHeight: "16px", fill: "rgb(242, 242, 242)", stroke: "inherit"}}>
                            <use xlinkHref="#photo">
                            </use>
                        </svg>
                        <div className="qa-carousel-counter">
                            {this.props.thatState.carousel_index + 1 +"/"+this.props.photos.split(",").length}
                        </div>
                    </div>
                    <div onClick={this.props.hideHandler} style={{position: "absolute", right: "20px", bottom: "20px"}}>
                        <svg className="h-block full-screen-exit" style={{cursor: "pointer", width: "24px", height: "24px", maxWidth: "24px", maxHeight: "24px", fill: "rgb(242, 242, 242)", stroke: "inherit"}}>
                            <use xlinkHref="#full-screen-exit">
                            </use>
                        </svg>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    root: {
        position: 'fixed',
        width: '100%',
        height: '100vh',
        top: 0, 
        bottom: 0, 
        left: 0, 
        right: 0, 
        display: 'flex', 
        flexDirection: 'column',
        background: 'rgba(0, 0, 0, 0.92)',
        zIndex: 10
    },
    carousel: {
        position: 'relative',
        width: '100%',
        height: '80vh',
        display: 'flex',
        justifyContent: 'space-between'
    },
    carouselCenter: {
        width: '100%',
        height: '100%'
    },
    carouselImage: {
        width: 'auto',
        height: '100%'
    },
    carouselImageBox: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0, 
        bottom: 0, 
        left: 0, 
        right: 0,
        zIndex: 0,
        maxWidth: '100%',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    carouselCursors: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0, 
        bottom: 0, 
        left: 0, 
        right: 0,
        display: 'flex',
        zIndex: 10,
        justifyContent: 'space-between'
    },
    carouselSide: {
        width: '35%',
        height: '100%',
        backgroud: '#f00'
    },
    vhEnd: {
        width: '100%',
        height: '10vh',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px'
    },
}

export default Carousel