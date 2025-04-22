const carRepository = require('../repositories/carRepository');

exports.createcar = async (carData) => {
  return await carRepository.createCar(carData);
};

exports.getcars = async () => {
  return await carRepository.getCars();
};

exports.getcarById = async (id) => {
  return await carRepository.getCarById(id);
};

exports.updatecar = async (id, updateData) => {
  return await carRepository.updateCar(id, updateData);
};

exports.deletecar = async (id) => {
  return await carRepository.deleteCar(id);
};
