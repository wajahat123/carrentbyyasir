const Car = require('../models/Car');

exports.createCar = (CarData) => Car.create(CarData);
exports.getCars = () => Car.find().populate('category');
exports.getCarById = (id) => Car.findById(id).populate('category');
exports.updateCar = (id, updateData) => Car.findByIdAndUpdate(id, updateData, { new: true });
exports.deleteCar = (id) => Car.findByIdAndDelete(id);