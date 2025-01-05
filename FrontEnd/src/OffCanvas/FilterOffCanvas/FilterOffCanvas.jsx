import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoRemoveOutline, IoClose } from 'react-icons/io5';
import { IoMdClose, IoMdCheckmark } from "react-icons/io";
import { FiPlus } from 'react-icons/fi';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './style.css';
import axios from 'axios';

const FilterOffCanvas = ({ onFilterSubmit }) => {
    const [priceRange, setPriceRange] = useState([20, 3996]);
    const [isOpen, setIsOpen] = useState({
        accordionFilter1: true,
        accordionFilter2: true,
        accordionFilterSize: true,
        accordionFilterBrand: true,
        accordionFilterPrice: true,
    });
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const sliderRef = useRef(null);
    const [product, setProduct] = useState(null);
    const [hasFilters, setHasFilters] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://clostore.onrender.com/api/products');
                const uniqueCategories = [...new Set(response.data.map(product => product.category))];
                const brandCounts = response.data.reduce((acc, product) => {
                    acc[product.brand] = (acc[product.brand] || 0) + 1;
                    return acc;
                }, {});
                const brandArray = Object.keys(brandCounts).map(brand => ({ name: brand, count: brandCounts[brand] }));
                setCategories(uniqueCategories);
                setBrands(brandArray);
            } catch (error) {
                console.error('Error fetching product details:', error);
                try {
                    const localResponse = await axios.get('../../../../BackEnd/data/products.json');
                    const product = localResponse.data.find(p => p._id.$oid === id);
                    setProduct(product);
                } catch (jsonError) {
                    console.error('Error loading local product details:', jsonError);
                }
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const filtersSelected = selectedBrands.length > 0 || selectedColors.length > 0 || selectedSizes.length > 0 || selectedCategory !== '' || priceRange[0] !== 20 || priceRange[1] !== 3996;
        setHasFilters(filtersSelected);
    }, [selectedBrands, selectedColors, selectedSizes, selectedCategory, priceRange]);

    const toggleAccordion = (id) => {
        setIsOpen((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const handleSliderChange = (value) => {
        setPriceRange(value);
    };

    const handleBrandSelect = (brand) => {
        const index = selectedBrands.indexOf(brand);
        if (index > -1) {
            setSelectedBrands(selectedBrands.filter((b) => b !== brand));
        } else {
            setSelectedBrands([...selectedBrands, brand]);
        }
    };

    const handleColorSelect = (color) => {
        const index = selectedColors.indexOf(color);
        if (index > -1) {
            setSelectedColors(selectedColors.filter((c) => c !== color));
        } else {
            setSelectedColors([...selectedColors, color]);
        }
    };

    const handleSizeSelect = (size) => {
        const index = selectedSizes.indexOf(size);
        if (index > -1) {
            setSelectedSizes(selectedSizes.filter((s) => s !== size));
        } else {
            setSelectedSizes([...selectedSizes, size]);
        }
    };

    const clearAllFilters = () => {
        // Clear all filter states
        setPriceRange([20, 3996]);
        setSelectedBrands([]);
        setSelectedColors([]);
        setSelectedSizes([]);
        setSelectedCategory('');
        if (sliderRef.current) {
            sliderRef.current.reset();
        }

        // Notify parent component that filters are cleared
        onFilterSubmit({ priceRange: [20, 3996], selectedBrands: [], selectedColors: [], selectedSizes: [], selectedCategory: '' });

        // Close the offcanvas
        const offcanvasElement = document.getElementById('shopFilterAside');
        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
        offcanvas.hide();
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleSetFilter = () => {
        // Notify parent component with the selected filters
        onFilterSubmit({ priceRange, selectedBrands, selectedColors, selectedSizes, selectedCategory });

        // Close the offcanvas
        const offcanvasElement = document.getElementById('shopFilterAside');
        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
        offcanvas.hide();
    };

    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="shopFilterAside" aria-labelledby="shopFilterAsideLabel">
            <div className="offcanvas-header d-flex align-items-center">
                <h3 className="text-uppercase fs-6 mb-0">Filter By</h3>
                <button type="button" className="btn-close-lg js-close-aside btn-close-aside ms-auto bg-transparent border border-0" data-bs-dismiss="offcanvas" aria-label="Close">
                    <IoClose />
                </button>
            </div>
            <div className="offcanvas-body custom-scrollbar">
                {/* Product Categories Filter */}
                <div className="accordion-item mb-4">
                    <h5 className="accordion-header" id="accordion-heading-11">
                        <button
                            className="accordion-button p-0 border-0 fs-5 text-uppercase"
                            type="button"
                            onClick={() => toggleAccordion('accordionFilter1')}
                            aria-expanded={isOpen.accordionFilter1}
                            aria-controls="accordion-filter-1"
                        >
                            Product Categories
                            <span className="accordion-button__icon">
                                {isOpen.accordionFilter1 ? <IoRemoveOutline /> : <FiPlus />}
                            </span>
                        </button>
                    </h5>
                    <div id="accordion-filter-1" className={`accordion-collapse border-0 collapse ${isOpen.accordionFilter1 ? 'show' : ''}`} aria-labelledby="accordion-heading-11" data-bs-parent="#categories-list">
                        <div className="accordion-body px-0 pb-0">
                            <ul className="list list-inline row row-cols-2 mb-0">
                                {categories.map((category, index) => (
                                    <li key={index} className="list-item">
                                        <Link to="#" className="menu-link mt-2" onClick={() => handleCategorySelect(category)}>
                                            {category}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Color Filter */}
                <div className="accordion" id="color-filters">
                    <div className="accordion-item mb-4">
                        <h5 className="accordion-header" id="accordion-heading-1">
                            <button
                                className="accordion-button p-0 border-0 fs-5 text-uppercase"
                                type="button"
                                onClick={() => toggleAccordion('accordionFilter2')}
                                aria-expanded={isOpen.accordionFilter2}
                                aria-controls="accordion-filter-2"
                            >
                                Color
                                <span className="accordion-button__icon">
                                    {isOpen.accordionFilter2 ? <IoRemoveOutline /> : <FiPlus />}
                                </span>
                            </button>
                        </h5>
                        <div id="accordion-filter-2" className={`accordion-collapse border-0 collapse ${isOpen.accordionFilter2 ? 'show' : ''}`} aria-labelledby="accordion-heading-1" data-bs-parent="#color-filters">
                            <div className="accordion-body px-0 pb-0">
                                <div className="d-flex flex-wrap">
                                    {['Red', 'Gray', 'Lightgray', 'Green', 'Blue', 'Black', 'White', 'Lightpurple', 'LightYellow', 'Sky', 'Lightsky', 'Darkgreen', 'Orange', 'Purple', 'Yellow', 'Brown', 'Lightbrown', 'Pink'].map((color) => (
                                        <div key={color} className="position-relative">
                                            <Link className={`swatch-color js-filter m-2 rounded-5 border border-1 border-secondary d-inline-block ${selectedColors.includes(color) ? 'selected' : ''}`} style={{ backgroundColor: color.toLowerCase(), height: "30px", width: "30px" }} onClick={() => handleColorSelect(color)}></Link>
                                            {selectedColors.includes(color) && (
                                                <IoMdCheckmark className="fs-3 position-absolute top-45 start-50 translate-middle text-white" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Size Filter */}
                <div className="accordion" id="size-filters">
                    <div className="accordion-item mb-4">
                        <h5 className="accordion-header" id="accordion-heading-size">
                            <button
                                className="accordion-button p-0 border-0 fs-5 text-uppercase"
                                type="button"
                                onClick={() => toggleAccordion('accordionFilterSize')}
                                aria-expanded={isOpen.accordionFilterSize}
                                aria-controls="accordion-filter-size"
                            >
                                Sizes
                                <span className="accordion-button__icon">
                                    {isOpen.accordionFilterSize ? <IoRemoveOutline /> : <FiPlus />}
                                </span>
                            </button>
                        </h5>
                        <div id="accordion-filter-size" className={`accordion-collapse border-0 collapse ${isOpen.accordionFilterSize ? 'show' : ''}`} aria-labelledby="accordion-heading-size" data-bs-parent="#size-filters">
                            <div className="accordion-body px-0 pb-0">
                                <div className="d-flex flex-wrap">
                                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                        <div key={size} className="position-relative">
                                            <Link className={`border border-1 text-black px-3 py-2 btn btn-sm btn-outline-light mb-3 me-3 js-filter ${selectedSizes.includes(size) ? 'selected' : ''}`} onClick={() => handleSizeSelect(size)}>{size}</Link>
                                            {selectedSizes.includes(size) && (
                                                <IoMdCheckmark className="fs-3 position-absolute top-33 start-38 translate-middle text-black" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Brand Filter */}
                <div className="accordion" id="brand-filters">
                    <div className="accordion-item mb-4">
                        <h5 className="accordion-header" id="accordion-heading-brand">
                            <button className="accordion-button p-0 border-0 fs-5 text-uppercase"
                                type="button" onClick={() => toggleAccordion('accordionFilterBrand')}
                                aria-expanded={isOpen.accordionFilterBrand} aria-controls="accordion-filter-brand">
                                Brands
                                <span className="accordion-button__icon">
                                    {isOpen.accordionFilterBrand ? <IoRemoveOutline /> : <FiPlus />}
                                </span>
                            </button>
                        </h5>
                        <div id="accordion-filter-brand" className={`accordion-collapse border-0 collapse ${isOpen.accordionFilterBrand ? 'show' : ''}`} aria-labelledby="accordion-heading-brand" data-bs-parent="#brand-filters">
                            <div className="accordion-body px-0 pb-0">
                                <ul className="list-unstyled">
                                    {brands.map((brand) => (
                                        <li key={brand.name} className="menu-link d-flex justify-content-between" onClick={() => handleBrandSelect(brand.name)}>
                                            <span className="me-auto">
                                                {selectedBrands.includes(brand.name) ? <span style={{ color: 'balck' }}>● </span> : ''}
                                                {brand.name}
                                            </span>
                                            <span className="text-secondary">{brand.count}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Price Filter */}
                <div className="accordion" id="price-filters">
                    <div className="accordion-item mb-4">
                        <h5 className="accordion-header" id="accordion-heading-price">
                            <button className="accordion-button p-0 border-0 fs-5 text-uppercase"
                                type="button" onClick={() => toggleAccordion('accordionFilterPrice')}
                                aria-expanded={isOpen.accordionFilterPrice} aria-controls="accordion-filter-price">
                                Price
                                <span className="accordion-button__icon">
                                    {isOpen.accordionFilterPrice ? <IoRemoveOutline /> : <FiPlus />}
                                </span>
                            </button>
                        </h5>
                        <div id="accordion-filter-price" className={`accordion-collapse border-0 collapse ${isOpen.accordionFilterPrice ? 'show' : ''}`} aria-labelledby="accordion-heading-price" data-bs-parent="#price-filters">
                            <div className="accordion-body px-0 pb-0">
                                <Slider range min={20} max={3996} defaultValue={priceRange} onChange={handleSliderChange} ref={sliderRef} />
                                <div className="range__price d-flex justify-content-between mt-2">
                                    <span>${priceRange[0]}</span>
                                    <span>${priceRange[1]}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="offcanvas-footer mt-4">
                    {hasFilters && (
                        <button className="px-4 wdt-button-3 py-2 fs-6 rounded-4 ms-3 py-2 px-3" onClick={clearAllFilters}>
                            Clear Filter
                        </button>
                    )}
                    <button className="px-4 wdt-button-3 py-2 fs-6 rounded-4 ms-3 py-2 px-3" onClick={handleSetFilter}>
                        Set Filter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterOffCanvas;