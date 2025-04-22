const mongoose = require('mongoose');

// Assuming you have a User model, reference the User collection here
const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      unique: true,
    },

    // image:{
    //   type: String,
    //   required: true,
    // }
  
  
  },
  { timestamps: true }  // Automatically adds 'createdAt' and 'updatedAt'
);



module.exports = mongoose.model('Category', categorySchema);