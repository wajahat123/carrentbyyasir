import React, { useState, useEffect } from "react";
import axios from "../../Https/Axios";
import { useToast } from "../../ToastManager";
import { carsapiurl, DbCategories } from "../../Https/AdminSideAxiosUrls";

export default function AddCar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(DbCategories); // Replace with your API URL
        setCategories(response.data); // Assuming the API returns an array of objects
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const [carData, setCarData] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    type: "",
    model: "",
    seats: "",
    year: "",
    doors: "",
    luggage: "",
    fuelType: "",
    engine: "",
    mileage: "",
    transmission: "",
    drive: "",
    fuelEconomy: "",
    exteriorColor: "",
    interiorColor: "",
    features: [],
  });

  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const showToast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'category') {
      const selectedCategory = categories.find(cat => cat._id === value);
      setCarData({ ...carData, category: selectedCategory ? selectedCategory.categoryName : '' });
    } else if (name === 'features') {
      const newFeatures = value.split(",").map(feature => feature.trim());
      setCarData({ ...carData, features: newFeatures });
    } else {
      setCarData({ ...carData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!imageFile) {
      showToast("Error", "Please select an image file!");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", carData.name);
    formData.append("price", carData.price);
    formData.append("category", carData.category);
    formData.append("brand", carData.brand);
    formData.append("type", carData.type);
    formData.append("model", carData.model);
    formData.append("seats", carData.seats);
    formData.append("year", carData.year);
    formData.append("doors", carData.doors);
    formData.append("luggage", carData.luggage);
    formData.append("fuelType", carData.fuelType);
    formData.append("engine", carData.engine);
    formData.append("mileage", carData.mileage);
    formData.append("transmission", carData.transmission);
    formData.append("drive", carData.drive);
    formData.append("fuelEconomy", carData.fuelEconomy);
    formData.append("exteriorColor", carData.exteriorColor);
    formData.append("interiorColor", carData.interiorColor);
    formData.append("features", JSON.stringify(carData.features));
    formData.append("image", imageFile);

    try {
      const response = await axios.post(carsapiurl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        showToast("Success", "Car added successfully!", "success");
        setCarData({
          name: "",
          price: "",
          category: "",
          brand: "",
          type: "",
          model: "",
          seats: "",
          year: "",
          doors: "",
          luggage: "",
          fuelType: "",
          engine: "",
          mileage: "",
          transmission: "",
          drive: "",
          fuelEconomy: "",
          exteriorColor: "",
          interiorColor: "",
          features: [],
        });
        setImageFile(null);
      } else {
        showToast("Error", "Failed to add car. Please try again.");
      }
    } catch (error) {
      console.error("Error adding car:", error);
      showToast("Error", "Failed to add car. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="md:p-6 mx-auto px-4 py-8 flex items-center justify-center">
      <div className="bg-gradient-to-b from-black to-slate-900 rounded-xl shadow-lg border border-yellow-500/30 w-full">
        <div className="p-6 border-b border-yellow-500/20">
          <h2 className="text-2xl font-bold text-yellow-400 font-serif">
            Add Luxury Car
          </h2>
          <p className="text-yellow-300/80 mt-1 font-sans">
            Fill in the details below to add a new luxury vehicle to the inventory
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Car Name */}
            <div className="space-y-2">
              <label htmlFor="image" className="block text-sm font-medium text-yellow-300">
                Upload Image
              </label>
              <input
                id="image"
                name="image"
                type="file"
                onChange={handleFileChange}
                className="block w-full px-3 py-2 border border-yellow-500/30 rounded-md bg-blue-900/20 text-yellow-100 placeholder-yellow-500/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                accept="image/*"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-yellow-300">
                Car Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Rolls Royce Phantom"
                value={carData.name}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-yellow-500/30 rounded-md bg-blue-900/20 text-yellow-100 placeholder-yellow-500/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label htmlFor="price" className="block text-sm font-medium text-yellow-300">
                Price (AED)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                placeholder="0.00"
                value={carData.price}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-yellow-500/30 rounded-md bg-blue-900/20 text-yellow-100 placeholder-yellow-500/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                required
                min="0"
                step="0.01"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium text-yellow-300">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={carData.category}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-yellow-500/30 rounded-md bg-blue-900/20 text-yellow-100 placeholder-yellow-500/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                required
              >
                <option value="" disabled>Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.categoryName}</option>
                ))}
              </select>
            </div>

            {/* Brand */}
            <div className="space-y-2">
              <label htmlFor="brand" className="block text-sm font-medium text-yellow-300">
                Brand
              </label>
              <input
                id="brand"
                name="brand"
                type="text"
                placeholder="e.g. Rolls Royce"
                value={carData.brand}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-yellow-500/30 rounded-md bg-blue-900/20 text-yellow-100 placeholder-yellow-500/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>

            {/* Type */}
            <div className="space-y-2">
              <label htmlFor="type" className="block text-sm font-medium text-yellow-300">
                Type
              </label>
              <input
                id="type"
                name="type"
                type="text"
                placeholder="e.g. Sedan"
                value={carData.type}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-yellow-500/30 rounded-md bg-blue-900/20 text-yellow-100 placeholder-yellow-500/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>

            {/* Model */}
            <div className="space-y-2">
              <label htmlFor="model" className="block text-sm font-medium text-yellow-300">
                Model
              </label>
              <input
                id="model"
                name="model"
                type="text"
                placeholder="e.g. 2023"
                value={carData.model}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-yellow-500/30 rounded-md bg-blue-900/20 text-yellow-100 placeholder-yellow-500/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>

            {/* Seats */}
            <div className="space-y-2">
              <label htmlFor="seats" className="block text-sm font-medium text-yellow-300">
                Seats
              </label>
              <input
                id="seats"
                name="seats"
                type="number"
                placeholder="e.g. 4"
                value={carData.seats}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-yellow-500/30 rounded-md bg-blue-900/20 text-yellow-100 placeholder-yellow-500/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>

            {/* Year */}
            <div className="space-y-2">
              <label htmlFor="year" className="block text-sm font-medium text-yellow-300">
                Year
              </label>
              <input
                id="year"
                name="year"
                type="number"
                placeholder="e.g. 2023"
                value={carData.year}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-yellow-500/30 rounded-md bg-blue-900/20 text-yellow-100 placeholder-yellow-500/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>

            {/* Doors */}
            <div className="space-y-2">
              <label htmlFor="doors" className="block text-sm font-medium text-yellow-300">
                Doors
              </label>
              <input
                id="doors"
                name="doors"
                type="number"
                placeholder="e.g. 4"
                value={carData.doors}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-yellow-500/30 rounded-md bg-blue-900/20 text-yellow-100 placeholder-yellow-500/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>

            {/* Luggage */}
            <div className="space-y-2">
              <label htmlFor="luggage" className="block text-sm font-medium text-yellow-300">
                Luggage
              </label>
              <input
                id="luggage"
                name="luggage"
                type="number"
                placeholder="e.g. 3"
                value={carData.luggage}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-yellow-500/30 rounded-md bg-blue-900/20 text-yellow-100 placeholder-yellow-500/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>

            {/* Features */}
            <div className="space-y-2">
              <label htmlFor="features" className="block text-sm font-medium text-yellow-300">
                Features (comma separated)
              </label>
              <input
                id="features"
                name="features"
                type="text"
                placeholder="e.g. Leather seats, Sunroof"
                value={carData.features.join(", ")}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-yellow-500/30 rounded-md bg-blue-900/20 text-yellow-100 placeholder-yellow-500/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>


            {/* Fuel Type */}
            <div className="space-y-2">
              <label htmlFor="fuelType" className="block text-sm font-medium text-yellow-300">
                Fuel Type
              </label>
              <input
                id="fuelType"
                name="fuelType"
                type="text"
                placeholder="e.g. Petrol"
                value={carData.fuelType}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-yellow-500/30 rounded-md bg-blue-900/20 text-yellow-100 placeholder-yellow-500/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>

            {/* Engine */}
            <div className="space-y-2">
              <label htmlFor="engine" className="block text-sm font-medium text-yellow-300">
                Engine
              </label>
              <input
                id="engine"
                name="engine"
                type="text"
                placeholder="e.g. V8"
                value={carData.engine}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-yellow-500/30 rounded-md bg-blue-900/20 text-yellow-100 placeholder-yellow-500/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>

            {/* Mileage */}
            <div className="space-y-2">
              <label htmlFor="mileage" className="block text-sm font-medium text-yellow-300">
                Mileage (km)
              </label>
              <input
                id="mileage"
                name="mileage"
                type="number"
                placeholder="e.g. 50000"
                value={carData.mileage}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-yellow-500/30 rounded-md bg-blue-900/20 text-yellow-100 placeholder-yellow-500/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>

            {/* Transmission */}
            <div className="space-y-2">
              <label htmlFor="transmission" className="block text-sm font-medium text-yellow-300">
                Transmission
              </label>
              <input
                id="transmission"
                name="transmission"
                type="text"
                placeholder="e.g. Automatic"
                value={carData.transmission}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-yellow-500/30 rounded-md bg-blue-900/20 text-yellow-100 placeholder-yellow-500/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>

            {/* Drive */}
            <div className="space-y-2">
              <label htmlFor="drive" className="block text-sm font-medium text-yellow-300">
                Drive
              </label>
              <input
                id="drive"
                name="drive"
                type="text"
                placeholder="e.g. AWD"
                value={carData.drive}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-yellow-500/30 rounded-md bg-blue-900/20 text-yellow-100 placeholder-yellow-500/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>

            {/* Fuel Economy */}
            <div className="space-y-2">
              <label htmlFor="fuelEconomy" className="block text-sm font-medium text-yellow-300">
                Fuel Economy (L/100km)
              </label>
              <input
                id="fuelEconomy"
                name="fuelEconomy"
                type="number"
                placeholder="e.g. 8.5"
                value={carData.fuelEconomy}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-yellow-500/30 rounded-md bg-blue-900/20 text-yellow-100 placeholder-yellow-500/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>

            {/* Exterior Color */}
            <div className="space-y-2">
              <label htmlFor="exteriorColor" className="block text-sm font-medium text-yellow-300">
                Exterior Color
              </label>
              <input
                id="exteriorColor"
                name="exteriorColor"
                type="text"
                placeholder="e.g. Black"
                value={carData.exteriorColor}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-yellow-500/30 rounded-md bg-blue-900/20 text-yellow-100 placeholder-yellow-500/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>

            {/* Interior Color */}
            <div className="space-y-2">
              <label htmlFor="interiorColor" className="block text-sm font-medium text-yellow-300">
                Interior Color
              </label>
              <input
                id="interiorColor"
                name="interiorColor"
                type="text"
                placeholder="e.g. Beige"
                value={carData.interiorColor}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-yellow-500/30 rounded-md bg-blue-900/20 text-yellow-100 placeholder-yellow-500/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>


          </div>

          <button
            type="submit"
            className={`w-full px-4 py-2 rounded-lg ${isSubmitting ? 'bg-yellow-500/50' : 'bg-yellow-500'} text-white font-semibold transition-all duration-300`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding Car...' : 'Add Car'}
          </button>
        </form>
      </div>
    </div>
  );
}