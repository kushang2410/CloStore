import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import { NextButton, PrevButton, usePrevNextButtons } from "./EmblaCarouselArrowButtons";
import Banner1 from "../../assets/images/banner/banner-1.webp";
import Banner2 from "../../assets/images/banner/banner-2.webp";
import Banner3 from "../../assets/images/banner/banner-3.webp";
import { Link } from "react-router-dom";

const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Fade()]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="embla position-relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <>
            <div className="embla__slide">
              <div className="container-fluid position-relative text-center">
                <div className="mt-8">
                  <h2 className="position-absolute top-25 fashion-title start-50 translate-middle display-1 text-uppercase fw-boldest z-1">
                    FASHION
                  </h2>
                  <h2 className="position-absolute top-65 friendly-title start-50 translate-middle display-1 text-uppercase fw-boldest z-1">
                    FRIENDLY
                  </h2>
                </div>

                <div className="row justify-content-center">
                  <div className="col-md-4 position-relative z-1 top-90">
                    <img
                      src={Banner1}
                      alt="Fashion"
                      className="img-fluid"
                      style={{ zIndex: 1, width: "400px" }}
                    />
                  </div>
                </div>

                <div className="mt-10">
                  <h4 className="fs-1"><b>40%</b> OFFERS FOR KIDS COLLECTION</h4>
                </div>

                <div className="mt-5 d-inline-grid gap-4 d-lg-block justify-content-center">
                  <Link to="/products" className="btn-custom wdt-button mx-2 text-green"> SHOP NOW </Link>
                  <Link to="/products" className="btn-custom wdt-button-2 mx-2 text-white">NEW ARRIVALS</Link>
                </div>
              </div>
            </div>
            <div className="embla__slide">
              <div className="container-fluid position-relative text-center">
                <div className="mt-8">
                  <h2 className="position-absolute top-25 fashion-title-1 start-50 translate-middle display-1 text-uppercase fw-boldest z-1">
                    WESTREN
                  </h2>
                  <h2 className="position-absolute top-65 friendly-title start-50 translate-middle display-1 text-uppercase fw-boldest z-1">
                    COLLECTION
                  </h2>
                </div>

                <div className="row justify-content-center">
                  <div className="col-md-4 position-relative z-1 top-90">
                    <img
                      src={Banner2}
                      alt="Fashion"
                      className="img-fluid"
                      style={{ zIndex: 1, width: "400px" }}
                    />
                  </div>
                </div>

                <div className="mt-10">
                  <h4 className="fs-1"><b>30%</b> OFFERS FOR KIDS COLLECTION</h4>
                </div>

                <div className="mt-5 d-inline-grid gap-4 d-lg-block justify-content-center">
                  <Link to="/products" className="btn-custom wdt-button mx-2 text-green"> SHOP NOW </Link>
                  <Link to="/products" className="btn-custom wdt-button-2 mx-2 text-white">NEW ARRIVALS</Link>
                </div>
              </div>
            </div>
            <div className="embla__slide">
              <div className="container-fluid position-relative text-center">
                <div className="mt-8">
                  <h2 className="position-absolute top-25 fashion-title-2 start-50 translate-middle display-1 text-uppercase fw-boldest z-1">
                    BEST PARTY
                  </h2>
                  <h2 className="position-absolute top-65 friendly-title start-50 translate-middle display-1 text-uppercase fw-boldest z-1">
                    COLLECTION
                  </h2>
                </div>

                <div className="row justify-content-center">
                  <div className="col-md-4 position-relative z-1 top-90">
                    <img
                      src={Banner3}
                      alt="Fashion"
                      className="img-fluid"
                      style={{ zIndex: 1, width: "400px" }}
                    />
                  </div>
                </div>

                <div className="mt-10">
                  <h4 className="fs-1"><b>10%</b> OFFERS FOR KIDS COLLECTION</h4>
                </div>

                <div className="mt-5 d-inline-grid gap-4 d-lg-block justify-content-center">
                  <Link to="/products" className="btn-custom wdt-button mx-2 text-green"> SHOP NOW </Link>
                  <Link to="/products" className="btn-custom wdt-button-2 mx-2 text-white">NEW ARRIVALS</Link>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
