const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Women', 'Men', 'Shoes', 'Accessories'],
    },
    color: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        enum: ['Adidas', 'Nike', 'Balenciaga', 'Puma', 'Kenzo', 'Givenchy'],
        required: true
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;