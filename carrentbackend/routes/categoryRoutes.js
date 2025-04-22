const express = require('express');
const categoryController = require('../controller/categoryController');
const router = express.Router();
const multer = require('multer');
const authenticateAdmin = require('../middelwares/authMiddleware');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads');
    },
    filename: function(req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  });
  
  const upload = multer({ storage });
// POST: Create a new category
router.post('/', categoryController.createCategory);
// router.post('/',authenticateAdmin, categoryController.createCategory);

// GET: Get all categories
router.get('/', categoryController.getAllCategories); // Get all categories for all users


// GET: Get category by name
router.get('/:categoryName', categoryController.getCategoryByName);

// PUT: Update a category by ID
// router.put('/:id',authenticateAdmin, categoryController.updateCategory);
router.put('/:id', categoryController.updateCategory);

// DELETE: Delete a category by ID
// router.delete('/:id',authenticateAdmin, categoryController.deleteCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
