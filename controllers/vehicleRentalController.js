import VehicleRental from "../models/vehicleRental.js";
import { isItAdmin } from "./userController.js";

// Create a new vehicle
export async function createVehicle(req, res) {
    try {
        if (!isItAdmin(req)) {
            return res.status(403).json({
                message: "Only admins can create vehicles"
            });
        }

        const data = req.body;

        // Generate next ID
        let id = 0;
        const vehicles = await VehicleRental.find().sort({id: -1}).limit(1);
        if (vehicles.length == 0) {
            id = 1;
        } else {
            id = vehicles[0].id + 1;
        }
        data.id = id;

        const newVehicle = new VehicleRental(data);
        const response = await newVehicle.save();

        res.status(201).json({
            message: "Vehicle created successfully",
            vehicle: response
        });
    } catch (error) {
        console.error('Error creating vehicle:', error);
        res.status(500).json({
            message: "Failed to create vehicle",
            error: error.message
        });
    }
}

// Get all vehicles
export async function getVehicles(req, res) {
    try {
        const { category, status, availability } = req.query;
        let query = {};

        if (category) query.category = category;
        if (status) query.status = status;
        if (availability !== undefined) query.availability = availability === 'true';

        const vehicles = await VehicleRental.find(query);
        res.json(vehicles);
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        res.status(500).json({
            message: "Failed to fetch vehicles",
            error: error.message
        });
    }
}

// Get a specific vehicle
export async function getVehicle(req, res) {
    try {
        const vehicle = await VehicleRental.findOne({ id: req.params.id });
        
        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found"
            });
        }

        res.json(vehicle);
    } catch (error) {
        console.error('Error fetching vehicle:', error);
        res.status(500).json({
            message: "Failed to fetch vehicle",
            error: error.message
        });
    }
}

// Update a vehicle
export async function updateVehicle(req, res) {
    try {
        if (!isItAdmin(req)) {
            return res.status(403).json({
                message: "Only admins can update vehicles"
            });
        }

        const vehicle = await VehicleRental.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        
        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found"
            });
        }

        res.json({
            message: "Vehicle updated successfully",
            vehicle: vehicle
        });
    } catch (error) {
        console.error('Error updating vehicle:', error);
        res.status(500).json({
            message: "Failed to update vehicle",
            error: error.message
        });
    }
}

// Delete a vehicle
export async function deleteVehicle(req, res) {
    try {
        if (!isItAdmin(req)) {
            return res.status(403).json({
                message: "Only admins can delete vehicles"
            });
        }

        const vehicle = await VehicleRental.findOneAndDelete({ id: req.params.id });
        
        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found"
            });
        }

        res.json({
            message: "Vehicle deleted successfully"
        });
    } catch (error) {
        console.error('Error deleting vehicle:', error);
        res.status(500).json({
            message: "Failed to delete vehicle",
            error: error.message
        });
    }
}

// Get vehicle statistics
export async function getVehicleStats(req, res) {
    try {
        const totalVehicles = await VehicleRental.countDocuments();
        const availableVehicles = await VehicleRental.countDocuments({ status: 'Available' });
        const bookedVehicles = await VehicleRental.countDocuments({ status: 'Booked' });
        const maintenanceVehicles = await VehicleRental.countDocuments({ status: 'Maintenance' });

        const categoryStats = await VehicleRental.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                    averagePrice: { $avg: '$price' }
                }
            }
        ]);

        const statusStats = await VehicleRental.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json({
            totalVehicles,
            availableVehicles,
            bookedVehicles,
            maintenanceVehicles,
            categoryStats,
            statusStats
        });
    } catch (error) {
        console.error('Error getting vehicle statistics:', error);
        res.status(500).json({
            message: "Failed to get vehicle statistics",
            error: error.message
        });
    }
} 