import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import './emblamobile.css';
import './sandboxmobile.css';

const EmblaCarousel = () => {
  const slides = [
    {
      title1: "FASHION",
      title2: "FRIENDLY",
      discount: "40%",
    },
    {
      title1: "WESTREN",
      title2: "COLLECTION",
      discount: "30%",
    },
    {
      title1: "BEST PARTY",
      title2: "COLLECTION",
      discount: "10%",
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  return (
    <div className="embla position-relative">
      <div className="embla-main" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className={`embla__slide banner-${index + 1}`} key={index}>
              {/* Background Image */}
              <div className={`embla__slide-bg banner-${index + 1}`}></div>
              <div className="embla__slide-overlay"></div>
              <div className="container-fluid position-relative text-center z-3">
                <div className="mt-8">
                  <h2 className="position-absolute fashion-title-mobile start-50 translate-middle display-1 text-uppercase fw-boldest">
                    {slide.title1}
                  </h2>
                  <h2 className="position-absolute friendly-title-mobile start-50 translate-middle display-1 text-uppercase fw-boldest">
                    {slide.title2}
                  </h2>
                </div>
                <div className="row justify-content-center">
                  <div className="col-md-4 position-relative top-90"></div>
                </div>

                <div className="mt-21">
                  <h4 className="fs-1">
                    <b>{slide.discount}</b> OFFERS FOR KIDS COLLECTION
                  </h4>
                </div>

                <div className="mt-5 d-inline-grid gap-4 d-lg-block justify-content-center">
                  <a href="/products" className="btn-custom wdt-button mx-2">
                    SHOP NOW
                  </a>
                  <a href="/products" className="btn-custom wdt-button-2 mx-2">
                    NEW ARRIVALS
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`embla__dot ${index === selectedIndex ? "is-selected" : ""}`}
            type="button"
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default EmblaCarousel;