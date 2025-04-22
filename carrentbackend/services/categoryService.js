const CategoryRepository = require('../repositories/categoryRepository');

// Create a new category
const createCategory = async (data) => {
  if (!data.categoryName) {
    throw new Error('Category name is required');
  }

  return CategoryRepository.createCategory(data);
};

// Get all categories
const getAllCategories = async () => {
  return CategoryRepository.getAllCategories();
};

// Get category by name
const getCategoryByName = async (categoryName) => {
  return CategoryRepository.getCategoryByName(categoryName);
};

// Update category
const updateCategory = async (id, data) => {
  return CategoryRepository.updateCategory(id, data);
};

// Delete category
const deleteCategory = async (id) => {
  return CategoryRepository.deleteCategory(id);
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryByName,
  updateCategory,
  deleteCategory
};
