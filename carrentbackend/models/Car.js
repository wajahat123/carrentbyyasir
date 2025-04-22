const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
  brand: { type: String },
  type: { type: String },
  model: { type: String },
  seats: { type: Number },
  year: { type: Number },
  doors: { type: Number },
  luggage: { type: Number },
  fuelType: { type: String },
  engine: { type: String },
  mileage: { type: Number },
  transmission: { type: String },
  drive: { type: String },
  fuelEconomy: { type: Number },
  exteriorColor: { type: String },
  interiorColor: { type: String },
  features: { type: [String] },  
  image: { type: String },
});

module.exports = mongoose.model('Car', carSchema);