const Booking = require('../models/bookingModal');

class BookingService {
    static async createBooking(data) {
        return await Booking.create(data);
    }

    static async getAllBookings() {
        return await Booking.find().populate("carId");
    }

    static async getBookingById(id) {
        return await Booking.findById(id);
    }

    static async updateBooking(id, data) {
        return await Booking.findByIdAndUpdate(id, data, { new: true });
    }

    static async deleteBooking(id) {
        return await Booking.findByIdAndDelete(id);
    }
}

module.exports = BookingService;
