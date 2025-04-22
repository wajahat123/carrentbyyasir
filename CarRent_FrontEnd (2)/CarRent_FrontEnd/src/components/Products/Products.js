import React, { useState, useEffect } from "react";
import axios from "../../Https/Axios";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { carsapiurl, DbCategories } from "../../Https/AdminSideAxiosUrls"; // Assuming DbCategories is imported

const CarTable = ({ onItemClick }) => {
    const [cars, setCars] = useState([]);
    const [activeItem, setActiveItem] = useState("dashboard");
    const [categories, setCategories] = useState([]); // New state for categories
    const [selectedCar, setSelectedCar] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState(null);

    const API_URL = carsapiurl; // Change this to your actual API URL
    const navigate = useNavigate();
    const handleItemClick = (item) => {
        setActiveItem(item);
        onItemClick(item);
    };
    // Fetch cars and categories
    useEffect(() => {
        fetchCars();
        fetchCategories();
    }, []);

    const fetchCars = async () => {
        try {
          setLoading(true);
          const response = await axios.get(API_URL);
      
          const processedCars = response.data.map(car => {
            let parsedFeatures = [];
      
            if (Array.isArray(car.features)) {
              // If it's already a valid array like ["LeatherSeats", "AC"]
              if (typeof car.features[0] === "string" && car.features.length === 1) {
                try {
                  // Try parsing stringified array
                  parsedFeatures = JSON.parse(car.features[0]);
                } catch (err) {
                  // Fallback: just use the string as a single feature
                  parsedFeatures = car.features;
                }
              } else {
                // Already an array of strings
                parsedFeatures = car.features;
              }
            }
      
            return {
              ...car,
              features: parsedFeatures,
            };
          });
      
          setCars(processedCars);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching cars:", err);
          setError("Failed to load cars. Please try again later.");
          setLoading(false);
        }
      };
      



    const fetchCategories = async () => {
        try {
            const response = await axios.get(DbCategories);
            setCategories(response.data);
        } catch (err) {
            console.error("Error fetching categories:", err);
            setError("Failed to load categories. Please try again later.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this car?")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                setCars(cars.filter((car) => car._id !== id));
            } catch (err) {
                console.error("Error deleting car:", err);
                alert("Failed to delete car. Please try again.");
            }
        }
    };

    const handleEdit = (car) => {
        setSelectedCar(car);
        setShowModal(true);
    };

    const handleChange = (e) => {
        if (selectedCar) {
            setSelectedCar({
                ...selectedCar,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleFeatureChange = (e) => {
        const newFeatures = e.target.value.split(",").map((item) => item.trim());
        setSelectedCar({ ...selectedCar, features: newFeatures });
    };


    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append("name", selectedCar.name); // ADD THIS
            formData.append("price", selectedCar.price); // ADD THIS
            formData.append("category", selectedCar.category); // ADD THIS
            formData.append("brand", selectedCar.brand);
            formData.append("model", selectedCar.model);
            formData.append("seats", selectedCar.seats);
            formData.append("year", selectedCar.year);
            formData.append("doors", selectedCar.doors);
            formData.append("luggage", selectedCar.luggage);
            formData.append("fuelType", selectedCar.fuelType);
            formData.append("engine", selectedCar.engine);
            formData.append("mileage", selectedCar.mileage);
            formData.append("transmission", selectedCar.transmission);
            formData.append("drive", selectedCar.drive);
            formData.append("fuelEconomy", selectedCar.fuelEconomy);
            formData.append("exteriorColor", selectedCar.exteriorColor);
            formData.append("interiorColor", selectedCar.interiorColor);
            formData.append("features", JSON.stringify(selectedCar.features));
    
            if (selectedCar.newImageFile) {
                formData.append("image", selectedCar.newImageFile);
            }
    
            await axios.put(`${API_URL}/${selectedCar._id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
    
            fetchCars();
            setShowModal(false);
        } catch (err) {
            console.error("Error updating car:", err);
            alert("Failed to update car. Please try again.");
        }
    };
    

    const filteredCars = cars.filter((car) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            car.name?.toLowerCase().includes(searchLower) ||
            car.category?.toLowerCase().includes(searchLower) ||
            car.brand?.toLowerCase().includes(searchLower)
        );
    });
    

    if (error) {
        return (
            <div className="text-red-500 text-center mt-10">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-yellow-500/30">
                {/* Header */}
                <div className="px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between border-b border-yellow-500/20">
                    <h2 className="text-2xl font-bold text-yellow-400 font-serif">Luxury Car Inventory</h2>
                    <div className="mt-4 md:mt-0 flex gap-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaSearch className="text-yellow-500/70" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search cars..."
                                className="block w-full pl-10 pr-3 py-2 border border-yellow-500/30 rounded-md bg-gray-800 text-yellow-100"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleItemClick("addproducts")}
                            className="flex items-center gap-2 bg-yellow-600 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition-all"
                        >
                            <FaPlus />
                            Add Car
                        </motion.button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-yellow-500/20">
                        <thead className="bg-gray-800">
                            <tr>
                                <th className="px-4 py-2 text-yellow-300 text-xs uppercase">Image</th>
                                <th className="px-4 py-2 text-yellow-300 text-xs uppercase">Name</th>
                                <th className="px-4 py-2 text-yellow-300 text-xs uppercase">Price</th>
                                <th className="px-4 py-2 text-yellow-300 text-xs uppercase">Category</th>
                                <th className="px-4 py-2 text-yellow-300 text-xs uppercase">Brand</th>
                                <th className="px-4 py-2 text-yellow-300 text-xs uppercase">Model</th>
                                <th className="px-4 py-2 text-yellow-300 text-xs uppercase">Seats</th>
                                <th className="px-4 py-2 text-yellow-300 text-xs uppercase">Year</th>
                                <th className="px-4 py-2 text-yellow-300 text-xs uppercase">Transmission</th>
                                <th className="px-4 py-2 text-yellow-300 text-xs uppercase">Drive</th>
                                <th className="px-4 py-2 text-yellow-300 text-xs uppercase">Fuel Type</th>
                                <th className="px-4 py-2 text-yellow-300 text-xs uppercase">Engine</th>
                                <th className="px-4 py-2 text-yellow-300 text-xs uppercase">Mileage</th>
                                <th className="px-4 py-2 text-yellow-300 text-xs uppercase">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-yellow-500/10">
                            {filteredCars.length > 0 ? (
                                filteredCars.map((car) => (
                                    <tr key={car._id}>
                                        <td className="px-4 py-2">
                                            <img src={`${axios.defaults.baseURL}/${car.image}`} alt={car.name} className="w-16 h-12 object-cover rounded" />
                                        </td>
                                        <td className="px-4 py-2 text-yellow-100">{car.name}</td>
                                        <td className="px-6 py-4 text-yellow-300">
                                            {new Intl.NumberFormat("en-AE", {
                                                style: "currency",
                                                currency: "AED",
                                            }).format(car.price)}
                                        </td>                                       
                                         <td className="px-4 py-2 text-yellow-300">{car.category}</td>
                                        <td className="px-4 py-2 text-yellow-300">{car.brand}</td>
                                        <td className="px-4 py-2 text-yellow-300">{car.model}</td>
                                        <td className="px-4 py-2 text-yellow-300">{car.seats}</td>
                                        <td className="px-4 py-2 text-yellow-300">{car.year}</td>
                                        <td className="px-4 py-2 text-yellow-300">{car.transmission}</td>
                                        <td className="px-4 py-2 text-yellow-300">{car.drive}</td>
                                        <td className="px-4 py-2 text-yellow-300">{car.fuelType}</td>
                                        <td className="px-4 py-2 text-yellow-300">{car.engine}</td>
                                        <td className="px-4 py-2 text-yellow-300">{car.mileage}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleEdit(car)}
                                                    className="text-yellow-400 hover:text-yellow-300 p-2 rounded-full border border-yellow-500/30"
                                                >
                                                    <FaEdit />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleDelete(car._id)}
                                                    className="text-red-400 hover:text-red-300 p-2 rounded-full border border-red-500/30"
                                                >
                                                    <FaTrash />
                                                </motion.button>
                                            </div>
                                        </td>
                                    </tr>

                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center text-yellow-500 py-4">
                                        {searchTerm ? "No cars match your search." : "No cars found."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
{/* Modal */}
{showModal && selectedCar && (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 rounded-xl shadow-2xl border border-yellow-500/30 w-full max-w-lg"
        >
            <div className="p-6 overflow-y-auto max-h-[80vh]">
                <div className="flex justify-between items-center mb-4 border-b border-yellow-500/20 pb-2">
                    <h3 className="text-xl font-semibold text-yellow-400">Edit Car</h3>
                    <button onClick={() => setShowModal(false)} className="text-yellow-500 text-2xl">
                        &times;
                    </button>
                </div>
                <div>
                    <img
                        src={`${axios.defaults.baseURL}/${selectedCar.image}`}
                        alt="Selected Car"
                        className="h-32 w-40 object-cover rounded border border-yellow-500/30 mb-4"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setSelectedCar({
                                ...selectedCar,
                                newImageFile: e.target.files[0],
                            })
                        }
                        className="block w-full text-yellow-100 bg-gray-800 border border-yellow-500/30 rounded p-2"
                    />
                </div>

                <div className="space-y-4 mt-4">
                    {[
                        { label: "Name", name: "name", type: "text" },
                        { label: "Brand", name: "brand", type: "text" },
                        { label: "Model", name: "model", type: "text" },
                        { label: "Price", name: "price", type: "number" },
                        { label: "Seats", name: "seats", type: "number" },
                        { label: "Year", name: "year", type: "number" },
                        { label: "Transmission", name: "transmission", type: "text" },
                        { label: "Drive", name: "drive", type: "text" },
                        { label: "Fuel Type", name: "fuelType", type: "text" },
                        { label: "Engine", name: "engine", type: "text" },
                        { label: "Mileage", name: "mileage", type: "number" },
                        { label: "Luggage", name: "luggage", type: "number" },
                        { label: "Fuel Economy", name: "fuelEconomy", type: "text" },
                        { label: "Exterior Color", name: "exteriorColor", type: "text" },
                        { label: "Interior Color", name: "interiorColor", type: "text" },
                    ].map((field) => (
                        <div key={field.name} className="flex gap-3">
                            <input
                                type={field.type}
                                name={field.name}
                                value={selectedCar[field.name] || ""}
                                onChange={handleChange}
                                className="w-full p-2 bg-gray-800 text-yellow-200 rounded"
                                placeholder={field.label}
                            />
                        </div>
                    ))}
                    <div>
                        <input
                            type="text"
                            name="features"
                            value={selectedCar.features.join(", ")}
                            onChange={handleFeatureChange}
                            className="w-full p-2 bg-gray-800 text-yellow-200 rounded"
                            placeholder="Features (comma separated)"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-4">
                    <button
                        onClick={handleUpdate}
                        className="px-4 py-2 bg-yellow-600 text-black rounded-md hover:bg-yellow-500 transition-all"
                    >
                        Update Car
                    </button>
                    <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </motion.div>
    </div>
)}

        </div>
    );
};

export default CarTable;