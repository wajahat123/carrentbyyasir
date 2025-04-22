const BookingService = require('../services/bookingService');

class BookingController {
    static async create(req, res) {
        try {
            const booking = await BookingService.createBooking(req.body);
            res.status(201).json(booking);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const bookings = await BookingService.getAllBookings();
            res.json(bookings);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const booking = await BookingService.getBookingById(req.params.id);
            if (!booking) return res.status(404).json({ message: 'Booking not found' });
            res.json(booking);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async update(req, res) {
        try {
            const updatedBooking = await BookingService.updateBooking(req.params.id, req.body);
            if (!updatedBooking) return res.status(404).json({ message: 'Booking not found' });
            res.json(updatedBooking);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const deletedBooking = await BookingService.deleteBooking(req.params.id);
            if (!deletedBooking) return res.status(404).json({ message: 'Booking not found' });
            res.json({ message: 'Booking deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = BookingController;