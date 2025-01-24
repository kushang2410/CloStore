import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useMediaQuery from "../../useMediaQuery";
import SwiperCarousel2 from "../../Slider/slider-2/SwiperCrousel2";
import TrendyProducts from "../../Components/TrendyProducts/TrendyProducts";
import LifeBanner from "../../Components/LifeBanner/LifeBanner";
import EmblaCarousel from "../../Slider/slider-1/EmblaCarousel";
import EmblaCarouselMobile from "../../Slider/slider-3/EmblaCarouselMobile";
import AboutBanner1 from "../../assets/images/banner/banner-4.jpg";
import AboutBanner2 from "../../assets/images/banner/banner-5.jpg";
import AboutBanner3 from "../../assets/images/banner/banner-6.jpg";
import KnowBanner1 from "../../assets/images/banner/know-banner-1.webp";
import KnowBanner2 from "../../assets/images/banner/know-banner-2.webp";
import DealBanner1 from "../../assets/images/banner/deal-banner-1.jpg";
import StylistBanner1 from "../../assets/images/banner/stylist-banner-1.webp";
import StylistBanner2 from "../../assets/images/banner/stylist-banner-2.webp";
import StylistBanner3 from "../../assets/images/banner/stylist-banner-3.webp";
import SocialBanner1 from "../../assets/images/banner/social-banner-1.webp";
import SocialBanner2 from "../../assets/images/banner/social-banner-2.webp";
import SocialBanner3 from "../../assets/images/banner/social-banner-3.webp";
import SocialBanner4 from "../../assets/images/banner/social-banner-4.webp";
import SocialBanner5 from "../../assets/images/banner/social-banner-5.webp";
import './style.css'

const Home = () => {

  const OPTIONS = { loop: true, duration: 30 };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  const isMobile = useMediaQuery("(max-width: 992px)");

  const calculateTimeLeft = () => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 55);
    targetDate.setHours(23, 59, 59, 999);
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-6">
      {isMobile ? (
        <EmblaCarouselMobile slides={SLIDES} options={OPTIONS} />
      ) : (
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      )}
      <section className="about-banner my-10">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-sm-12 h-56 position-relative">
              <div
                className="about-background-img"
                style={{ backgroundImage: `url(${AboutBanner1})` }}
              ></div>
              <div className="position-absolute bottom-0 ps-4 pb-4">
                <p className="text-uppercase fs-6 fw-bold mb-2">Hot List</p>
                <h4 className="text-uppercase">
                  <strong>Women</strong> Collection
                </h4>
                <Link className="about-btn-link fs-6 default-underline text-uppercase fw-bold text-black"
                  to="/products"> Shop Now </Link>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 position-relative">
              <div className="row">
                <div className="col-12">
                  <div
                    className="about-img-2"
                    style={{ backgroundImage: `url(${AboutBanner2})` }}
                  >
                    <div className="position-absolute bottom-0 ps-4 pb-4">
                      <p className="text-uppercase fs-6 fw-bold mb-2">
                        Hot List
                      </p>
                      <h4 className="text-uppercase">
                        <strong>Men</strong> Collection
                      </h4>
                      <Link className="about-btn-link fs-6 default-underline text-uppercase fw-bold text-black"
                        to="/products" > Shop Now </Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mt-3">
                  <div
                    className="about-img-3"
                    style={{ backgroundImage: `url(${AboutBanner3})` }}
                  >
                    <div className="position-absolute bottom-0 ps-4 pb-4">
                      <p className="text-uppercase fs-6 fw-bold mb-2">
                        Hot List
                      </p>
                      <h4 className="text-uppercase">
                        <strong>Kids</strong> Collection
                      </h4>
                      <Link className="about-btn-link fs-6 default-underline text-uppercase fw-bold text-black"
                        to="/products" > Shop Now </Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mt-3">
                  <div className="about-img-4">
                    <div className="position-absolute bottom-0 ps-4 pb-4">
                      <h4 className="text-uppercase">
                        <strong>E-Gift</strong> Cards
                      </h4>
                      <p className="fs-6 mb-2">
                        Surprise someone with the gift they really want.
                      </p>
                      <Link className="about-btn-link fs-6 default-underline text-uppercase fw-bold text-black"
                        to="/products" > Shop Now </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="know-information my-10">
        <div className="container-fluid kown-animation">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="know-img position-relative">
                <img src={KnowBanner1} alt="" className="w-100" />
                <div className="know-img-2">
                  <img src={KnowBanner2} alt="" />
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 d-xsm-none d-md-flex align-items-center lh-lg position-relative z-1">
              <div className="know-alignment">
                <div className="my-5">
                  <span className="know-title">Know Us</span>
                  <h2 className="know-contant">
                    <span className="fw-bold fs-1">
                      Cherishing your new styles
                    </span>
                  </h2>
                  <span className="text-secondary fw-light">
                    Sapien condimentum id venenatis a condimentum vitae lobortis
                    elementum nibh tellus molestie nunc ed nisi lacus sed
                    viverra tellus in hac cursus turpis massa tincidunt dui cras
                    fermentum odio eu feugiat pretium nibh ipsum.
                  </span>
                </div>
                <div className="my-5">
                  <h4 className="">
                    <span className="">International fashion designer</span>
                  </h4>
                  <span className="text-secondary fw-light">
                    Risus commodo viverra maecenas accumsan lacus vel diam donec
                    adipiscing tristique quisque id diam vel quam elementum
                    pulvinar sit amet cursus sit erat pellentesque pellentesque
                    sit amet porttitor eget dolor morbi non.
                  </span>
                </div>
                <div className="my-5">
                  <Link to="/products" className="btn-custom wdt-button-2 fw-bold">
                    SHOP KNOW
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="deal-timer my-10">
        <div className="deal-background-img" style={{ backgroundImage: `url(${DealBanner1})` }}></div>
        <div className="container position-relative top-25">
          <div className="pb-2 mb-3 pb-xl-5 mb-xl-3 mb-xxl-5">
            <p className="text_dash text-uppercase text-red fw-medium">Deal of the week</p>
            <h3 className="deal-title text-uppercase text-dark">
              <strong>Spring</strong> Collection</h3>
            <Link className="about-btn-link fs-6 default-underline text-uppercase fw-bold" to="/products">Shop Now</Link>
          </div>
          <div className="position-relative d-flex align-items-center text-center pt-xxl-4">
            <div className="day countdown-unit">
              <span className="countdown-num d-block">{timeLeft.days || '0'}</span>
              <span className="text-secondary fs-5 fw-bold text-uppercase">Days</span>
            </div>
            <div className="hour countdown-unit">
              <span className="countdown-num d-block">{timeLeft.hours || '0'}</span>
              <span className="text-secondary fs-5 fw-bold text-uppercase">Hours</span>
            </div>
            <div className="min countdown-unit">
              <span className="countdown-num d-block">{timeLeft.minutes || '0'}</span>
              <span className="text-secondary fs-5 fw-bold text-uppercase">Mins</span>
            </div>
            <div className="sec">
              <span className="countdown-num d-block">{timeLeft.seconds || '0'}</span>
              <span className="text-secondary fs-5 fw-bold text-uppercase">Sec</span>
            </div>
          </div>
        </div>
      </section>
      <section className="love-fashion my-10">
        <div className="text-black text-center">
          <h3 className="know-title">Love Fashion</h3>
          <h2 className="stylist-title fw-bold">Feature Products</h2>
        </div>
        <SwiperCarousel2 />
      </section>
      <section className="stylish-products my-10">
        <div className="text-black text-center">
          <h3 className="know-title">New Style</h3>
          <h2 className="stylist-title fw-bold">Stylish Products</h2>
        </div>
        <div className="row mt-5">
          <div className="col-12 col-md-6">
            <div className="position-relative stylist-img-1 overlay-effect">
              <div className="image-wrapper">
                <div className="overlay"></div>
                <img src={StylistBanner1} alt="" className="" width="100%" />
              </div>
              <div className="position-absolute top-0">
                <div className="stylist-img-container position-relative z-1">
                  <div className="stylist-img-subtitle text-black">50%</div>
                  <div className="stylist-img-title">
                    <h5>
                      <Link to="/" target="_blank" rel="nofollow">BEST OFF</Link>
                    </h5>
                  </div>
                  <div className="stylist-img-button">
                    <Link to="/products" target="_blank" rel="nofollow">
                      <div className="stylist-img-button-text">
                        <button className="btn-custom wdt-button-2 mx-4">SHOP NOW</button>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="position-relative overlay-effect">
              <div className="image-wrapper">
                <img src={StylistBanner2} alt="" className="stylist-img-2" width="100%" />
                <div className="overlay"></div>
              </div>
              <div className="position-absolute top-0">
                <div className="px-5 py-4 position-relative z-1">
                  <div className="stylist-img-subtitle-2 text-black">Best Offers</div>
                  <div className="stylist-img-title-2 text-black">10% OFF</div>
                  <div className="stylist-img-description">Top Brand Bags</div>
                </div>
              </div>
            </div>
            <div className="col-12 px-0 p-custom">
              <div className="position-relative overlay-effect">
                <div className="image-wrapper">
                  <img src={StylistBanner3} alt="" className="stylist-img-3" width="100%" />
                  <div className="overlay"></div>
                </div>
                <div className="position-absolute top-0 end-0">
                  <div className="banner-stylist-3 text-center position-relative z-1">
                    <div className="stylist-img-subtitle-3 text-black">Crazy Products</div>
                    <div className="stylist-img-title-3 text-black">20% OFF</div>
                    <div className="stylist-img-description-2">Branded Collection</div>
                    <Link to="/products" className="btn-custom wdt-button-2 mt-3">SHOP NOW</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="trendy-products my-10">
        <div className="text-black text-center">
          <h3 className="know-title">New Trendy</h3>
          <h2 className="stylist-title fw-bold">Trendy Products</h2>
        </div>
        <TrendyProducts />
      </section>
      <section className="life-banner my-10 position-relative">
        <LifeBanner />
      </section>
      <section className="social-share my-10">
        <div className="text-black text-center">
          <h3 className="know-title">Social Share</h3>
          <h2 className="stylist-title fw-bold">Join Instagram</h2>
        </div>
        <div className="d-flex align-items-center social-banners">
          <img src={SocialBanner1} alt="" className="autoplay1" />
          <img src={SocialBanner2} alt="" className="autoplay2" />
          <img src={SocialBanner3} alt="" className="autoplay1" />
          <img src={SocialBanner4} alt="" className="autoplay2" />
          <img src={SocialBanner5} alt="" className="autoplay1" />
        </div>
        <h2 className="d-xsm-none d-xl-block position-absolute insta-title start-50 translate-middle display-1 text-uppercase fw-boldest">INSTA FEED</h2>
      </section>
    </div>
  );
};

export default Home;
