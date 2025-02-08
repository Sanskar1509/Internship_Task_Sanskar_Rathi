const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategory_name: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('SubCategory', subCategorySchema);
