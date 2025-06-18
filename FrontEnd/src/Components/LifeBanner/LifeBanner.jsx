import React, { useState } from "react";
import { FaStar } from 'react-icons/fa';
import { Link    } from "react-router-dom";
import LifeBanner1 from "../../assets/images/banner/life-banner-1.jpg";
import LifeProduct1 from "../../assets/images/products/1727623120455.jpg";
import LifeProduct2 from "../../assets/images/products/1727623621828.jpg";
import LifeProduct3 from "../../assets/images/products/1727623045121.jpg";
import './style.css'

const LifeBanner = () => {
    const [activeCard, setActiveCard] = useState(null);

    const cards = [
        {
            id: 1,
            image: LifeProduct1,
            title: "Raw denim short with sequins",
            price: "₹ 69.00",
            rating: 4,
        },
        {
            id: 2,
            image: LifeProduct2,
            title: "Vintage Jacket",
            price: "₹ 120.00",
            rating: 5,
        },
        {
            id: 3,
            image: LifeProduct3,
            title: "Classic Leather Boots",
            price: "₹ 89.00",
            rating: 3,
        }
    ];

    const handleCardClick = (index) => {
        setActiveCard(index === activeCard ? null : index);
    };

    return (
        <section className="life-banner my-10 position-relative">
            <div>
                <img src={LifeBanner1} alt="Banner" className="life-banner-image" />
            </div>
            <div className="position-absolute top-25 start-21 d-grid lh-xxl banner-text">
                <h2 className="fs-60 w-75">Life From The Comic Book</h2>
                <span>Retro Games T-Shirts !</span>
                <Link to="/products" className="btn-custom wdt-button-2 fw-bold w-25 rounded-5 p-0 text-center z-n1">SHOP NOW</Link>
            </div>

            <div className="dots-container">
                {cards.map((card, index) => (
                    <div
                        key={card.id}
                        className={`d-xsm-none d-xl-block dot dot-${index + 1} ${activeCard === index ? "active" : ""}`}
                        onClick={() => handleCardClick(index)}
                    >
                        <span className="dot-number text-white fw-bold ms-2-5 mt-2-5">{index + 1}</span>
                        <div className="outer-ring"></div>
                    </div>
                ))}
            </div>

            <div className="cards-container">
                {cards.map((card, index) => (
                    <div
                        key={card.id}
                        className={`card-popup card-${index + 1} ${activeCard === index ? "active" : ""}`}
                        style={{ display: activeCard === index ? 'block' : 'none' }}
                    >
                        <div className="row life-card">
                            <div className="col-5">
                                <img
                                    src={card.image}
                                    className="card-img-top"
                                    alt={card.title}
                                    style={{ objectFit: "cover", height: "260px", width: "100%" }}
                                />
                            </div>
                            <div className="col-7">
                                <div className="life-card-body lh-lg mt-4">
                                    <h5 className="card-title">{card.title}</h5>
                                    <p className="card-text">{card.price}</p>
                                    <div className="mb-3">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <FaStar
                                                key={i}
                                                color={i < card.rating ? '#ffc78b' : '#e4e5e9'}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default LifeBanner;