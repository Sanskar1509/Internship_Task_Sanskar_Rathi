// const express = require('express');
// const router = express.Router();
// const Category = require('../models/Category');
// const { verifyAdmin, verifyToken } = require('../middleware/authMiddleware');



// // POST /api/categories - Create a category (Admin only)
// router.post('/categories', verifyToken, async (req, res) => {
//   const { category_name } = req.body;
//   try {
//     const newCategory = new Category({ category_name });
//     await newCategory.save();
//     res.status(201).json({
//       status: 'success',
//       message: 'Category created successfully',
//       category: newCategory
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // GET /api/categories - Get all categories (For all users)
// router.get('/categories', async (req, res) => {
//   try {
//     const categories = await Category.find();
//     res.status(200).json({
//       status: 'success',
//       categories
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // PUT /api/categories/:category_id - Update a category (Admin only)
// router.put('/categories/:category_id', verifyToken, async (req, res) => {
//   const { category_name } = req.body;
//   try {
//     const category = await Category.findByIdAndUpdate(
//       req.params.category_id,
//       { category_name, updated_at: Date.now() },
//       { new: true }
//     );
//     res.status(200).json({
//       status: 'success',
//       message: 'Category updated successfully',
//       category
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // DELETE /api/categories/:category_id - Delete a category (Admin only)
// router.delete('/categories/:category_id', verifyToken, async (req, res) => {
//   try {
//     await Category.findByIdAndDelete(req.params.category_id);
//     res.status(200).json({
//       status: 'success',
//       message: 'Category deleted successfully'
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// ✅ Create Category (Only Admin)
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/", async (req, res) => {
      try {
        const categories = await Category.find();
        res.status(200).json({
          status: 'success',
          categories
        });
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
    });
// ✅ Update Category (Only Admin)

router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Delete Category (Only Admin)
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        console.log("Deleting category with ID:", id); // Debugging log

        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json({ message: "Category deleted successfully" });

    } catch (error) {
        console.error("Error deleting category:", error); // Log the error
        res.status(500).json({ message: "Internal server error", error });
    }
});



module.exports = router;

