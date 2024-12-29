const Product = require('../Models/Product');
const path = require('path');

// @desc    Get all products or products by category
// @route   GET /api/products
// @access  Public

exports.getProducts = async (req, res) => {
    try {
        const { category } = req.query;
        let products;

        if (category) {
            products = await Product.find({ category });
        } else {
            products = await Product.find();
        }

        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Get a single product by ID
// @route   GET /api/products/:id
// @access  Public

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private

exports.createProduct = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        const { name, rating, price } = req.body;
        const imagePath = path.join('assets', 'images','products', req.file.filename); 

        const newProduct = new Product({
            name,
            rating,
            price,
            image: imagePath
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private

exports.updateProduct = async (req, res) => {
    const { name, rating, price } = req.body;

    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        product.name = name || product.name;
        product.rating = rating || product.rating;
        product.price = price || product.price;

        if (req.file) {
            const imagePath = path.join('assets', 'images', req.file.filename); 
            product.image = imagePath; 
        }

        await product.save();
        res.json(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.json({ msg: 'Product removed successfully' });
    } catch (err) {
        console.error('Error deleting product:', err.message); 
        res.status(500).json({ msg: 'Server error' });
    }
};