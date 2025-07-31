import mongoose from "mongoose";

const vehicleRentalSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Car', 'Van', 'Bus', 'Bike', 'Three Wheeler']
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    features: [{
        type: String
    }],
    specifications: {
        seats: Number,
        transmission: {
            type: String,
            enum: ['Manual', 'Automatic']
        },
        fuelType: {
            type: String,
            enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid']
        },
        mileage: Number, // km/l
        year: Number
    },
    availability: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        enum: ['Available', 'Booked', 'Maintenance'],
        default: 'Available'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
vehicleRentalSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const VehicleRental = mongoose.model("VehicleRental", vehicleRentalSchema);
export default VehicleRental; 