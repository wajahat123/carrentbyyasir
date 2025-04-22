import React, { useState } from 'react';
import { FaPlus, FaList, FaTags, FaClipboardList } from 'react-icons/fa';
import { motion } from 'framer-motion';

const DashboardHome = ({ onItemClick }) => {
  const [activeItem, setActiveItem] = useState("dashboard");

  const handleItemClick = (item) => {
    setActiveItem(item);
    onItemClick(item);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-slate-900 py-10 px-4">
      <motion.div
        className="w-full max-w-5xl px-6 py-10 text-center rounded-xl shadow-2xl border border-yellow-500/20 bg-gradient-to-br from-slate-950 to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="text-3xl md:text-5xl font-extrabold text-yellow-400 mb-6 font-serif"
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          Welcome Back, Admin!
        </motion.div>

        <motion.div
          className="text-xl text-yellow-200 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Manage your platform with ease and control.
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {/* Add Car */}
          <motion.div
            className="bg-blue-900/30 p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-yellow-300 border border-yellow-500/20 hover:scale-105 transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => handleItemClick("addproducts")}
          >
            <FaPlus className="text-5xl mb-2" />
            <span className="text-sm">Add New Car</span>
          </motion.div>

          {/* Cars List */}
          <motion.div
            className="bg-blue-900/30 p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-yellow-300 border border-yellow-500/20 hover:scale-105 transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => handleItemClick("products")}
          >
            <FaList className="text-5xl mb-2" />
            <span className="text-sm">Cars List</span>
          </motion.div>

          {/* Categories */}
          <motion.div
            className="bg-blue-900/30 p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-yellow-300 border border-yellow-500/20 hover:scale-105 transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => handleItemClick("categories")}
          >
            <FaTags className="text-5xl mb-2" />
            <span className="text-sm">Categories</span>
          </motion.div>

          {/* Bookings List */}
          <motion.div
            className="bg-blue-900/30 p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-yellow-300 border border-yellow-500/20 hover:scale-105 transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => handleItemClick("orders")}
          >
            <FaClipboardList className="text-5xl mb-2" />
            <span className="text-sm">Bookings List</span>
          </motion.div>
        </div>

        {/* Start Managing Button */}
        <motion.div
          className="mt-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2, type: 'spring', stiffness: 120 }}
        >
          <button className="bg-yellow-500 text-black font-semibold py-2 px-6 rounded-full text-lg hover:bg-yellow-400 transition-all">
            Start Managing
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;