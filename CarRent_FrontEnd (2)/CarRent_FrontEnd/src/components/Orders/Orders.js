import React, { useState, useEffect } from "react";
import axios from "../../Https/Axios";
import { bookingsapiurl } from "../../Https/AdminSideAxiosUrls";
import { FiTrash2, FiCalendar, FiUser, FiDollarSign, FiSearch } from "react-icons/fi";
import { FaCar, FaCarAlt } from "react-icons/fa";

const BookingsTable = () => {
  const [bookings, setBookings] = useState([]);
  const [, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const formatAED = (amount) => {
    if (amount === undefined) return "N/A";
    return new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: "AED",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(bookingsapiurl);
        const bookingsWithTotal = response.data.map((booking) => ({
          ...booking,
          totalPrice:
            booking.totalPrice ||
            (booking.carId?.price
              ? booking.carId.price * calculateDuration(booking.startDate, booking.endDate)
              : undefined),
        }));
        setBookings(bookingsWithTotal);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings. Please try again later.");
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await axios.delete(`${bookingsapiurl}/${id}`);
        setBookings(bookings.filter((booking) => booking._id !== id));
      } catch (err) {
        console.error("Error deleting booking:", err);
        alert("Failed to delete booking. Please try again.");
      }
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      booking.userName.toLowerCase().includes(searchLower) ||
      (booking.carId?.name?.toLowerCase().includes(searchLower) || "") ||
      (booking.carId?.category?.toLowerCase().includes(searchLower) || "")
    );
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-900/50 text-green-300 border border-green-700";
      case "pending":
        return "bg-yellow-900/50 text-yellow-300 border border-yellow-700";
      case "cancelled":
        return "bg-red-900/50 text-red-300 border border-red-700";
      default:
        return "bg-gray-800 text-gray-300 border border-gray-700";
    }
  };

  if (error) {
    return (
      <div className="bg-gradient-to-b from-red-900/30 to-red-900/10 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-200">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4 mx-auto py-8">
      <div className="w-full bg-gradient-to-b from-black to-slate-900 rounded-xl shadow-lg overflow-hidden border border-yellow-500/30">
        <div className="px-6 py-4 border-b border-yellow-500/20 flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-semibold flex items-center text-yellow-500 font-serif">
            <FaCarAlt className="mr-2 text-yellow-400" />
            Bookings Management
          </h2>
          <div className="mt-4 md:mt-0 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-yellow-400/70" />
            </div>
            <input
              type="text"
              placeholder="Search bookings..."
              className="block w-full pl-10 pr-3 py-2 border border-yellow-500/30 rounded-md leading-5 bg-blue-900/20 placeholder-yellow-200/50 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-yellow-500/20">
            <thead className="bg-blue-900/10 backdrop-blur-sm">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider font-serif">
                  <div className="flex items-center">
                    <FaCar className="mr-2 text-yellow-400" />
                    Car Details
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider font-serif">
                  <div className="flex items-center">
                    <FiUser className="mr-2 text-yellow-400" />
                    Customer
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider font-serif">
                  <div className="flex items-center">
                    <FiCalendar className="mr-2 text-yellow-400" />
                    Rental Period
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider font-serif">
                  <div className="flex items-center">
                    <FiDollarSign className="mr-2 text-yellow-400" />
                    Price
                  </div>
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider font-serif">
                  Status
                </th> */}
                <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider font-serif">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-yellow-500/10">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-blue-900/10 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-yellow-500/20 to-blue-900/30 flex items-center justify-center border border-yellow-500/30">
                          <FaCar className="text-yellow-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-yellow-100">
                            {booking.carId?.name || "N/A"}
                          </div>
                          <div className="text-sm text-yellow-400/80">{booking.carId?.category || "N/A"}</div>
                          <div className="text-xs text-yellow-500">
                            {calculateDuration(booking.startDate, booking.endDate)} days
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-yellow-100">{booking.userName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-yellow-100">
                        <div className="flex items-center">
                          <FiCalendar className="mr-2 text-yellow-500/70" />
                          {new Date(booking.startDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center mt-1">
                          <FiCalendar className="mr-2 text-yellow-500/70" />
                          {new Date(booking.endDate).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        {/* <div className="font-semibold text-yellow-300">
                          {formatAED(booking.totalPrice)}
                        </div> */}
                        <div className="text-xs text-yellow-500/80">
                          {booking.carId?.price && `${formatAED(booking.carId.price)}/day`}
                        </div>
                      </div>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status || "unknown"}
                      </span>
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDelete(booking._id)}
                        className="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-red-900/20 transition-colors duration-150 border border-red-900/30"
                        title="Delete booking"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-yellow-500/70">
                    {searchTerm ? "No bookings match your search." : "No bookings found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingsTable;
