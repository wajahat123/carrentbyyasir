const CategoryService = require('../services/categoryService');

// Create a new category
const createCategory = async (req, res) => {
  const { categoryName } = req.body;

  try {
    const categoryData = { categoryName };
    const newCategory = await CategoryService.createCategory(categoryData);
    res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Category with this name already exists' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get category by name
const getCategoryByName = async (req, res) => {
  const { categoryName } = req.params;

  try {
    const category = await CategoryService.getCategoryByName(categoryName);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update category
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { categoryName } = req.body;

  try {
    const updatedCategory = await CategoryService.updateCategory(id, { categoryName });
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await CategoryService.deleteCategory(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryByName,
  updateCategory,
  deleteCategory
};













// const CategoryService = require('../services/categoryService');

// class CategoryController {
//   // Create a new category
//   static async createCategory(req, res) {
//     const { categoryName, adminId } = req.body;

//     try {
      
//       const categoryData = {
//         categoryName,
//         admin: adminId ? adminId : undefined,
//       };
//       const newCategory = await CategoryService.createCategory(categoryData);
//       res.status(201).json({ message: 'Category created successfully', category: newCategory });


//     } catch (error) {
//       if (error.code === 11000) { // Duplicate key error
//         res.status(400).json({ error: 'Category with this name already exists' });
//       } else {
//         res.status(500).json({ error: error.message });
//       }
//     }
//   }

//   // Get all categories (for all users)
//   static async getAllCategories(req, res) {
//     try {
//       const categories = await CategoryService.getAllCategories();
//       res.status(200).json(categories);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }

  

//   // Get category by name
//   static async getCategoryByName(req, res) {
//     const { categoryName } = req.params;

//     try {
//       const category = await CategoryService.getCategoryByName(categoryName);
//       if (!category) {
//         return res.status(404).json({ message: 'Category not found' });
//       }
//       res.status(200).json(category);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }

//   // Update category information
//   static async updateCategory(req, res) {
//     const { id } = req.params;
//     const { categoryName } = req.body;

//     try {
//       const updatedCategory = await CategoryService.updateCategory(id, { categoryName });
//       if (!updatedCategory) {
//         return res.status(404).json({ message: 'Category not found' });
//       }
//       res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }

//   // Delete a category by ID
//   static async deleteCategory(req, res) {
//     const { id } = req.params;

//     try {
//       const deletedCategory = await CategoryService.deleteCategory(id);
//       if (!deletedCategory) {
//         return res.status(404).json({ message: 'Category not found' });
//       }
//       res.status(200).json({ message: 'Category deleted successfully' });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }
// }

// module.exports = CategoryController;
