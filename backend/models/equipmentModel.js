const { Schema, model } = require('../connection');

const mySchema = new Schema({
    name: String,
    brand: { type: String },
    price: { type: Number, require: true },
    rent: { type: Number, require: true },
    category: { type: String, require: true },
    description: { type: String, require: true },
    image:  String,
    type: { type: String, require: true },
}, { timestamps: true });

module.exports = model('products', mySchema);
