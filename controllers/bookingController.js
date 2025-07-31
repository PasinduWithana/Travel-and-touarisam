import Booking from "../models/booking.js";
import { isItCustomer, isItAdmin } from "./userController.js";

// Create a new booking
export async function createBooking(req, res) {
    try {
        if (!isItCustomer(req) && !isItAdmin(req)) {
            return res.status(403).json({
                message: "You must be logged in to make a booking"
            });
        }

        const data = req.body;
        data.userId = req.user.id;

        // Generate next ID
        let id = 0;
        const bookings = await Booking.find().sort({id: -1}).limit(1);
        if (bookings.length == 0) {
            id = 1;
        } else {
            id = bookings[0].id + 1;
        }
        data.id = id;

        const newBooking = new Booking(data);
        const response = await newBooking.save();

        res.status(201).json({
            message: "Booking created successfully",
            booking: response
        });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({
            message: "Failed to create booking",
            error: error.message
        });
    }
}

// Get all bookings (admin) or user's bookings (customer)
export async function getBookings(req, res) {
    try {
        let bookings;
        if (isItAdmin(req)) {
            bookings = await Booking.find();
        } else if (isItCustomer(req)) {
            bookings = await Booking.find({ userId: req.user.id });
        } else {
            return res.status(403).json({
                message: "Not authorized to view bookings"
            });
        }

        res.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({
            message: "Failed to fetch bookings",
            error: error.message
        });
    }
}

// Get a specific booking
export async function getBooking(req, res) {
    try {
        const booking = await Booking.findOne({ id: req.params.id });
        
        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        // Check if user is authorized to view this booking
        if (!isItAdmin(req) && booking.userId !== req.user.id) {
            return res.status(403).json({
                message: "Not authorized to view this booking"
            });
        }

        res.json(booking);
    } catch (error) {
        console.error('Error fetching booking:', error);
        res.status(500).json({
            message: "Failed to fetch booking",
            error: error.message
        });
    }
}

// Update a booking
export async function updateBooking(req, res) {
    try {
        const booking = await Booking.findOne({ id: req.params.id });
        
        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        // Check if user is authorized to update this booking
        if (!isItAdmin(req) && booking.userId !== req.user.id) {
            return res.status(403).json({
                message: "Not authorized to update this booking"
            });
        }

        // Don't allow updates if booking is completed
        if (booking.status === 'completed') {
            return res.status(400).json({
                message: "Cannot update a completed booking"
            });
        }

        const updatedBooking = await Booking.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );

        res.json({
            message: "Booking updated successfully",
            booking: updatedBooking
        });
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).json({
            message: "Failed to update booking",
            error: error.message
        });
    }
}

// Cancel a booking
export async function cancelBooking(req, res) {
    try {
        const booking = await Booking.findOne({ id: req.params.id });
        
        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        // Check if user is authorized to cancel this booking
        if (!isItAdmin(req) && booking.userId !== req.user.id) {
            return res.status(403).json({
                message: "Not authorized to cancel this booking"
            });
        }

        // Don't allow cancellation if booking is completed
        if (booking.status === 'completed') {
            return res.status(400).json({
                message: "Cannot cancel a completed booking"
            });
        }

        booking.status = 'cancelled';
        await booking.save();

        res.json({
            message: "Booking cancelled successfully",
            booking: booking
        });
    } catch (error) {
        console.error('Error cancelling booking:', error);
        res.status(500).json({
            message: "Failed to cancel booking",
            error: error.message
        });
    }
} 