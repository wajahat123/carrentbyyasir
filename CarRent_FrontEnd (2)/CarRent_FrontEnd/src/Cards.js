import React, { useState } from 'react';
import userSide from "./Assets/userside.PNG";
import adminSide from "./Assets/adminside.PNG";
import { Link } from 'react-router-dom';
const CardSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseEnter = (card) => {
    setHoveredCard(card);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white">
      <h2 className="text-4xl font-bold mb-8 text-center text-red-500">Choose Your Side</h2>
      <p className="text-lg mb-12 text-center text-gray-600">Select your preferred side to get started. Whether you're an admin or a user, we have something for you!</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* User Side Card */}
        <div 
          className="relative cursor-pointer transition-transform transform hover:scale-105 shadow-lg rounded-lg p-2"
          onMouseEnter={() => handleMouseEnter('user')}
          onMouseLeave={handleMouseLeave}
        >
          <img 
            src="https://img.freepik.com/free-photo/view-3d-car-model_23-2151138938.jpg?t=st=1740489575~exp=1740493175~hmac=aac15206aec9634e288cc70625120e6aefff07bbb6cd68a263cc12a6e953c0da&w=1060"
            alt="User Side" 
            className="w-full h-64 object-cover rounded-lg shadow-lg transition-all duration-300"
          />
          <div 
            className={`absolute inset-0 bg-gradient-to-b from-red-500 via-black to-transparent flex justify-center items-center rounded-lg ${hoveredCard === 'user' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          >
            <p className="text-white text-2xl font-bold bg-red-500 py-2 px-4 rounded-full">User Side</p>
          </div>
          <Link to="/home" className="absolute inset-0"></Link>
        </div>
        
        {/* Admin Side Card */}
        <div 
          className="relative cursor-pointer transition-transform transform hover:scale-105 shadow-lg rounded-lg p-2"
          onMouseEnter={() => handleMouseEnter('admin')}
          onMouseLeave={handleMouseLeave}
        >
          <img 
            src="https://img.freepik.com/free-photo/view-small-four-wheeled-vehicle-mobility-fast-travel_23-2151016469.jpg?t=st=1740489622~exp=1740493222~hmac=7b2574d05501b218c7a782e65ab8fcbf195496034b84a61a634b2b9a022782e4&w=1380" 
            alt="Admin Side" 
            className="w-full h-64 object-cover rounded-lg shadow-lg transition-all duration-300"
          />
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-red-500 via-black to-transparent flex justify-center items-center rounded-lg ${hoveredCard === 'admin' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          >
            <p className="text-white text-2xl font-bold bg-red-500 py-2 px-4 rounded-full">Admin Side</p>
          </div>
          <Link to="/admin/login" className="absolute inset-0"></Link>
        </div>
      </div>
      
      <p className="mt-12 text-lg text-center text-gray-600">Choose your path and dive into the experience. For admins, manage users and data. For users, explore and engage with the content!</p>
    </div>
  );
}

export default CardSection;