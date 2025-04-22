import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DashBoardNavbar({ onItemClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("food123");
    navigate("/admin/login");
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
    onItemClick(item);
    setIsOpen(false);
  };

  const navItems = [
    { name: "dashboard", icon: "fa-tachometer-alt", label: "Dashboard" },
    { name: "addproducts", icon: "fa-plus-square", label: "Add New Car" },
    { name: "products", icon: "fa-box", label: "Cars List" },
    { name: "orders", icon: "fa-clipboard-list", label: "Bookings List" },
    { name: "categories", icon: "fa-tags", label: "Categories" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 bg-blue-900/70 border border-yellow-500/30 text-yellow-100 p-3 rounded-lg md:hidden shadow-md"
        onClick={handleToggle}
      >
        <i className="fas fa-bars text-lg"></i>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-black to-slate-900 border-r border-yellow-500/30 text-yellow-100 shadow-xl transition-transform duration-300 ease-in-out z-40 
  ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-64 flex flex-col justify-between`}
      >
        <div>
          <div className="sidebar-header flex justify-between items-center p-4 border-b border-yellow-500/20">
            <h5 className="w-full text-center text-xl bg-blue-900/50 py-2 px-4 rounded-md text-yellow-400 font-semibold">
              Admin Menu
            </h5>
            {/* Close Button (Mobile Only) */}
            <button
              className="text-yellow-300 bg-blue-900/50 rounded p-2 mx-2 hover:bg-blue-800/70 transition-colors md:hidden"
              onClick={handleToggle}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          <ul className="p-4 space-y-2">
            {navItems.map((item) => (
              <li
                key={item.name}
                className={`flex items-center px-4 mt-3 py-2 rounded-lg cursor-pointer font-medium transition-all duration-300 relative ${activeItem === item.name
                  ? " text-yellow-300 border-l-4 border-yellow-400"
                  : "text-yellow-100 hover:bg-blue-900/20 hover:text-yellow-200"
                  }`}

                onClick={() => handleItemClick(item.name)}
              >
                <i className={`me-2 fas ${item.icon} ${activeItem === item.name ? "text-yellow-300" : "text-yellow-400"}`}></i>
                <span className={activeItem === item.name ? "text-yellow-300" : ""}>
                  {item.label}
                </span>
                {activeItem === item.name && (
                  <i className="fas fa-angle-right text-yellow-300 ms-auto"></i>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Logout at the bottom */}
        <div className="p-4">
          <li
            className="flex items-center px-4 py-2 rounded-lg cursor-pointer text-yellow-100 hover:bg-red-900/30 hover:text-red-300 transition-all duration-300 border border-transparent hover:border-red-800"
            onClick={handleLogout}
          >
            <i className="me-2 fas fa-sign-out-alt text-red-400"></i>
            <span>Logout</span>
          </li>
        </div>
      </div>


      {/* Background Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={handleToggle}
        ></div>
      )}
    </>
  );
}