import React from 'react'
import { Link } from "react-router-dom";
import AboutBanner1 from '../../assets/images/banner/about-banner-1.webp'
import AboutBanner2 from '../../assets/images/banner/about-banner-2.webp'
import AboutBanner3 from '../../assets/images/banner/about-banner-3.jpg'
import AboutSVG1 from '../../assets/images/svg/shipping.svg'
import AboutSVG2 from '../../assets/images/svg/returns.svg'
import AboutSVG3 from '../../assets/images/svg/support.svg'
import AboutSVG4 from '../../assets/images/svg/payment.svg'
import AboutVideo from '../../assets/images/banner/about-video.mp4'
import CustomNextArrow from '../../assets/images/svg/custom-next-arrow.svg';
import './style.css'

const About = () => {
    return (
        <div className='mt-9'>
            <section className="about-us container">
                <div className="mw-930">
                    <h2 className="page-title my-5">ABOUT CLOSTORE</h2>
                </div>
                <div className="about-us-content text-center pb-5 mb-5">
                    <p className="mb-5">
                        <img src={AboutBanner3} alt="" className='w-100' />
                    </p>
                    <div className="about-description d-grid justify-content-center">
                        <div className="about-description-header">
                            <div className="about-title-group my-2">
                                <span className="about-heading-subtitle">We are</span>
                            </div>
                            <div className="about-title-group my-2">
                                <span className="about-heading-title">Passionate About</span>
                            </div>
                        </div>
                        <div className="about-description-content mt-3 text-secondary fw-light">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                        </div>
                    </div>
                    <Link to="/about" className="btn-custom wdt-button-2 mt-5 position-relative about-btn-1">VIEW MORE</Link>
                </div>
            </section>
            <section className='branded-apparels mb-10 mt-8'>
                <div className="row">
                    <div className="col-sm-12 col-lg-6">
                        <img src={AboutBanner1} alt="" className='w-100' />
                    </div>
                    <div className="col-sm-12 col-lg-6 d-flex flex-column justify-content-center p-6">
                        <div className="branded-info mt-lg-0 mt-3">
                            <h3 className="fs-4">International</h3>
                            <span className="about-heading-title  mt-3" style={{ width: "410px" }}>Branded Apparels</span>
                            <p className="mt-4 text-secondary fw-light">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                            </p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                            <Link to="/products" className='branded-shop text-uppercase'>
                                <span>Shop new arrival</span>
                            </Link>
                            <div className="next-arrow">
                                <img src={CustomNextArrow} className="z-1" width="35px" alt="Next" />
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <section className="designers-team text-center mb-5">
                <div className="container">
                    <h3 className="fs-4">Old Edition</h3>
                    <span className="about-heading-title  mt-3" style={{ width: "410px" }}>Designers Team</span>
                    <video src={AboutVideo} autoPlay muted loop playsInline className="designers-video img-fluid mt-4 rounded"></video>
                </div>
            </section>
            <section className='branded-apparels mb-10 mt-8'>
                <div className="row">
                    <div className="col-lg-6 d-flex flex-column justify-content-center p-6">
                        <div className="customer-service-info mt-lg-0 mt-3">
                            <h3 className="fs-4">Excellent & Unbeatable</h3>
                            <span className="about-heading-title mt-3" style={{ width: "410px" }}>Customer Service</span>
                            <p className="mt-4 text-secondary fw-light">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                            </p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-3 mb-5">
                            <Link to="/products" className='branded-shop text-uppercase'>
                                <span>Shop new arrival</span>
                            </Link>
                            <div className="next-arrow">
                                <img src={CustomNextArrow} className="z-1" width="35px" alt="Next" />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-6">
                        <img src={AboutBanner2} alt="" className='w-100' />
                    </div>
                </div>
            </section >
            <section className='container mb-10 mt-8'>
                <div className="row justify-content-between text-center">
                    <div className="col-md-3 col-6 mb-4">
                        <div className="SVG-container d-flex flex-column justify-content-center align-items-center">
                            <img src={AboutSVG1} alt="" width="100px" />
                            <span className="SVG-heading-title-1 mt-3">Free Shipping</span>
                        </div>
                    </div>
                    <div className="col-md-3 col-6 mb-4">
                        <div className="SVG-container d-flex flex-column justify-content-center align-items-center">
                            <img src={AboutSVG2} alt="" width="100px" />
                            <span className="SVG-heading-title-2 mt-3">Returns</span>
                        </div>
                    </div>
                    <div className="col-md-3 col-6 mb-4">
                        <div className="SVG-container d-flex flex-column justify-content-center align-items-center">
                            <img src={AboutSVG3} alt="" width="100px" />
                            <span className="SVG-heading-title-3 mt-3">Secure Payments</span>
                        </div>
                    </div>
                    <div className="col-md-3 col-6 mb-4">
                        <div className="SVG-container d-flex flex-column justify-content-center align-items-center">
                            <img src={AboutSVG4} alt="" width="100px" />
                            <span className="SVG-heading-title-4 mt-3">Customer Support</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About