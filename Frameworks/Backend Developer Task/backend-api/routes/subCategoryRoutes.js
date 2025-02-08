const express = require('express');
const SubCategory = require('../models/SubCategory');
const authMiddleware = require('../middleware/authMiddleware');
const Category = require('../models/Category');
const router = express.Router();

// Fetch sub-categories by category ID
router.get('/categories/:categoryId/subcategories', async (req, res) => {
    try {
        const subcategories = await SubCategory.find({ category_id: req.params.categoryId });
        res.status(200).json({ status: 'success', subcategories });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a sub-category (Admin only)
router.post('/categories/:categoryId/subcategories', authMiddleware, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    const { subcategory_name } = req.body;
    if (!subcategory_name) return res.status(400).json({ message: 'Subcategory name is required' });

    try {
        const category = await Category.findById(req.params.categoryId);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        const newSubCategory = new SubCategory({
            category_id: category._id,
            subcategory_name
        });

        await newSubCategory.save();
        res.status(201).json({ status: 'success', message: 'Subcategory created successfully', subcategory: newSubCategory });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a subcategory (Admin only)
router.put('/subcategories/:id', authMiddleware, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    try {
        const subcategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!subcategory) return res.status(404).json({ message: 'Subcategory not found' });
        res.status(200).json({ status: 'success', message: 'Subcategory updated successfully', subcategory });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a subcategory (Admin only)
router.delete('/subcategories/:id', authMiddleware, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    try {
        const subcategory = await SubCategory.findByIdAndDelete(req.params.id);
        if (!subcategory) return res.status(404).json({ message: 'Subcategory not found' });
        res.status(200).json({ status: 'success', message: 'Subcategory deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
