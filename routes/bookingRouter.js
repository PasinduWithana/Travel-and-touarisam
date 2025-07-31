import express from "express";
import { createBooking, getBookings, getBooking, updateBooking, cancelBooking } from "../controllers/bookingController.js";

const bookingRouter = express.Router();

// Create a new booking
bookingRouter.post("/", createBooking);

// Get all bookings (admin) or user's bookings (customer)
bookingRouter.get("/", getBookings);

// Get a specific booking
bookingRouter.get("/:id", getBooking);

// Update a booking
bookingRouter.put("/:id", updateBooking);

// Cancel a booking
bookingRouter.put("/:id/cancel", cancelBooking);

export default bookingRouter; 