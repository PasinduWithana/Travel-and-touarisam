import express from "express";
import { createVehicle, getVehicles, getVehicle, updateVehicle, deleteVehicle, getVehicleStats } from "../controllers/vehicleRentalController.js";

const vehicleRentalRouter = express.Router();

// Create a new vehicle
vehicleRentalRouter.post("/", createVehicle);

// Get all vehicles
vehicleRentalRouter.get("/", getVehicles);

// Get vehicle statistics
vehicleRentalRouter.get("/stats", getVehicleStats);

// Get a specific vehicle
vehicleRentalRouter.get("/:id", getVehicle);

// Update a vehicle
vehicleRentalRouter.put("/:id", updateVehicle);

// Delete a vehicle
vehicleRentalRouter.delete("/:id", deleteVehicle);

export default vehicleRentalRouter; 